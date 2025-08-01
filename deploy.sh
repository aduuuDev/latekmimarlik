#!/bin/bash

# Production Deployment Script for Latek Mimarlık
# Bu script production build'ini hazırlar ve deploy eder

echo "🚀 Latek Mimarlık Production Deployment"
echo "======================================="

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Hata durumunda script'i durdur
set -e

# 1. Environment kontrolü
echo -e "${YELLOW}📋 Environment kontrolü...${NC}"
if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ .env.production dosyası bulunamadı!${NC}"
    echo "Lütfen .env.production dosyasını oluşturun."
    exit 1
fi

# 2. Node.js versiyonu kontrolü
echo -e "${YELLOW}📋 Node.js versiyonu kontrolü...${NC}"
NODE_VERSION=$(node -v)
echo "Node.js versiyonu: $NODE_VERSION"

# 3. Bağımlılıkları yükle
echo -e "${YELLOW}📦 Bağımlılıklar yükleniyor...${NC}"
npm install

# 4. Güvenlik açıklarını düzelt
echo -e "${YELLOW}🔒 Güvenlik açıkları düzeltiliyor...${NC}"
npm audit fix || echo -e "${YELLOW}⚠️  Bazı güvenlik açıkları düzeltilemedi${NC}"

# 5. Build işlemi
echo -e "${YELLOW}🔨 Production build başlatılıyor...${NC}"
npm run build

# 6. Build kontrolü
if [ -d ".next" ]; then
    echo -e "${GREEN}✅ Build başarıyla tamamlandı!${NC}"
else
    echo -e "${RED}❌ Build başarısız!${NC}"
    exit 1
fi

# 7. Build boyutunu göster
echo -e "${YELLOW}📊 Build boyutu:${NC}"
du -sh .next/

# 8. Production test
echo -e "${YELLOW}🧪 Production build test ediliyor...${NC}"
echo "Test için port 3010 kullanılacak..."

# Arka planda test server'ı başlat
PORT=3010 npm start &
SERVER_PID=$!

# Server'ın başlamasını bekle
sleep 5

# Health check
if curl -f http://localhost:3010 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Production server başarıyla çalışıyor!${NC}"
    echo "Test URL: http://localhost:3010"
else
    echo -e "${RED}❌ Production server başlatılamadı!${NC}"
fi

# Test server'ı durdur
kill $SERVER_PID 2>/dev/null || true

echo ""
echo -e "${GREEN}🎉 Deployment hazır!${NC}"
echo "======================================="
echo "📁 Build dosyaları: .next/"
echo "🌐 Production başlatma: npm start"
echo "📖 Detaylı bilgi: PRODUCTION_DEPLOYMENT.md"
echo ""
echo -e "${YELLOW}Sonraki adımlar:${NC}"
echo "1. .env.production dosyasında NEXTAUTH_URL'i güncelleyin"
echo "2. Production sunucusuna dosyaları kopyalayın"
echo "3. npm install --production çalıştırın"
echo "4. npm start ile uygulamayı başlatın"
echo ""
