import type { CaseStudy } from './types'

/**
 * ⚠️  These are METHOD SCENARIOS, not client case studies.
 *
 * MERIDIAN is a new brand, so there is no measured client history to publish
 * yet. Rather than invent results — which would be both dishonest and, under EU
 * advertising law, unlawful — these entries show how we structure an engagement
 * and which metric we would steer on. The UI labels them as illustrative on
 * every surface where they appear.
 *
 * LAUNCH NOTE: replace each entry with a real, consented case the moment one is
 * available, and only then may measured figures appear here.
 */
export const cases: CaseStudy[] = [
  {
    id: 'manufacturer-gulf',
    copy: {
      nl: {
        title: 'Belgische fabrikant opent de Golfregio',
        sector: 'Productie · B2B',
        market: 'België → VAE en Saoedi-Arabië',
        challenge:
          'Een gevestigde Belgische fabrikant verkoopt al jaren aan Europese distributeurs, maar krijgt steeds vaker aanvragen uit de Golf die op niets uitlopen. De site is Nederlands en Engels, de Engelse versie is een letterlijke vertaling, en aanvragen uit de regio worden gemiddeld pas na drie dagen beantwoord.',
        moves: [
          'Arabisch keywordonderzoek los van het Engelse, met nadruk op de termen die inkopers werkelijk gebruiken',
          'Volwaardige Arabische RTL-site met certificeringen, capaciteit en levertijden bovenaan in plaats van onderaan',
          'Lokaal telefoonnummer en WhatsApp-kanaal, met opvolging op de lokale werkweek inclusief zondag',
          'Referentiemateriaal en productdocumentatie in het Arabisch, geschikt om door te sturen binnen een inkoopcommissie',
          'Autoriteitsopbouw via regionale vakbronnen in plaats van Europese links',
        ],
        steering: [
          'Tijd tussen aanvraag en eerste menselijke reactie',
          'Aandeel Arabischtalige aanvragen in het totaal',
          'Conversie van aanvraag naar offerte, apart gemeten per regio',
          'Organische zichtbaarheid op Arabische commerciële zoektermen',
        ],
      },
      en: {
        title: 'Belgian manufacturer opens the Gulf',
        sector: 'Manufacturing · B2B',
        market: 'Belgium → UAE and Saudi Arabia',
        challenge:
          'An established Belgian manufacturer has sold to European distributors for years, but increasingly receives Gulf enquiries that go nowhere. The site is Dutch and English, the English version is a literal translation, and enquiries from the region are answered after three days on average.',
        moves: [
          'Arabic keyword research run separately from the English set, focused on the terms buyers actually use',
          'A genuine Arabic RTL site with certifications, capacity and lead times at the top rather than the bottom',
          'A local phone number and WhatsApp channel, with follow-up on the local working week, Sunday included',
          'Reference material and product documentation in Arabic, built to be forwarded inside a purchasing committee',
          'Authority building through regional trade sources instead of European links',
        ],
        steering: [
          'Time between enquiry and first human response',
          'Share of Arabic-language enquiries in the total',
          'Enquiry-to-quote conversion, measured separately per region',
          'Organic visibility on Arabic commercial search terms',
        ],
      },
      tr: {
        title: 'Belçikalı üretici Körfez pazarını açıyor',
        sector: 'Üretim · B2B',
        market: 'Belçika → BAE ve Suudi Arabistan',
        challenge:
          'Yerleşik bir Belçikalı üretici yıllardır Avrupalı distribütörlere satış yapıyor, ama Körfez’den giderek artan sayıda gelen talepler sonuçsuz kalıyor. Site Felemenkçe ve İngilizce; İngilizce sürüm birebir çeviri ve bölgeden gelen talepler ortalama üç gün sonra yanıtlanıyor.',
        moves: [
          'İngilizce setten bağımsız yürütülen, alıcıların gerçekten kullandığı terimlere odaklı Arapça anahtar kelime araştırması',
          'Sertifikaların, kapasitenin ve teslim sürelerinin en altta değil en üstte olduğu gerçek bir Arapça RTL site',
          'Yerel telefon numarası ve WhatsApp kanalı; pazar günü dahil yerel çalışma haftasına göre takip',
          'Satın alma komitesi içinde iletilmeye uygun, Arapça referans materyali ve ürün dokümantasyonu',
          'Avrupa bağlantıları yerine bölgesel sektör kaynakları üzerinden otorite inşası',
        ],
        steering: [
          'Talep ile ilk insan yanıtı arasındaki süre',
          'Toplam içinde Arapça taleplerin payı',
          'Bölge bazında ayrı ölçülen, talepten teklife dönüşüm',
          'Arapça ticari arama terimlerinde organik görünürlük',
        ],
      },
      ar: {
        title: 'شركة تصنيع بلجيكية تفتح سوق الخليج',
        sector: 'التصنيع · قطاع الأعمال',
        market: 'بلجيكا ← الإمارات والسعودية',
        challenge:
          'شركة تصنيع بلجيكية راسخة تبيع للموزّعين الأوروبيين منذ سنوات، لكنها تتلقّى طلبات خليجية متزايدة لا تصل إلى نتيجة. الموقع بالهولندية والإنجليزية، والنسخة الإنجليزية ترجمة حرفية، وطلبات المنطقة يُجاب عليها بعد ثلاثة أيام في المتوسط.',
        moves: [
          'بحث كلمات مفتاحية بالعربية بمعزل عن المجموعة الإنجليزية، يركّز على المصطلحات التي يستخدمها المشترون فعلًا',
          'موقع عربي حقيقي من اليمين إلى اليسار، بالشهادات والطاقة الإنتاجية ومُدد التسليم في الأعلى لا في الأسفل',
          'رقم هاتف محلي وقناة واتساب، مع متابعة وفق أسبوع العمل المحلي بما فيه الأحد',
          'مواد مرجعية ووثائق منتج بالعربية، مُعدّة ليُعاد إرسالها داخل لجنة المشتريات',
          'بناء سلطة عبر مصادر مهنية إقليمية بدل الروابط الأوروبية',
        ],
        steering: [
          'الزمن بين وصول الطلب وأول رد بشري',
          'حصة الطلبات العربية من الإجمالي',
          'التحويل من طلب إلى عرض سعر، مقيسًا لكل منطقة على حدة',
          'الظهور العضوي على مصطلحات البحث التجارية بالعربية',
        ],
      },
    },
  },
  {
    id: 'exporter-europe',
    copy: {
      nl: {
        title: 'Turkse exporteur bouwt een Europees merk',
        sector: 'Meubel · B2B en B2C',
        market: 'Türkiye → Duitsland en Nederland',
        challenge:
          'Een Turkse producent levert al jaren als white label aan Europese ketens en wil onder eigen naam verkopen. De productie is sterk, het merk bestaat niet. Europese inkopers vergelijken op prijs omdat er geen ander argument wordt aangereikt.',
        moves: [
          'Merkpositionering die vakmanschap, capaciteit en leverzekerheid tot het hoofdargument maakt in plaats van prijs',
          'Duitse en Nederlandse contentlaag met native eindredactie, gebouwd rond de vragen die inkopers echt stellen',
          'Bewijsvoering vooraan: certificeringen, productiecapaciteit, doorlooptijden en garantievoorwaarden',
          'Productvideo’s in meerdere talen, geproduceerd in İstanbul tegen een fractie van de Europese kostprijs',
          'Duitse technische SEO-basis: correcte structured data, impressum en categoriestructuur',
        ],
        steering: [
          'Aandeel aanvragen waarin niet direct over prijs wordt onderhandeld',
          'Organische zichtbaarheid op Duitse en Nederlandse categorietermen',
          'Gemiddelde ordergrootte onder eigen merk versus white label',
          'Kosten per gekwalificeerde inkoperaanvraag',
        ],
      },
      en: {
        title: 'Turkish exporter builds a European brand',
        sector: 'Furniture · B2B and B2C',
        market: 'Türkiye → Germany and the Netherlands',
        challenge:
          'A Turkish producer has supplied European chains as a white label for years and wants to sell under its own name. Production is strong, the brand does not exist. European buyers compare on price because no other argument is offered to them.',
        moves: [
          'Brand positioning that makes craftsmanship, capacity and supply certainty the primary argument instead of price',
          'German and Dutch content layers with native final edit, built around the questions buyers actually ask',
          'Proof up front: certifications, production capacity, lead times and warranty terms',
          'Product videos in several languages, produced in İstanbul at a fraction of European cost',
          'A German technical SEO base: correct structured data, Impressum and category structure',
        ],
        steering: [
          'Share of enquiries that do not open on price negotiation',
          'Organic visibility on German and Dutch category terms',
          'Average order size under own brand versus white label',
          'Cost per qualified buyer enquiry',
        ],
      },
      tr: {
        title: 'Türk ihracatçı Avrupa’da marka kuruyor',
        sector: 'Mobilya · B2B ve B2C',
        market: 'Türkiye → Almanya ve Hollanda',
        challenge:
          'Bir Türk üretici yıllardır Avrupalı zincirlere fason üretim yapıyor ve kendi adıyla satmak istiyor. Üretim güçlü, marka yok. Avrupalı alıcılar fiyat üzerinden karşılaştırıyor, çünkü onlara başka bir argüman sunulmuyor.',
        moves: [
          'Fiyat yerine ustalığı, kapasiteyi ve tedarik güvencesini ana argüman yapan marka konumlandırması',
          'Alıcıların gerçekten sorduğu sorular etrafında kurulmuş, ana dil son okumalı Almanca ve Felemenkçe içerik katmanları',
          'Kanıt en önde: sertifikalar, üretim kapasitesi, teslim süreleri ve garanti koşulları',
          'İstanbul’da Avrupa maliyetinin çok altında üretilen, çok dilli ürün videoları',
          'Alman teknik SEO temeli: doğru yapısal veri, künye ve kategori yapısı',
        ],
        steering: [
          'Doğrudan fiyat pazarlığıyla açılmayan taleplerin payı',
          'Almanca ve Felemenkçe kategori terimlerinde organik görünürlük',
          'Kendi markası ile fason arasındaki ortalama sipariş büyüklüğü',
          'Nitelikli alıcı talebi başına maliyet',
        ],
      },
      ar: {
        title: 'مصدِّر تركي يبني علامة أوروبية',
        sector: 'الأثاث · قطاع الأعمال والأفراد',
        market: 'تركيا ← ألمانيا وهولندا',
        challenge:
          'مُنتِج تركي يورّد لسلاسل أوروبية بعلامة الغير منذ سنوات، ويريد البيع باسمه. الإنتاج قوي، والعلامة غير موجودة. والمشترون الأوروبيون يقارنون بالسعر لأنه لا تُعرض عليهم حجة أخرى.',
        moves: [
          'تموضع للعلامة يجعل الحِرفية والطاقة الإنتاجية وضمان التوريد هي الحجة الأساسية بدل السعر',
          'طبقتا محتوى بالألمانية والهولندية بتحرير نهائي من ناطقين أصليين، مبنيتان حول الأسئلة التي يطرحها المشترون فعلًا',
          'الدليل في المقدمة: الشهادات، والطاقة الإنتاجية، ومُدد التسليم، وشروط الضمان',
          'فيديوهات منتج بعدة لغات، تُنتج في إسطنبول بجزء يسير من التكلفة الأوروبية',
          'أساس سيو تقني ألماني: بيانات منظَّمة صحيحة، وبيانات ناشر، وبنية فئات سليمة',
        ],
        steering: [
          'حصة الطلبات التي لا تبدأ بالتفاوض على السعر',
          'الظهور العضوي على مصطلحات الفئات بالألمانية والهولندية',
          'متوسط حجم الطلب تحت العلامة الخاصة مقابل علامة الغير',
          'تكلفة الطلب المؤهَّل من المشترين',
        ],
      },
    },
  },
  {
    id: 'services-benelux',
    copy: {
      nl: {
        title: 'Dienstverlener wordt echt tweetalig in België',
        sector: 'Zakelijke dienstverlening',
        market: 'Vlaanderen → volledige Benelux',
        challenge:
          'Een Vlaams dienstverleningsbedrijf scoort uitstekend in het Nederlands en haalt vrijwel niets uit Wallonië, Brussel of Nederland. De Franse pagina’s zijn machinaal vertaald en de Nederlandse markt wordt bediend met Vlaamse voorbeelden en Vlaamse prijzen.',
        moves: [
          'Apart Frans keywordonderzoek; de Waalse zoektermen bleken maar beperkt te overlappen met de vertaalde varianten',
          'Volledig herschreven Franse laag met eigen voorbeelden, eigen referenties en eigen toon',
          'Aparte Nederlandse variant met Nederlandse prijsvoorbeelden en directere formulering',
          'Lokale landingspagina’s per regio met correcte bedrijfsvermeldingen en structured data',
          'Leadroutering per taal, zodat een Franstalige aanvraag ook Franstalig wordt beantwoord',
        ],
        steering: [
          'Aandeel aanvragen uit Wallonië, Brussel en Nederland',
          'Organische zichtbaarheid op Franstalige commerciële termen',
          'Conversieratio per taalversie, apart gemeten',
          'Kosten per aanvraag per regio',
        ],
      },
      en: {
        title: 'Service firm becomes genuinely bilingual in Belgium',
        sector: 'Professional services',
        market: 'Flanders → the full Benelux',
        challenge:
          'A Flemish services firm ranks excellently in Dutch and draws almost nothing from Wallonia, Brussels or the Netherlands. The French pages are machine-translated, and the Dutch market is served with Flemish examples and Flemish pricing.',
        moves: [
          'Separate French keyword research; Walloon search terms turned out to overlap only partly with the translated variants',
          'A fully rewritten French layer with its own examples, its own references and its own tone',
          'A distinct Netherlands variant with Dutch pricing examples and more direct phrasing',
          'Local landing pages per region with correct business listings and structured data',
          'Lead routing per language, so a French-language enquiry is answered in French',
        ],
        steering: [
          'Share of enquiries from Wallonia, Brussels and the Netherlands',
          'Organic visibility on French-language commercial terms',
          'Conversion rate per language version, measured separately',
          'Cost per enquiry per region',
        ],
      },
      tr: {
        title: 'Hizmet firması Belçika’da gerçekten iki dilli oluyor',
        sector: 'Kurumsal hizmetler',
        market: 'Flaman bölgesi → tüm Benelüks',
        challenge:
          'Flaman bir hizmet firması Felemenkçede mükemmel sıralanıyor ama Valonya, Brüksel ve Hollanda’dan neredeyse hiç iş almıyor. Fransızca sayfalar makine çevirisi ve Hollanda pazarına Flaman örnekleri ile Flaman fiyatlarıyla hitap ediliyor.',
        moves: [
          'Ayrı bir Fransızca anahtar kelime araştırması; Valon arama terimlerinin çevrilmiş varyantlarla yalnızca kısmen örtüştüğü ortaya çıktı',
          'Kendi örnekleri, kendi referansları ve kendi tonu olan, baştan yazılmış bir Fransızca katman',
          'Hollanda fiyat örnekleri ve daha doğrudan bir anlatımla ayrı bir Hollanda sürümü',
          'Doğru işletme kayıtları ve yapısal veriyle bölge bazında yerel açılış sayfaları',
          'Dil bazında lead yönlendirmesi; böylece Fransızca bir talep Fransızca yanıtlanıyor',
        ],
        steering: [
          'Valonya, Brüksel ve Hollanda kaynaklı taleplerin payı',
          'Fransızca ticari terimlerde organik görünürlük',
          'Ayrı ölçülen, dil sürümü bazında dönüşüm oranı',
          'Bölge bazında talep başına maliyet',
        ],
      },
      ar: {
        title: 'شركة خدمات تصبح ثنائية اللغة فعليًا في بلجيكا',
        sector: 'الخدمات المهنية',
        market: 'الفلاندرز ← البنيلوكس بالكامل',
        challenge:
          'شركة خدمات فلمنكية تتصدّر بامتياز بالهولندية ولا تكاد تجذب شيئًا من والونيا أو بروكسل أو هولندا. صفحاتها الفرنسية مترجمة آليًا، والسوق الهولندي يُخاطَب بأمثلة وأسعار فلمنكية.',
        moves: [
          'بحث كلمات مفتاحية فرنسي منفصل؛ وتبيّن أن مصطلحات البحث الوالونية لا تتقاطع مع البدائل المترجمة إلا جزئيًا',
          'طبقة فرنسية أُعيدت كتابتها بالكامل بأمثلتها ومراجعها ونبرتها الخاصة',
          'نسخة هولندية مستقلة بأمثلة أسعار هولندية وصياغة أكثر مباشرة',
          'صفحات هبوط محلية لكل منطقة بقوائم أعمال صحيحة وبيانات منظَّمة',
          'توجيه للطلبات بحسب اللغة، فيُجاب الطلب الفرنسي بالفرنسية',
        ],
        steering: [
          'حصة الطلبات الواردة من والونيا وبروكسل وهولندا',
          'الظهور العضوي على المصطلحات التجارية بالفرنسية',
          'معدل التحويل لكل نسخة لغوية، مقيسًا على حدة',
          'تكلفة الطلب في كل منطقة',
        ],
      },
    },
  },
]
