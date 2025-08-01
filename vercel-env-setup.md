# Vercel Environment Variables Setup

## Vercel Dashboard'da Ayarlanması Gereken Environment Variables

### 1. Project Settings > Environment Variables

Aşağıdaki environment variables'ları Vercel dashboard'unda ayarlayın:

#### Production Environment Variables:

```
MONGODB_URI
Value: mongodb+srv://seyfisonercetin:2VlGCWozPBE9V4ug@latekmimarlik.5od56xq.mongodb.net/latekmimarlik?retryWrites=true&w=majority
Environment: Production
```

```
NEXTAUTH_SECRET
Value: uP7GeJ4vV+J4UNfoZQPaXrYJh0DdXfHg0ZfZq1vFvN8=
Environment: Production
```

```
NEXTAUTH_URL
Value: https://latekmimarlik-h3r527a33-aduuusnrs-projects.vercel.app
Environment: Production
```

### 2. Vercel CLI ile Ayarlama (Alternatif)

```bash
# Vercel CLI ile environment variables ayarlama
vercel env add MONGODB_URI production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
```

### 3. Deployment Sonrası

Environment variables ayarlandıktan sonra:

1. Vercel'de yeniden deploy edin
2. Veya `vercel --prod` komutu ile deploy edin

### 4. Test

Deployment sonrası test edin:
- https://latekmimarlik-h3r527a33-aduuusnrs-projects.vercel.app/auth/login
- Admin panele giriş yapın
- API endpoint'lerini test edin

### 5. Sorun Giderme

Eğer hala 401 hatası alıyorsanız:

1. Vercel Functions logs'unu kontrol edin
2. NextAuth callback URL'lerini kontrol edin
3. Database bağlantısını test edin
