import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

// Dosya uzantısı kontrolü için izin verilen formatlar
const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];

// Yetki kontrolü
async function isAuthenticated() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return { success: false, message: 'Unauthorized' };
  }
  
  // Sadece admin ve editörler dosya yükleyebilir
  if (!['admin', 'editor'].includes(session.user.role)) {
    return { success: false, message: 'Permission denied' };
  }
  
  return {
    success: true,
    user: session.user
  };
}

export async function POST(request) {
  try {
    // Yetki kontrolü
    const auth = await isAuthenticated();
    if (!auth.success) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }

    // FormData olarak gönderilen dosyayı al
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'uploads'; // Varsayılan klasör
    
    // Dosya kontrolü
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Dosya uzantısını kontrol et
    const originalName = file.name;
    const fileExt = originalName.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(fileExt)) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Invalid file type. Allowed extensions: ${allowedExtensions.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Dosya boyutunu kontrol et (örn. 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds the 5MB limit' },
        { status: 400 }
      );
    }
    
    // Dosya içeriğini buffer olarak al
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Dosyaya benzersiz isim ver
    const timestamp = Date.now();
    const safeName = originalName
      .replace(/[^\w.-]/g, '') // Sadece güvenli karakterleri tut
      .replace(/\s+/g, '-'); // Boşlukları tire ile değiştir
    const fileName = `${timestamp}-${safeName}`;
    
    // Dosyanın kaydedileceği klasör
    const uploadDir = join(process.cwd(), 'public', folder);
    
    // Klasörü oluştur (yoksa)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Dosya yolunu belirle
    const filePath = join(uploadDir, fileName);
    
    // Dosyayı kaydet
    await writeFile(filePath, buffer);
    
    // Başarılı yanıt döndür
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        fileName,
        filePath: `/${folder}/${fileName}`, // Public URL
        originalName,
        size: file.size,
        type: file.type
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

// Dosya boyutu sınırını artır
export const config = {
  api: {
    bodyParser: false,
  },
};
