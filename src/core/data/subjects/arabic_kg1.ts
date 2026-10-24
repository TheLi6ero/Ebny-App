import { Question } from '../../types/questions';

export const ARABIC_KG1_QUESTIONS: Record<string, Question[]> = {
  // ================== الوحدة الأولى: التهيئة ==================
  unit1_visual: [
    { 
      id: 1, 
      text: 'اختر الشكل الذي يشبه النجمة:', 
      options: [
        { text: 'نجمة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg' }, 
        { text: 'دائرة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26aa.svg' },
        { text: 'مربع', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b1b.svg' },
        { text: 'قلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2764.svg' }
      ], 
      correct: 'نجمة' 
    },
    { 
      id: 2, 
      text: 'ما هو لون التفاحة؟', 
      options: [
        { text: 'أحمر', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg' }, 
        { text: 'أصفر', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34c.svg' },
        { text: 'أخضر', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34f.svg' },
        { text: 'أزرق', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f535.svg' }
      ], 
      correct: 'أحمر' 
    }
  ],
  unit1_audio: [
    {
      id: 1,
      text: 'اختر الحيوان الذي يصدر صوت "مواء":',
      options: [
        { text: 'قطة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg' }, 
        { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' },
        { text: 'بقرة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f42e.svg' },
        { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }
      ],
      correct: 'قطة'
    }
  ],
  unit1_cognitive: [
    {
      id: 1,
      text: 'من هو الشخص الذي يعالج المرضى في المستشفى؟',
      options: [
        { text: 'طبيب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f468-200d-2695-fe0f.svg' }, 
        { text: 'مهندس', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f468-200d-1f4bb.svg' },
        { text: 'نجار', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f528.svg' },
        { text: 'معلم', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f468-200d-1f3eb.svg' }
      ],
      correct: 'طبيب'
    }
  ],

  // ================== الوحدة الثانية: أنا وأسرتي ==================
  lesson_this_is_me: [
    {
      id: 1,
      text: 'بماذا نرى الأشياء من حولنا؟',
      options: [
        { text: 'العين', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f441.svg' }, 
        { text: 'الأذن', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f442.svg' },
        { text: 'الأنف', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f443.svg' },
        { text: 'الفم', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f444.svg' }
      ],
      correct: 'العين'
    }
  ],
  
  // ================== الحروف ==================
  letter_alef: [
    { id: 1, text: 'اختر الكلمة التي تبدأ بحرف "الألف" (أ):', options: [{ text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'بطة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f986.svg' }, { text: 'تفاح', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg' }, { text: 'جمل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f42a.svg' }], correct: 'أسد' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "الألف":', options: [{ text: 'أ' }, { text: 'ب' }, { text: 'م' }, { text: 'ح' }], correct: 'أ' },
    { id: 3, text: 'أين نجد حرف الألف في كلمة "أرنب"؟', options: [{ text: 'في البداية' }, { text: 'في النهاية' }, { text: 'في النص' }, { text: 'غير موجود' }], correct: 'في البداية' },
  ],
  letter_baa: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "الباء" (ب):', options: [{ text: 'بطة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f986.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'تفاح', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg' }, { text: 'قطة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg' }], correct: 'بطة' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "الباء":', options: [{ text: 'ت' }, { text: 'ب' }, { text: 'ث' }, { text: 'ن' }], correct: 'ب' },
    { id: 3, text: 'أي من هذه الكلمات تبدأ بحرف (ب)؟', options: [{ text: 'بيت' }, { text: 'موز' }, { text: 'حصان' }, { text: 'ديك' }], correct: 'بيت' },
  ],
  letter_meem: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "الميم" (م):', options: [{ text: 'موز', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34c.svg' }, { text: 'تفاح', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg' }, { text: 'أرنب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg' }, { text: 'قطة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg' }], correct: 'موز' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "الميم":', options: [{ text: 'أ' }, { text: 'ب' }, { text: 'م' }, { text: 'ح' }], correct: 'م' },
    { id: 3, text: 'ما هو الشيء الذي يبدأ بحرف (م) ويستخدم لفتح الباب؟', options: [{ text: 'مفتاح', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f511.svg' }, { text: 'كتاب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d6.svg' }, { text: 'قلم', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f58a.svg' }, { text: 'كرسي', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa91.svg' }], correct: 'مفتاح' },
  ],
  letter_haa: [
    { id: 1, text: 'اختر الحيوان الذي يبدأ بحرف "الحاء" (ح):', options: [{ text: 'حصان', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f434.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'حصان' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "الحاء":', options: [{ text: 'ج' }, { text: 'ح' }, { text: 'خ' }, { text: 'ع' }], correct: 'ح' },
    { id: 3, text: 'أي من هذه الكلمات تحتوي على حرف (ح)؟', options: [{ text: 'حمامة' }, { text: 'بطة' }, { text: 'موز' }, { text: 'أسد' }], correct: 'حمامة' },
  ],
  letter_jeem: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "الجيم" (ج):', options: [{ text: 'جمل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f42a.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'جمل' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "الجيم":', options: [{ text: 'ح' }, { text: 'ج' }, { text: 'خ' }, { text: 'م' }], correct: 'ج' },
    { id: 3, text: 'ما هو الشيء الذي يبدأ بحرف (ج) ويُضرب ليُصدر صوتاً؟', options: [{ text: 'جرس', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f514.svg' }, { text: 'كتاب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d6.svg' }, { text: 'قلم', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f58a.svg' }, { text: 'كرسي', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa91.svg' }], correct: 'جرس' },
  ],
  letter_dal: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "الدال" (د):', options: [{ text: 'دب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f43b.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'دب' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "الدال":', options: [{ text: 'ذ' }, { text: 'د' }, { text: 'ر' }, { text: 'ز' }], correct: 'د' },
    { id: 3, text: 'أي طائر يبدأ بحرف (د)؟', options: [{ text: 'ديك', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f413.svg' }, { text: 'بطة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f986.svg' }, { text: 'حمامة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f54a.svg' }, { text: 'نعامة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9a9.svg' }], correct: 'ديك' },
  ],
  letter_khaa: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "الخاء" (خ):', options: [{ text: 'خروف', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f411.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'خروف' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "الخاء":', options: [{ text: 'ح' }, { text: 'خ' }, { text: 'ج' }, { text: 'ع' }], correct: 'خ' },
    { id: 3, text: 'أي من هذه الأطعمة تبدأ بحرف (خ)؟', options: [{ text: 'خيار', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f952.svg' }, { text: 'تفاح', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg' }, { text: 'موز', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34c.svg' }, { text: 'عنب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f347.svg' }], correct: 'خيار' },
  ],
  letter_taa: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "التاء" (ت):', options: [{ text: 'تفاح', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'تفاح' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "التاء":', options: [{ text: 'ب' }, { text: 'ت' }, { text: 'ث' }, { text: 'ن' }], correct: 'ت' },
    { id: 3, text: 'أي من هذه الحيوانات يبدأ بحرف (ت)؟', options: [{ text: 'تمساح', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f40a.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'تمساح' },
  ],
  letter_lam: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "اللام" (ل):', options: [{ text: 'ليمون', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34b.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'ليمون' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "اللام":', options: [{ text: 'ل' }, { text: 'أ' }, { text: 'ب' }, { text: 'م' }], correct: 'ل' },
    { id: 3, text: 'ماذا نشرب ونبدأ اسمه بحرف (ل)؟', options: [{ text: 'لبن', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95b.svg' }, { text: 'عصير', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c3.svg' }, { text: 'ماء', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a7.svg' }, { text: 'شاي', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f375.svg' }], correct: 'لبن' },
  ],
  letter_seen: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "السين" (س):', options: [{ text: 'سمكة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41f.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'سمكة' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "السين":', options: [{ text: 'ش' }, { text: 'س' }, { text: 'ص' }, { text: 'ض' }], correct: 'س' },
    { id: 3, text: 'أي من هذه الأشياء نستخدمه لمعرفة الوقت ويبدأ بحرف (س)؟', options: [{ text: 'ساعة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/23f0.svg' }, { text: 'سرير', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6cf.svg' }, { text: 'كرسي', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa91.svg' }, { text: 'باب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6aa.svg' }], correct: 'ساعة' },
  ],
  letter_noon: [
    { id: 1, text: 'اختر الصورة التي تبدأ بحرف "النون" (ن):', options: [{ text: 'نحلة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41d.svg' }, { text: 'أسد', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg' }, { text: 'فيل', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg' }, { text: 'كلب', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg' }], correct: 'نحلة' },
    { id: 2, text: 'اختر الشكل الصحيح لحرف "النون":', options: [{ text: 'ن' }, { text: 'ب' }, { text: 'ت' }, { text: 'ث' }], correct: 'ن' },
    { id: 3, text: 'ما هو الشيء الذي يبدأ بحرف (ن) ويضيء في السماء ليلاً؟', options: [{ text: 'نجمة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg' }, { text: 'شمس', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg' }, { text: 'سحابة', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2601.svg' }, { text: 'قمر', imageUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f319.svg' }], correct: 'نجمة' },
  ],
};