export type Language = 'ar' | 'ku' | 'tr';

export interface TranslationSet {
  dir: 'rtl' | 'ltr';
  navHome: string;
  navOffers: string;
  navHours: string;
  navServices: string;
  navAbout: string;
  navContact: string;
  navCoach: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroCtaJoin: string;
  heroCtaExplore: string;
  heroFeature1Title: string;
  heroFeature1Desc: string;
  heroFeature2Title: string;
  heroFeature2Desc: string;
  heroFeature3Title: string;
  heroFeature3Desc: string;

  // Subscriptions
  subTitle: string;
  subSubtitle: string;
  subPeriodMonth: string;
  subPeriodMonths: string;
  subPeriodYear: string;
  subSelectPlan: string;
  subPopular: string;
  subCurrencySymbol: string;
  subCalculatorTitle: string;
  subCalculatorDesc: string;
  subCalculatorCalculate: string;
  subCalculatorResult: string;
  subCalculateDays: string;
  
  planBasicName: string;
  planBasicDesc: string;
  planPremiumName: string;
  planPremiumDesc: string;
  planVipName: string;
  planVipDesc: string;
  
  featGymAccess: string;
  featCardioStrength: string;
  featGroupClasses: string;
  featLockerSpa: string;
  featPersonalTrainer: string;
  featNutritionDiet: string;
  featVipLounge: string;
  featMassagePool: string;

  // Working Hours
  hoursTitle: string;
  hoursSubtitle: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  hoursSunday: string;
  hoursNote: string;
  hoursSpecialClasses: string;
  hoursMorningYoga: string;
  hoursNoonZumba: string;
  hoursEveningCrossfit: string;

  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  service1Name: string;
  service1Desc: string;
  service2Name: string;
  service2Desc: string;
  service3Name: string;
  service3Desc: string;
  service4Name: string;
  service4Desc: string;
  service5Name: string;
  service5Desc: string;
  service6Name: string;
  service6Desc: string;

  // About
  aboutTitle: string;
  aboutStoryTitle: string;
  aboutStoryText1: string;
  aboutStoryText2: string;
  aboutVisionTitle: string;
  aboutVisionText: string;
  aboutTrainersTitle: string;
  aboutTrainersSubtitle: string;
  trainer1Specialty: string;
  trainer2Specialty: string;
  trainer3Specialty: string;
  trainerBio: string;

  // Contact Form
  contactTitle: string;
  contactSubtitle: string;
  contactFieldName: string;
  contactFieldPhone: string;
  contactFieldEmail: string;
  contactFieldSubject: string;
  contactFieldMessage: string;
  contactPlaceholderName: string;
  contactPlaceholderPhone: string;
  contactPlaceholderEmail: string;
  contactPlaceholderMessage: string;
  contactBtnSubmit: string;
  contactBtnSubmitting: string;
  contactSuccessMsg: string;
  contactAdminSection: string;
  contactAdminNoSubmissions: string;
  contactAdminTableDate: string;
  contactAdminTableName: string;
  contactAdminTablePhone: string;
  contactAdminTableMsg: string;

  // Coach
  coachTitle: string;
  coachSubtitle: string;
  coachIntro: string;
  coachPlaceholder: string;
  coachBtnSend: string;
  coachWaiting: string;
  coachDefaultGreeting: string;
}

export const translations: Record<Language, TranslationSet> = {
  ar: {
    dir: 'rtl',
    navHome: 'الرئيسية',
    navOffers: 'العروض والاشتراكات',
    navHours: 'أوقات العمل',
    navServices: 'خدماتنا',
    navAbout: 'من نحن',
    navContact: 'اتصلي بنا',
    navCoach: 'المدربة الذكية AI',
    
    heroTitle: 'ديڤا جيم',
    heroSubtitle: 'تمكين المرأة من خلال اللياقة والصحة',
    heroTagline: 'النادي النسائي الفاخر والأول من نوعه. ارتقِ بقوتك وصحتك وروحك في مساحة مصممة خصيصاً لأجلك.',
    heroCtaJoin: 'اشتركي الآن',
    heroCtaExplore: 'استكشفي الباقات',
    heroFeature1Title: 'خصوصية تامة',
    heroFeature1Desc: 'بيئة آمنة وودية ومخصصة للنساء بالكامل بنسبة 100%.',
    heroFeature2Title: 'مدربات محترفات',
    heroFeature2Desc: 'نخبة من أفضل المدربات المعتمدات دولياً لمساعدتك في تحقيق أهدافك.',
    heroFeature3Title: 'أجهزة حديثة',
    heroFeature3Desc: 'أحدث الأجهزة الرياضية ومرافق استجمام فاخرة تشمل السبا والساونا.',

    subTitle: 'العروض والاشتراكات',
    subSubtitle: 'اختاري الباقة المثالية لرحلتك الرياضية. خيارات مرنة دون أي رسوم مخفية.',
    subPeriodMonth: 'شهري',
    subPeriodMonths: 'أشهر',
    subPeriodYear: 'سنوي',
    subSelectPlan: 'اختيار الباقة',
    subPopular: 'الأكثر طلباً',
    subCurrencySymbol: 'د.ع',
    subCalculatorTitle: 'حاسبة العضوية المخصصة',
    subCalculatorDesc: 'أدخلي عدد الأشهر واحصلي على خصم فوري مخصص لكِ!',
    subCalculatorCalculate: 'احسبي الخصم',
    subCalculatorResult: 'السعر النهائي المقدر بعد الخصم:',
    subCalculateDays: 'أيام التدريب المقترحة بالأسبوع',
    
    planBasicName: 'الباقة الأساسية',
    planBasicDesc: 'مثالية للبدء وتحقيق اللياقة الأساسية.',
    planPremiumName: 'الباقة المتميزة (بريميوم)',
    planPremiumDesc: 'الباقة الأكثر شعبية مع وصول كامل للخدمات والصفوف الجماعية.',
    planVipName: 'الباقة الملكية (VIP)',
    planVipDesc: 'تجربة استثنائية متكاملة مع تدريب شخصي مخصص وخدمات النخبة.',
    
    featGymAccess: 'دخول غير محدود لصالة الرياضة الأجهزة',
    featCardioStrength: 'منطقة الكارديو وتمارين القوة الحديثة',
    featGroupClasses: 'حضور مجاني لجميع الحصص الجماعية',
    featLockerSpa: 'استخدام الخزائن، الساونا، والسبا الفاخر',
    featPersonalTrainer: '4 جلسات تدريب شخصي شهرياً مع مدربة خاصة',
    featNutritionDiet: 'خطة تغذية مخصصة ومتابعة أسبوعية للوزن',
    featVipLounge: 'الدخول لصالة VIP المخصصة للاسترخاء والمشروبات الصحّية',
    featMassagePool: 'جلسات مساج شهرياً ودخول المسبح الداخلي الدافئ',

    hoursTitle: 'أوقات العمل',
    hoursSubtitle: 'نحن هنا من أجلك طوال الأسبوع. ابحثي عن الوقت المناسب لجدولك اليومي.',
    hoursWeekdays: 'السبت إلى الخميس',
    hoursSaturday: 'الجمعة',
    hoursSunday: 'الأحد',
    hoursNote: 'ملاحظة: النادي مخصص بالكامل للنساء والفتيات فقط لضمان راحتكِ التامة وخصوصيتكِ.',
    hoursSpecialClasses: 'جدول الحصص والصفوف المميزة',
    hoursMorningYoga: 'اليوغا الصباحية والاسترخاء',
    hoursNoonZumba: 'رقص الزومبا اللاتيني الحماسي',
    hoursEveningCrossfit: 'تمارين الكروس فت والقوة المكثفة',

    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'نقدم لكِ مجموعة متكاملة من الخدمات الرياضية والصحية تحت سقف واحد.',
    service1Name: 'التدريب الشخصي',
    service1Desc: 'برامج تدريبية مخصصة ومصممة من قبل مدربات محترفات لضمان تحقيق أهدافكِ بأمان.',
    service2Name: 'الصفوف الجماعية',
    service2Desc: 'حصص جماعية ممتعة تشمل الزومبا، اليوغا، البيلاتس، الكروس فت، وتمارين السيركل.',
    service3Name: 'السبا والساونا الفاخرة',
    service3Desc: 'استعيدي طاقتك واسترخي بعد التمرين في الساونا الدافئة وغرف البخار الفاخرة.',
    service4Name: 'مواقف سيارات مجانية',
    service4Desc: 'مواقف سيارات واسعة ومجانية لجميع العضوات.',
    service5Name: 'الاستشارات الغذائية',
    service5Desc: 'خطط وجبات صحية ومتابعة دقيقة لتركيب الجسم ونسبة الدهون مع أخصائيات تغذية.',
    service6Name: 'ركن أطفال آمن',
    service6Desc: 'منطقة مخصصة للأطفال مجهزة بالألعاب لتقومي بتمارينك ببال مطمئن وراحة تامة.',

    aboutTitle: 'من نحن',
    aboutStoryTitle: 'قصتنا ورؤيتنا',
    aboutStoryText1: 'تأسس نادي ديڤا جيم ليكون ملاذاً للمرأة الساعية للتميز والاهتمام بصحتها ولياقتها البدنية في بيئة تمنحها الخصوصية المطلقة والراحة التامة. نؤمن بأن لياقة المرأة هي مصدر قوتها وثقتها بنفسها.',
    aboutStoryText2: 'نحن لسنا مجرد صالة ألعاب رياضية، بل نحن مجتمع داعم يشجع كل امرأة وفتاة على تبني أسلوب حياة صحي ومستدام، من خلال تقديم رعاية متكاملة تجمع بين التدريب الرياضي والاسترخاء النفسي والتثقيف الغذائي.',
    aboutVisionTitle: 'رسالتنا',
    aboutVisionText: 'تقديم تجربة رياضية استثنائية وفاخرة تليق بالمرأة العصرية، وتمكينها من تحقيق أفضل نسخة من ذاتها جسدياً وذهنياً من خلال الدعم المستمر والتوجيه الاحترافي والمرافق عالمية المستوى.',
    aboutTrainersTitle: 'فريق المدربات المعتمدات',
    aboutTrainersSubtitle: 'مدرباتنا هن رفيقات دربك نحو اللياقة والصحة، يتمتعن بأعلى شهادات الاعتماد والخبرة.',
    trainer1Specialty: 'كبيرة المدربات وأخصائية القوة والكروس فت',
    trainer2Specialty: 'مدربة اليوغا، البيلاتس والراحة النفسية',
    trainer3Specialty: 'أخصائية التغذية الرياضية وتنسيق القوام',
    trainerBio: 'تتمتع بخبرة تزيد عن 8 سنوات في تدريب وتوجيه السيدات لتحقيق أهدافهن الصحية والرياضية بكفاءة.',

    contactTitle: 'اتصلي بنا',
    contactSubtitle: 'لديكِ سؤال أو ترغبين في زيارة النادي؟ راسلينا وسنكون سعداء بالإجابة عليكِ في أقرب وقت.',
    contactFieldName: 'الاسم الكامل',
    contactFieldPhone: 'رقم الهاتف',
    contactFieldEmail: 'البريد الإلكتروني',
    contactFieldSubject: 'الباقة المهتمة بها',
    contactFieldMessage: 'رسالتكِ',
    contactPlaceholderName: 'أدخلي اسمكِ الكريم',
    contactPlaceholderPhone: 'أدخلي رقم هاتفكِ النشط',
    contactPlaceholderEmail: 'مثال: diva@example.com',
    contactPlaceholderMessage: 'اكتبي استفسارك أو طلبك هنا...',
    contactBtnSubmit: 'إرسال الرسالة',
    contactBtnSubmitting: 'جاري الإرسال...',
    contactSuccessMsg: 'شكرًا لكِ! تم استلام رسالتك بنجاح وسيتواصل معكِ فريق ديڤا جيم قريباً جداً.',
    contactAdminSection: 'صندوق رسائل الإدارة (المعاينة)',
    contactAdminNoSubmissions: 'لا توجد رسائل مستلمة بعد. جربي ملء النموذج أعلاه وإرساله لعرضه هنا!',
    contactAdminTableDate: 'التاريخ',
    contactAdminTableName: 'الاسم',
    contactAdminTablePhone: 'الهاتف',
    contactAdminTableMsg: 'الرسالة والباقة',

    coachTitle: 'المدربة الذكية AI',
    coachSubtitle: 'استشارتكِ الرياضية والغذائية الفورية بالذكاء الاصطناعي',
    coachIntro: 'مرحباً بكِ في ركن الاستشارة الذكية! أنا "ديڤا" مدربتكِ الافتراضية. اسأليني عن أي تمرين، خطة رجيم، أو نصيحة لرفع لياقتك البدنية، وسأجيبكِ فوراً بما يناسب أهدافكِ.',
    coachPlaceholder: 'اسأليني: كيف أبدأ تمرين المقاومة؟ أو اعطيني وجبة قبل التمرين...',
    coachBtnSend: 'اسألي ديڤا',
    coachWaiting: 'ديڤا تفكر وتجهز الإجابة...',
    coachDefaultGreeting: 'أهلاً بكِ عزيزتي بطلة ديڤا جيم! أنا جاهزة لمساعدتكِ اليوم في تصميم نظامكِ الرياضي أو الغذائي. ما هو هدفكِ الحالي؟'
  },
  ku: {
    dir: 'rtl',
    navHome: 'سەرەکی',
    navOffers: 'پێشنیار و بەشدارییەکان',
    navHours: 'کاتەکانی کارکردن',
    navServices: 'خزمەتگوزارییەکانمان',
    navAbout: 'دەربارەی ئێمە',
    navContact: 'پەیوەندیمان پێوە بکە',
    navCoach: 'ڕاهێنەری زیرەک AI',
    
    heroTitle: 'دیڤا جیم',
    heroSubtitle: 'بەهێزکردنی ئافرەتان لە ڕێگەی وەرزش و تەندروستییەوە',
    heroTagline: 'یەکەمین هۆڵی وەرزشی شاهانە و تایبەت بە ئافرەتان. هێز و تەندروستی و ڕۆحت بەرز بکەرەوە لە فەزایەکدا کە بە تایبەتی بۆ تۆ دیزاین کراوە.',
    heroCtaJoin: 'ئێستا بەشدار بە',
    heroCtaExplore: 'بڕوانە بەستەکان',
    heroFeature1Title: 'نهێنیپارێزی تەواو',
    heroFeature1Desc: 'ژینگەیەکی ئارام، دۆستانە و ١٠٠٪ تایبەت بە ئافرەتان.',
    heroFeature2Title: 'ڕاهێنەرانی لێهاتوو',
    heroFeature2Desc: 'باشترین ڕاهێنەرانی خاوەن بڕوانامەی نێودەوڵەتی بۆ یارمەتیدانت لە بەدیهێنانی ئامانجەکانت.',
    heroFeature3Title: 'ئامێری پێشکەوتوو',
    heroFeature3Desc: 'نوێترین ئامێرەکانی وەرزش و شوێنی پشوودانی شاهانە وەک ساونا و سپا.',

    subTitle: 'پێشنیار و بەشدارییەکان',
    subSubtitle: 'باشترین پلان بۆ گەشتە وەرزشییەکەت هەڵبژێرە. بژاردەی نەرم و بێ هیچ تێچوویەکی شاراوە.',
    subPeriodMonth: 'مانگانە',
    subPeriodMonths: 'مانگ',
    subPeriodYear: 'ساڵانە',
    subSelectPlan: 'هەڵبژاردنی پلانەکە',
    subPopular: 'زۆرترین داواکاری',
    subCurrencySymbol: 'د.ع',
    subCalculatorTitle: 'ژمێرەری بەشداری تایبەت',
    subCalculatorDesc: 'ژمارەی مانگەکان بنووسە و داشکاندنی دەستبەجێ بەدەست بهێنە!',
    subCalculatorCalculate: 'ئەژمارکردنی داشکاندن',
    subCalculatorResult: 'نرخی کۆتایی خەمڵێندراو دوای داشکاندن:',
    subCalculateDays: 'ڕۆژە پێشنیارکراوەکانی ڕاهێنان لە هەفتەدا',
    
    planBasicName: 'پلانی بنەڕەتی',
    planBasicDesc: 'گونجاوە بۆ دەستپێکردن و بەدەستهێنانی توانای جەستەیی سەرەتایی.',
    planPremiumName: 'پلانی نایاب (پریمیۆم)',
    planPremiumDesc: 'بەناوبانگترین پلان بە دەستڕاگەیشتنی تەواو بە خزمەتگوزارییەکان و وانە بەکۆمەڵەکان.',
    planVipName: 'پلانی شاهانە (VIP)',
    planVipDesc: 'ئەزموونێکی ناوازە و گشتگیر بە ڕاهێنانی تایبەتیی و خزمەتگوزاری نایاب.',
    
    featGymAccess: 'چوونەژوورەوەی بێ سنوور بۆ هۆڵی وەرزشی و ئامێرەکان',
    featCardioStrength: 'ناوچەی کاردیۆ و وەرزشی هێزی پێشکەوتوو',
    featGroupClasses: 'بەشداری بێبەرامبەر لە هەموو وانە بەکۆمەڵەکاندا',
    featLockerSpa: 'بەکارهێنانی لۆکەر، ساونا و سپای شاهانە',
    featPersonalTrainer: '٤ دانیشتنی ڕاهێنانی تایبەت لە مانگێکدا لەگەڵ ڕاهێنەر',
    featNutritionDiet: 'پلانی خۆراکی تایبەت و چاودێری هەفتانەی کێش',
    featVipLounge: 'چوونەژوورەوە بۆ هۆڵی VIP بۆ پشوودان و خواردنەوە تەندروستەکان',
    featMassagePool: 'دانیشتنی مەساج مانگانە و چوونە ناو مەلەوانگەی گەرمی ناوخۆیی',

    hoursTitle: 'کاتەکانی کارکردن',
    hoursSubtitle: 'ئێمە لە پێناو تۆدا لێرەین لە درێژەی هەفتەدا. کاتێکی گونجاو بۆ خشتەی ڕۆژانەت بدۆزەرەوە.',
    hoursWeekdays: 'شەممە بۆ پێنجشەممە',
    hoursSaturday: 'هەینی',
    hoursSunday: 'یەکشەممە',
    hoursNote: 'تێبینی: هۆڵەکە بە تەواوی تەنها بۆ ئافرەتان و کچانە بۆ مسۆگەرکردنی ئاسوودەیی و تایبەتمەندێتی تەواوت.',
    hoursSpecialClasses: 'خشتەی وانە و پۆلە تایبەتەکان',
    hoursMorningYoga: 'یۆگای بەیانیان و ئارامی جەستەیی',
    hoursNoonZumba: 'سەمای زومبای لاتینی بەجۆش و خرۆش',
    hoursEveningCrossfit: 'وەرزشی کرۆسفیت و هێزی چڕوپڕ',

    servicesTitle: 'خزمەتگوزارییە شاهانەییەکانمان',
    servicesSubtitle: 'کۆمەڵێک خزمەتگوزاری وەرزشی و تەندروستی گشتگیرت پێشکەش دەکەین لەژێر یەک سەقفدا.',
    service1Name: 'ڕاهێنانی تایبەتی',
    service1Desc: 'پڕۆگرامی ڕاهێنانی تایبەت کە لەلایەن ڕاهێنەرانی شارەزا دیزاین کراون بۆ بەدەستهێنانی ئامانجەکانت بە سەلامەتی.',
    service2Name: 'وانە بەکۆمەڵەکان',
    service2Desc: 'وانەی بەکۆمەڵی خۆش و بەجۆش وەک زومبا، یۆگا، پیلاتس، کرۆسفیت و وەرزشی سێرکڵ.',
    service3Name: 'سپا و ساونای شاهانە',
    service3Desc: 'وزەی خۆت نوێ بکەرەوە و دوای ڕاهێنان لە ساونا گەرمەکان و ژوورە هەڵمییەکاندا پشوو بدە.',
    service4Name: 'شوێنی وەستانی ئۆتۆمبێلی بێبەرامبەر',
    service4Desc: 'شوێنی وەستانی ئۆتۆمبێلی بەرفراوان و بێبەرامبەر بۆ هەموو ئەندامان.',
    service5Name: 'ڕاوێژکاری خۆراکی',
    service5Desc: 'پلانی خۆراکی تەندروست و پێوانەکردنی چەوری و پێکهاتەی جەستە لەگەڵ پسپۆڕانی خۆراک.',
    service6Name: 'شوێنی یاری منداڵان',
    service6Desc: 'ناوچەیەکی تایبەت بە منداڵان کە تەیارکراوە بە یاری تا وەرزشەکانت بە مێشکێکی ئارام و پشوو بەیت.',

    aboutTitle: 'دەربارەی ئێمە',
    aboutStoryTitle: 'چیرۆک و دیدگای ئێمە',
    aboutStoryText1: 'دیڤا جیم دامەزراوە بۆ ئەوەی ببێتە پەناگەیەک بۆ ئەو ئافرەتانەی کە هەوڵی بەدەستهێنانی تەندروستی و جوانی جەستەیی دەدەن لە ژینگەیەکدا کە نهێنیپارێزی و ئاسوودەیی تەواوی پێ ببەخشێت. بڕوامان وایە توانای جەستەیی ئافرەت سەرچاوەی هێز و متمانەبەخۆبوونیەتی.',
    aboutStoryText2: 'ئێمە تەنها هۆڵێکی وەرزشی نین، بەڵکو کۆمەڵگەیەکی پاڵپشتین کە هاندەری هەموو کچ و ئافرەتێکە بۆ پەیڕەوکردنی شێوازێکی ژیانی تەندروست و بەردەوام، لە ڕێگەی پێشکەشکردنی چاودێری گشتگیر کە وەرزش، پشوودانی دەروونی و زانیاری خۆراکی کۆدەکاتەوە.',
    aboutVisionTitle: 'پەیاممان',
    aboutVisionText: 'پێشکەشکردنی ئەزموونێکی وەرزشی ناوازە و نایاب کە شایستە بە ئافرەتی هاوچەرخ بێت، و بەهێزکردنی بۆ بەدیهێنانی باشترین وەشانی جەستەیی و دەروونی لە ڕێگەی ڕێنمایی پرۆفیشناڵ و ئاسانکاری ئاستی جیهانی.',
    aboutTrainersTitle: 'تیمی ڕاهێنەرانی باوەڕپێکراو',
    aboutTrainersSubtitle: 'ڕاهێنەرەکانمان هاوڕێی گەشتەکەتن بەرەو وەرزش و تەندروستی، خاوەنی بەرزترین بڕوانامە و ئەزموونن.',
    trainer1Specialty: 'سەرۆکی ڕاهێنەران و پسپۆڕی وەرزشی هێز و کرۆسفیت',
    trainer2Specialty: 'ڕاهێنەری یۆگا، پیلاتس و ئارامی دەروونی',
    trainer3Specialty: 'پسپۆڕی خۆراکی وەرزشی و ڕێکخستنی جەستە',
    trainerBio: 'خاوەنی زیاتر لە ٨ ساڵ ئەزموونە لە ڕاهێنان و ئاراستەکردنی خانمان بۆ بەدەستهێنانی ئامانجە تەندروستی و وەرزشییەکانیان.',

    contactTitle: 'پەیوەندیمان پێوە بکە',
    contactSubtitle: 'پرسیارێکت هەیە یان دەتەوێت سەردانی هۆڵەکە بکەیت؟ نامەمان بۆ بنێرە و بە خۆشحاڵییەوە لە زووترین کاتدا وەڵامت دەدەینەوە.',
    contactFieldName: 'ناوی تەواو',
    contactFieldPhone: 'ژمارەی تەلەفۆن',
    contactFieldEmail: 'ئیمەیڵ',
    contactFieldSubject: 'ئەو پلانەی گرنگی پێدەدەیت',
    contactFieldMessage: 'نامەکەت',
    contactPlaceholderName: 'ناوی خۆت بنووسە',
    contactPlaceholderPhone: 'ژمارەی تەلەفۆنەکەت بنووسە',
    contactPlaceholderEmail: 'نموونە: diva@example.com',
    contactPlaceholderMessage: 'پرسیار یان داواکارییەکەت لێرە بنووسە...',
    contactBtnSubmit: 'ناردنی نامە',
    contactBtnSubmitting: 'دەنێردرێت...',
    contactSuccessMsg: 'سوپاس بۆ تۆ! نامەکەت بە سەرکەوتوویی گەیشت و تیمی دیڤا جیم بەم زووانە پەیوەندیت پێوە دەکەن.',
    contactAdminSection: 'سندوقی نامەکانی کارگێڕی (پێشبینین)',
    contactAdminNoSubmissions: 'هیچ نامەیەک نەگەیشتووە تا ئێستا. فۆرمەکەی سەرەوە پڕبکەرەوە بۆ ئەوەی لێرەدا پیشان بدرێت!',
    contactAdminTableDate: 'ڕێکەوت',
    contactAdminTableName: 'ناو',
    contactAdminTablePhone: 'تەلەفۆن',
    contactAdminTableMsg: 'نامە و پلانەکە',

    coachTitle: 'ڕاهێنەری زیرەک AI',
    coachSubtitle: 'ڕاوێژی دەستبەجێی وەرزشی و خۆراکی بە زیرەکی دەستکرد',
    coachIntro: 'بەخێربێیت بۆ گۆشەی ڕاوێژکاری زیرەک! من "دیڤا"م، ڕاهێنەری گریمانەیی تۆ. پرسیارم لێ بکە دەربارەی هەر ڕاهێنانێک، پلانی خۆراکی یان ئامۆژگاری بۆ باشترکردنی جەستەت، و دەستبەجێ وەڵامت دەدەمەوە.',
    coachPlaceholder: 'بپرسە: چۆن دەست بە وەرزشی بەرگری بکەم؟ یان ژەمێکی پێش وەرزشم پێشنیار بکە...',
    coachBtnSend: 'لە دیڤا بپرسە',
    coachWaiting: 'دیڤا بیردەکاتەوە و وەڵامەکە ئامادە دەکات...',
    coachDefaultGreeting: 'بەخێربێیت کچە پاڵەوانەکەی دیڤا جیم! من ئامادەم ئەمڕۆ یارمەتیت بدەم لە داڕشتنی سیستەمی وەرزشی یان خۆراکیت. ئامانجی ئێستات چییە؟'
  },
  tr: {
    dir: 'ltr',
    navHome: 'Anasayfa',
    navOffers: 'Üyelik & Paketler',
    navHours: 'Çalışma Saatleri',
    navServices: 'Hizmetlerimiz',
    navAbout: 'Hakkımızda',
    navContact: 'İletişim Formu',
    navCoach: 'AI Akıllı Koç',
    
    heroTitle: 'Diva Gym',
    heroSubtitle: 'Kadınları Güçlendiren Fitness & Sağlık Alanı',
    heroTagline: 'Kadınlara özel tasarlanmış, lüks ve seçkin bir spor salonu. Size özel olarak hazırlanan bu eşsiz alanda gücünüzü, sağlığınızı ve ruhunuzu zirveye taşıyın.',
    heroCtaJoin: 'Hemen Katıl',
    heroCtaExplore: 'Paketleri İncele',
    heroFeature1Title: 'Tam Mahremiyet',
    heroFeature1Desc: 'Sadece kadınlara özel, %100 güvenli, konforlu ve samimi bir egzersiz ortamı.',
    heroFeature2Title: 'Uzman Eğitmenler',
    heroFeature2Desc: 'Hedeflerinize ulaşmanız için uluslararası sertifikalı seçkin kadın eğitmen kadrosu.',
    heroFeature3Title: 'Premium Donanım',
    heroFeature3Desc: 'En son teknoloji spor ekipmanları, spa, sauna ve konforlu dinlenme alanları.',

    subTitle: 'Teklifler ve Üyelik Paketleri',
    subSubtitle: 'Fitness yolculuğunuz için en mükemmel planı seçin. Gizli ücretler içermeyen esnek üyelik seçenekleri.',
    subPeriodMonth: 'Aylık',
    subPeriodMonths: 'Ay',
    subPeriodYear: 'Yıllık',
    subSelectPlan: 'Paketi Seç',
    subPopular: 'En Popüler',
    subCurrencySymbol: 'IQD',
    subCalculatorTitle: 'Özel Üyelik Hesaplayıcı',
    subCalculatorDesc: 'Üyelik süresini girin ve size özel anında indirim fırsatını hesaplayın!',
    subCalculatorCalculate: 'İndirimi Hesapla',
    subCalculatorResult: 'İndirimli Tahmini Net Ücret:',
    subCalculateDays: 'Haftalık Önerilen Antrenman Günü',
    
    planBasicName: 'Başlangıç Paketi',
    planBasicDesc: 'Fitness dünyasına adım atmak ve temel form kazanmak isteyenler için ideal.',
    planPremiumName: 'Premium Paket',
    planPremiumDesc: 'Tüm grup derslerine ve spa alanlarına tam erişim sağlayan en popüler üyelik.',
    planVipName: 'Kraliçe VIP Paketi',
    planVipDesc: 'Kişisel antrenör desteği, özel beslenme danışmanlığı ve elit hizmetlerle dolu tam lüks deneyim.',
    
    featGymAccess: 'Sınırsız spor salonu ve ekipman kullanımı',
    featCardioStrength: 'Modern kardiyo ve ağırlık çalışma alanları',
    featGroupClasses: 'Tüm grup derslerine ücretsiz katılım hakkı',
    featLockerSpa: 'Özel soyunma dolabı, sauna ve buhar odası erişimi',
    featPersonalTrainer: 'Özel kadın eğitmenle ayda 4 seans birebir ders',
    featNutritionDiet: 'Kişiye özel beslenme programı ve haftalık kilo takibi',
    featVipLounge: 'Sağlıklı içecekler sunan VIP dinlenme salonuna erişim',
    featMassagePool: 'Ayda özel masaj seansı ve ısıtmalı kapalı havuz erişimi',

    hoursTitle: 'Çalışma Saatleri',
    hoursSubtitle: 'Haftanın her günü yanınızdayız. Günlük programınıza en uygun saat aralığını seçin.',
    hoursWeekdays: 'Cumartesi - Perşembe',
    hoursSaturday: 'Cuma',
    hoursSunday: 'Pazar',
    hoursNote: 'Not: Salonumuz, konforunuzu ve mahremiyetinizi en üst düzeyde korumak adına tamamen kadınlara ve genç kızlara özeldir.',
    hoursSpecialClasses: 'Öne Çıkan Grup Ders Programı',
    hoursMorningYoga: 'Sabah Yogası ve Zihinsel Rahatlama',
    hoursNoonZumba: 'Eğlenceli ve Hareketli Latin Zumba Dansı',
    hoursEveningCrossfit: 'Yoğun Güç ve Dayanıklılık Crossfit Antrenmanı',

    servicesTitle: 'Premium Hizmetlerimiz',
    servicesSubtitle: 'Spor, sağlık ve dinlenmeye dair aradığınız her şeyi tek çatı altında sunuyoruz.',
    service1Name: 'Kişisel Antrenör (PT)',
    service1Desc: 'Hedeflerinize en güvenli yoldan ulaşmanız için profesyonel kadın eğitmenler eşliğinde birebir çalışma.',
    service2Name: 'Grup Dersleri',
    service2Desc: 'Zumba, Yoga, Pilates, Crossfit ve Circle Training gibi enerjik ve motive edici grup seansları.',
    service3Name: 'Lüks Spa & Sauna',
    service3Desc: 'Yoğun antrenman sonrası kaslarınızı dinlendirebileceğiniz sıcak sauna ve buhar banyosu keyfi.',
    service4Name: 'Ücretsiz Otopark',
    service4Desc: 'Tüm üyeler için geniş ve ücretsiz otopark alanı.',
    service5Name: 'Beslenme Danışmanlığı',
    service5Desc: 'Diyetisyenimiz eşliğinde vücut analiz ölçümleri ve hedeflerinize uygun sağlıklı beslenme planları.',
    service6Name: 'Güvenli Çocuk Oyun Alanı',
    service6Desc: 'Siz sporunuzu yaparken çocuklarınızın güvenle oynayıp eğlenebileceği oyuncaklı özel alan.',

    aboutTitle: 'Hakkımızda',
    aboutStoryTitle: 'Hikayemiz ve Vizyonumuz',
    aboutStoryText1: 'Diva Gym, kadınların kendilerini güvende, konforlu ve tamamen özgür hissedecekleri mükemmel bir ortamda spor yapabilmeleri amacıyla kurulmuştur. Kadının fiziksel gücünün, özgüveninin ve mutluluğunun en büyük kaynağı olduğuna inanıyoruz.',
    aboutStoryText2: 'Biz sadece bir spor salonu değil; her kadının sürdürülebilir sağlıklı yaşam alışkanlıkları kazanmasını destekleyen, spor, zihinsel rahatlama ve sağlıklı beslenmeyi buluşturan güçlü bir kadın topluluğuyuz.',
    aboutVisionTitle: 'Misyonumuz',
    aboutVisionText: 'Modern kadına hak ettiği lüks ve seçkin spor deneyimini sunmak; profesyonel rehberlik, yüksek motivasyon ve dünya standartlarında tesislerimizle bedensel ve zihinsel potansiyelini en üst düzeye çıkarmasını sağlamaktır.',
    aboutTrainersTitle: 'Sertifikalı Eğitmen Kadromuz',
    aboutTrainersSubtitle: 'Fitness yolculuğunuzda size rehberlik edecek, her biri alanında uzman sertifikalı kadın eğitmenlerimiz.',
    trainer1Specialty: 'Baş Eğitmen, Güç ve Crossfit Uzmanı',
    trainer2Specialty: 'Yoga, Pilates ve Zihinsel Rahatlama Eğitmeni',
    trainer3Specialty: 'Sporcu Beslenmesi ve Vücut Şekillendirme Koçu',
    trainerBio: 'Kadın sağlığı ve fitness alanında 8 yılı aşkın tecrübesiyle, yüzlerce kadının hayat kalitesini artırmasına öncülük etmiştir.',

    contactTitle: 'İletişim Formu',
    contactSubtitle: 'Sorularınız mı var veya salonumuzu ziyaret etmek mi istiyorsunuz? Bize yazın, en kısa sürede size dönüş yapalım.',
    contactFieldName: 'Adınız Soyadınız',
    contactFieldPhone: 'Telefon Numaranız',
    contactFieldEmail: 'E-posta Adresiniz',
    contactFieldSubject: 'İlgilendiğiniz Paket',
    contactFieldMessage: 'Mesajınız',
    contactPlaceholderName: 'Adınızı ve soyadınızı girin',
    contactPlaceholderPhone: 'Aktif telefon numaranızı girin',
    contactPlaceholderEmail: 'Örn: diva@example.com',
    contactPlaceholderMessage: 'Sorularınızı veya taleplerinizi buraya yazabilirsiniz...',
    contactBtnSubmit: 'Mesajı Gönder',
    contactBtnSubmitting: 'Gönderiliyor...',
    contactSuccessMsg: 'Teşekkürler! Mesajınız başarıyla iletildi. Diva Gym ekibi sizinle en kısa sürede iletişime geçecektir.',
    contactAdminSection: 'Yönetim Mesaj Kutusu (Önizleme)',
    contactAdminNoSubmissions: 'Henüz alınmış bir mesaj yok. Yukarıdaki formu doldurup göndererek burada test edebilirsiniz!',
    contactAdminTableDate: 'Tarih',
    contactAdminTableName: 'İsim',
    contactAdminTablePhone: 'Telefon',
    contactAdminTableMsg: 'Mesaj & Paket',

    coachTitle: 'AI Akıllı Koç',
    coachSubtitle: 'Yapay Zeka Destekli Anlık Fitness ve Beslenme Danışmanlığı',
    coachIntro: 'Akıllı danışmanlık köşesine hoş geldiniz! Ben sanal antrenörünüz "Diva". Bana egzersizler, beslenme planları veya formda kalma ipuçları hakkında her şeyi sorabilirsiniz.',
    coachPlaceholder: 'Sorun: Direnç antrenmanına nasıl başlarım? veya Spor öncesi ne yemeliyim?',
    coachBtnSend: 'Diva\'ya Sor',
    coachWaiting: 'Diva düşünüyor ve yanıt hazırlıyor...',
    coachDefaultGreeting: 'Diva Gym\'in sevgili üyesi, merhaba! Bugün fitness ve sağlıklı beslenme hedeflerinize ulaşmanız için size yardımcı olmaya hazırım. Güncel hedefiniz nedir?'
  }
};
