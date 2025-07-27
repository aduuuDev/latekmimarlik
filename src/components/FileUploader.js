'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './FileUploader.module.css';

export default function FileUploader({ 
  onUpload, 
  folder = 'uploads',
  label = 'Dosya Yükle',
  accept = 'image/*',
  maxSize = 5, // MB cinsinden
  id // input ID for label association
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Dosya boyut kontrolü
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Dosya boyutu çok büyük. Maksimum ${maxSize}MB olmalıdır.`);
      return;
    }
    
    // Dosya adını kaydet
    setFileName(file.name);
    
    // Önizleme göster
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    
    setError('');
    setIsUploading(true);
    setProgress(10);
    
    try {
      // FormData oluştur ve dosyayı ekle
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      
      // İlerleme için
      setProgress(30);
      
      // API'ye yükle
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      
      setProgress(70);
      
      const result = await response.json();
      
      setProgress(100);
      
      if (!result.success) {
        throw new Error(result.message || 'Yükleme başarısız');
      }
      
      // Yükleme başarılı ise callback fonksiyonu çağır
      if (onUpload && typeof onUpload === 'function') {
        onUpload(result.data);
      }
      
    } catch (error) {
      setError(`Yükleme hatası: ${error.message}`);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      // İlerleme çubuğunu sıfırla (biraz bekleyerek)
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    }
  };
  
  return (
    <div className={styles.uploaderContainer}>
      <label className={styles.fileLabel} htmlFor={id}>
        <input
          id={id}
          type="file"
          className={styles.fileInput}
          onChange={handleFileChange}
          accept={accept}
          disabled={isUploading}
        />
        <span className={styles.buttonText}>
          {isUploading ? 'Yükleniyor...' : label}
        </span>
      </label>
      
      {fileName && !isUploading && !error && (
        <div className={styles.fileNameContainer}>
          <span className={styles.fileName}>{fileName}</span>
        </div>
      )}
      
      {progress > 0 && (
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
          <span className={styles.progressText}>{progress}%</span>
        </div>
      )}
      
      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
      
      {preview && (
        <div className={styles.previewContainer}>
          <Image 
            src={preview} 
            alt="Yüklenen dosya önizleme"
            width={200}
            height={150}
            className={styles.previewImage}
          />
        </div>
      )}
    </div>
  );
}
