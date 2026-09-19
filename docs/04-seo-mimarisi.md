# SEO ve İçerik Mimarisi

> Bu doküman sitede **halihazırda uygulanmış** olanı ve **sonraki adımları** ayırır.
> "Uygulandı" işaretli her madde kod tabanında doğrulanabilir.

---

## 1. URL mimarisi

Tercih edilen yapı: **alt dizin + yerelleştirilmiş slug**.

```
/nl/diensten/seo-en-zichtbaarheid
/en/services/seo-and-visibility
/tr/hizmetler/seo-ve-gorunurluk
/ar/khadamat/seo-visibility
```

**Neden alt dizin, alt alan adı değil.** Tek domain üzerinde biriken otorite tüm
diller arasında paylaşılır. Dört ayrı alt alan adı, dört ayrı otorite inşası
demektir — yeni bir marka için karşılanamaz bir maliyet.

**Neden yerelleştirilmiş slug.** Türk aramacı `hizmetler` görür, `services` değil.
Slug hem sıralamaya hem tıklama oranına katkı sağlar. Tek kaynaktan yönetilir:
`src/lib/i18n.ts` içindeki `routeSlugs` tablosu.

**Neden Arapça slug Latin harfli.** `khadamat`, `خدمات` değil. Kodlanmış Arapça URL
e-posta istemcilerinde, reklam platformlarında ve analitikte bozulur; Körfez
kullanıcısı da Latin URL yazmaya alışkındır. Görünen dil tamamen Arapça kalır.

✅ **Uygulandı** — `src/lib/i18n.ts`

---

## 2. Hreflang

Her sayfa dört dilin tamamına + `x-default`'a işaret eder. `x-default` İngilizceyi
gösterir: dört dil bölgesinden gelen ziyaretçi için en güvenli ortak payda.

Kritik nokta: hreflang **karşılıklı** olmalıdır. A sayfası B'yi gösterip B, A'yı
göstermezse Google etiketi yok sayar. Bu yüzden alternatifler tek bir fonksiyondan
(`alternates()` — `src/lib/seo.ts`) üretilir; elle yazılan hiçbir hreflang yoktur.

Sitemap de aynı alternatifleri taşır — ikinci bir doğrulama katmanı.

✅ **Uygulandı** — `src/lib/seo.ts`, `src/app/sitemap.ts`

---

## 3. Yapısal veri (schema.org)

| Şema | Nerede | Not |
|---|---|---|
| `ProfessionalService` | Tüm sayfalar | Organizasyon, adres, `areaServed`, `knowsLanguage` |
| `WebSite` | Tüm sayfalar | Dil bazında `inLanguage` |
| `Service` | Hizmet detay | Sağlayıcı organizasyona bağlı |
| `FAQPage` | Ana sayfa, hizmet detay, yatırım | Zengin sonuç adayı |
| `BreadcrumbList` | Tüm detay sayfaları | SERP'te kırıntı yolu |

**Kasıtlı olarak yok:** `aggregateRating` ve `Review`. Henüz değerlendirme yok;
uydurmak hem dürüstlük ihlali hem de manuel işlem riskidir. Gerçek değerlendirme
toplandığında eklenir.

✅ **Uygulandı** — `src/lib/seo.ts`

---

## 4. İçerik mimarisi: hub-and-spoke

```
Ana sayfa (marka + genel arama niyeti)
│
├── Hizmetler (hub)          ├── Pazarlar (hub)
│   ├── SEO & görünürlük     │   ├── Benelüks
│   ├── Marka & kimlik       │   ├── Geniş Avrupa
│   ├── Web & dönüşüm        │   ├── Türkiye
│   ├── AI video & içerik    │   └── Körfez
│   └── Büyüme sistemleri    │
│                             │
└──────────── sonraki faz ────┴────────────┐
                                            │
                        Hizmet × Pazar kesişim sayfaları
                        (ör. "Körfez için Arapça SEO")
```

**Mevcut durum:** 4 dil × 21 sayfa ≈ 84 statik sayfa.

**Sonraki faz — kesişim sayfaları.** 5 hizmet × 4 pazar = 20 kombinasyon × 4 dil =
80 sayfa. Ticari niyeti en yüksek sorguları bunlar yakalar.

⚠️ **Kritik uyarı:** Bu sayfalar şablondan üretilmemelidir. Aynı iskeletin
değişkenle doldurulması Google'ın *doorway page* tanımına girer ve tüm kümenin
değerini düşürür. Her kesişim sayfasının kendi örneği, kendi kanıtı ve kendi
argümanı olmalıdır. **Önerilen: aynı anda en fazla 2 kombinasyon, gerçek içerikle.**

Öncelik sırası (ticari değere göre):
1. Arapça SEO × Körfez
2. Web & dönüşüm × Körfez (RTL argümanı)
3. Marka & kimlik × Türkiye (ihracatçı argümanı)
4. SEO & görünürlük × Türkiye (ihracat terimleri)

---

## 5. Dil bazında anahtar kelime stratejisi

**Temel kural: dört bağımsız araştırma, tek strateji.** Çeviri yapılmaz.

| Dil | Araştırma odağı | Tipik niyet farkı |
|---|---|---|
| **NL** | Hizmet + şehir kombinasyonları, karşılaştırma terimleri | Fiyat ve şeffaflık odaklı; "kosten", "prijs", "vergelijken" |
| **EN** | Uluslararası B2B, kategori terimleri | Yetkinlik odaklı; "agency", "multilingual", "expansion" |
| **TR** | İhracat ve tedarikçi terimleri, marka + hız | "ihracat", "yurtdışı", "ajans" + bölge |
| **AR** | Kategori + bölge; İngilizce setten bağımsız | Mevki ve güven odaklı; soru formatı ağırlıklı |

**Arapça için özel not.** Arapça arama davranışında dikkat edilecek üç nokta:
1. **Diyakritik ve imla varyasyonu** — aynı kelime farklı yazımlarla aranır;
   anahtar kelime grupları birleştirilerek değerlendirilmeli.
2. **Lehçe ve fasih ayrımı** — arama çoğunlukla fasih (MSA) ile yapılır ama
   konuşma dilinde lehçe kullanılır; içerik MSA, sosyal medya lehçe olabilir.
3. **Kod değiştirme** — teknik terimler sıkça İngilizce aranır (`SEO`, `branding`).
   Bu yüzden Arapça sayfa Latin teknik terimleri de barındırmalıdır.

---

## 6. Teknik temel

| Alan | Durum | Not |
|---|---|---|
| Statik üretim | ✅ | Tüm sayfalar SSG; ilk bayt hızlı |
| Core Web Vitals | ✅ | Harici JS yok, görsel yok, font `display: swap` |
| RTL | ✅ | Mantıksal özellikler (`ps-`, `me-`, `text-start`) — aynalanmış CSS değil |
| Yapısal veri | ✅ | Bölüm 3 |
| Sitemap + robots | ✅ | Hreflang alternatifli, 68 URL |
| OG görseli | ✅ | Dil bazında üretiliyor (yalnız ASCII — bkz. bilinen sınır) |
| Erişilebilirlik | ✅ | Odak halkaları, skip-link, ARIA, `prefers-reduced-motion` |
| Karanlık mod | ✅ | Sistem tercihine saygı |
| Görsel optimizasyonu | ⬜ | Henüz fotoğraf yok; eklendiğinde `next/image` + AVIF |
| Analitik | ⬜ | `site.analytics` içinde yer ayrıldı; gizlilik dostu çözüm önerilir |

**Bilinen sınır — OG görseli.** Paylaşım kartı yalnızca ASCII metin içerir, çünkü
üreticinin varsayılan fontu Arapça ve Türkçe özel karakterleri çözemez ve boş kutu
basar. Lansmanda dil bazında tasarlanmış statik kartlarla değiştirilmelidir.

---

## 7. Otorite inşası

**Temel kural: bağlantı pazara özgüdür.** Belçika'dan gelen bir bağlantı Riyad'da
sıralama üretmez. Her pazar kendi otorite kaynağını gerektirir.

| Pazar | Otorite kaynağı |
|---|---|
| Benelüks | Sektör dernekleri, yerel iş medyası, ticaret odaları |
| DACH | Teknik yayınlar, sektör dizinleri, sertifikasyon kurumları |
| Türkiye | İhracatçı birlikleri, sektör dergileri, fuar yayınları |
| Körfez | Bölgesel iş medyası, ticaret odaları, yerel partner siteleri |

**Yapılmayacaklar:** Bağlantı satın alma, PBN, düşük kaliteli dizinler. Yeni bir
domain için bu taktikler yalnızca risktir; geri dönüşü yoktur.

---

## 8. Ölçüm çerçevesi

**Aşama başına tek KPI.** Diğer her şey bağlamdır.

| Aşama | Birincil KPI | Destekleyici |
|---|---|---|
| Ay 1–3 | Dil bazında indekslenen sayfa sayısı | Crawl hataları, CWV |
| Ay 3–6 | Ticari niyetli terimlerde görünürlük | Ortalama sıra, tıklama oranı |
| Ay 6–9 | Organik talep sayısı | Talep başına maliyet |
| Ay 9–12 | Talepten müşteriye dönüşüm | Boru hattı öngörülebilirliği |

**Kurulması gerekenler:** Search Console (4 dil için ayrı özellik veya dizin
filtresi), gizlilik dostu analitik, CRM'e talep kaynağı aktarımı.

**Raporlama kuralı:** Her rapor "gelecek ay neyi farklı yapıyoruz" ile biter.
Sonucu olmayan veri rapor değildir.
