'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dumbbell,
  Clock,
  Award,
  Shield,
  Sparkles,
  Heart,
  Coffee,
  Phone,
  Mail,
  User,
  Send,
  Check,
  ChevronDown,
  RefreshCw,
  Menu,
  X,
  Trash2,
  CheckCircle2,
  UserCheck,
  MessageCircle,
  Calendar,
  AlertCircle,
  Instagram,
  Activity,
  Users,
  Flame,
  Car,
  Apple,
  Baby,
  ShoppingBag
} from 'lucide-react';
import { translations, Language } from '@/lib/translations';
import { img } from '@/lib/utils';

interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

// Pure ID generator defined outside the component to satisfy React 19 render purity rules
let idSeed = 0;
const generateId = (prefix: string = ''): string => {
  idSeed += 1;
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `${prefix}${idSeed}-${randomPart}`;
};

// Gym offers data array in multi-lingual format
const gymOffers = [
  {
    id: 'daily',
    name: {
      ar: 'الاشتراك اليومي',
      ku: 'بەشداری ڕۆژانە',
      tr: 'Günlük Üyelik'
    },
    details: {
      ar: 'دخول ليوم واحد',
      ku: 'چوونەژوورەوە بۆ یەک ڕۆژ',
      tr: 'Tek günlük giriş hakkı'
    },
    price: '5,000',
    priceVal: 5000,
    features: {
      ar: ['دخول كامل للصالة الرياضية والأجهزة', 'استخدام الخزائن وغرفة تبديل الملابس', 'إرشادات أولية من المدربة المناوبة'],
      ku: ['چوونەژوورەوەی تەواو بۆ هۆڵ و ئامێرەکان', 'بەکارهێنانی لۆکەر و شوێنی گۆڕینی جل', 'ڕێنمایی سەرەتایی لە ڕاهێنەری ئامادە'],
      tr: ['Spor salonu ve tüm ekipmanlara tam erişim', 'Soyunma odası ve dolap kullanımı', 'Nöbetçi eğitmenden temel bilgilendirme']
    }
  },
  {
    id: 'half_month',
    name: {
      ar: 'إشتراك نصف شهر',
      ku: 'بەشداری نیو مانگ',
      tr: 'Yarım Ay Üyelik'
    },
    details: {
      ar: '15 يوم فقط',
      ku: 'تەنها ١٥ ڕۆژ',
      tr: 'Sadece 15 gün'
    },
    price: '25,000',
    priceVal: 25000,
    features: {
      ar: ['دخول غير محدود طوال 15 يوماً متتالياً', 'استخدام الساونا وغرف البخار', 'قياس وزن مجاني عند البدء'],
      ku: ['چوونەژوورەوەی بێ سنوور بۆ ١٥ ڕۆژ', 'بەکارهێنانی ساونا و هەڵم', 'پێوانەکردنی کێش لە سەرەتاوە'],
      tr: ['15 gün boyunca sınırsız giriş hakkı', 'Sauna ve buhar odası erişimi', 'Başlangıçta ücretsiz kilo ölçümü']
    }
  },
  {
    id: 'monthly',
    name: {
      ar: 'اشتراك شهري',
      ku: 'پێشنیاری تایبەت - تەنها ١٠ ڕۆژ',
      tr: 'Özel Fırsat - Sadece 10 Gün'
    },
    details: {
      ar: 'month',
      ku: 'مانگ',
      tr: 'ay'
    },
    price: '35,000',
    originalPrice: '50,000',
    priceVal: 35000,
    features: {
      ar: ['دخول غير محدود طوال الشهر للصالة', 'حضور الحصص الجماعية (اليوغا، الزومبا...)', 'تحليل تركيب الجسم بجهاز InBody'],
      ku: ['چوونەژوورەوەی بێ سنوور بە درێژایی مانگ', 'بەشداری لە وانە بەکۆمەڵەکان (یۆگا، زومبا)', 'پشکنینی پێکهاتەی جەستە بە ئامێری InBody'],
      tr: ['Ay boyunca sınırsız salon erişimi', 'Tüm grup derslerine (Yoga, Zumba) katılım', 'InBody cihazı ile detaylı vücut analizi']
    }
  },
  {
    id: 'three_months',
    name: {
      ar: 'اشتراك 3 أشهر',
      ku: 'بەشداری ٣ مانگ',
      tr: '3 Aylık Özel Paket'
    },
    details: {
      ar: 'عرض خاص',
      ku: 'پێشنیاری تایبەت',
      tr: 'Özel fiyat avantajı'
    },
    price: '120,000',
    priceVal: 120000,
    features: {
      ar: ['توفير كبير مقارنة بالدفع الشهري', 'دخول غير محدود لجميع المرافق المائية والساونا', 'استشارتان غذائيتان مع أخصائية التغذية', 'خطة تدريبية متكاملة مخصصة لمستوى لياقتكِ'],
      ku: ['داشکانێکی زۆر بەراورد بە مانگانە', 'چوونەژوورەوە بۆ هەموو مەلەوانگە و ساوناکان', '٢ ڕاوێژکاری خۆراکی لەگەڵ پسپۆڕ', 'پڕۆگرامی مەشقی گشتگیر بەپێی ئاستی خۆت'],
      tr: ['Aylık ödemeye kıyasla yüksek tasarruf', 'Tüm havuz, spa ve sauna alanlarına tam erişim', 'Diyetisyen ile 2 adet özel beslenme seansı', 'Seviyenize göre hazırlanmış özel antrenman programı']
    }
  },
  {
    id: 'friends',
    name: {
      ar: 'عرض الصديقات',
      ku: 'پێشنیاری هاوڕێیان',
      tr: 'Arkadaş Grubu Kampanyası'
    },
    details: {
      ar: 'الأكثر طلباً',
      ku: 'زۆرترین داواکاری',
      tr: 'En Popüler'
    },
    price: '40,000',
    priceVal: 40000,
    features: {
      ar: ['خصم خاص عند التسجيل المشترك مع صديقاتكِ', 'دخول كامل ومستمر لجميع الأجهزة والصفوف', 'مشاركة متعة اللياقة والتحفيز المتبادل'],
      ku: ['داشکاندنی تایبەت لەکاتی خۆتۆمارکردن لەگەڵ هاوڕێکانت', 'چوونەژوورەوەی تەواو بۆ ئامێر و وانەکان', 'بەشکردنی چێژی وەرزشکردن پێکەوە'],
      tr: ['Arkadaşlarınızla birlikte kayıtta özel fiyat', 'Tüm ekipman ve grup derslerine sınırsız erişim', 'Grup motivasyonu ile eğlenceli fitness deneyimi']
    },
    popular: true
  },
  {
    id: 'family',
    name: {
      ar: 'عرض العائلات',
      ku: 'پێشنیاری خێزانی',
      tr: 'Aile Paketi Fırsatı'
    },
    details: {
      ar: 'لـ 4 أعضاء فما فوق',
      ku: 'بۆ ٤ ئەندام و زیاتر',
      tr: '4 ve üzeri üye için'
    },
    price: '35,000',
    priceVal: 35000,
    features: {
      ar: ['أفضل سعر ترويجي مخصص للعائلات (أخوات، أمهات)', 'تغطية متكاملة لجميع مرافق النادي والسبا والصفوف', 'متابعة دورية لقياسات الوزن والدهون مجاناً'],
      ku: ['باشترین نرخی تایبەت بە خێزان (خوشک، دایک)', 'دەستڕاگەیشتنی تەواو بە سپا و مەلەوانگە و پۆلەکان', 'چاودێری بەردەوام و بێبەرامبەری کێش و چەوری'],
      tr: ['Aile bireylerine (anne, kız kardeş vb.) en özel fiyat', 'Tüm tesis, spa, havuz ve grup derslerine tam erişim', 'Düzenli vücut analizi ve kilo takibi takibi']
    }
  }
];

export default function DivaGymApp() {
  // --- States ---
  const [lang, setLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<'home' | 'offers' | 'hours' | 'services' | 'about' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Translation set for current language
  const t = translations[lang];

  // Subscription Calculator States
  const [calcMonths, setCalcMonths] = useState<number>(3);
  const [calcPlan, setCalcPlan] = useState<string>('monthly');
  const [calcFrequency, setCalcFrequency] = useState<number>(3);

  // Active Interactive Class for Working Hours Tab
  const [selectedClass, setSelectedClass] = useState<'yoga' | 'zumba' | 'crossfit'>('yoga');

  // Active Service Card details popup
  const [activeServiceDetails, setActiveServiceDetails] = useState<number | null>(null);

  // Monthly offer countdown timer
  const [offerTimeLeft, setOfferTimeLeft] = useState(() => {
    const endDate = new Date('2026-08-01T00:00:00');
    const now = new Date();
    const diff = Math.max(0, endDate.getTime() - now.getTime());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const endDate = new Date('2026-08-01T00:00:00');
      const now = new Date();
      const diff = Math.max(0, endDate.getTime() - now.getTime());
      setOfferTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Contact Form States
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<Submission[]>([]);

  // Load saved submissions on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('diva-gym-submissions');
      if (saved) {
        try {
          setContactSubmissions(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);



  // --- Subscriptions Calculator Formula (Adapted for IQD) ---
  const calculateSubscriptionPrice = () => {
    let basePrice = 50000; // Monthly
    if (calcPlan === 'daily') basePrice = 5000;
    else if (calcPlan === 'half_month') basePrice = 25000;
    else if (calcPlan === 'three_months') basePrice = 130000 / 3; // Price per month
    else if (calcPlan === 'friends') basePrice = 40000;
    else if (calcPlan === 'family') basePrice = 35000;

    let multiplier = calcMonths;

    let totalBase = Math.round(basePrice * multiplier);

    // If three_months is selected, calculate in chunks of 3 months
    if (calcPlan === 'three_months') {
      const chunks = Math.ceil(calcMonths / 3);
      totalBase = 130000 * chunks;
    } else if (calcPlan === 'daily') {
      totalBase = 5000 * calcMonths; // calcMonths is number of days here
    } else if (calcPlan === 'half_month') {
      totalBase = 25000 * calcMonths; // number of half-months
    }

    // Apply duration discount only for standard monthly package
    let discount = 0;
    if (calcPlan === 'monthly') {
      if (calcMonths >= 12) discount = 0.35; // 35% off for annual
      else if (calcMonths >= 6) discount = 0.20; // 20% off for 6 months
      else if (calcMonths >= 3) discount = 0.10; // 10% off for 3 months
    }

    const discountedPrice = Math.round(totalBase * (1 - discount));
    const originalPrice = Math.round(totalBase);

    // Format numbers with comma separator
    const formatNumber = (num: number) => num.toLocaleString('en-US');

    return {
      original: formatNumber(originalPrice),
      final: formatNumber(discountedPrice),
      saved: formatNumber(originalPrice - discountedPrice),
      discountPercent: Math.round(discount * 100)
    };
  };

  // --- Handlers ---
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert(lang === 'ar' ? 'يرجى ملء الاسم الكامل ورقم الهاتف.' : lang === 'ku' ? 'تکایە ناوی تەواو و ژمارەی تەلەفۆن پڕ بکەرەوە.' : 'Lütfen adınızı ve telefon numaranızı girin.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server response delay
    setTimeout(() => {
      const newSubmission: Submission = {
        id: generateId('sub-'),
        name: formName,
        phone: formPhone,
        email: 'N/A',
        subject: lang === 'ar' ? 'طلب تواصل' : lang === 'ku' ? 'داواکاری پەیوەندی' : 'İletişim Talebi',
        message: formMessage || 'No message provided',
        date: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      const updated = [newSubmission, ...contactSubmissions];
      setContactSubmissions(updated);
      localStorage.setItem('diva-gym-submissions', JSON.stringify(updated));

      // Reset form
      setFormName('');
      setFormPhone('');
      setFormMessage('');
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Hide success banner after 8 seconds
      setTimeout(() => setSubmitSuccess(false), 8000);
    }, 1200);
  };

  const handleDeleteSubmission = (id: string) => {
    const updated = contactSubmissions.filter(sub => sub.id !== id);
    setContactSubmissions(updated);
    localStorage.setItem('diva-gym-submissions', JSON.stringify(updated));
  };

  // Navigates and auto-fills gym trainer reference
  const handleTrainerConsult = (trainerName: string, specialty: string) => {
    setFormMessage(lang === 'ar' 
      ? `مرحباً، أود حجز استشارة تدريبية مجانية مع الكابتن ${trainerName} (${specialty}).` 
      : lang === 'ku' 
        ? `سڵاو، دەمەوێت ڕاوێژێکی وەرزشی بێبەرامبەر لەگەڵ ڕاهێنەر ${trainerName} (${specialty}) ڕێکبخەم.` 
        : `Merhaba, antrenör ${trainerName} (${specialty}) ile ücretsiz bir fitness danışmanlığı randevusu oluşturmak istiyorum.`
    );
    setActiveTab('contact');
    
    // Scroll smoothly to contact area
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculated = calculateSubscriptionPrice();

  return (
    <div 
      className="min-h-screen bg-white text-zinc-800" 
      data-lang={lang}
      dir={t.dir}
      id="diva-app-root"
    >


      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-zinc-200/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-5 cursor-pointer" 
            onClick={() => setActiveTab('home')}
            id="header-logo-container"
          >
            <img src={img('/icon.png')} alt="Diva Gym" className="w-10 h-10 object-contain" />
            <span className="text-2xl tracking-tight text-brand-600" style={{ fontFamily: 'var(--font-great-vibes), cursive' }}>
              Diva Gym
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 rtl:space-x-reverse">
            {[
              { id: 'home', label: t.navHome },
              { id: 'offers', label: t.navOffers },
              { id: 'hours', label: t.navHours },
              { id: 'services', label: t.navServices },
              { id: 'about', label: t.navAbout },
              { id: 'contact', label: t.navContact }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id as any);
                  setMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === link.id
                    ? 'bg-brand-600/10 text-brand-600'
                    : 'text-zinc-600 hover:text-brand-600 hover:bg-zinc-100/50'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Controls: Theme, Language, Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse" id="controls-panel">
            


            {/* Language Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1.5 rounded-full border border-zinc-300 hover:border-brand-600 text-xs font-semibold text-zinc-600 hover:text-brand-600 transition-colors">
                <span>🌐 {lang === 'ar' ? 'العربية' : lang === 'ku' ? 'کوردی سۆرانی' : 'Türkçe'}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-32 bg-white rounded-xl shadow-lg border-2 border-brand-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-1">
                  <button
                    onClick={() => setLang('ar')}
                    className={`w-full text-right rtl:text-right px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-brand-600/5 hover:text-brand-600 ${lang === 'ar' ? 'bg-brand-600/10 text-brand-600' : ''}`}
                  >
                    العربية (AR)
                  </button>
                  <button
                    onClick={() => setLang('ku')}
                    className={`w-full text-right rtl:text-right px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-brand-600/5 hover:text-brand-600 ${lang === 'ku' ? 'bg-brand-600/10 text-brand-600' : ''}`}
                  >
                    کوردی سۆرانی (KU)
                  </button>
                  <button
                    onClick={() => setLang('tr')}
                    className={`w-full text-left rtl:text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-brand-600/5 hover:text-brand-600 ${lang === 'tr' ? 'bg-brand-600/10 text-brand-600' : ''}`}
                  >
                    Türkçe (TR)
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-zinc-600 hover:text-brand-600 hover:bg-zinc-100/50"
              aria-label="Open Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-20 z-30 bg-white md:hidden"
            id="mobile-nav-drawer"
          >
            <div className="px-4 pt-4 pb-8 space-y-1 overflow-y-auto h-full">
              {[
                { id: 'home', label: t.navHome },
                { id: 'offers', label: t.navOffers },
                { id: 'hours', label: t.navHours },
                { id: 'services', label: t.navServices },
                { id: 'about', label: t.navAbout },
                { id: 'contact', label: t.navContact }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id as any);
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`w-full text-right rtl:text-right px-5 py-4 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                    activeTab === link.id
                      ? 'bg-brand-600/10 text-brand-600'
                      : 'text-zinc-600 hover:text-brand-600 hover:bg-zinc-100/50'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="main-content-flow">
        <AnimatePresence mode="wait">
        {/* --- SECTION: HOME --- */}
        {activeTab === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-16" id="section-home"
          >
            
            {/* Split Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Area */}
              <div className="lg:col-span-7 space-y-6">

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  {lang === 'ar' ? (
                    <>
                      اصنعي قوتكِ في<br />
                      <span className="text-gold-500 text-[1.95em] sm:text-[1.95em] lg:text-[1.95em]">ديڤا جيم</span>
                    </>
                  ) : lang === 'ku' ? (
                    <>
                      <span className="text-[0.89em]">هێزی خۆت دروستبکە لە</span><br />
                      <span className="text-gold-500 text-[2.5em] sm:text-[2.5em] lg:text-[2.5em]">دیڤا جیم</span>
                    </>
                  ) : (
                    <>
                      Kendi Gücünü <span className="text-gold-500">Diva Gym</span> ile Keşfet
                    </>
                  )}
                </h1>

                <p className="text-base sm:text-lg text-black font-semibold leading-relaxed max-w-xl">
                  {lang === 'ar' ? (
                    <>النادي النسائي الفاخر والأول من نوعه. ارتقِ بقوتك وصحتك<br />وروحك في مساحة مصممة خصيصاً لأجلك.</>
                  ) : t.heroTagline}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('offers')}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-gold-500 text-white font-semibold text-center hover:shadow-lg hover:shadow-brand-500/20 active:scale-98 transition-all duration-200"
                    id="hero-join-now-btn"
                  >
                    {t.heroCtaJoin}
                  </button>
                  <button
                    onClick={() => { setActiveTab('contact'); window.scrollTo(0, 0); }}
                    className="px-8 py-4 rounded-full border-2 border-brand-600 text-brand-600 font-semibold text-center hover:bg-brand-50 active:scale-98 transition-all duration-200"
                    id="hero-contact-btn"
                  >
                    {t.navContact}
                  </button>
                </div>

                {/* Micro social proofs */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-200/60 dark:border-zinc-800/60 max-w-lg">
                  <div>
                    <span className="font-display text-2xl font-black text-brand-600 dark:text-brand-400">992+</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{lang === 'ar' ? 'عضو نشط' : lang === 'ku' ? 'ئەندامی چالاک' : 'Aktif Üye'}</p>
                  </div>
                  <div>
                    <span className="font-display text-2xl font-black text-brand-600 dark:text-brand-400">100%</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{lang === 'ar' ? 'خصوصية وأمان' : lang === 'ku' ? 'نهێنی و سەلامەتی' : 'Mahremiyet'}</p>
                  </div>
                  <div>
                    <span className="font-display text-2xl font-black text-brand-600 dark:text-brand-400">5+</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{lang === 'ar' ? 'مدربة معتمدة' : lang === 'ku' ? 'ڕاهێنەری باوەڕپێکراو' : 'Kadın Antrenör'}</p>
                  </div>
                </div>
              </div>

              {/* Image Area */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full">
                  <img
                  src={img('/preview2.png')}
                  alt="Diva Gym"
                  className="w-full h-auto"
                    id="hero-image-display"
                  />
                </div>
              </div>
            </div>


          </motion.div>
        )}

        {/* --- SECTION: OFFERS & SUBSCRIPTIONS --- */}
        {activeTab === 'offers' && (
          <motion.div 
            key="offers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12" id="section-offers"
          >
            
            {/* Titles */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {t.subTitle}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t.subSubtitle}
              </p>
            </div>

            {/* Dynamic Gym Offers Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" id="pricing-tiers-grid">
              {gymOffers.map((offer) => {
                const isPopular = offer.id === 'friends';
                const isSpecial = offer.id === 'family' || offer.id === 'friends' || offer.id === 'three_months';
                return (
                  <div 
                    key={offer.id}
                    className={`flex flex-col rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative ${
                      offer.id === 'monthly' && offerTimeLeft.days > 0
                        ? 'bg-gradient-to-b from-red-50 via-white to-white border-2 border-red-400 shadow-md'
                        : isPopular 
                          ? 'bg-white border-2 border-brand-600 scale-[1.01] shadow-md' 
                          : isSpecial
                            ? 'bg-white border-2 border-gold-500'
                            : 'bg-white border-2 border-brand-600/30'
                    }`}
                    id={`offer-card-${offer.id}`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-500 text-white text-[10px] uppercase font-extrabold tracking-widest whitespace-nowrap">
                        ⭐ {t.subPopular}
                      </div>
                    )}
                    {offer.id === 'family' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-500 text-white text-[10px] uppercase font-extrabold tracking-widest whitespace-nowrap">
                        🔥 {lang === 'ar' ? 'عرض عائلي خاص' : lang === 'ku' ? 'ئۆفەری خێزانی تایبەت' : 'Özel Aile Fırsatı'}
                      </div>
                    )}
                    {offer.id === 'friends' && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white text-[10px] uppercase font-extrabold tracking-widest whitespace-nowrap">
                        👭 {lang === 'ar' ? 'عرض الصديقات' : lang === 'ku' ? 'ئۆفەری هاوڕێیان' : 'Arkadaş Grubu'}
                      </div>
                    )}
                    {offer.id === 'monthly' && offerTimeLeft.days > 0 && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-500 text-white text-[10px] uppercase font-extrabold tracking-widest whitespace-nowrap">
                        🎁 {lang === 'ar' ? 'عرض محدود' : lang === 'ku' ? 'پێشنیاری سنووردار' : 'Süreli Fırsat'}
                      </div>
                    )}

                    {offer.id === 'monthly' && offerTimeLeft.days > 0 ? (
                      <>
                        <div className="mb-5 flex items-center justify-center gap-2">
                          <span className="text-xl font-bold text-zinc-800">🎁</span>
                          <h3 className="font-display text-lg font-bold text-zinc-900">{offer.name[lang]}</h3>
                        </div>
                        <div className="mb-5">
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-3xl font-black tracking-tight text-red-500">{offer.price}</span>
                            <span className="text-zinc-500 text-xs font-bold">{t.subCurrencySymbol} / {lang === 'ar' ? 'شهر' : lang === 'ku' ? 'مانگ' : 'ay'}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <span className="relative inline-block text-sm text-zinc-400">{offer.originalPrice}<span className="absolute inset-0 w-full h-full" style={{ background: 'linear-gradient(to bottom right, transparent 48%, #a1a1aa 49%, #a1a1aa 51%, transparent 52%)' }}></span></span>
                            <span className="text-xs font-bold text-red-500" dir="ltr">-{Math.round((1 - 35000 / 50000) * 100)}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 py-3 mb-5 border-y border-red-100" style={{ direction: 'ltr' }}>
                          <span className="text-2xl font-black text-red-500 tabular-nums">{String(offerTimeLeft.days).padStart(2, '0')}</span>
                          <span className="text-red-300 font-bold text-xl">:</span>
                          <span className="text-2xl font-black text-red-500 tabular-nums">{String(offerTimeLeft.hours).padStart(2, '0')}</span>
                          <span className="text-red-300 font-bold text-xl">:</span>
                          <span className="text-2xl font-black text-red-500 tabular-nums">{String(offerTimeLeft.minutes).padStart(2, '0')}</span>
                          <span className="text-red-300 font-bold text-xl">:</span>
                          <span className="text-2xl font-black text-red-500 tabular-nums">{String(offerTimeLeft.seconds).padStart(2, '0')}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-6">
                          <h3 className="font-display text-lg font-bold text-zinc-900">{offer.name[lang]}</h3>
                        </div>
                        <div className="mb-6 flex items-baseline">
                          <span className={`text-3xl font-black tracking-tight ${
                            isPopular ? 'text-brand-600' : isSpecial ? 'text-gold-600' : 'text-brand-600'
                          }`}>
                            {offer.price}
                          </span>
                          <span className="text-zinc-400 text-xs ml-1.5 mr-1.5 font-bold">{t.subCurrencySymbol}</span>
                          <span className="text-zinc-400 text-xs font-normal">
                            / {offer.id === 'daily' 
                              ? (lang === 'ar' ? 'يوم' : lang === 'ku' ? 'ڕۆژ' : 'gün') 
                              : offer.id === 'half_month'
                                ? (lang === 'ar' ? '15 يوم' : lang === 'ku' ? '١٥ ڕۆژ' : '15 gün')
                                : offer.id === 'three_months'
                                  ? (lang === 'ar' ? '3 أشهر' : lang === 'ku' ? '٣ مانگ' : '3 ay')
                                  : (lang === 'ar' ? 'شهر' : lang === 'ku' ? 'مانگ' : 'ay')}
                          </span>
                        </div>
                      </>
                    )}

                    {offer.id === 'half_month' && (
                      <div className="mb-4 flex items-center gap-2 text-xs text-zinc-600">
                        <Check className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{lang === 'ar' ? '15 يوم متتالي فقط' : lang === 'ku' ? 'تەنها ١٥ ڕۆژی لەسەریەک' : 'Sadece arka arkaya 15 gün'}</span>
                      </div>
                    )}
                    {offer.id === 'family' && (
                      <div className="mb-4 flex items-center gap-2 text-xs text-zinc-600">
                        <Check className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>{lang === 'ar' ? 'لـ 4 أعضاء فما فوق' : lang === 'ku' ? 'بۆ ٤ ئەندام و زیاتر' : '4 ve üzeri üye için'}</span>
                      </div>
                    )}
                    {offer.id === 'friends' && (
                      <div className="mb-4 flex items-center gap-2 text-xs text-zinc-600">
                        <Check className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{lang === 'ar' ? '40,000 د.ع لكل مشتركة' : lang === 'ku' ? '٤٠,٠٠٠ د.ع بۆ هەر بەشداربوویەک' : 'Kişi başı 40,000 IQD'}</span>
                      </div>
                    )}

                    <div className="flex-grow" />

                    <button
                      onClick={() => {
                        setFormMessage(lang === 'ar' 
                          ? `أود الاستفسار والتسجيل في باقة: ${offer.name[lang]}.` 
                          : lang === 'ku' 
                            ? `دەمەوێت دەربارەی باقەی ${offer.name[lang]} بپرسم و خۆم تۆمار بکەم.` 
                            : `${offer.name[lang]} hakkında bilgi almak ve kayıt olmak istiyorum.`
                        );
                        setActiveTab('contact');
                        window.scrollTo(0, 0);
                      }}
                      className={`mt-6 w-full py-2.5 rounded-full font-semibold text-center text-xs transition-all ${
                        offer.id === 'monthly' && offerTimeLeft.days > 0
                          ? 'bg-red-500 text-white hover:bg-red-600 border-2 border-transparent'
                          : isPopular 
                            ? 'border-2 border-brand-600/30 text-brand-600 hover:bg-brand-600 hover:text-white' 
                            : isSpecial
                              ? 'border-2 border-gold-500 text-gold-600 hover:bg-gold-600 hover:text-white'
                              : 'border-2 border-brand-600/30 text-brand-600 hover:bg-brand-600 hover:text-white'
                      }`}
                    >
                      {t.subSelectPlan}
                    </button>
                  </div>
                );
              })}
            </div>



          </motion.div>
        )}

        {/* --- SECTION: WORKING HOURS --- */}
        {activeTab === 'hours' && (
          <motion.div 
            key="hours"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12" id="section-hours"
          >
            
            {/* Title */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {t.hoursTitle}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t.hoursSubtitle}
              </p>
            </div>

            {/* Split layout: Schedule Table & Interactive Timetable */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Working Hours Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between border-2 border-brand-600/30">
                <div className="flex items-center gap-4 text-brand-600">
                  <Clock className="w-6 h-6" />
                  <h3 className="font-display font-bold text-lg text-zinc-900">{lang === 'ar' ? 'الأوقات الأسبوعية' : lang === 'ku' ? 'کاتەکانی هەفتە' : 'Haftalık Mesai Saatleri'}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-100">
                    <span className="text-xs font-bold text-zinc-700">{lang === 'ar' ? 'من السبت إلى الخميس' : lang === 'ku' ? 'لە شەممەوە تا کۆتایی پێنجشەممە' : 'Cumartesi - Perşembe'}</span>
                    <span className="text-sm font-semibold text-zinc-900">{lang === 'ar' ? '09:00 صباحاً - 10:00 مساءً' : lang === 'ku' ? '09:00 بەیانی - 10:00 شەو' : '09:00 - 22:00'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold text-zinc-700">{lang === 'ar' ? 'الجمعة' : lang === 'ku' ? 'جومە' : 'Cuma'}</span>
                    <span className="text-sm font-semibold text-zinc-900">{lang === 'ar' ? '02:00 ظهراً - 07:00 مساءً' : lang === 'ku' ? '02:00 پاشنیوەڕۆ - 07:00 شەو' : '14:00 - 19:00'}</span>
                  </div>
                </div>

                {/* Important Alert Callout */}
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-4">
                  <Shield className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                    {t.hoursNote}
                  </p>
                </div>
              </div>

              {/* Class Times */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between border-2 border-brand-600/30">
                <div>
                  <h3 className="font-display font-bold text-lg text-zinc-900">
                    {t.hoursSpecialClasses}
                  </h3>
                </div>

                <div className="space-y-3 mt-6">
                  {[
                    { time: '11:00', period: lang === 'ar' ? 'صباحاً' : lang === 'ku' ? 'بەیانی' : 'AM' },
                    { time: '03:00', period: lang === 'ar' ? 'ظهراً' : lang === 'ku' ? 'پاشنیوەڕۆ' : 'PM' },
                    { time: '05:00', period: lang === 'ar' ? 'عصراً' : lang === 'ku' ? 'ئێوارە' : 'PM' },
                    { time: '07:30', period: lang === 'ar' ? 'مساءً' : lang === 'ku' ? 'شەو' : 'PM' },
                  ].map((slot, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 px-4 bg-white border-2 border-brand-600/30 rounded-xl hover:bg-brand-600/5 transition-all">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-brand-600" />
                        <span className="text-sm font-semibold text-zinc-900">{slot.time} <span className="text-brand-600 text-xs font-bold">{slot.period}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* --- SECTION: SERVICES --- */}
        {activeTab === 'services' && (
          <motion.div 
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12" id="section-services"
          >
            
            {/* Title */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {t.servicesTitle}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t.servicesSubtitle}
              </p>
            </div>

            <AnimatePresence mode="wait">
            {activeServiceDetails !== null ? (
              /* Detail View */
              <motion.div 
                key="service-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-sm border-2 border-brand-600/30"
              >
                <button
                  onClick={() => setActiveServiceDetails(null)}
                  className="flex items-center gap-2 text-brand-600 text-sm font-bold mb-6 hover:underline"
                >
                  <span>{lang === 'ar' ? '→ العودة للخدمات' : lang === 'ku' ? '→ گەڕانەوە بۆ خزمەتەکان' : '→ Hizmetlere Dön'}</span>
                </button>
                {(() => {
                  const services = [
                    { name: lang === 'ar' ? 'التدريب الشخصي' : lang === 'ku' ? 'ڕاهێنانی تایبەتی' : 'Kişisel Antrenör', desc: lang === 'ar' ? 'برامج تدريب مخصصة حسب أهدافك' : lang === 'ku' ? 'بەرنامەی ڕاهێنانی تایبەتی' : 'Size özel antrenman programları', icon: <Activity className="w-6 h-6 text-white" />, detail: 'training' },
                    { name: lang === 'ar' ? 'المتجر' : lang === 'ku' ? 'دەڕگا' : 'Mağaza', desc: lang === 'ar' ? 'ملابس رياضية ومكملات عالية الجودة' : lang === 'ku' ? 'جلی وەرزشی و زیادکراوەی کوالیتی' : 'Spor giyim ve takviye ürünleri', icon: <ShoppingBag className="w-6 h-6 text-white" />, detail: 'store' },
                    { name: lang === 'ar' ? 'الاستشارات الغذائية' : lang === 'ku' ? 'ڕاوێژکاری خۆراکی' : 'Beslenme Danışmanlığı', desc: lang === 'ar' ? 'خطط غذائية متكاملة ومخصصة' : lang === 'ku' ? 'پلانی خۆراکی تەواو و تایبەتی' : 'Kişiselleştirilmiş beslenme planları', icon: <Apple className="w-6 h-6 text-white" />, detail: 'nutrition' },
                    { name: lang === 'ar' ? 'مواقف سيارات مجانية' : lang === 'ku' ? 'شوێنی وەستانی ئۆتۆمبێلی بێبەرامبەر' : 'Ücretsiz Otopark', desc: lang === 'ar' ? 'مواقف مجانية ومغطاة للسيارات' : lang === 'ku' ? 'شوێنی بەتاڵکردنی بەتاڵ بۆ ئۆتۆمبێل' : 'Kapalı ve ücretsiz otopark alanı', icon: <Car className="w-6 h-6 text-white" />, detail: 'parking' },
                    { name: lang === 'ar' ? 'صالة الأطفال' : lang === 'ku' ? 'شوێنی یاری منداڵان' : 'Çocuk Oyun Alanı', desc: lang === 'ar' ? 'منطقة آمنة ومجهزة للأطفال' : lang === 'ku' ? 'شوێنێکی سەلامەت و تەواو بۆ منداڵان' : 'Güvenli ve donanımlı çocuk alanı', icon: <Baby className="w-6 h-6 text-white" />, detail: 'kids' }
                  ];
                  const serv = services[activeServiceDetails];
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-brand-600 rounded-xl">
                          <span className="text-white">{serv.icon}</span>
                        </div>
                        <h3 className="font-display font-extrabold text-xl text-zinc-900">{serv.name}</h3>
                      </div>
                      {serv.detail === 'kids' ? (
                        <div className="space-y-4">
                          {/* Age Groups */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                              <span className="text-2xl block mb-2">👦</span>
                              <p className="font-bold text-sm text-zinc-900">{lang === 'ar' ? 'الأولاد' : lang === 'ku' ? 'كچەکان' : 'Erkek Çocuk'}</p>
                              <p className="text-xs text-zinc-500 mt-1">{lang === 'ar' ? 'من 3 إلى 9 سنوات' : lang === 'ku' ? 'لە 3 بۆ 9 ساڵ' : '3 ile 9 yaş arası'}</p>
                            </div>
                            <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 text-center">
                              <span className="text-2xl block mb-2">👧</span>
                              <p className="font-bold text-sm text-zinc-900">{lang === 'ar' ? 'البنات' : lang === 'ku' ? 'کچەکان' : 'Kız Çocuk'}</p>
                              <p className="text-xs text-zinc-500 mt-1">{lang === 'ar' ? 'من 3 إلى 10 سنوات' : lang === 'ku' ? 'لە 3 بۆ 10 ساڵ' : '3 ile 10 yaş arası'}</p>
                            </div>
                          </div>

                          {/* Attendance */}
                          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-brand-600" />
                              <p className="font-bold text-sm text-zinc-900">{lang === 'ar' ? 'الحضور' : lang === 'ku' ? 'هاتن' : 'Katılım'}</p>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed">
                              {lang === 'ar' ? 'إذا كان حضور الطفل بشكل بسيط أو للضرورة مرة أو مرتين بالشهر فلا توجد مشكلة.' : lang === 'ku' ? 'ئەگەر منداڵەکەت یەک یان دوو جار لە مانگدا بێت، هیچ کێشەیەک نییە.' : 'Çocuğunuz ayda bir veya iki kez basitçe katılıyorsa sorun yoktur.'}
                            </p>
                          </div>

                          {/* Subscription */}
                          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Check className="w-4 h-4 text-brand-600" />
                              <p className="font-bold text-sm text-zinc-900">{lang === 'ar' ? 'الاشتراك' : lang === 'ku' ? 'بەشداری' : 'Abonelik'}</p>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                              {lang === 'ar' ? 'أما الحضور اليومي فيتطلب اشتراكًا شهريًا للطفل بقيمة:' : lang === 'ku' ? 'بەڵام ئەگەر هەموو ڕۆژ بێت، پێویستە بەشداری مانگانە بۆ منداڵەکەت بکەیت:' : 'Ancak günlük katılım için aylık çocuk aboneliği gereklidir:'}
                            </p>
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-brand-600">10,000</span>
                              <span className="text-xs text-zinc-500 font-bold">{lang === 'ar' ? 'ألف دينار فقط' : lang === 'ku' ? 'هەزار دینار تەنها' : 'Bin Dinar'}</span>
                            </div>
                          </div>

                          {/* Note */}
                          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                            <Shield className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-red-600 font-bold leading-relaxed">
                              {lang === 'ar' ? 'يُمنع دخول الأطفال إلى داخل الصالة الرياضية.' : lang === 'ku' ? 'منداڵان نابێت بنەوەی هۆڵی وەرزشەکە.' : 'Çocukların spor salonu içine girmesi yasaktır.'}
                            </p>
                          </div>
                        </div>
                      ) : serv.detail === 'store' ? (
                        <div className="space-y-4">
                          {/* Intro */}
                          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
                            <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                              {lang === 'ar' ? 'كل ما تحتاجينه لرحلتك الرياضية في مكانٍ واحد، بجودة عالية ومنتجات مختارة بعناية لتمنحك تجربة رياضية متكاملة.' : lang === 'ku' ? 'هەموو ئەو شتانەی پێویستیت بۆ سەفەری وەرزشت هەیە لە شوێنێک، بە کوالیتی بەرز و بەرهەمەکان بە وردی هەلبژێڕدراون.' : 'Spor yolculuğunuz için ihtiyacınız olan her şey tek bir yerde, yüksek kalitede ve özenle seçilmiş ürünlerle.'}
                            </p>
                          </div>

                          {/* Sportswear */}
                          <div className="bg-white border-2 border-brand-600/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">👕</span>
                              <p className="font-bold text-sm text-brand-600">{lang === 'ar' ? 'الملابس الرياضية' : lang === 'ku' ? 'جلی وەرزشی' : 'Spor Giyim'}</p>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed">
                              {lang === 'ar' ? 'اكتشفي أحدث تشكيلة من الملابس الرياضية النسائية التي تجمع بين الأناقة، الراحة، والأداء العملي، لتشعري بالثقة في كل تمرين.' : lang === 'ku' ? 'باشترین جلی وەرزشی کچانە بە هەڵگرتنی جوانی، ئارامی و کاریگەری، بۆ ئەوەی لە هەموو وەرزشتدا متمانەت هەبێت.' : 'Kadın spor giyiminin en yeni koleksiyonunu keşfedin; şıklık, konfor ve pratik performansı bir arada sunar.'}
                            </p>
                          </div>

                          {/* Supplements */}
                          <div className="bg-white border-2 border-brand-600/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">💪</span>
                              <p className="font-bold text-sm text-brand-600">{lang === 'ar' ? 'المكملات الغذائية' : lang === 'ku' ? 'زیادکراوەی خۆراکی' : 'Beslenme Takviyeleri'}</p>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed">
                              {lang === 'ar' ? 'نوفر مجموعة متنوعة من المكملات الغذائية الأصلية لدعم أهدافك، سواء لبناء العضلات، تحسين الأداء، أو تعزيز التعافي بعد التمارين.' : lang === 'ku' ? 'جۆراوجۆر زیادکراوەی خۆراکی ڕاستەقینە بۆ پشتگیری ئامانجەکانت پێشکەش دەکەین، بۆ دروستکردنی ماسولکە، باشترکردنی کاریگەری یان چاککردنی جەستە.' : ' kas gelişimi, performans iyileştirme veya egzersiz sonrası toparlanma desteğinden, çeşitli orijinal beslenme takviyeleri sunuyoruz.'}
                            </p>
                          </div>

                          {/* Why Diva Gym Store */}
                          <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
                            <p className="font-bold text-sm text-zinc-900 mb-3">{lang === 'ar' ? 'لماذا متجر Diva Gym؟' : lang === 'ku' ? 'بۆچی دەڕگای دیڤا جیم؟' : 'Neden Diva Gym Mağazası?'}</p>
                            <div className="space-y-2">
                              {[
                                { emoji: '✨', text: lang === 'ar' ? 'منتجات أصلية وعالية الجودة.' : lang === 'ku' ? 'بەرهەمەکان ڕاستەقینە و بە کوالیتی.' : 'Orijinal ve yüksek kaliteli ürünler.' },
                                { emoji: '👕', text: lang === 'ar' ? 'أحدث الملابس والإكسسوارات الرياضية.' : lang === 'ku' ? 'باشترین جل و ئاکسسواری وەرزشی.' : 'En yeni spor giyim ve aksesuarlar.' },
                                { emoji: '💪', text: lang === 'ar' ? 'مكملات غذائية من علامات تجارية موثوقة.' : lang === 'ku' ? 'زیادکراوەی خۆراکی لە مارکە بەرسوودەرەکان.' : 'Güvenilir markalardan beslenme takviyeleri.' },
                                { emoji: '💖', text: lang === 'ar' ? 'كل ما تحتاجينه في مكان واحد لتكملي رحلتك الرياضية بكل راحة وثقة.' : lang === 'ku' ? 'هەموو ئەو شتانەی پێویستیت بۆ لە شوێنێک بۆ تەواوکردنی سەفەری وەرزشت بە ئارامی و متمانە.' : 'Spor yolculuğunuzu tamamlamak için ihtiyacınız olan her şey tek bir yerde.' }
                              ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="text-sm shrink-0">{item.emoji}</span>
                                  <p className="text-xs text-zinc-600 leading-relaxed">{item.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : serv.detail === 'training' ? (
                        <div className="space-y-4">
                          {/* Main Text */}
                          <div className="bg-white border-2 border-brand-600/20 rounded-xl p-4">
                            <p className="text-sm text-zinc-600 leading-relaxed">
                              {lang === 'ar' ? 'احققي أفضل النتائج مع برنامج التدريب الشخصي المصمم خصيصًا لكِ، والذي يتضمن قياس InBody بشكل أسبوعي لتحليل نسبة الدهون، الكتلة العضلية، والمياه بدقة عالية، ومتابعة تقدمك خطوة بخطوة لبناء خطة تدريب وتغذية تناسب أهدافك.' : lang === 'ku' ? 'باشترین ئەنجامەکان بە بەرنامەی ڕاهێنانی تایبەتی بە تایبەتی بۆ تۆ دروستکراوە، کە پێوانی InBody ەفتانە بۆ تێکڕابوونی چەوری، ماسولکە و ئاو تێدایە بە وردی بەرز، و شوێنی پێشکەوتنەکەت قەدم بە قەدم دەکەین بۆ دروستکردنی بەرنامەی وەرزش و خۆراکی گونجاو بۆ ئامانجەکانت.' : 'Kişiselleştirilmiş antrenman programıyla en iyi sonuçları elde edin; haftalık InBody ölçümü ile yağ oranı, kas kütlesi ve su oranını hassasiyetle analiz ediyor, adım adım takip ederek hedeflerinize uygun antrenman ve beslenme planı oluşturuyoruz.'}
                            </p>
                          </div>

                          {/* Features */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 text-center">
                              <span className="text-xl block mb-1">📊</span>
                              <p className="text-[10px] font-bold text-zinc-900">{lang === 'ar' ? 'قياس InBody أسبوعي' : lang === 'ku' ? 'پێوانی InBody ەفتانە' : 'Haftalık InBody'}</p>
                            </div>
                            <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 text-center">
                              <span className="text-xl block mb-1">📈</span>
                              <p className="text-[10px] font-bold text-zinc-900">{lang === 'ar' ? 'متابعة التقدم' : lang === 'ku' ? 'شوێنی پێشکەوتن' : 'İlerleme Takibi'}</p>
                            </div>
                            <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 text-center">
                              <span className="text-xl block mb-1">🏋️</span>
                              <p className="text-[10px] font-bold text-zinc-900">{lang === 'ar' ? 'خطة تدريب مخصصة' : lang === 'ku' ? 'بەرنامەی ڕاهێنانی تایبەتی' : 'Kişisel Program'}</p>
                            </div>
                            <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 text-center">
                              <span className="text-xl block mb-1">🍎</span>
                              <p className="text-[10px] font-bold text-zinc-900">{lang === 'ar' ? 'خطة غذائية' : lang === 'ku' ? 'پلانی خۆراکی' : 'Beslenme Planı'}</p>
                            </div>
                          </div>
                        </div>
                      ) : serv.detail === 'parking' ? (
                        <div className="space-y-4">
                          {/* Intro Banner */}
                          <div className="bg-zinc-900 rounded-xl p-5 text-center">
                            <p className="text-base font-bold text-white leading-relaxed">
                              {lang === 'ar' ? 'راحتك تبدأ قبل أول تمرين.' : lang === 'ku' ? 'ئارامیت پێش یەکەم وەرزشت دەست دەکات.' : 'Rahatlığınız ilk antrenmanınızdan önce başlar.'}
                            </p>
                          </div>

                          {/* Main Text */}
                          <div className="bg-white border-2 border-brand-600/20 rounded-xl p-4">
                            <p className="text-sm text-zinc-600 leading-relaxed">
                              {lang === 'ar' ? 'نوفر كراجاً مجانياً وآمناً لعضوات Diva Gym، لتستمتعي بتجربة مريحة منذ لحظة وصولك، دون عناء البحث عن موقف.' : lang === 'ku' ? 'گاراژێکی بەتاڵ و سەلامەت بۆ ئەندامانی دیڤا جیم دابین دەکەین، بۆ ئەوەی لە کاتی گەیشتنتەوە ئارامیت بێت بێ هیچ کێشەیەک.' : 'Diva Gym üyelerine ücretsiz ve güvenli bir garaj sunuyoruz, böylece varış anınızdan itibaren park yeri arama derdi olmadan konforlu bir deneyim yaşarsınız.'}
                            </p>
                          </div>

                          {/* Highlight */}
                          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3">
                            <span className="text-lg shrink-0">✨</span>
                            <p className="text-xs text-zinc-700 font-bold leading-relaxed">
                              {lang === 'ar' ? 'كل التفاصيل صُممت لتمنحك تجربة راقية تستحقينها.' : lang === 'ku' ? 'هەموو وردەکان بۆ ئەوەی دروستکراون ئەوەی ئەزرەکەت بۆ هەیە پێشکەش دەکەین.' : 'Tüm detaylar, hak ettiğiniz üstün bir deneyim sunmak için tasarlandı.'}
                            </p>
                          </div>
                        </div>
                      ) : serv.detail === 'nutrition' ? (
                        <div className="space-y-4">
                          {/* Intro Banner */}
                          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                            <span className="text-3xl block mb-3">🌿</span>
                            <p className="text-base font-bold text-zinc-900 leading-relaxed">
                              {lang === 'ar' ? 'رحلتك تبدأ من التغذية.' : lang === 'ku' ? 'سەفەرەکەت لە خۆراکەکەوە دەست دەکات.' : 'Yolculuğunuz beslenme ile başlar.'}
                            </p>
                          </div>

                          {/* Main Text */}
                          <div className="bg-white border-2 border-brand-600/20 rounded-xl p-4">
                            <p className="text-sm text-zinc-600 leading-relaxed">
                              {lang === 'ar' ? 'نساعدك على تحقيق أهدافك بخطط غذائية متوازنة ومدروسة، مصممة لتتناسب مع نمط حياتك واحتياجاتك الرياضية.' : lang === 'ku' ? 'بە پلانی خۆراکی کۆی و لێکۆڵاوەتەوە بەرامبەر ئامانجەکانت یارمەتیت دەدەین، کە بەگوێربەی ژیان و پێویستی وەرزشتەوە دروستکراون.' : 'Hedeflerinize ulaşmanıza dengeli ve planlı beslenme programlarıyla yardımcı oluyoruz.'}
                            </p>
                          </div>

                          {/* Highlight */}
                          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3">
                            <span className="text-lg shrink-0">💡</span>
                            <p className="text-xs text-zinc-700 font-bold leading-relaxed">
                              {lang === 'ar' ? 'لأن النتائج الحقيقية تبدأ من المطبخ، وتكتمل داخل النادي.' : lang === 'ku' ? 'چونکە ئەنجامە ڕاستەقینەکان لە چێکەخانەوە دەست دەکەن و تەواو دەبن لە ناو هۆڵەکە.' : 'Çünkü gerçek sonuçlar mutfakta başlar ve spor salonunda tamamlanır.'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-zinc-50 rounded-xl p-4 text-sm text-zinc-600 leading-relaxed border border-zinc-100">
                          {serv.detail}
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              /* Grid layout */
              <motion.div 
                key="service-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[
                  { name: lang === 'ar' ? 'التدريب الشخصي' : lang === 'ku' ? 'ڕاهێنانی تایبەتی' : 'Kişisel Antrenör', desc: lang === 'ar' ? 'برامج تدريب مخصصة حسب أهدافك' : lang === 'ku' ? 'بەرنامەی ڕاهێنانی تایبەتی' : 'Size özel antrenman programları', icon: <Activity className="w-6 h-6 text-white" /> },
                  { name: lang === 'ar' ? 'المتجر' : lang === 'ku' ? 'دەڕگا' : 'Mağaza', desc: lang === 'ar' ? 'ملابس رياضية ومكملات عالية الجودة' : lang === 'ku' ? 'جلی وەرزشی و زیادکراوەی کوالیتی' : 'Spor giyim ve takviye ürünleri', icon: <ShoppingBag className="w-6 h-6 text-white" /> },
                  { name: lang === 'ar' ? 'الاستشارات الغذائية' : lang === 'ku' ? 'ڕاوێژکاری خۆراکی' : 'Beslenme Danışmanlığı', desc: lang === 'ar' ? 'خطط غذائية متكاملة ومخصصة' : lang === 'ku' ? 'پلانی خۆراکی تەواو و تایبەتی' : 'Kişiselleştirilmiş beslenme planları', icon: <Apple className="w-6 h-6 text-white" /> },
                  { name: lang === 'ar' ? 'مواقف سيارات مجانية' : lang === 'ku' ? 'شوێنی وەستانی ئۆتۆمبێلی بێبەرامبەر' : 'Ücretsiz Otopark', desc: lang === 'ar' ? 'مواقف مجانية ومغطاة للسيارات' : lang === 'ku' ? 'شوێنی بەتاڵکردنی بەتاڵ بۆ ئۆتۆمبێل' : 'Kapalı ve ücretsiz otopark alanı', icon: <Car className="w-6 h-6 text-white" /> },
                  { name: lang === 'ar' ? 'صالة الأطفال' : lang === 'ku' ? 'شوێنی یاری منداڵان' : 'Çocuk Oyun Alanı', desc: lang === 'ar' ? 'منطقة آمنة ومجهزة للأطفال' : lang === 'ku' ? 'شوێنێکی سەلامەت و تەواو بۆ منداڵان' : 'Güvenli ve donanımlı çocuk alanı', icon: <Baby className="w-6 h-6 text-white" /> }
                ].map((serv, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-brand-600/10 transition-all border-2 border-brand-600/30 cursor-pointer"
                    onClick={() => setActiveServiceDetails(index)}
                    id={`service-card-${index}`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-brand-600 rounded-xl">
                        <span className="text-white">{serv.icon}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-extrabold text-base text-zinc-900">
                      {serv.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      {serv.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
            </AnimatePresence>

          </motion.div>
        )}

        {/* --- SECTION: ABOUT --- */}
        {activeTab === 'about' && (
          <motion.div 
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-16" id="section-about"
          >
            
            {/* Story Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {t.aboutStoryTitle}
                </h2>
                <p className="text-sm text-zinc-800 leading-relaxed">
                  {t.aboutStoryText1}
                </p>
                <p className="text-sm text-zinc-800 leading-relaxed">
                  {t.aboutStoryText2}
                </p>

                <div className="p-5 rounded-2xl bg-white border-2 border-brand-600/30 shadow-sm">
                  <h4 className="font-display font-bold text-sm text-zinc-900 mb-2">🏆 {t.aboutVisionTitle}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{t.aboutVisionText}</p>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
                <img
                  src={img('/preview.png')}
                  alt="Diva Gym fitness atmosphere"
                  className="w-full h-full object-cover"
                  id="about-image-display"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-gold-400">{lang === 'ar' ? 'رسالتنا للمرأة' : lang === 'ku' ? 'پەیاممان بۆ خانمان' : 'Kadınların Gücü'}</span>
                    <h3 className="font-display font-bold text-lg">{lang === 'ar' ? 'قوتكِ، ثقتكِ، وصحتكِ أولويتنا.' : lang === 'ku' ? 'هێز و متمانەت هۆکاری سەرکەوتنمانە.' : 'Güçlü Kadınlar, Mutlu Yarınlar.'}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Meet Certified Trainers Section */}
            <div className="space-y-8 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="font-display text-2xl font-extrabold tracking-tight">{t.aboutTrainersTitle}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.aboutTrainersSubtitle}</p>
              </div>

              {/* 3 Trainers Showcase with consult actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Trainer 1 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-brand-600/30 flex flex-col">
                  <div className="aspect-[4/3] relative bg-zinc-100">
                    <img
                      src="https://picsum.photos/seed/coach_yasmin/400/500"
                      alt="Head Coach Yasmin"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-3 flex-grow flex flex-col justify-between space-y-2 text-center">
                    <div>
                      <h4 className="font-display font-bold text-xs text-zinc-900">{lang === 'ar' ? 'كابتن فرح' : lang === 'ku' ? 'کابتن فرح' : 'Farah'}</h4>
                      <p className="text-[9px] text-brand-600 font-bold uppercase mt-0.5">{t.trainer1Specialty}</p>
                      <p className="text-[10px] text-zinc-500 mt-1.5 leading-relaxed">
                        {t.trainerBio} {lang === 'ar' ? 'مختصة في تصميم برامج تضخيم وحرق الدهون المكثفة بذكاء.' : lang === 'ku' ? 'شارەزا لە داڕشتنی بەرنامەی قورس و سووتاندن.' : 'Güç antrenmanları ve yağ yakımı seanslarında uzman.'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleTrainerConsult(lang === 'ar' ? 'فرح' : lang === 'ku' ? 'فرح' : 'Farah', t.trainer1Specialty)}
                      className="w-full py-1.5 rounded-full border-2 border-brand-600/30 text-brand-600 hover:bg-brand-600 hover:text-white text-[10px] font-bold transition-all"
                    >
                      {lang === 'ar' ? 'استشارة المدربة فرح' : lang === 'ku' ? 'ڕاوێژ لەگەڵ فرح' : 'Farah ile Danış'}
                    </button>
                  </div>
                </div>

                {/* Trainer 2 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-brand-600/30 flex flex-col">
                  <div className="aspect-[4/3] relative bg-zinc-100">
                    <img
                      src="https://picsum.photos/seed/coach_lara/400/500"
                      alt="Yoga Trainer Lara"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-3 flex-grow flex flex-col justify-between space-y-2 text-center">
                    <div>
                      <h4 className="font-display font-bold text-xs text-zinc-900">{lang === 'ar' ? 'كابتن بسمة' : lang === 'ku' ? 'کابتن بەسمە' : 'Basma'}</h4>
                      <p className="text-[9px] text-brand-600 font-bold uppercase mt-0.5">{t.trainer2Specialty}</p>
                      <p className="text-[10px] text-zinc-500 mt-1.5 leading-relaxed">
                        {t.trainerBio} {lang === 'ar' ? 'مختصة في اليوغا، البيلاتس العلاجي، تحسين المرونة وتقليل التوتر العصبي.' : lang === 'ku' ? 'پسپۆڕ لە مێدیتەیشن، یۆگا و چاککردنی بڕبڕەی پشت.' : 'Yoga ve pilates terapilerinde derinlemesine uzmanlığa sahip.'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleTrainerConsult(lang === 'ar' ? 'بسمة' : lang === 'ku' ? 'بەسمە' : 'Basma', t.trainer2Specialty)}
                      className="w-full py-1.5 rounded-full border-2 border-brand-600/30 text-brand-600 hover:bg-brand-600 hover:text-white text-[10px] font-bold transition-all"
                    >
                      {lang === 'ar' ? 'استشارة المدربة بسمة' : lang === 'ku' ? 'ڕاوێژ لەگەڵ بەسمە' : 'Basma ile Danış'}
                    </button>
                  </div>
                </div>

                {/* Trainer 3 */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-brand-600/30 flex flex-col">
                  <div className="aspect-[4/3] relative bg-zinc-100">
                    <img
                      src="https://picsum.photos/seed/coach_ronahi/400/500"
                      alt="Nutrition Trainer Ronahi"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-3 flex-grow flex flex-col justify-between space-y-2 text-center">
                    <div>
                      <h4 className="font-display font-bold text-xs text-zinc-900">{lang === 'ar' ? 'كابتن روناهي مراد' : lang === 'ku' ? 'کابتن ڕۆناهی موراد' : 'Ronahi Murad'}</h4>
                      <p className="text-[9px] text-brand-600 font-bold uppercase mt-0.5">{t.trainer3Specialty}</p>
                      <p className="text-[10px] text-zinc-500 mt-1.5 leading-relaxed">
                        {t.trainerBio} {lang === 'ar' ? 'مختصة في التغذية وصياغة برامج التوازن الهرموني والتنشيف لجميع الأعمار.' : lang === 'ku' ? 'ڕێکخستنی سیستەمی خۆراکی تەندروست بۆ هۆرمۆن و جەستە.' : 'Diyetisyenlik ve hormonal dengeye uyumlu beslenme uzmanı.'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleTrainerConsult(lang === 'ar' ? 'روناهي مراد' : lang === 'ku' ? 'ڕۆناهی' : 'Ronahi Murad', t.trainer3Specialty)}
                      className="w-full py-1.5 rounded-full border-2 border-brand-600/30 text-brand-600 hover:bg-brand-600 hover:text-white text-[10px] font-bold transition-all"
                    >
                      {lang === 'ar' ? 'استشارة المدربة روناهي' : lang === 'ku' ? 'ڕاوێژ لەگەڵ ڕۆناهی' : 'Ronahi ile Danış'}
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        )}

        {/* --- SECTION: CONTACT FORM & ADMIN INBOX --- */}
        {activeTab === 'contact' && (
          <motion.div 
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12" id="section-contact"
          >
            
            {/* Title */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {t.contactTitle}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t.contactSubtitle}
              </p>
            </div>

            {/* Contact Form */}
              <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-sm border-2 border-brand-600/30">
                
                {/* Success Banner */}
                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-start space-x-2 rtl:space-x-reverse">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{lang === 'ar' ? 'نجاح!' : lang === 'ku' ? 'سەرکەوتوو بوو!' : 'Başarılı!'}</p>
                      <p className="mt-1 leading-relaxed">{t.contactSuccessMsg}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-500 mb-1.5">
                        {t.contactFieldName} <span className="text-brand-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={t.contactPlaceholderName}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-brand-600/30 bg-white focus:border-brand-600 text-zinc-900 placeholder-zinc-400 text-sm transition-all outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-500 mb-1.5">
                        {t.contactFieldPhone} <span className="text-brand-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder={t.contactPlaceholderPhone}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-brand-600/30 bg-white focus:border-brand-600 text-zinc-900 placeholder-zinc-400 text-sm transition-all outline-none animate-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-1.5">
                      {t.contactFieldMessage}
                    </label>
                    <textarea
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={t.contactPlaceholderMessage}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-brand-600/30 bg-white focus:border-brand-600 text-zinc-900 placeholder-zinc-400 text-sm transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full border-2 border-brand-600/30 text-brand-600 font-bold text-sm hover:bg-brand-600 hover:text-white flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 transition-all duration-200"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                        <span>{t.contactBtnSubmitting}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contactBtnSubmit}</span>
                      </>
                    )}
                  </button>
                </form>

              </div>

          </motion.div>
        )}

        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-white text-zinc-500 py-12 px-4 border-t-2 border-brand-600 mt-16" id="diva-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={img('/icon.png')} alt="Diva Gym" className="w-10 h-10 object-contain" />
              <span className="font-display text-xl font-bold tracking-tight text-brand-600">{lang === 'ar' ? 'ديڤا جيم' : lang === 'ku' ? 'دیڤا جیم' : 'Diva Gym'}</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              {lang === 'ar' 
                ? 'نادي ديڤا جيم هو النادي النسائي الأول لتقديم رعاية لياقة وبدنية متطورة ومجتمع داعم يلهم كل امرأة للتميز وتحقيق أهدافها بأمان مطلق.'
                : lang === 'ku'
                  ? 'هۆڵی دیڤا جیم باشترین شوێنی وەرزشی کچان و ژنانە بۆ گەیشتن بە باشترین ئاستی توانای جەستەیی.'
                  : 'Diva Gym, kadınlara özel, lüks ve konfor dolu bir ortamda profesyonel spor ve sağlıklı yaşam desteği sunar.'}
            </p>
          </div>

          {/* Links Quick navigations */}
          <div>
            <h4 className="text-brand-600 text-xs font-bold uppercase tracking-wider mb-4">{lang === 'ar' ? 'أقسام الموقع' : lang === 'ku' ? 'بەشەکان' : 'Hızlı Menü'}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo(0,0); }} className="text-zinc-500 hover:text-brand-600 transition-colors">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('offers'); window.scrollTo(0,0); }} className="text-zinc-500 hover:text-brand-600 transition-colors">
                  {t.navOffers}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('hours'); window.scrollTo(0,0); }} className="text-zinc-500 hover:text-brand-600 transition-colors">
                  {t.navHours}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('services'); window.scrollTo(0,0); }} className="text-zinc-500 hover:text-brand-600 transition-colors">
                  {t.navServices}
                </button>
              </li>
            </ul>
          </div>

          {/* Location and address */}
          <div>
            <h4 className="text-brand-600 text-xs font-bold uppercase tracking-wider mb-4">{lang === 'ar' ? 'العنوان' : lang === 'ku' ? 'ناونیشان' : 'Adres'}</h4>
            <div className="space-y-2 text-xs text-zinc-500">
              <div className="flex items-start">
                <span className="leading-relaxed">
                  {lang === 'ar' ? 'كركوك، طريق بغداد' : lang === 'ku' ? 'کەرکووک، شەقامی بەغداد' : 'Kerkük, Bağdat Yolu'}
                </span>
              </div>
              <div className="flex items-start">
                <span className="leading-relaxed">
                  {lang === 'ar' ? 'مقابل حلويات بيت الشكرجي' : lang === 'ku' ? 'بەرامبەر شیرینی خانی شکرجی' : 'Şikarji Pastanesi Karşısı'}
                </span>
              </div>
              <div className="flex items-start">
                <span className="leading-relaxed">
                  {lang === 'ar' ? 'مجمع الهرم، الطابق الثاني' : lang === 'ku' ? 'مەجموعەی هێرم، ناوەندی ٢' : 'Hiram AVM, 2. Kat'}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <a href="https://www.instagram.com/divagymkr/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-zinc-200 mt-12 pt-6 text-center text-[10px] text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Diva Gym. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : lang === 'ku' ? 'هەموو مافەکان پارێزراون.' : 'Tüm hakları saklıdır.'}</p>
          <p>{lang === 'ar' ? 'مصمم بكل حب لتمكين المرأة وصحتها.' : lang === 'ku' ? 'بە خۆشەویستییەوە دیزاین کراوە بۆ خانمان.' : 'Kadınların gücünü ve sağlığını desteklemek için sevgiyle tasarlanmıştır.'}</p>
        </div>
      </footer>

    </div>
  );
}
