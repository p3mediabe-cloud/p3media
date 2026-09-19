# 90 Günlük Lansman Planı

> Site teknik olarak hazır. Bu plan, **yayına girmek** ile **müşteri getirmek**
> arasındaki mesafeyi kapatır.

---

## Faz 0 — Yayın öncesi bloklayıcılar (1–2 hafta)

Bunlar tamamlanmadan site canlıya **alınmamalıdır**. Tam liste:
`docs/06-lansman-kontrol-listesi.md`

**Dört kritik blok:**

1. **Kurumsal veriler.** `content/site.ts` içinde `PLACEHOLDER` işaretli her alan:
   şirket unvanı, KBO/VAT numarası, adres, üç telefon hattı. Bunlar yapısal veriye
   ve yerel SEO'ya doğrudan girer — yanlış olması yalnızca sıralama değil,
   sorumluluk riskidir.

2. **Domain kararı.** Şu an `meridian.p3media.be` varsayılıyor. Üç seçenek:
   - `meridian.p3media.be` — hızlı, P3Media otoritesinden pay alır, ama alt marka gibi kalır
   - `meridianby.co` vb. — bağımsız, sıfırdan otorite
   - **Önerilen:** `p3meridian.com` veya benzeri — bağımsız ama isim bağı korunur

3. **Talep teslimi.** `CONTACT_WEBHOOK_URL` ortam değişkeni ayarlanmalı. Ayarlı
   değilken form, kullanıcıya ön doldurulmuş e-posta taslağı açar — talep
   kaybolmaz ama dönüşüm düşer.

4. **Gerçek e-posta adresi.** `p3media.be@gmail.com` yerine
   `hello@` / `info@` gibi alan adına bağlı bir adres. Gmail adresi, 15.000 €/ay
   satan bir markanın konumlandırmasıyla çelişir. **Bu tek değişiklik, algı
   açısından en yüksek getirili düzeltmedir.**

---

## Faz 1 — Hafta 1–2: Altyapı ve indeksleme

| İş | Sorumlu | Çıktı |
|---|---|---|
| Faz 0 bloklayıcılarının kapatılması | P3Media | `site.ts` gerçek verilerle |
| Domain + SSL + deploy | Teknik | Canlı site |
| Search Console: 4 dil kurulumu | SEO | Doğrulanmış özellikler |
| Sitemap gönderimi | SEO | 68 URL kuyrukta |
| Gizlilik dostu analitik | Teknik | Olay takibi aktif |
| CRM + talep yönlendirme | Operasyon | Dil bazında yönlendirme |
| Google Business Profile (3 hub) | SEO | Yerel varlık |

**Sonunda:** Site canlı, indekslenmeye başlamış, gelen talep kaybolmuyor.

---

## Faz 2 — Hafta 3–6: Kanıt açığını kapatma

Bu fazın tek amacı var: **sosyal kanıt yokluğunu çözmek.** Şu an sitede tek bir
gerçek müşteri referansı yok ve bu, 15.000 €/ay satan bir markanın en büyük
zafiyeti.

**Öncelikli üç hamle:**

1. **P3Media geçmişinden izinli vaka çıkarma.** MERIDIAN yeni ama P3Media değil.
   Mevcut müşterilerden 2–3 tanesinden yayın izni alınarak gerçek vaka
   yazılmalı — ölçülmüş rakamlarla. Bu, senaryoların yerini alır.

2. **Kurucu profili.** "Hakkımızda" sayfası şu an kurumsal. Üç pazarı da bilen
   *insanlar* eklenmeli: isim, yüz, geçmiş, hangi dili konuştuğu. VIP satışta
   marka değil insan satın alınır.

3. **Teşhis ürününün pilotlanması.** 3–5 markaya indirimli veya bedelsiz teşhis
   yapılması. Çıktısı üç şey üretir: gerçek vaka, referans, ve teklif mekaniğinin
   testi.

**Paralel içerik işi:**
- Arapça SEO boşluğu üzerine derinlikli bir yazı (4 dilde) — kendi iddiamızın kanıtı
- Türk ihracatçılar için "Avrupa'da marka kurma" rehberi (TR + EN)

---

## Faz 3 — Hafta 7–12: Talep üretimi

**Giden (outbound) — ana kanal.** Yeni bir markada organik tek başına yetmez.

| Hedef | Liste kaynağı | Açılış argümanı |
|---|---|---|
| ICP-1 (AB üreticisi) | Körfez fuarlarına katılan AB firmaları | "Arapça sitesi olmayan rakipleriniz…" |
| ICP-2 (TR ihracatçı) | İhracatçı birlikleri üye listeleri | "Fiyattan konuşulmayı bırakmak" |
| ICP-3 (Körfez markası) | Yerel partner ağı, LinkedIn | Doğrudan ilişki, soğuk e-posta değil |

**Kural:** Her giden temas, o markanın sitesine dair **gerçek ve somut bir gözlem**
içermeli. Genel şablon gönderimi bu segmentte ters teper.

**LinkedIn.** Kurucu hesabından haftada 2 gönderi: biri pazar analizi (EU/TR/Körfez
farkları), biri somut bir teknik bulgu. Şirket sayfası ikincil.

**Ücretli.** Sınırlı bütçeyle yalnızca marka arama ve en yüksek niyetli 10–15 terim.
Yeni domainde geniş kampanya para yakar.

---

## 90. günde beklenen durum

| Alan | Gerçekçi beklenti |
|---|---|
| İndeksleme | 4 dilde tam; ilk uzun kuyruk sıralamaları |
| Organik talep | Düşük tek haneli — normaldir, panik nedeni değil |
| Giden kaynaklı görüşme | 15–25 |
| Teşhis satışı | 3–5 |
| Momentum sözleşmesi | 1–2 |
| Yayımlanabilir gerçek vaka | En az 1 |

**En kritik gösterge sıralama değil,** teşhisten Momentum'a geçiş oranıdır. Düşükse
sorun trafik değil, teklif veya fiyat konumlandırmasıdır.

---

## Ay 4–12 yol haritası

- **Ay 4–6:** Kesişim sayfaları (`04-seo-mimarisi.md` Bölüm 4) — aynı anda en fazla 2
- **Ay 4–6:** Gerçek vakaların senaryoların yerini alması
- **Ay 6–9:** Beşinci ve altıncı dil (FR, DE) — organik talep gösterirse
- **Ay 6–9:** Körfez'de yerel partner anlaşması ve yerel telefon hattı
- **Ay 9–12:** Kapasite 8/12'ye ulaşırsa fiyat artışı; ulaşmazsa teklif revizyonu

---

## Başarısızlık sinyalleri ve müdahale

| Sinyal | Olası neden | Müdahale |
|---|---|---|
| Trafik var, talep yok | Fiyat konumu veya kanıt eksikliği | Kanıt bölümlerini öne al, vaka ekle |
| Talep var, kapanmıyor | ICP uyumsuzluğu | Giden hedefleme listesini daralt |
| Teşhis satılıyor, Momentum satılmıyor | Teşhis çıktısı yeterince ikna etmiyor | Teşhis sunumunu somutlaştır |
| Hiçbiri hareket etmiyor (90 gün) | Konumlandırma pazarda karşılık bulmuyor | Konumu daralt: tek ICP'ye odaklan |

Son satır önemlidir. Üç ICP'yi aynı anda kovalamak, yeni bir marka için fazla
geniş olabilir. Doksan günde net sinyal yoksa, **en güçlü tepki alınan tek ICP'ye
daralmak** doğru harekettir — muhtemelen ICP-2 (Türk ihracatçı), çünkü orada
yapısal avantajımız en somut.
