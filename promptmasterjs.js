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
    const defaultFooter = `


`;

    const footer = options.customFooter || defaultFooter;
    const output = document.getElementById("promptOutput");
    if (!output) return;

    output.textContent = prompt + footer;

    const resultSection = document.getElementById("result");
    if (!resultSection) return;

    resultSection.classList.add("show");

    // גלילה חלקה לתוצאות
    setTimeout(() => {
        resultSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
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
    const primaryLinkHtml = isHomePage()
        ? `<li><a href="about.html">מדריך פרומפטים</a></li>`
        : `<li><a href="index.html#generators">המחוללים</a></li>`;

    const contactHref = isHomePage() ? '#contact' : 'index.html#contact';

    return `
<nav class="navbar">
    <a href="index.html" class="navbar-logo">Learning Hero</a>
    <ul class="navbar-links">
        ${primaryLinkHtml}
        <li><a href="${contactHref}">צרו קשר</a></li>
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
<footer class="footer">
    <div class="footer-links">
        <span class="footer-links-label">קישורים מהירים לכלי AI:</span>
        <a href="https://chat.openai.com/" target="_blank">ChatGPT</a>
        <span class="sep">|</span>
        <a href="https://claude.ai/" target="_blank">Claude</a>
        <span class="sep">|</span>
        <a href="https://gemini.google.com/" target="_blank">Gemini</a>
    </div>
    <div class="footer-meta">
        <strong>Learning Hero © 2025</strong><br>
        Created with ❤️ by Ruthy Salomon<br>
        פותח עבור שיפור תהליכי למידה והדרכה
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

/* ============================================
   HOME PAGE LOGIC — data lives in generators-config.js
============================================ */

const _ADD_CARD_HTML = `
<a href="add-generator.html" class="generator-card generator-card--add">
    <div class="card-icon card-icon--add">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
    </div>
    <h3 class="generator-title">בקשו מחולל חדש</h3>
    <p class="generator-description">תארו מה אתם צריכים — אנחנו נדאג לשאר</p>
</a>`;

function renderGeneratorsGrid(data) {
    const grid = document.getElementById('generators-grid');
    if (!grid) return;

    const cardsHTML = data.length === 0
        ? '<p class="no-results">לא נמצאו מחוללים התואמים לחיפוש.</p>'
        : data.map(g => {
            const label = (typeof CATEGORY_LABELS !== 'undefined' && CATEGORY_LABELS[g.category]) || g.category;
            return `
        <a href="${g.link}" class="generator-card" data-category="${g.category}">
            <div class="card-icon">${g.icon}</div>
            <span class="category-tag category-${g.category}">${label}</span>
            <h3 class="generator-title">${g.title}</h3>
            <p class="generator-description">${g.description}</p>
        </a>`;
        }).join('');

    grid.innerHTML = cardsHTML + _ADD_CARD_HTML;
}

function initGeneratorsPage() {
    if (!document.getElementById('generators-grid')) return;

    let activeCategory = 'all';
    let searchQuery = '';
    let sortOrder = 'alpha';

    function applyFiltersAndSort() {
        let result = GENERATORS.filter(g => {
            const label = (typeof CATEGORY_LABELS !== 'undefined' && CATEGORY_LABELS[g.category]) || '';
            const matchCategory = activeCategory === 'all' || g.category === activeCategory;
            const matchSearch = searchQuery === '' ||
                g.title.includes(searchQuery) ||
                g.description.includes(searchQuery) ||
                label.includes(searchQuery);
            return matchCategory && matchSearch;
        });

        if (sortOrder === 'alpha') {
            result = result.slice().sort((a, b) => a.title.localeCompare(b.title, 'he'));
        }

        renderGeneratorsGrid(result);
    }

    applyFiltersAndSort();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            applyFiltersAndSort();
        });
    });

    let debounceTimer;
    const searchInput = document.getElementById('generator-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                searchQuery = searchInput.value.trim();
                applyFiltersAndSort();
            }, 200);
        });
    }

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortOrder = sortSelect.value;
            applyFiltersAndSort();
        });
    }
}

/* ============================================
   DYNAMIC GENERATOR — רינדור מחולל מהגדרות
   ============================================
   מאפשר הוספת מחולל חדש ב-generators-config.js
   ללא יצירת קובץ HTML נפרד.

   כל מחולל חדש מגדיר:
     fields      — מבנה שדות הטופס (ראה תיעוד למטה)
     buildPrompt — פונקציה שמקבלת data ומחזירה פרומפט
     info        — טקסט תיבת "איך זה עובד?"  (אופציונלי)
     tagline     — כותרת משנה (אופציונלי, ברירת מחדל: description)
     submitLabel — טקסט כפתור השליחה (אופציונלי)
     methodology — HTML עבור סקשן "הפרומפט מבפנים" (אופציונלי)
============================================ */

/**
 * רינדור HTML לשדה בודד.
 * סוגי שדות נתמכים: text | textarea | number | select | radio | checkbox | inline
 * @param {Object} field - הגדרת השדה
 * @returns {string} HTML
 */
function _renderInput(field) {
    const tooltip = field.tooltip
        ? `<span class="tooltip"><span class="tooltiptext">${field.tooltip}</span></span>`
        : '';

    const multiNote = (field.type === 'checkbox' && field.multiSelectNote !== false)
        ? ' <span style="font-weight:400">(ניתן לבחור יותר מאחת)</span>'
        : '';

    const labelFor = (field.type === 'radio' || field.type === 'checkbox' || field.type === 'inline')
        ? '' : `for="${field.id}"`;

    const label = field.label
        ? `<label class="label" ${labelFor}><strong>${field.label}</strong>${tooltip}${multiNote}</label>`
        : '';

    const helper = field.helperText
        ? `<div class="helper-text">${field.helperText}</div>`
        : '';

    let inputHTML = '';

    switch (field.type) {
        case 'text':
            inputHTML = `<input type="text" id="${field.id}" name="${field.id}"${field.placeholder ? ` placeholder="${field.placeholder}"` : ''}${field.required ? ' required' : ''}>`;
            break;

        case 'textarea':
            inputHTML = `<textarea id="${field.id}" name="${field.id}" rows="${field.rows || 4}"${field.placeholder ? ` placeholder="${field.placeholder}"` : ''}${field.required ? ' required' : ''}></textarea>`;
            break;

        case 'number':
            inputHTML = `<input type="number" id="${field.id}" name="${field.id}"${field.min !== undefined ? ` min="${field.min}"` : ''}${field.max !== undefined ? ` max="${field.max}"` : ''}${field.step ? ` step="${field.step}"` : ''}${field.defaultValue !== undefined ? ` value="${field.defaultValue}"` : ''}${field.required ? ' required' : ''}>`;
            break;

        case 'select': {
            const opts = (field.options || []).map(o =>
                `<option value="${o.value}"${o.selected ? ' selected' : ''}>${o.label}</option>`
            ).join('');
            inputHTML = `<select id="${field.id}" name="${field.id}">${opts}</select>`;
            break;
        }

        case 'radio': {
            const layout = field.layout || '2col';
            const items = (field.options || []).map(o =>
                `<div class="radio-option">
                    <input type="radio" id="${o.id}" name="${field.name}" value="${o.value}">
                    <label for="${o.id}"><span>${o.label}</span></label>
                </div>`
            ).join('');
            inputHTML = `<div class="radio-group-${layout}">${items}</div>`;
            break;
        }

        case 'checkbox': {
            const layout = field.layout || '2col';
            const items = (field.options || []).map(o =>
                `<div class="checkbox-option">
                    <input type="checkbox" id="${o.id}" name="${field.name}" value="${o.value}">
                    <label for="${o.id}">${o.label}</label>
                </div>`
            ).join('');
            inputHTML = `<div class="checkbox-group-${layout}">${items}</div>`;
            break;
        }

        case 'inline': {
            // מספר שדות זה לצד זה בתוך .time-inputs
            const inlineHTML = (field.inputs || []).map(sub => {
                const subHelper = sub.helperText ? `<div class="helper-text">${sub.helperText}</div>` : '';
                return `<div>${_renderRawInput(sub)}${subHelper}</div>`;
            }).join('');
            return `<div class="input-group">${label}<div class="time-inputs">${inlineHTML}</div>${helper}</div>`;
        }

        default:
            return '';
    }

    return `<div class="input-group">${label}${inputHTML}${helper}</div>`;
}

/**
 * רינדור שדה גולמי (ללא wrapper) — לשימוש בתוך inline.
 * @param {Object} field
 * @returns {string} HTML
 */
function _renderRawInput(field) {
    switch (field.type) {
        case 'number':
            return `<input type="number" id="${field.id}" name="${field.id}"${field.min !== undefined ? ` min="${field.min}"` : ''}${field.max !== undefined ? ` max="${field.max}"` : ''}${field.step ? ` step="${field.step}"` : ''}${field.defaultValue !== undefined ? ` value="${field.defaultValue}"` : ''}>`;
        case 'select': {
            const opts = (field.options || []).map(o =>
                `<option value="${o.value}"${o.selected ? ' selected' : ''}>${o.label}</option>`
            ).join('');
            return `<select id="${field.id}" name="${field.id}">${opts}</select>`;
        }
        default:
            return `<input type="${field.type || 'text'}" id="${field.id}" name="${field.id}"${field.placeholder ? ` placeholder="${field.placeholder}"` : ''}>`;
    }
}

/**
 * איסוף אוטומטי של נתוני הטופס ממבנה ה-fields.
 * מחזיר אובייקט data שניתן להעביר ל-buildPrompt.
 * @param {Array} fields - מבנה שדות (זהה ל-config.fields)
 * @returns {Object} data
 */
function autoCollectData(fields) {
    const data = {};
    (fields || []).forEach(section => {
        (section.inputs || []).forEach(field => {
            if (field.type === 'radio') {
                data[field.name] = getRadioValue(field.name);
            } else if (field.type === 'checkbox') {
                data[field.name] = getCheckedValues(`input[name="${field.name}"]`);
            } else if (field.type === 'inline') {
                (field.inputs || []).forEach(sub => {
                    if (sub.id) data[sub.id] = getFieldValue(sub.id);
                });
            } else if (field.id) {
                data[field.id] = getFieldValue(field.id);
            }
        });
    });
    return data;
}

/**
 * טוען מחולל דינמי לתוך עמוד generator.html ממבנה config.
 * מופעל אוטומטית מ-generator.html.
 * @param {Object} config - אובייקט הגדרת המחולל מ-GENERATORS
 */
function loadGeneratorPage(config) {
    document.title = `${config.title} | Learning Hero`;

    const headerEl = document.getElementById('generator-header');
    if (headerEl) {
        const iconHtml = config.icon ? `<div class="header-icon">${config.icon}</div>` : '';
        headerEl.innerHTML = `${iconHtml}<h1>${config.title}</h1><p>${config.tagline || config.description}</p>`;
    }

    if (config.info) {
        const infoEl = document.getElementById('generator-info');
        if (infoEl) {
            infoEl.innerHTML = `<h3>איך זה עובד?</h3><p>${config.info}</p>`;
            infoEl.style.display = '';
        }
    }

    if (config.methodology) {
        const methEl = document.getElementById('generator-methodology');
        const bodyEl = document.getElementById('methodology-body');
        if (methEl && bodyEl) {
            bodyEl.innerHTML = config.methodology;
            methEl.style.display = '';
        }
    }

    const fieldsEl = document.getElementById('generator-fields');
    if (fieldsEl && config.fields) {
        fieldsEl.innerHTML = config.fields.map((section, i) => {
            const fieldsHTML = (section.inputs || []).map(_renderInput).join('');
            return `<div class="section">
    <h2 class="section-title"><span class="section-number">${i + 1}</span>${section.section}</h2>
    ${fieldsHTML}
</div>`;
        }).join('');
    }

    const submitBtn = document.getElementById('generator-submit-btn');
    if (submitBtn && config.submitLabel) {
        submitBtn.textContent = config.submitLabel;
    }

    initPromptGenerator({
        formId: 'generatorForm',
        collectData: () => autoCollectData(config.fields),
        buildPrompt: config.buildPrompt
    });
}
