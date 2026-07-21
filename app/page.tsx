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
  Sun,
  Moon,
  Menu,
  X,
  Trash2,
  CheckCircle2,
  UserCheck,
  MessageCircle,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { translations, Language } from '@/lib/translations';

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
      ar: 'اشتراك نصف شهر',
      ku: 'بەشداری نیوەی مانگ',
      tr: 'Yarım Aylık Üyelik'
    },
    details: {
      ar: '15 يوم متتالي',
      ku: '١٥ ڕۆژی لەسەریەک',
      tr: 'Arka arkaya 15 gün kullanım'
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
      ar: 'الاشتراك الشهري',
      ku: 'بەشداری مانگانە',
      tr: 'Aylık Standart Üyelik'
    },
    details: {
      ar: 'شهر كامل',
      ku: 'یەک مانگی تەواو',
      tr: '1 tam ay boyunca kullanım'
    },
    price: '50,000',
    priceVal: 50000,
    features: {
      ar: ['دخول غير محدود طوال الشهر للصالة', 'حضور الحصص الجماعية (اليوغا، الزومبا...)', 'تحليل تركيب الجسم بجهاز InBody'],
      ku: ['چوونەژوورەوەی بێ سنوور بە درێژایی مانگ', 'بەشداری لە وانە بەکۆمەڵەکان (یۆگا، زومبا)', 'پشکنینی پێکهاتەی جەستە بە ئامێری InBody'],
      tr: ['Ay boyunca sınırsız salon erişimi', 'Tüm grup derslerine (Yoga, Zumba) katılım', 'InBody cihazı ile detaylı vücut analizi']
    },
    popular: true
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
    price: '130,000',
    priceVal: 130000,
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
      ar: 'لكل مشتركة',
      ku: 'بۆ هەر بەشداربوویەک',
      tr: 'Kişi başı indirimli fiyat'
    },
    price: '40,000',
    priceVal: 40000,
    features: {
      ar: ['خصم خاص عند التسجيل المشترك مع صديقاتكِ', 'دخول كامل ومستمر لجميع الأجهزة والصفوف', 'مشاركة متعة اللياقة والتحفيز المتبادل'],
      ku: ['داشکاندنی تایبەت لەکاتی خۆتۆمارکردن لەگەڵ هاوڕێکانت', 'چوونەژوورەوەی تەواو بۆ ئامێر و وانەکان', 'بەشکردنی چێژی وەرزشکردن پێکەوە'],
      tr: ['Arkadaşlarınızla birlikte kayıtta özel fiyat', 'Tüm ekipman ve grup derslerine sınırsız erişim', 'Grup motivasyonu ile eğlenceli fitness deneyimi']
    }
  },
  {
    id: 'family',
    name: {
      ar: 'عرض العائلات',
      ku: 'پێشنیاری خێزانی',
      tr: 'Aile Paketi Fırsatı'
    },
    details: {
      ar: 'لكل مشتركة',
      ku: 'بۆ هەر ئەندامێکی خێزان',
      tr: 'Aile bireylerine özel kişi başı fiyat'
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

  // Contact Form States
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<Submission[]>([]);

  // Load saved configurations on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('diva-gym-theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(savedTheme);
      }
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

  // Save theme to localStorage and set HTML class
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('diva-gym-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

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
      className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-800'}`} 
      dir={t.dir}
      id="diva-app-root"
    >


      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer rtl:space-x-reverse" 
            onClick={() => setActiveTab('home')}
            id="header-logo-container"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-gold-400 flex items-center justify-center text-white shadow-md shadow-brand-500/10">
              <Dumbbell className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-brand-600 via-brand-500 to-gold-500 bg-clip-text text-transparent">
                Diva Gym
              </span>
              <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold leading-none mt-0.5">
                {lang === 'ar' ? 'للنساء فقط' : lang === 'ku' ? 'تەنها بۆ خانمان' : 'WOMEN ONLY'}
              </p>
            </div>
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
                }}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === link.id
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Controls: Theme, Language, Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse" id="controls-panel">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Theme"
              id="theme-toggle-btn"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Language Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-brand-300 dark:hover:border-brand-800 bg-white dark:bg-zinc-800 text-xs font-semibold transition-colors">
                <span>🌐 {lang === 'ar' ? 'العربية' : lang === 'ku' ? 'کوردی' : 'Türkçe'}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-32 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-1">
                  <button
                    onClick={() => setLang('ar')}
                    className={`w-full text-right rtl:text-right px-3 py-2 rounded-lg text-xs font-medium hover:bg-brand-50 dark:hover:bg-brand-950/20 hover:text-brand-700 dark:hover:text-brand-300 ${lang === 'ar' ? 'bg-brand-50/70 dark:bg-brand-950/30 text-brand-600' : ''}`}
                  >
                    العربية (AR)
                  </button>
                  <button
                    onClick={() => setLang('ku')}
                    className={`w-full text-right rtl:text-right px-3 py-2 rounded-lg text-xs font-medium hover:bg-brand-50 dark:hover:bg-brand-950/20 hover:text-brand-700 dark:hover:text-brand-300 ${lang === 'ku' ? 'bg-brand-50/70 dark:bg-brand-950/30 text-brand-600' : ''}`}
                  >
                    کوردی (KU)
                  </button>
                  <button
                    onClick={() => setLang('tr')}
                    className={`w-full text-left rtl:text-left px-3 py-2 rounded-lg text-xs font-medium hover:bg-brand-50 dark:hover:bg-brand-950/20 hover:text-brand-700 dark:hover:text-brand-300 ${lang === 'tr' ? 'bg-brand-50/70 dark:bg-brand-950/30 text-brand-600' : ''}`}
                  >
                    Türkçe (TR)
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800"
            id="mobile-nav-drawer"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
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
                  }}
                  className={`w-full text-right rtl:text-right px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    activeTab === link.id
                      ? 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-200'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
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
        
        {/* --- SECTION: HOME --- */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in" id="section-home">
            
            {/* Split Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Area */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/60 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                  <Sparkles className="w-4.5 h-4.5 text-gold-500 animate-pulse" />
                  <span>{t.heroSubtitle}</span>
                </div>
                
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  {lang === 'ar' ? (
                    <>
                      اصنعي قوتكِ في <span className="text-brand-600 dark:text-brand-400">ديڤا جيم</span>
                    </>
                  ) : lang === 'ku' ? (
                    <>
                      هێزی خۆت دروستبکە لە <span className="text-brand-600 dark:text-brand-400">دیڤا جیم</span>
                    </>
                  ) : (
                    <>
                      Kendi Gücünü <span className="text-brand-600 dark:text-brand-400">Diva Gym</span> ile Keşfet
                    </>
                  )}
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                  {t.heroTagline}
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
                    onClick={() => setActiveTab('contact')}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-gold-500 text-white font-semibold text-center hover:shadow-lg hover:shadow-brand-500/20 active:scale-98 transition-all duration-200"
                    id="hero-contact-btn"
                  >
                    {t.navContact}
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="px-8 py-4 rounded-full border-2 border-zinc-200 dark:border-zinc-800 hover:border-brand-300 dark:hover:border-brand-800 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 font-semibold text-center flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all duration-200"
                    id="hero-services-btn"
                  >
                    <Dumbbell className="w-4 h-4 text-brand-500" />
                    <span>{t.navServices}</span>
                  </button>
                </div>

                {/* Micro social proofs */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-200/60 dark:border-zinc-800/60 max-w-lg">
                  <div>
                    <span className="font-display text-2xl font-black text-brand-600 dark:text-brand-400">1200+</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{lang === 'ar' ? 'عضو نشط' : lang === 'ku' ? 'ئەندامی چالاک' : 'Aktif Üye'}</p>
                  </div>
                  <div>
                    <span className="font-display text-2xl font-black text-brand-600 dark:text-brand-400">100%</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{lang === 'ar' ? 'خصوصية وأمان' : lang === 'ku' ? 'نهێنی و سەلامەتی' : 'Mahremiyet'}</p>
                  </div>
                  <div>
                    <span className="font-display text-2xl font-black text-brand-600 dark:text-brand-400">15+</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{lang === 'ar' ? 'مدربة معتمدة' : lang === 'ku' ? 'ڕاهێنەری باوەڕپێکراو' : 'Kadın Antrenör'}</p>
                  </div>
                </div>
              </div>

              {/* Image Area */}
              <div className="lg:col-span-5 relative">
                <div className="relative z-10 w-full aspect-[4/3] sm:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-900 shadow-brand-900/10 dark:shadow-black/50">
                  <img
                    src="/images/gym_interior_hero.jpg"
                    alt="Luxury Diva Gym Interior"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    id="hero-image-display"
                  />
                  
                  {/* Subtle Gold/Pink Ambient Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Absolute Badge on Gym Interior */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-sm font-bold">{t.heroTitle}</h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{lang === 'ar' ? 'صالة الألعاب الرياضية الفاخرة المعتمدة' : lang === 'ku' ? 'هۆڵی وەرزشی شاهانەی باوەڕپێکراو' : 'Premium Kadın Sağlık Kulübü'}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gold-100 text-gold-800 font-bold">5 ★★★★★</span>
                  </div>
                </div>
                
                {/* Decorative backgrounds */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-200 dark:bg-brand-900/30 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-200 dark:bg-gold-900/20 rounded-full blur-3xl -z-10" />
              </div>
            </div>

            {/* Working Hours Card - Always visible on home */}
            <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-brand-600 dark:text-brand-400 mb-4">
                <Clock className="w-5 h-5" />
                <h3 className="font-display font-bold text-base">{lang === 'ar' ? 'ساعات العمل' : lang === 'ku' ? 'کاتی کار' : 'Çalışma Saatleri'}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between items-center py-2 px-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg">
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{lang === 'ar' ? 'طوال الأسبوع' : lang === 'ku' ? 'هەموو ڕۆژەکان' : 'Hafta İçi'}</span>
                  <span className="text-sm font-semibold">09:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg">
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{lang === 'ar' ? 'السبت' : lang === 'ku' ? 'شەممە' : 'Cumartesi'}</span>
                  <span className="text-sm font-semibold">14:00 - 15:00</span>
                </div>
              </div>
            </div>

            {/* Feature Three-Column Grid */}
            <div className="py-8 border-t border-b border-zinc-200/60 dark:border-zinc-800/60">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: t.heroFeature1Title,
                    desc: t.heroFeature1Desc,
                    icon: <Shield className="w-6 h-6 text-brand-600" />
                  },
                  {
                    title: t.heroFeature2Title,
                    desc: t.heroFeature2Desc,
                    icon: <Award className="w-6 h-6 text-brand-600" />
                  },
                  {
                    title: t.heroFeature3Title,
                    desc: t.heroFeature3Desc,
                    icon: <Sparkles className="w-6 h-6 text-brand-600" />
                  }
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-4 rtl:space-x-reverse" id={`hero-feature-card-${idx}`}>
                    <div className="p-3 bg-brand-50 dark:bg-brand-950/40 rounded-xl">
                      {feat.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base">{feat.title}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- SECTION: OFFERS & SUBSCRIPTIONS --- */}
        {activeTab === 'offers' && (
          <div className="space-y-12 animate-fade-in" id="section-offers">
            
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
                const isPopular = offer.id === 'monthly';
                const isSpecial = offer.id === 'family' || offer.id === 'friends' || offer.id === 'three_months';
                return (
                  <div 
                    key={offer.id}
                    className={`flex flex-col rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-sm hover:shadow-md transition-all duration-300 relative ${
                      isPopular 
                        ? 'border-2 border-brand-500 scale-[1.01] shadow-md hover:shadow-brand-500/5' 
                        : isSpecial
                          ? 'border border-gold-300 dark:border-gold-800'
                          : 'border border-zinc-200/60 dark:border-zinc-800/60'
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

                    <div className="mb-6">
                      <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">{offer.name[lang]}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{offer.details[lang]}</p>
                    </div>

                    <div className="mb-6 flex items-baseline">
                      <span className={`text-3xl font-black tracking-tight ${
                        isPopular 
                          ? 'bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent' 
                          : isSpecial
                            ? 'text-gold-600 dark:text-gold-400'
                            : 'text-brand-600 dark:text-brand-400'
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

                    <ul className="space-y-3 mb-8 flex-grow text-xs text-zinc-600 dark:text-zinc-300">
                      {offer.features[lang].map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className={`w-4 h-4 shrink-0 mr-1.5 ml-1.5 mt-0.5 ${
                            isPopular ? 'text-brand-500' : isSpecial ? 'text-gold-500' : 'text-brand-500'
                          }`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        setFormMessage(lang === 'ar' 
                          ? `أود الاستفسار والتسجيل في باقة: ${offer.name[lang]}.` 
                          : lang === 'ku' 
                            ? `دەمەوێت دەربارەی باقەی ${offer.name[lang]} بپرسم و خۆم تۆمار بکەم.` 
                            : `${offer.name[lang]} hakkında bilgi almak ve kayıt olmak istiyorum.`
                        );
                        setActiveTab('contact');
                      }}
                      className={`w-full py-2.5 rounded-full font-semibold text-center text-xs transition-all ${
                        isPopular 
                          ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-sm hover:shadow-md hover:shadow-brand-500/10' 
                          : isSpecial
                            ? 'border border-gold-400 dark:border-gold-700 text-gold-700 dark:text-gold-400 hover:bg-gold-50/50 dark:hover:bg-gold-950/20'
                            : 'border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400'
                      }`}
                    >
                      {t.subSelectPlan}
                    </button>
                  </div>
                );
              })}
            </div>



          </div>
        )}

        {/* --- SECTION: WORKING HOURS --- */}
        {activeTab === 'hours' && (
          <div className="space-y-12 animate-fade-in" id="section-hours">
            
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Working Hours Card */}
              <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-brand-600 dark:text-brand-400">
                  <Clock className="w-6 h-6" />
                  <h3 className="font-display font-bold text-lg">{lang === 'ar' ? 'الأوقات الأسبوعية' : lang === 'ku' ? 'کاتەکانی هەفتە' : 'Haftalık Mesai Saatleri'}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{t.hoursWeekdays}</span>
                    <span className="text-sm font-semibold">{lang === 'ar' ? '09:00 صباحاً - 10:00 مساءً' : lang === 'ku' ? '09:00 بەیانی - 10:00 شەو' : '09:00 - 22:00'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{t.hoursSaturday}</span>
                    <span className="text-sm font-semibold">{lang === 'ar' ? '02:00 ظهراً - 03:00 مساءً' : lang === 'ku' ? '02:00 پاشنیوەڕۆ - 03:00 ئێوارە' : '14:00 - 15:00'}</span>
                  </div>
                </div>

                {/* Important Alert Callout */}
                <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/60 flex items-start space-x-3 rtl:space-x-reverse">
                  <Shield className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-800 dark:text-brand-300 leading-relaxed font-medium">
                    {t.hoursNote}
                  </p>
                </div>
              </div>

              {/* Interactive Class Schedule */}
              <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100">
                    {t.hoursSpecialClasses}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {lang === 'ar' ? 'انقري على الحصة لمعاينة تفاصيل التمرين والسعرات المحروقة والكابتن!' : lang === 'ku' ? 'کلیک لەسەر پۆلەکان بکە بۆ خوێندنەوەی وردەکارییەکان!' : 'Egzersiz detayları, kalori verileri ve eğitmen bilgisi için derslere tıklayın!'}
                  </p>
                </div>

                {/* Switch Class Tabs */}
                <div className="flex space-x-2 rtl:space-x-reverse border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  {[
                    { id: 'yoga', label: t.hoursMorningYoga },
                    { id: 'zumba', label: t.hoursNoonZumba },
                    { id: 'crossfit', label: t.hoursEveningCrossfit }
                  ].map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClass(cls.id as any)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedClass === cls.id
                          ? 'bg-brand-500 text-white shadow-sm'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                      }`}
                    >
                      {cls.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedClass}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 space-y-4"
                  >
                    {selectedClass === 'yoga' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-bold text-base text-brand-700 dark:text-brand-300">{t.hoursMorningYoga}</h4>
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                            {lang === 'ar' ? 'مستوى هادئ' : lang === 'ku' ? 'ئاستی هێمن' : 'Düşük Yoğunluk'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {lang === 'ar' 
                            ? 'جلسة استيقاظ عميقة وتصفية ذهنية تركز على التوازن، تمديد المفاصل، التنفس الواعي وتثبيت العمود الفقري لبدء يومكِ بطاقة ونشاط.'
                            : lang === 'ku'
                              ? 'وانەی یۆگای بەیانیان جەخت لەسەر کەمکردنەوەی سترێس، هۆشیاری جەستە و بەهێزکردنی بڕبڕەی پشت دەکاتەوە.'
                              : 'Zihinsel odaklanma, nefes teknikleri ve esnekliği geliştiren, güne harika ve stressiz başlamanızı sağlayan mat yogası.'}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-3 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-800/60">
                          <div>⏱️ {lang === 'ar' ? 'الوقت: 08:30 - 09:30 (إثنين وأربعاء)' : lang === 'ku' ? 'کات: ٠٨:٣٠ - ٠٩:٣٠' : 'Saat: Pazartesi-Çarşamba 08:30'}</div>
                          <div>🔥 {lang === 'ar' ? 'حرق السعرات: ~250 سعرة' : lang === 'ku' ? 'سووتاندن: ٢٥٠ کالۆری' : 'Kalori Yakımı: ~250 kcal'}</div>
                          <div>👟 {lang === 'ar' ? 'الملابس: مريحة / حافية القدمين' : lang === 'ku' ? 'پێڵاو: بەبێ پێڵاو' : 'Ekipman: Mat ve Rahat Kıyafetler'}</div>
                          <div>👩‍🏫 {lang === 'ar' ? 'المدربة: كابتن ياسمين' : lang === 'ku' ? 'ڕاهێنەر: کابتن یاسەمین' : 'Eğitmen: Yasmin Hoca'}</div>
                        </div>
                      </div>
                    )}

                    {selectedClass === 'zumba' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-bold text-base text-brand-700 dark:text-brand-300">{t.hoursNoonZumba}</h4>
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
                            {lang === 'ar' ? 'مستوى حماسي متوسط' : lang === 'ku' ? 'ئاستی مامناوەند' : 'Orta-Yüksek Yoğunluk'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {lang === 'ar' 
                            ? 'مزيج رائع وحيوي من الحركات الإيقاعية اللاتينية والكارديو لحرق الدهون بمتعة غامرة ونحت القوام على أنغام أحدث الأغاني الحماسية.'
                            : lang === 'ku'
                              ? 'وانەیەکی پڕ لە وزە و سەمای لاتینی بۆ سووتاندنی کێش بە کاتێکی خۆش و حەماسی لە نیوەڕواندا.'
                              : 'Kardiyo egzersizlerini dinamik dans koreografileriyle buluşturan, yüksek motivasyonlu yağ yakım zumba partisi.'}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-3 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-800/60">
                          <div>⏱️ {lang === 'ar' ? 'الوقت: 13:00 - 14:00 (ثلاثاء وخميس)' : lang === 'ku' ? 'کات: ١٣:٠٠ - ١٤:٠٠' : 'Saat: Salı-Perşembe 13:00'}</div>
                          <div>🔥 {lang === 'ar' ? 'حرق السعرات: ~500 سعرة' : lang === 'ku' ? 'سووتاندن: ٥٠٠ کالۆری' : 'Kalori Yakımı: ~500 kcal'}</div>
                          <div>👟 {lang === 'ar' ? 'الملابس: حذاء ركض خفيف' : lang === 'ku' ? 'پێڵاو: پێڵاوی وەرزشی سووک' : 'Giyim: Hafif Egzersiz Ayakkabısı'}</div>
                          <div>👩‍🏫 {lang === 'ar' ? 'المدربة: كابتن لارا' : lang === 'ku' ? 'ڕاهێنەر: کابتن لارا' : 'Eğitmen: Lara Hoca'}</div>
                        </div>
                      </div>
                    )}

                    {selectedClass === 'crossfit' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-bold text-base text-brand-700 dark:text-brand-300">{t.hoursEveningCrossfit}</h4>
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300">
                            {lang === 'ar' ? 'مستوى مرتفع ومكثف' : lang === 'ku' ? 'ئاستی بەرز و چڕ' : 'Yüksek Yoğunluk'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                          {lang === 'ar' 
                            ? 'تحدي القوة وبناء التحمل! تمرين عالي الكثافة (HIIT) يشمل رفع أوزان حرة، جولات كارديو وسيركل لتقوية اللياقة البدنية والوصول لأقصى استشفاء.'
                            : lang === 'ku'
                              ? 'سەختترین ڕاهێنان بۆ توندکردنی جەستە و هێز بە بەکارهێنانی قورسایی و وەرزشی خێرا.'
                              : 'Güç, esneklik ve metabolik hızı bir arada zorlayan, fonksiyonel ağırlık ve kondisyon egzersiz bütünü.'}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-3 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-800/60">
                          <div>⏱️ {lang === 'ar' ? 'الوقت: 18:00 - 19:15 (يومياً)' : lang === 'ku' ? 'کات: ١٨:٠٠ - ١٩:١٥' : 'Saat: Hafta içi Her gün 18:00'}</div>
                          <div>🔥 {lang === 'ar' ? 'حرق السعرات: ~700 سعرة' : lang === 'ku' ? 'سووتاندن: ٧٠٠ کالۆری' : 'Kalori Yakımı: ~700 kcal'}</div>
                          <div>👟 {lang === 'ar' ? 'الملابس: حذاء تدريب قوي وثابت' : lang === 'ku' ? 'پێڵاو: پێڵاوی توندی مەشق' : 'Giyim: Destekleyici Antrenman Ayakkabısı'}</div>
                          <div>👩‍🏫 {lang === 'ar' ? 'المدربة: كابتن روناهي' : lang === 'ku' ? 'ڕاهێنەر: کابتن ڕۆناهی' : 'Eğitmen: Ronahi Hoca'}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        )}

        {/* --- SECTION: SERVICES --- */}
        {activeTab === 'services' && (
          <div className="space-y-12 animate-fade-in" id="section-services">
            
            {/* Title */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {t.servicesTitle}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t.servicesSubtitle}
              </p>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: t.service1Name, desc: t.service1Desc, icon: <UserCheck className="w-6 h-6 text-brand-600" />, detail: lang === 'ar' ? 'يتوفر لدينا برنامج قياس الإنبودي (InBody) الأسبوعي لمعرفة نسبة الدهون والمياه والعضلات بدقة فائقة وبناء خطة بناءً عليها.' : lang === 'ku' ? 'هەفتانە پێوانی ئاستی چەوری و ماسولکە بە وردی لە ڕێگەی ئامێری ئینبۆدی دەکەین.' : 'Haftalık profesyonel InBody analizi eşliğinde kilo kaybı veya kas gelişimi için özel program.' },
                { name: t.service2Name, desc: t.service2Desc, icon: <Dumbbell className="w-6 h-6 text-brand-600" />, detail: lang === 'ar' ? 'تشمل الحصص التفاعلية لدينا اليوغا والزومبا والأيروبيكس المائي والكروس فت على مدار اليوم صباحاً ومساءً.' : lang === 'ku' ? 'کلاسی جۆراوجۆر و سەرنجڕاکێش بە درێژایی ڕۆژ بە شێوەی زیندە و گەرم.' : 'Sabah ve akşam grupları ile esnek saatlerde gün boyu süren enerjik grup motivasyon dersleri.' },
                { name: t.service3Name, desc: t.service3Desc, icon: <Sparkles className="w-6 h-6 text-brand-600" />, detail: lang === 'ar' ? 'غرف مجهزة بأرقى وسائل الراحة والبخار والساونا الطبيعية والجاكوزي لإراحة عضلاتك بعد الحصص الشاقة.' : lang === 'ku' ? 'شوێنی حەمام و هەڵم و ساونای گەرم بۆ پشوودانی تەواو لە دوای وەرزش.' : 'Yoğun antrenman yorgunluğunu atmak ve kasları gevşetmek için tasarlanan profesyonel buhar ve sauna odaları.' },
                { name: t.service4Name, desc: t.service4Desc, icon: <Heart className="w-6 h-6 text-brand-600" />, detail: lang === 'ar' ? 'مياه مدفأة مصفاة بعناية لدرجة حرارة مريحة للغاية للجسم ومناسبة للتمارين المائية الحارقة للسعرات.' : lang === 'ku' ? 'مەلەوانگەی داپۆشراو و گەرم بۆ خانمان و وەرزشە ئاوییەکان.' : 'Isı ve klor kontrolü sürekli sağlanan, özel kadın aqua-aerobik derslerinin yapıldığı kapalı havuz.' },
                { name: t.service5Name, desc: t.service5Desc, icon: <Coffee className="w-6 h-6 text-brand-600" />, detail: lang === 'ar' ? 'تحليل العادات الغذائية وصياغة وجبات متكاملة صحية خالية من الحرمان تدعم صحة ونضارة البشرة وجسدك.' : lang === 'ku' ? 'پلانی خۆراکی زانستی لەگەڵ پسپۆڕ بەبێ برسیبوون بۆ تەندروستی جەستە.' : 'Diyetisyenimiz eşliğinde metabolizmanıza uygun, sürdürülebilir sağlıklı beslenme takipleri.' },
                { name: t.service6Name, desc: t.service6Desc, icon: <Shield className="w-6 h-6 text-brand-600" />, detail: lang === 'ar' ? 'منطقة مجهزة بالألعاب ومراقبة بكاميرات مع جليسة أطفال محترفة لتستمتعي بتمرينك بكل راحة وخصوصية.' : lang === 'ku' ? 'شوێنێکی پارێزراو بۆ یاریکردنی منداڵەکەت کاتێک تۆ وەرزش دەکەیت.' : 'Siz spor yaparken çocuklarınızın uzman gözetiminde güvenli ve eğlenceli vakit geçirebileceği oyun alanı.' }
              ].map((serv, index) => {
                const isOpen = activeServiceDetails === index;
                return (
                  <div
                    key={index}
                    className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setActiveServiceDetails(isOpen ? null : index)}
                    id={`service-card-${index}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-brand-50 dark:bg-brand-950/40 rounded-xl text-brand-600">
                        {serv.icon}
                      </div>
                      <span className="text-[10px] text-brand-600 dark:text-brand-400 font-extrabold uppercase tracking-wider">
                        {isOpen ? '✕ Close' : '⚡ Info'}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-base text-zinc-900 dark:text-zinc-100">
                      {serv.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                      {serv.desc}
                    </p>

                    {/* Animated Expand details */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 bg-brand-50/20 dark:bg-zinc-950/20 p-3 rounded-lg leading-relaxed"
                        >
                          {serv.detail}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* --- SECTION: ABOUT --- */}
        {activeTab === 'about' && (
          <div className="space-y-16 animate-fade-in" id="section-about">
            
            {/* Story Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {t.aboutStoryTitle}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {t.aboutStoryText1}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {t.aboutStoryText2}
                </p>

                <div className="p-5 rounded-xl bg-gold-50 dark:bg-zinc-900 border border-gold-200/60 dark:border-zinc-800">
                  <h4 className="font-display font-bold text-sm text-gold-800 dark:text-gold-400 mb-2">🏆 {t.aboutVisionTitle}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{t.aboutVisionText}</p>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
                <img
                  src="https://picsum.photos/seed/divalogo/800/600"
                  alt="Diva Gym fitness atmosphere"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Trainer 1 */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="aspect-[3/4] relative bg-zinc-100">
                    <img
                      src="https://picsum.photos/seed/coach_yasmin/400/500"
                      alt="Head Coach Yasmin"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-center">
                    <div>
                      <h4 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">{lang === 'ar' ? 'كابتن ياسمين علي' : lang === 'ku' ? 'کابتن یاسەمین عەلی' : 'Yasmin Ali'}</h4>
                      <p className="text-[11px] text-brand-600 dark:text-brand-400 font-bold uppercase mt-1">{t.trainer1Specialty}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                        {t.trainerBio} {lang === 'ar' ? 'مختصة في تصميم برامج تضخيم وحرق الدهون المكثفة بذكاء.' : lang === 'ku' ? 'شارەزا لە داڕشتنی بەرنامەی قورس و سووتاندن.' : 'Güç antrenmanları ve yağ yakımı seanslarında uzman.'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleTrainerConsult(lang === 'ar' ? 'ياسمين علي' : lang === 'ku' ? 'یاسەمین' : 'Yasmin Ali', t.trainer1Specialty)}
                      className="w-full py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-brand-500 hover:text-white text-xs font-bold transition-all"
                    >
                      {lang === 'ar' ? 'استشارة المدربة ياسمين' : lang === 'ku' ? 'ڕاوێژ لەگەڵ یاسەمین' : 'Yasmin ile Danış'}
                    </button>
                  </div>
                </div>

                {/* Trainer 2 */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="aspect-[3/4] relative bg-zinc-100">
                    <img
                      src="https://picsum.photos/seed/coach_lara/400/500"
                      alt="Yoga Trainer Lara"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-center">
                    <div>
                      <h4 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">{lang === 'ar' ? 'كابتن لارا كمال' : lang === 'ku' ? 'کابتن لارا کەمال' : 'Lara Kemal'}</h4>
                      <p className="text-[11px] text-brand-600 dark:text-brand-400 font-bold uppercase mt-1">{t.trainer2Specialty}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                        {t.trainerBio} {lang === 'ar' ? 'مختصة في اليوغا، البيلاتس العلاجي، تحسين المرونة وتقليل التوتر العصبي.' : lang === 'ku' ? 'پسپۆڕ لە مێدیتەیشن، یۆگا و چاککردنی بڕبڕەی پشت.' : 'Yoga ve pilates terapilerinde derinlemesine uzmanlığa sahip.'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleTrainerConsult(lang === 'ar' ? 'لارا كمال' : lang === 'ku' ? 'لارا' : 'Lara Kemal', t.trainer2Specialty)}
                      className="w-full py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-brand-500 hover:text-white text-xs font-bold transition-all"
                    >
                      {lang === 'ar' ? 'استشارة المدربة لارا' : lang === 'ku' ? 'ڕاوێژ لەگەڵ لارا' : 'Lara ile Danış'}
                    </button>
                  </div>
                </div>

                {/* Trainer 3 */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="aspect-[3/4] relative bg-zinc-100">
                    <img
                      src="https://picsum.photos/seed/coach_ronahi/400/500"
                      alt="Nutrition Trainer Ronahi"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-center">
                    <div>
                      <h4 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100">{lang === 'ar' ? 'كابتن روناهي مراد' : lang === 'ku' ? 'کابتن ڕۆناهی موراد' : 'Ronahi Murad'}</h4>
                      <p className="text-[11px] text-brand-600 dark:text-brand-400 font-bold uppercase mt-1">{t.trainer3Specialty}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                        {t.trainerBio} {lang === 'ar' ? 'مختصة في التغذية وصياغة برامج التوازن الهرموني والتنشيف لجميع الأعمار.' : lang === 'ku' ? 'ڕێکخستنی سیستەمی خۆراکی تەندروست بۆ هۆرمۆن و جەستە.' : 'Diyetisyenlik ve hormonal dengeye uyumlu beslenme uzmanı.'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleTrainerConsult(lang === 'ar' ? 'روناهي مراد' : lang === 'ku' ? 'ڕۆناهی' : 'Ronahi Murad', t.trainer3Specialty)}
                      className="w-full py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-brand-500 hover:text-white text-xs font-bold transition-all"
                    >
                      {lang === 'ar' ? 'استشارة المدربة روناهي' : lang === 'ku' ? 'ڕاوێژ لەگەڵ ڕۆناهی' : 'Ronahi ile Danış'}
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* --- SECTION: CONTACT FORM & ADMIN INBOX --- */}
        {activeTab === 'contact' && (
          <div className="space-y-12 animate-fade-in" id="section-contact">
            
            {/* Title */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {t.contactTitle}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t.contactSubtitle}
              </p>
            </div>

            {/* Split layout: Form (User) vs Submissions Viewer (Admin Inbox) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form panel */}
              <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 md:p-8 shadow-sm">
                
                {/* Success Banner */}
                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-start space-x-2 rtl:space-x-reverse">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
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
                      <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">
                        {t.contactFieldName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={t.contactPlaceholderName}
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 focus:border-brand-500 focus:bg-white dark:focus:bg-zinc-800 text-sm transition-all outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">
                        {t.contactFieldPhone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder={t.contactPlaceholderPhone}
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 focus:border-brand-500 focus:bg-white dark:focus:bg-zinc-800 text-sm transition-all outline-none animate-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">
                      {t.contactFieldMessage}
                    </label>
                    <textarea
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder={t.contactPlaceholderMessage}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 focus:border-brand-500 focus:bg-white dark:focus:bg-zinc-800 text-sm transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-600 to-gold-500 text-white font-bold text-sm shadow-sm hover:shadow-md hover:shadow-brand-500/15 flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 transition-all duration-200"
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

              {/* Real-time Submissions box (Gym Owner Inbox Dashboard) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6 shadow-inner space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800 pb-3">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-brand-600">
                      <Mail className="w-5 h-5 text-brand-500" />
                      <h3 className="font-display font-extrabold text-sm uppercase tracking-wide">
                        {t.contactAdminSection}
                      </h3>
                    </div>
                    <span className="text-[10px] bg-brand-200 dark:bg-brand-950 px-2.5 py-0.5 rounded-full font-bold text-brand-800 dark:text-brand-300">
                      {contactSubmissions.length} {lang === 'ar' ? 'رسائل' : lang === 'ku' ? 'نامە' : 'Mesaj'}
                    </span>
                  </div>

                  {contactSubmissions.length === 0 ? (
                    <div className="text-center py-12 space-y-2 text-zinc-400 dark:text-zinc-500">
                      <AlertCircle className="w-8 h-8 mx-auto stroke-1" />
                      <p className="text-xs max-w-xs mx-auto leading-relaxed">
                        {t.contactAdminNoSubmissions}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                      {contactSubmissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 shadow-sm space-y-2 relative group"
                          id={`admin-submission-item-${sub.id}`}
                        >
                          {/* Absolute Delete Button for easy management */}
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="absolute top-3 right-3 rtl:left-3 rtl:right-auto text-zinc-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors"
                            title="Delete submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="text-[10px] text-zinc-400 font-semibold">{sub.date}</div>
                          
                          <div className="grid grid-cols-2 gap-2 pr-6 rtl:pl-6 rtl:pr-0">
                            <div>
                              <span className="block text-[10px] uppercase font-bold text-zinc-400">{t.contactAdminTableName}</span>
                              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{sub.name}</span>
                            </div>
                            <div>
                              <span className="block text-[10px] uppercase font-bold text-zinc-400">{t.contactAdminTablePhone}</span>
                              <span className="text-xs font-mono font-bold">{sub.phone}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 dark:border-zinc-700/50 pt-2 text-xs">
                            <div>
                              <span className="inline-block text-[10px] bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-bold px-2 py-0.5 rounded mr-1 ml-1 leading-none">
                                {sub.subject}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 italic leading-relaxed">
                              &ldquo;{sub.message}&rdquo;
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-zinc-900 text-zinc-400 py-12 px-4 border-t border-zinc-800 transition-colors duration-300 mt-16" id="diva-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
                D
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">Diva Gym</span>
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
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{lang === 'ar' ? 'أقسام الموقع' : lang === 'ku' ? 'بەشەکان' : 'Hızlı Menü'}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo(0,0); }} className="hover:text-brand-400 transition-colors">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('offers'); window.scrollTo(0,0); }} className="hover:text-brand-400 transition-colors">
                  {t.navOffers}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('hours'); window.scrollTo(0,0); }} className="hover:text-brand-400 transition-colors">
                  {t.navHours}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('services'); window.scrollTo(0,0); }} className="hover:text-brand-400 transition-colors">
                  {t.navServices}
                </button>
              </li>
            </ul>
          </div>

          {/* Location and address */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{lang === 'ar' ? 'العنوان والاتصال' : lang === 'ku' ? 'ناونیشان و پەیوەندی' : 'İletişim & Adres'}</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="shrink-0 text-zinc-400">📍</span>
                <span>
                  {lang === 'ar' ? 'شارع سالم، مقابل مول السليمانية، السليمانية، العراق' : lang === 'ku' ? 'شەقامی سالم، بەرامبەر سلێمانی مۆڵ، سلێمانی' : 'Salim Caddesi, Süleymaniye Mall Karşısı, Süleymaniye'}
                </span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="font-mono">+964 770 123 4567</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="font-mono">info@divagym.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-zinc-800/80 mt-12 pt-6 text-center text-[10px] text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Diva Gym. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : lang === 'ku' ? 'هەموو مافەکان پارێزراون.' : 'Tüm hakları saklıdır.'}</p>
          <p>{lang === 'ar' ? 'مصمم بكل حب لتمكين المرأة وصحتها.' : lang === 'ku' ? 'بە خۆشەویستییەوە دیزاین کراوە بۆ خانمان.' : 'Kadınların gücünü ve sağlığını desteklemek için sevgiyle tasarlanmıştır.'}</p>
        </div>
      </footer>

    </div>
  );
}
