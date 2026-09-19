# Lansman Kontrol Listesi

> 🔴 = yayın öncesi zorunlu · 🟡 = ilk ay içinde · 🟢 = iyileştirme

---

## 🔴 Kurumsal veriler — `content/site.ts`

`PLACEHOLDER` olarak işaretli her alan gerçek veriyle değiştirilmelidir. Bu
alanlar `ProfessionalService` yapısal verisine ve yerel SEO'ya doğrudan girer.

- [ ] `legal.name` — resmi şirket unvanı
- [ ] `legal.vat` — KBO/BCE işletme numarası
- [ ] `legal.street`, `postalCode`, `city`, `region` — kayıtlı adres
- [ ] `contact.email` — **alan adına bağlı adres**; Gmail konumlandırmayla çelişir
- [ ] `contact.phoneBe` — Belçika hattı
- [ ] `contact.phoneTr` — Türkiye hattı
- [ ] `contact.phoneAe` — BAE hattı (Körfez güvenilirliği için kritik)
- [ ] `contact.whatsapp` — Körfez ve Türkiye'de birincil kanal
- [ ] `social.*` — yalnızca gerçekten var olan hesaplar; olmayan bağlantı zarardır
- [ ] `url` — üretim alan adı

## 🔴 Altyapı

- [ ] Alan adı kaydı ve DNS
- [ ] SSL + HSTS (başlık `next.config.ts` içinde hazır)
- [ ] Deploy (Vercel veya eşdeğeri)
- [ ] `CONTACT_WEBHOOK_URL` ortam değişkeni — ayarlı değilse form e-posta
      taslağına düşer; talep kaybolmaz ama dönüşüm düşer
- [ ] Talep bildirimlerinin ulaştığının uçtan uca testi

## 🔴 Hukuki

- [ ] Gizlilik politikasının bir hukukçu tarafından gözden geçirilmesi
      (GDPR + KVKK + Körfez ülkelerinin yerel kuralları)
- [ ] Çerez politikası — şu an reklam çerezi kullanılmıyor; analitik eklenirse güncelle
- [ ] Genel şart ve koşullar
- [ ] Sitede zorunlu kurumsal bilgiler (BE mevzuatı)

## 🔴 İçerik dürüstlüğü

- [ ] `content/cases.ts` — üç senaryonun *örnek model* etiketiyle yayımlandığının
      doğrulanması; **ölçülmemiş hiçbir rakam eklenmemeli**
- [ ] Ana sayfadaki dört rakamın (12/6/3/24s) taahhüt olarak gerçekten geçerli
      olduğunun teyidi — özellikle 24 saat yanıt süresi
- [ ] Fiyat aralıklarının onaylanması

---

## 🟡 SEO kurulumu

- [ ] Google Search Console — 4 dil için özellik veya dizin filtresi
- [ ] Sitemap gönderimi (`/sitemap.xml`, 68 URL)
- [ ] Bing Webmaster Tools
- [ ] Google Business Profile — Anvers, İstanbul, Dubai
- [ ] Gizlilik dostu analitik (`site.analytics.plausibleDomain`)
- [ ] Zengin sonuç testi — FAQ, Service, Breadcrumb şemaları
- [ ] Mobil kullanılabilirlik ve CWV ölçümü

## 🟡 Marka varlıkları

- [ ] Çizilmiş logo — şu an tipografik wordmark kullanılıyor (`src/components/Logo.tsx`)
- [ ] Arapça logo varyantı (`ميريديان`) — Latin sürümün yanında, üstüne giydirilmiş değil
- [ ] Dil bazında tasarlanmış OG görselleri — mevcut kart yalnızca ASCII
      (üretici fontu Arapça/Türkçe karakterleri basamıyor)
- [ ] Marka fotoğrafçılığı: ekip, üç hub, çalışma ortamı
- [ ] Marka kitabı (renk, tipografi, ton — Arapça dahil)

## 🟡 Kanıt

- [ ] P3Media geçmişinden izinli 2–3 gerçek vaka
- [ ] Ekip/kurucu profilleri — VIP satışta marka değil insan satın alınır
- [ ] İlk müşteri referansları (yazılı izinle)
- [ ] Varsa sertifikalar / iş ortaklıkları

---

## 🟢 Sonraki iyileştirmeler

- [ ] Fransızca ve Almanca dil katmanları (talep gösterirse)
- [ ] Hizmet × pazar kesişim sayfaları — **aynı anda en fazla 2, gerçek içerikle**
      (şablon çoğaltma doorway page riskidir)
- [ ] İçgörü/blog bölümü ve yayın ritmi
- [ ] WhatsApp Business API entegrasyonu
- [ ] Randevu planlama (Calendly vb.) doğrudan sitede
- [ ] Görsel eklendiğinde `next/image` + AVIF
- [ ] A/B testi altyapısı

---

## Yayın günü doğrulaması

```bash
npm run build        # temiz build
npm run typecheck    # tip hatası yok
```

Ardından canlı ortamda:

- [ ] `/` → dil algılamalı yönlendirme çalışıyor
- [ ] Dört dilin tamamı yükleniyor; Arapça sağdan sola doğru
- [ ] Dil değiştirici aynı sayfanın karşılığına gidiyor (ana sayfaya düşmüyor)
- [ ] `/sitemap.xml` 68 URL döndürüyor
- [ ] `/robots.txt` doğru domaini gösteriyor
- [ ] İletişim formu uçtan uca test edildi
- [ ] Mobilde menü, form ve telefon bağlantıları çalışıyor
- [ ] Zengin sonuç testi hatasız
- [ ] 404 sayfası çalışıyor
