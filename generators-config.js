/* =====================================================
   generators-config.js — רשימת כל המחוללים
   =====================================================
   כדי להוסיף מחולל חדש:
     1. הוסף אובייקט לסוף המערך GENERATORS (ראה דוגמה למטה)
     2. צור קובץ HTML למחולל עצמו (השתמש בתבנית קיימת)

   שדות חובה:
     id           — מחרוזת ייחודית ללא רווחים (לדוגמה: 'quiz-builder')
     title        — שם המחולל כפי שיופיע בכרטיס
     description  — תיאור קצר (1-2 משפטים)
     link         — שם קובץ ה-HTML של המחולל
     category     — אחת מ: 'learning' | 'guidance' | 'visual'
     icon         — אחד מ-ICONS.*  (ראה רשימה מתחת)

   דוגמה — מחולל חדש:
     {
       id: 'quiz-builder',
       title: 'מחולל חידונים',
       description: 'יוצר חידונים אינטראקטיביים לבדיקת הבנה.',
       link: 'quiz-builder.html',
       category: 'learning',
       icon: ICONS.clipboard
     }
===================================================== */

const ICONS = {
    bookOpen: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>`,
    bolt:     `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>`,
    clipboard:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" /></svg>`,
    users:    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>`,
    chat:     `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>`,
    play:     `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" /></svg>`,
    eye:      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`,
    photo:    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>`,
    film:     `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375Z" /></svg>`,
    /* להוסיף אייקונים נוספים לפי הצורך */
};

const CATEGORY_LABELS = {
    learning: 'למידה והדרכה',
    guidance: 'הנחיה ותרגול',
    visual:   'יצירה ויזואלית',
};

const GENERATORS = [
    {
        id: 'lesson-plan',
        title: 'מחולל מערכי שיעור',
        description: 'יוצר פרומפט למערך שיעור דידקטי מלא: מטרות, מהלכי הוראה, רצף לימודי ודרכי בדיקה.',
        link: 'lesson-plan.html',
        category: 'learning',
        icon: ICONS.bookOpen
    },
    {
        id: 'microlearning',
        title: 'מחולל Microlearning',
        description: 'מפיק תוצרי מיקרו-למידה חדים וקצרים: נקודות מפתח, משימות קצרות, תרגולים ממוקדים וסיכומים בהירים.',
        link: 'microlearning-generator.html',
        category: 'learning',
        icon: ICONS.bolt
    },
    {
        id: 'assessment',
        title: 'מחולל שאלות הערכה',
        description: 'בונה שאלות הערכה מדויקות בהתאם לרמות חשיבה, מטרות ויישומים מקצועיים.',
        link: 'assessment-questions.html',
        category: 'learning',
        icon: ICONS.clipboard
    },
    {
        id: 'icebreakers',
        title: 'מחולל Icebreakers',
        description: 'מפיק פעילויות פתיחה מותאמות לקבוצות ולמטרת המפגש — פשוטות, אפקטיביות ומדויקות.',
        link: 'icebreakers.html',
        category: 'guidance',
        icon: ICONS.users
    },
    {
        id: 'guiding-questions',
        title: 'מחולל שאלות מנחות',
        description: 'יוצר שאלות לפתיחה, סיכום, רפלקציה ודיון משמעותי.',
        link: 'guiding-questions.html',
        category: 'guidance',
        icon: ICONS.chat
    },
    {
        id: 'simulation',
        title: 'מחולל תרחישי סימולציה',
        description: 'בונה תרחישים הכוללים סצנות, דמויות, דילמות והתפתחויות — ללמידה חווייתית ובטוחה.',
        link: 'simulation.html',
        category: 'guidance',
        icon: ICONS.play
    },
    {
        id: 'visual-attention',
        title: 'מחולל מזניקי קשב ויזואליים',
        description: 'יוצר תמונות חכמות ומסקרנות שמבליטות רעיון, שוברות שגרה ומכניסות אנרגיה מדויקת למפגש.',
        link: 'visual-attention-generator.html',
        category: 'visual',
        icon: ICONS.eye
    },
    {
        id: 'image-generator',
        title: 'מחולל יצירת תמונות אחידות',
        description: 'מייצר פרומפטים ליצירת סדרת תמונות אחידות בסגנון, צבעוניות ואווירה.',
        link: 'image_generator.html',
        category: 'visual',
        icon: ICONS.photo
    },
    {
        id: 'storyboard',
        title: 'מחולל תסריטים ו-Storyboard',
        description: 'הופך רעיון יבש לעלילה בלתי צפויה: טוויסטים, דמויות חדות וסצנות שמייצרות למידה אחרת.',
        link: 'creative-storyboard.html',
        category: 'visual',
        icon: ICONS.film
    },
    /* ← הוסיפו מחוללים חדשים כאן ↑ */
];
