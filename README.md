# MERIDIAN by P3Media

Avrupa, Türkiye ve Körfez pazarlarını aynı anda oynayan markalar için kurulan VIP
büyüme ortaklığının kurumsal sitesi.

**Dört dil · 84 statik sayfa · yerelleştirilmiş URL'ler · gerçek RTL desteği**

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Stil | Tailwind CSS v4 |
| Diller | Felemenkçe · İngilizce · Türkçe · Arapça (RTL) |
| Üretim | Tamamen statik (SSG); yalnızca iletişim uç noktası dinamik |

---

## Başlangıç

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # üretim derlemesi
npm run typecheck  # tip kontrolü
```

`/` adresi, tarayıcının `Accept-Language` başlığına göre bir dile yönlendirilir.
Her dil kendi indekslenebilir URL'sini korur.

---

## Ortam değişkenleri

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| `CONTACT_WEBHOOK_URL` | Hayır | İletişim formunun JSON POST göndereceği uç nokta (CRM, Make/Zapier, kendi mailer'ınız). Ayarlı değilken form, ziyaretçiye ön doldurulmuş bir e-posta taslağı açar — talep sessizce kaybolmaz. |

---

## Proje yapısı

```
content/                  Tüm metin ve varlıklar — kodla karışmaz
├── site.ts               Marka sabitleri, NAP, hub'lar (PLACEHOLDER'lar burada)
├── types.ts              Sözlük ve varlık arayüzleri
├── locales/              nl · en · tr · ar — dört dil, tek arayüz
├── services/             5 hizmet, her biri 4 dilde
├── markets/              4 pazar, her biri 4 dilde
└── cases.ts              3 yöntem senaryosu (müşteri vakası DEĞİL — dosya başına bakın)

src/
├── lib/
│   ├── i18n.ts           Diller + yerelleştirilmiş slug tabloları (tek kaynak)
│   ├── seo.ts            Metadata, hreflang, schema.org üreticileri
│   └── paths.ts          Dil değiştirme için URL eşleme
├── app/
│   ├── [locale]/         Kök layout (html/dir/font burada belirlenir)
│   │   ├── page.tsx                      ana sayfa
│   │   ├── [section]/page.tsx            bölüm sayfaları
│   │   └── [section]/[slug]/page.tsx     hizmet ve pazar detayları
│   ├── api/contact/      Form uç noktası
│   ├── sitemap.ts        68 URL, hreflang alternatifli
│   └── robots.ts
└── components/
    ├── views/            Sayfa görünümleri
    └── ...               Paylaşılan bileşenler

docs/                     Strateji ve analiz dokümanları (Türkçe)
```

**Tasarım kararı:** İçerik `content/` altında, koddan tamamen ayrıdır. Bir metni
değiştirmek için bileşen açmanız gerekmez. `Dictionary` arayüzü sayesinde bir dile
anahtar eklenip diğerlerine eklenmezse **derleme hata verir** — diller birbirinden
uzaklaşamaz.

---

## Yeni dil eklemek

1. `src/lib/i18n.ts` → `locales` dizisine ekle, `localeConfig` ve `routeSlugs`
   tablolarını doldur
2. `content/locales/<dil>.ts` oluştur — `Dictionary` arayüzü eksikleri gösterir
3. `content/services/*.ts` ve `content/markets/*.ts` içindeki `copy` ve `slug`
   bloklarına dili ekle
4. Latin dışı bir alfabe ise `src/app/fonts.ts` içine font çifti ekle

Tip sistemi geri kalanını zorunlu kılar; hiçbir sayfa dosyasına dokunulmaz.

---

## Mimari notlar

**Yerelleştirilmiş slug'lar.** `/nl/diensten/seo-en-zichtbaarheid` ve
`/tr/hizmetler/seo-ve-gorunurluk` aynı sayfadır. Eşleme `routeSlugs` tablosundadır
ve hem yönlendirmeyi hem hreflang'i hem sitemap'i besler.

**Arapça slug'lar Latin harfli.** `khadamat`, `خدمات` değil — kodlanmış Arapça URL
e-posta istemcilerinde ve reklam platformlarında bozulur. Görünen dil tamamen
Arapça kalır.

**Gerçek RTL.** Aynalanmış CSS değil; mantıksal özellikler (`ps-`, `me-`,
`text-start`), Arapça'ya özel font çifti ve artırılmış satır yüksekliği.

**Kaydırma animasyonları aşamalı iyileştirmedir.** İçerik JavaScript olmadan da
görünür; `js` sınıfı eklendikten sonra gizlenir. `prefers-reduced-motion` tercihi
her zaman kazanır.

**Uydurma sosyal kanıt yok.** `aggregateRating` ve `Review` şemaları kasıtlı olarak
yoktur. `content/cases.ts` içindeki üç senaryo arayüzde *örnek model* olarak
etiketlenir. Gerçek, izinli vakalar geldiğinde değiştirilmelidir.

---

## Yayın öncesi

`content/site.ts` içindeki `PLACEHOLDER` alanların tamamı doldurulmadan site
canlıya alınmamalıdır — bunlar yapısal veriye ve yerel SEO'ya doğrudan girer.

Tam liste: [`docs/06-lansman-kontrol-listesi.md`](docs/06-lansman-kontrol-listesi.md)

---

## Dokümantasyon

| Doküman | İçerik |
|---|---|
| [`00-strateji-ozeti.md`](docs/00-strateji-ozeti.md) | Konumlandırma, yapısal avantajlar, başarı ölçütleri |
| [`01-pazar-analizi.md`](docs/01-pazar-analizi.md) | Benelüks · Avrupa · Türkiye · Körfez derinlemesine |
| [`02-rakip-analizi.md`](docs/02-rakip-analizi.md) | Rakip kategorileri, konumlandırma haritası, ayrışma cümleleri |
| [`03-icp-ve-teklif.md`](docs/03-icp-ve-teklif.md) | Üç ICP, teklif basamakları, fiyatlandırma mantığı |
| [`04-seo-mimarisi.md`](docs/04-seo-mimarisi.md) | URL, hreflang, şema, içerik mimarisi, ölçüm |
| [`05-lansman-plani.md`](docs/05-lansman-plani.md) | 90 günlük plan ve başarısızlık sinyalleri |
| [`06-lansman-kontrol-listesi.md`](docs/06-lansman-kontrol-listesi.md) | Yayın öncesi bloklayıcılar |
