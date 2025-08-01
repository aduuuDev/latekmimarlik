const fs = require('fs');
const path = require('path');

// Admin API'larını düzelten script
function fixAdminAPIs() {
  const adminApiDir = 'src/app/api/admin';
  
  // Tüm .js dosyalarını bul
  function findJSFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findJSFiles(fullPath));
      } else if (item.endsWith('.js')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
  
  const jsFiles = findJSFiles(adminApiDir);
  
  for (const file of jsFiles) {
    console.log(`Düzeltiliyor: ${file}`);
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Auth import'larını düzelt
    if (content.includes('import { authOptions }')) {
      // authOptions import'unu kaldır
      content = content.replace(/import.*authOptions.*from.*auth.*route.*;\n?/g, '');
      
      // getServerSession import'unu kontrol et ve getSessionWithAuth ekle
      if (content.includes('getServerSession')) {
        if (!content.includes('getSessionWithAuth')) {
          content = content.replace(
            /import { getServerSession } from "next-auth\/next";/,
            'import { getSessionWithAuth } from "@/utils/authHelpers";'
          );
        }
        
        // getServerSession kullanımlarını değiştir
        content = content.replace(
          /const session = await getServerSession\(authOptions\);/g,
          'const session = await getSessionWithAuth();'
        );
        
        content = content.replace(
          /await getServerSession\(authOptions\)/g,
          'await getSessionWithAuth()'
        );
      }
    }
    
    // Dosyayı kaydet
    fs.writeFileSync(file, content);
  }
  
  console.log('✅ Tüm admin API\'ları düzeltildi!');
}

fixAdminAPIs();
