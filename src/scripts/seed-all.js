/**
 * Master seed script
 * 
 * Bu script, tüm seed scriptlerini sırayla çalıştırır.
 * Çalıştırmak için: node src/scripts/seed-all.js
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'seed-services.js',
  'seed-blogs.js',
  'seed-projects.js'
];

async function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    console.log(`Çalıştırılıyor: ${scriptPath}`);
    
    const process = spawn('node', [scriptPath], { stdio: 'inherit' });
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log(`${scriptPath} başarıyla tamamlandı.`);
        resolve();
      } else {
        console.error(`${scriptPath} çalıştırılırken hata oluştu. Çıkış kodu: ${code}`);
        reject(new Error(`Script exited with code ${code}`));
      }
    });
  });
}

async function runAllScripts() {
  console.log('Tüm seed scriptleri çalıştırılıyor...');
  
  for (const script of scripts) {
    const scriptPath = path.join(__dirname, script);
    try {
      await runScript(scriptPath);
    } catch (error) {
      console.error(`Script çalıştırılırken hata: ${error.message}`);
      process.exit(1);
    }
  }
  
  console.log('Tüm seed işlemleri başarıyla tamamlandı!');
}

runAllScripts();
