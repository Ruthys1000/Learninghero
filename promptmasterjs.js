/* =====================================================
   learninghero.js — ספרייה אחידה לכל המחוללים
   גרסה: 1.5 (Fixed Global Injections & Syntax)
   תיאור: פונקציות משותפות לכל מחוללי הפרומפטים
   Learning Hero © 2025
===================================================== */

console.log('📦 Learning Hero JS loading...');

/* ============================================
   UTILITY FUNCTIONS - פונקציות עזר
============================================ */

/**
 * החזרת כל הערכים המסומנים בצ'קבוקסים
 * @param {string} selector - CSS selector לצ'קבוקסים
 * @returns {Array} מערך של ערכים מסומנים
 */
function getCheckedValues(selector) {
    const values = Array.from(document.querySelectorAll(selector))
        .filter(el => el.checked)
        .map(el => el.value);
    console.log(`✓ getCheckedValues("${selector}"):`, values);
    return values;
}

/**
 * קבלת ערך רדיו מסומן
 * @param {string} name - שם קבוצת הרדיו
 * @returns {string|null} הערך המסומן או null
 */
function getRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    const value = selected ? selected.value : null;
    console.log(`✓ getRadioValue("${name}"):`, value);
    return value;
}

/**
 * קבלת ערך שדה לפי ID
 * @param {string} id - מזהה השדה
 * @returns {string} הערך בשדה
 */
function getFieldValue(id) {
    const field = document.getElementById(id);
    const value = field ? field.value.trim() : '';
    console.log(`✓ getFieldValue("${id}"):`, value);
    return value;
}

/**
 * קבלת הטקסט (Label) של האופציה הנבחרת מ-select
 * @param {string} id - מזהה ה-select
 * @returns {string} הטקסט של האופציה הנבחרת
 */
function getSelectedLabel(id) {
    const select = document.getElementById(id);
    // ודא שהאלמנט קיים ויש בחירה
    if (!select || select.selectedIndex === -1) return '';
    // השתמש ב-selectedIndex כדי לגשת לאופציה ול-textContent שלה
    const label = select.options[select.selectedIndex].textContent.trim();
    console.log(`✓ getSelectedLabel("${id}"):`, label);
    // אם הערך הריק הוא הראשון, נחזיר מחרוזת ריקה כדי לא להכניס "- בחר סגנון -" לפרומפט
    if (select.value === "") return "";
    return label;
}

/* ============================================
   VISUAL BEHAVIOR - התנהגות ויזואלית
============================================ */

/**
 * התנהגות ויזואלית אחידה לצ'קבוקסים
 * מוסיף מחלקת 'selected' כשנבחר
 */
function initCheckboxBehavior() {
    console.log('🔧 Initializing checkbox behavior...');
    let count = 0;
    
    document.querySelectorAll('.checkbox-option').forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        if (!checkbox) return;

        count++;

        // לחיצה על כל האזור
        option.addEventListener('click', e => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        // עדכון מחלקה
        checkbox.addEventListener('change', () => {
            option.classList.toggle('selected', checkbox.checked);
        });

        // אתחול מצב ראשוני
        if (checkbox.checked) {
            option.classList.add('selected');
        }
    });
    
    console.log(`✅ Initialized ${count} checkboxes`);
}

/**
 * התנהגות ויזואלית אחידה לרדיו באטונים
 * מוסיף מחלקת 'selected' לאופציה הנבחרת
 */
function initRadioBehavior() {
    console.log('🔧 Initializing radio behavior...');
    let count = 0;
    
    document.querySelectorAll('.radio-option').forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        if (!radio) return;

        count++;

        // לחיצה על כל האזור
        option.addEventListener('click', () => {
            if (!radio.checked) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        // עדכון מחלקות בעת שינוי
        radio.addEventListener('change', function() {
            // הסרת selected מכל האופציות באותה קבוצה
            document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => {
                r.closest('.radio-option')?.classList.remove('selected');
            });
            
            // הוספת selected לאופציה הנבחרת
            if (this.checked) {
                option.classList.add('selected');
            }
        });

        // אתחול מצב ראשוני
        if (radio.checked) {
            option.classList.add('selected');
        }
    });
    
    console.log(`✅ Initialized ${count} radio buttons`);
}

/**
 * הוספת אינדיקציה ויזואלית ל-select boxes
 */
function initSelectBehavior() {
    console.log('🔧 Initializing select behavior...');
    let count = 0;
    
    document.querySelectorAll('select').forEach(select => {
        count++;
        
        // אתחול מצב ראשוני
        if (select.value) {
            select.classList.add('selected');
        }

        select.addEventListener('change', function() {
            this.classList.add('selected');
        });
    });
    
    console.log(`✅ Initialized ${count} select boxes`);
}

/* ============================================
   RESULT DISPLAY - הצגת תוצאות
============================================ */

/**
 * הצגת תוצאה אחידה + פוטר עם קישורים לכלי AI
 * @param {string} prompt - הפרומפט שנוצר
 * @param {Object} options - אופציות נוספות (footerLinks, etc.)
 */
function showResult(prompt, options = {}) {
    console.log('📤 showResult called');
    console.log('Prompt length:', prompt.length);
    
    const defaultFooter = `


`;

    const footer = options.customFooter || defaultFooter;
    const output = document.getElementById("promptOutput");
    
    if (!output) {
        console.error('❌ Element #promptOutput not found');
        return;
    }

    output.textContent = prompt + footer;
    console.log('✅ Prompt text set');

    const resultSection = document.getElementById("result");
    if (!resultSection) {
        console.error('❌ Element #result not found');
        return;
    }

    console.log('Current result classes:', resultSection.className);
    resultSection.classList.add("show");
    console.log('After adding show:', resultSection.className);
    console.log('Result display style:', window.getComputedStyle(resultSection).display);
    
    // גלילה חלקה לתוצאות
    setTimeout(() => {
        resultSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
        console.log('✅ Scrolled to results');
    }, 100);
}

/* ============================================
   NOTIFICATIONS - הודעות למשתמש
============================================ */

/**
 * הצגת הודעת נוטיפיקציה צפה
 * @param {string} message - טקסט ההודעה
 * @param {string} type - סוג ההודעה: 'success', 'error', 'info'
 */
function showNotification(message, type = 'success') {
    console.log(`🔔 Notification [${type}]:`, message);
    
    const notification = document.createElement('div');
    notification.className = `ai-notification notification-${type}`;
    notification.textContent = message;
    
    // צבעים לפי סוג
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: ${colors[type] || colors.success};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        font-weight: 500;
        font-size: 15px;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    // אנימציית כניסה
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });
    });
    
    // הסרה אחרי 3 שניות
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/* ============================================
   COPY FUNCTIONALITY - פונקציית העתקה
============================================ */

/**
 * פונקציית העתקה אחידה ללוח
 * מעתיקה את תוכן הפרומפט ומציגה פידבק
 */
function copyPrompt() {
    console.log('📋 Copy button clicked');
    
    const output = document.getElementById("promptOutput");
    const btn = document.querySelector(".copy-button");
    
    if (!output) {
        console.error('❌ Element #promptOutput not found');
        showNotification('❌ שגיאה: לא נמצא תוכן להעתקה', 'error');
        return;
    }
    
    if (!btn) {
        console.error('❌ Copy button not found');
        return;
    }
    
    const text = output.textContent;
    const original = btn.innerHTML;

    console.log('Copying text, length:', text.length);

    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('✅ Text copied successfully');
            
            // שינוי הכפתור
            btn.innerHTML = "✅ הועתק!";
            btn.classList.add('copied');
            
            // הצגת הודעה צפה
            showNotification('✅ הפרומפט הועתק ללוח בהצלחה!');
            
            // החזרת הכפתור למצב רגיל
            setTimeout(() => {
                btn.innerHTML = original;
                btn.classList.remove('copied');
            }, 2000);
        })
        .catch(err => {
            console.error('❌ Failed to copy:', err);
            showNotification('❌ שגיאה בהעתקה. אנא נסה להעתיק ידנית.', 'error');
        });
}

/* ============================================
   MAIN INIT - אתחול מרכזי
============================================ */

/**
 * פונקציה מרכזית שמופעלת בכל מחולל
 * @param {Object} options - אובייקט הגדרות
 * @param {string} options.formId - ID של הטופס
 * @param {string} options.buttonId - ID של כפתור השליחה (אופציונלי)
 * @param {Function} options.collectData - פונקציה לאיסוף הנתונים
 * @param {Function} options.buildPrompt - פונקציה לבניית הפרומפט
 */
function initPromptGenerator(options) {
    console.log('🚀 initPromptGenerator called with options:', options);
    
    const { formId, buttonId, collectData, buildPrompt } = options;

    // אתחול התנהגויות ויזואליות
    initCheckboxBehavior();
    initRadioBehavior();
    initSelectBehavior();

    // פונקציה משותפת לביצוע הגנרציה
    function handleGenerate(e) {
        console.log('🎯 handleGenerate triggered');
        if (e) {
            e.preventDefault();
            console.log('✓ Default prevented');
        }

        try {
            // שימו לב: ייתכן ו-collectData יכיל קריאות ל-getSelectedLabel החדש
            console.log('📊 Collecting data...');
            const data = collectData();
            
            console.log('🔨 Building prompt...');
            const prompt = buildPrompt(data);
            
            console.log('📤 Showing result...');
            showResult(prompt);
            
            console.log('✅ Generation completed successfully');
        } catch (error) {
            console.error('❌ Error generating prompt:', error);
            showNotification('❌ אירעה שגיאה ביצירת הפרומפט. אנא בדוק את השדות ונסה שוב.', 'error');
        }
    }

    // אם יש טופס - האזן ל-submit
    if (formId) {
        const form = document.getElementById(formId);
        if (form) {
            console.log(`✅ Form found: ${formId}`);
            form.addEventListener("submit", handleGenerate);
            console.log('✓ Submit listener added');
        } else {
            console.warn(`⚠️ Form with id "${formId}" not found`);
        }
    }

    // אם יש כפתור ספציפי - האזן ל-click
    if (buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            console.log(`✅ Button found: ${buttonId}`);
            button.addEventListener("click", handleGenerate);
            console.log('✓ Click listener added');
        } else {
            console.warn(`⚠️ Button with id "${buttonId}" not found`);
        }
    }

    // אם לא הוגדר buttonId, חפש כפתור submit כללי
    if (!buttonId && !formId) {
        const submitBtn = document.querySelector('.submit-button, .generate-btn, button[type="submit"]');
        if (submitBtn) {
            console.log('✅ Generic submit button found');
            submitBtn.addEventListener("click", handleGenerate);
            console.log('✓ Click listener added');
        } else {
            console.warn('⚠️ No submit button found');
        }
    }
    
    console.log('✅ initPromptGenerator completed');
}


/* ============================================
   AUTO INIT - אתחול אוטומטי
============================================ */

/**
 * הערה: אתחול מתבצע דרך initPromptGenerator() בכל מחולל
 * לא צריך אתחול אוטומטי נפרד כאן
 */

/* ============================================
   NAVBAR INJECTION - הזרקת סרגל ניווט גלובלי
============================================ */

function isHomePage() {
    try {
        const p = window.location.pathname || '';
        return p.endsWith('/') || p.endsWith('/index.html') || p.endsWith('index.html');
    } catch {
        return false;
    }
}

function buildGlobalNavbarHtml() {
    // כלל: בכל הדפים יש תפריט.
    // בדף הבית (index) מוצג קישור "אודות".
    // בכל שאר הדפים (כולל about) מוצג קישור "המחוללים" שמחזיר ל-index#generators.
    const primaryLinkHtml = isHomePage()
        ? `<li><a href="about.html" style="color: white; text-decoration: none; font-weight: 600;">אודות</a></li>`
        : `<li><a href="index.html#generators" style="color: white; text-decoration: none; font-weight: 600;">המחוללים</a></li>`;

    const contactHref = isHomePage() ? '#contact' : 'index.html#contact';

    return `
<nav class="navbar" style="
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    padding: 20px; 
    background: rgba(15, 15, 35, 0.95); 
    backdrop-filter: blur(20px); 
    border-bottom: 2px solid rgba(102, 126, 234, 0.3);
">
    <a href="index.html" class="navbar-logo" style="
        text-decoration: none;
        font-size: 2.2em; 
        font-weight: 900; 
        margin-bottom: 15px;
        background: linear-gradient(45deg, #00f2fe, #4facfe);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    ">Learning Hero</a>
    <ul class="navbar-links" style="
        list-style: none; 
        display: flex; 
        gap: 20px; 
        padding: 0; 
        margin: 0;
        flex-wrap: wrap;
        justify-content: center;
    ">
        ${primaryLinkHtml}
        <li><a href="${contactHref}" style="color: white; text-decoration: none; font-weight: 600;">צרו קשר</a></li>
    </ul>
</nav>
`.trim();
}

/**
 * טוען את סרגל הניווט הגלובלי לתוך האלמנט #global-navbar-container.
 */
function loadGlobalNavbar() {
    const targetElement = document.querySelector('#global-navbar-container');
    if (targetElement) {
        targetElement.innerHTML = buildGlobalNavbarHtml();
        console.log('✅ Loaded Global Navbar via JavaScript injection');
    }
}


/* ============================================
   FOOTER INJECTION (Enhanced) - הזרקת פוטר מעוצב
============================================ */

const GLOBAL_FOOTER_HTML = `
<footer class="footer" id="about" style="
    text-align: center; 
    padding: 60px 20px; 
    color: white; 
    background: rgba(15, 15, 35, 0.8);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(102, 126, 234, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 100%;
    font-family: 'Heebo', sans-serif;
">
    <div class="footer-ai-links" style="
        background: rgba(255, 255, 255, 0.05);
        padding: 25px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 500px;
        width: 100%;
    ">
        <strong style="display: block; margin-bottom: 20px; color: #4facfe; font-size: 1.2em; font-weight: 700;">קישורים מהירים לכלי AI:</strong>
        <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
            <a href="https://chat.openai.com/" target="_blank" style="background: rgba(255, 255, 255, 0.08); padding: 8px 18px; border-radius: 10px; color: #fff; text-decoration: none; font-weight: 600; font-size: 0.95em; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease;">ChatGPT</a>
            <a href="https://claude.ai/" target="_blank" style="background: rgba(255, 255, 255, 0.08); padding: 8px 18px; border-radius: 10px; color: #fff; text-decoration: none; font-weight: 600; font-size: 0.95em; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease;">Claude</a>
            <a href="https://gemini.google.com/" target="_blank" style="background: rgba(255, 255, 255, 0.08); padding: 8px 18px; border-radius: 10px; color: #fff; text-decoration: none; font-weight: 600; font-size: 0.95em; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease;">Gemini</a>
        </div>
    </div>
    
    <div style="line-height: 1.8;">
        <strong style="font-size: 1.4em; background: linear-gradient(135deg, #4facfe, #00f2fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 900;">Learning Hero © 2025</strong><br>
        <span style="color: rgba(255,255,255,0.7);">Created with ❤️ by Ruthy Salomon</span><br>
        <span style="color: rgba(255,255,255,0.7);">פותח עבור שיפור תהליכי למידה והדרכה</span>
    </div>
</footer>
`;
/**
 * טוען את הפוטר הגלובלי לתוך האלמנט #global-footer.
 * זה מחליף את הצורך ב-Fetch לקובץ חיצוני.
 */
function loadGlobalFooter() {
    const targetElement = document.querySelector('#global-footer');
    if (targetElement) {
        targetElement.innerHTML = GLOBAL_FOOTER_HTML;
        console.log('✅ Loaded Global Footer via JavaScript injection');
    } else {
        // הערה: ניתן להוסיף כאן לוג אם האלמנט חסר
    }
}

// *** הסרנו את פונקציית loadHtmlPartial המקורית שהשתמשה ב-fetch ***


/* ============================================
   GLOBAL INJECTIONS INIT - אתחול גלובלי סופי
============================================ */

// הפעלת טעינת הפוטר וה-NAVBAR לאחר טעינת כל הדף
document.addEventListener('DOMContentLoaded', function() {
    // 1. טען את הנאב-בר
    loadGlobalNavbar(); 
    // 2. טען את הפוטר
    loadGlobalFooter();
});
console.log('✅ Learning Hero JS loaded successfully');

// ============================================
// COLOR PALETTE UTILITIES - כלים לפלטות צבעים
// ============================================

// פונקציה להמרת HEX ל-HSL
function hexToHsl(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r,g,b), cmax = Math.max(r,g,b), delta = cmax - cmin, h = 0, s = 0, l = (cmax + cmin) / 2;
    if (delta == 0) { h = s = 0; } 
    else {
        s = delta / (1 - Math.abs(2 * l - 1));
        switch (cmax) {
            case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
            case g: h = (b - r) / delta + 2; break;
            case b: h = (r - g) / delta + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s, l];
}

// פונקציה להמרת HSL ל-HEX
function hslToHex(h, s, l) {
    h /= 360;
    let r, g, b;
    if (s === 0) { r = g = b = l; } 
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// פונקציה ליצירת פלטת צבעים מאוזנת (5 צבעים) - גרסה מתוקנת
function generatePalette(baseHex) {
    console.log('Generating palette for:', baseHex);
    // ודא ש-HEX תקין
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(baseHex)) {
        console.error("Invalid HEX provided to generatePalette.");
        return [baseHex, '#FFFFFF', '#000000', '#CCCCCC', '#333333']; // פלטת ברירת מחדל בטוחה
    }
    
    // המרת צבע הבסיס ל-HSL
    const [h, s, l] = hexToHsl(baseHex);
    const palette = [baseHex]; // 1. צבע בסיס (נשאר ראשון) 

    // הגדרת שינויי בהירות ורוויה יחסית, כדי לשמר את ה-Hue המקורי
    const s_max = Math.min(s + 0.1, 1);
    const l_max = Math.min(l + 0.15, 0.95);
    const l_min = Math.max(l - 0.15, 0.05);

    // 2. צבע אנלוגי (30 מעלות) - שומר על רוויה/בהירות קרובה
    palette.push(hslToHex((h + 30) % 360, s, l));

    // 3. צבע הדגשה (Accent) - ניגודיות גבוהה (180 מעלות + רוויה ובהירות מוגברת)
    palette.push(hslToHex((h + 180) % 360, s_max, l_max));

    // 4. גוון בהיר (Tint) - אותו Hue, רוויה נמוכה, בהירות גבוהה (כמעט לבן)
    // משמש לצבעי רקע משניים או טקסט בהיר
    palette.push(hslToHex(h, Math.max(s - 0.3, 0.1), 0.9));
    
    // 5. גוון כהה (Shade) - אותו Hue, רוויה גבוהה, בהירות נמוכה (כמעט שחור)
    // משמש לקווים, צללים או טקסט כהה
    palette.push(hslToHex(h, Math.min(s + 0.2, 1), l_min));

    console.log('✅ Generated new palette:', palette);
    return palette;
}
// פונקציה ראשית לעדכון ה-UI והפלטה
function updatePaletteUI(globalPaletteArray) {
    console.log('🔄 updatePaletteUI called');
    const baseColorInput = document.getElementById('baseColor');
    if (!baseColorInput) {
        console.error('❌ baseColor element not found');
        return;
    }
    
    const baseHex = baseColorInput.value.toUpperCase();
    
    // עדכון התצוגה של צבע הבסיס
    const baseColorDisplay = document.getElementById('baseColorDisplay');
    if (baseColorDisplay) {
        baseColorDisplay.textContent = baseHex;
    }
    
    // עדכון ה-swatch (הריבוע הצבעוני) של צבע הבסיס
    const baseColorSwatch = document.getElementById('baseColorSwatch');
    if (baseColorSwatch) {
        baseColorSwatch.style.backgroundColor = baseHex;
    }
    
    // יצירת הפלטה החדשה
    const newPalette = generatePalette(baseHex);
    
    // עדכון המערך הגלובלי שאותו הפונקציה קיבלה
    globalPaletteArray.length = 0; // ניקוי המערך
    globalPaletteArray.push(...newPalette); // מילוי מחדש

    // עדכון הריבועים בתצוגה המקדימה של הפלטה
    const previewContainer = document.getElementById('palettePreview');
    if (previewContainer) {
        newPalette.forEach((hex, index) => {
            const swatchId = `swatch${index + 1}`;
            const swatch = document.getElementById(swatchId);
            if (swatch) {
                swatch.style.backgroundColor = hex;
            }
        });
    }
}
/* ============================================
   END GLOBAL INJECTIONS
============================================ */
