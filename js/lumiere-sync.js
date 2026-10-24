/**
 * Lumiere Cafe & Roastery - Live Sync & State Engine
 * Manages LocalStorage persistence, dynamic DOM updates, and Admin CMS synchronization.
 */

const LUMIERE_STORAGE_KEY = 'lumiere_site_data';
const LUMIERE_AUTH_KEY = 'lumiere_admin_auth';

const DEFAULT_LUMIERE_DATA = {
  settings: {
    brandName: 'لوميير كافيه & لاونج',
    brandTagline: 'LUMIÈRE • ARTISAN ROASTERY',
    announcement: 'استمتع بأجواء شرفة لوميير المفتوحة الآن في الرياض | جلسات خارجية فاخرة',
    heroTitle: 'حيث تلتقي حرفة القهوة بفخامة الأجواء العصرية',
    heroSubtitle: 'محمصة مختصة ومقهى راقٍ في قلب العاصمة الرياض، نقدم أجود محاصيل البن العالمية المحمصة بعناية، مع قائمة مبتكرة من خيارات البرانش والحلويات الفرنسية المبتكرة.',
    phone: '+966 11 488 9900',
    whatsapp: '+966 11 488 9900',
    address: 'طريق الأمير محمد بن عبدالعزيز (التحلية)، حي العليا، الرياض',
    hoursWeekday: 'يومياً من 6:30 صباحاً حتى 1:30 بعد منتصف الليل',
    hoursWeekend: 'الخميس والجمعة: من 6:30 صباحاً حتى 2:30 فجراً',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    tiktok: 'https://tiktok.com',
    adminPassword: 'Abdo@ProF_2000'
  },
  menu: [
    {
        "id": "item-1",
        "category": "coffee",
        "image": "images/v60.jpg",
        "name": "V60 مقطرة - إثيوبيا قوجي",
        "badge": "الأكثر طلباً",
        "price": 28,
        "desc": "محصول فاخر بإيحاءات الياسمين والخوخ والعسل، تحضير يدوي متوازن مع ثلج نقي أو دافئ."
    },
    {
        "id": "item-2",
        "category": "coffee",
        "image": "images/flatwhite.jpg",
        "name": "فلات وايت لوميير الحرفي",
        "badge": "",
        "price": 22,
        "desc": "دبل شوت إسبريسو كولومبي مع حليب متبخر برغوة مخملية دقيقة ورسم لاتيه آرت احترافي."
    },
    {
        "id": "item-3",
        "category": "brunch",
        "image": "images/benedict.jpg",
        "name": "بيض بينيديكت الكمأة والساوردو",
        "badge": "توقيع الشيف",
        "price": 48,
        "desc": "بيض عضوي مسلوق بمهارة، صلصة هولنديز بزيت الكمأة الأسود، فوق شريحة خبز ساوردو مخبوز بالحطب."
    },
    {
        "id": "item-4",
        "category": "brunch",
        "image": "images/avocado.jpg",
        "name": "توست الأفوكادو والفيتا المتبلة",
        "badge": "",
        "price": 42,
        "desc": "هريس أفوكادو طازج مع حبوب الرمان وجبن فيتا يوناني مع بذور الشيا ودبس الرمان العضوي."
    },
    {
        "id": "item-5",
        "category": "sweets",
        "image": "images/tiramisu.jpg",
        "name": "تيراميسو لوميير الإيطالي",
        "badge": "موصى به",
        "price": 36,
        "desc": "بسكويت ليدي فينجر مغموس بإسبريسو لوميير المركز مع كريمة مسكربون طازجة وغبار الكاكاو الخام."
    },
    {
        "id": "item-6",
        "category": "sweets",
        "image": "images/croissant.jpg",
        "name": "كرواسون اللوز البلجيكي",
        "badge": "",
        "price": 24,
        "desc": "كرواسون زبدة فرنسي محشو بكريمة اللوز الغنية ومغطى برقائق اللوز المحمصة وسكر ناعم."
    },
    {
        "id": "item-7",
        "category": "drinks",
        "image": "images/mojito.jpg",
        "name": "باشن فروت & ريحان موكتيل",
        "badge": "منعش",
        "price": 29,
        "desc": "لب الباشن فروت الطبيعي مع أوراق الريحان المنعشة والمياه الفوارة وقطع الليمون الأخضر."
    },
    {
        "id": "item-8",
        "category": "drinks",
        "image": "images/matcha.jpg",
        "name": "سيريمونيال ماتشا لاتيه (اليابان)",
        "badge": "",
        "price": 32,
        "desc": "بودرة ماتشا يابانية فاخرة درجة أولى مخفوقة يدوياً مع حليب الشوفان ومحلاة بعسل الزهور."
    }
]
};

function getLumiereData() {
  try {
    const raw = localStorage.getItem(LUMIERE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LUMIERE_STORAGE_KEY, JSON.stringify(DEFAULT_LUMIERE_DATA));
      return DEFAULT_LUMIERE_DATA;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading LocalStorage, falling back to defaults:', e);
    return DEFAULT_LUMIERE_DATA;
  }
}

function saveLumiereData(data) {
  localStorage.setItem(LUMIERE_STORAGE_KEY, JSON.stringify(data));
  syncLiveDOM();
}

function syncLiveDOM() {
  const data = getLumiereData();
  const s = data.settings;

  // Sync Brand titles
  document.querySelectorAll('.brand-name').forEach(el => {
    el.textContent = s.brandName;
  });
  document.querySelectorAll('.brand-tagline').forEach(el => {
    el.innerHTML = s.brandTagline;
  });

  // Announcement
  const annEl = document.querySelector('.announcement-item span');
  if (annEl && s.announcement) {
    annEl.textContent = s.announcement;
  }

  // Hero section
  const h1El = document.querySelector('.hero-content h1, .hero-title');
  if (h1El && s.heroTitle) h1El.textContent = s.heroTitle;

  const subEl = document.querySelector('.hero-subtitle');
  if (subEl && s.heroSubtitle) subEl.textContent = s.heroSubtitle;

  // Contact info & Phone links
  document.querySelectorAll('a[href^="tel:"]').forEach(a => {
    a.href = 'tel:' + s.phone.replace(/[^0-9+]/g, '');
  });

  // Render dynamic menu if grid exists
  const grid = document.getElementById('menuItemsGrid');
  if (grid && data.menu && data.menu.length > 0) {
    // If the grid was rendered or modified in CMS
    let html = '';
    data.menu.forEach(item => {
      const badgeHtml = item.badge ? `<span class="item-badge-popular">${item.badge}</span>` : '';
      html += `
        <div class="menu-item-card" data-category="${item.category}">
            <div class="item-thumb-box">
                <img decoding="async" src="${item.image}" alt="${item.name}" title="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-title-row">
                    <span class="item-name">${item.name}</span>
                    ${badgeHtml}
                    <span class="item-dots"></span>
                    <span class="item-price">${item.price} <small>ريال</small></span>
                </div>
                <p class="item-desc">${item.desc}</p>
            </div>
        </div>
      `;
    });
    grid.innerHTML = html;
  }
}

// Run sync on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', syncLiveDOM);
}
