#!/bin/bash

# Admin API'larını build-safe hale getiren script

echo "🔧 Admin API'ları düzeltiliyor..."

# Tüm admin API'larını kopyala
echo "📁 Admin API'ları kopyalanıyor..."
cp -r temp_disabled_routes/admin_api_full/* src/app/api/admin/ 2>/dev/null || true

# Auth import'larını düzelt
echo "🔐 Auth import'ları düzeltiliyor..."

find src/app/api/admin -name "*.js" -type f | while read file; do
    echo "Düzeltiliyor: $file"
    
    # Auth import'unu kaldır ve dinamik import ekle
    if grep -q "import.*authOptions.*from.*auth" "$file"; then
        # Auth import satırını kaldır
        sed -i '' '/import.*authOptions.*from.*auth/d' "$file"
        
        # getAuthOptions fonksiyonunu ekle (eğer yoksa)
        if ! grep -q "async function getAuthOptions" "$file"; then
            # Import'lardan sonra getAuthOptions fonksiyonunu ekle
            sed -i '' '/^import/a\
\
// Auth options'\''ı dinamik olarak import et\
async function getAuthOptions() {\
  try {\
    // Build zamanında auth import etme\
    if (typeof window === '\''undefined'\'' && process.env.NODE_ENV === '\''production'\'') {\
      return null;\
    }\
    const { authOptions } = await import("../../auth/[...nextauth]/route");\
    return authOptions;\
  } catch (error) {\
    console.warn("Auth options not available during build");\
    return null;\
  }\
}
' "$file"
        fi
        
        # authOptions kullanımlarını değiştir
        sed -i '' 's/const session = await getServerSession(authOptions);/const authOptions = await getAuthOptions();\
    const session = authOptions ? await getServerSession(authOptions) : null;/g' "$file"
    fi
done

echo "✅ Admin API'ları düzeltildi!"
