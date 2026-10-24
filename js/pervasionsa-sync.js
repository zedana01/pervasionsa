/**
 * Pervasion SA - Central Reactive Sync Engine
 * Manages LocalStorage state, Site Identity, Services, Inquiries, Maintenance Mode, and Live DOM Updates.
 */

const PERVASION_STORAGE_KEY = 'pervasionsa_site_data_v1';
const PERVASION_AUTH_KEY = 'pervasionsa_admin_auth_v1';

const DEFAULT_PERVASION_DATA = {
  settings: {
    siteName: 'بيرفيجن السعودية',
    siteNameEn: 'Pervasion SA',
    tagline: 'حلول تقنية ورقمية رائدة تواكب تطلعات رؤية السعودية 2030',
    taglineEn: 'Leading Digital & Technology Solutions Driving Saudi Vision 2030',
    email: 'info@pervasionsa.com',
    phone: '+966 11 456 7890',
    whatsapp: '+966 50 123 4567',
    address: 'طريق الملك فهد، برج الفيصلية، الرياض، المملكة العربية السعودية',
    addressEn: 'King Fahd Road, Riyadh, Kingdom of Saudi Arabia',
    crNumber: '1010789456',
    maintenanceMode: false,
    maintenanceTitle: 'الموقع قيد التطوير والترقية الشاملة',
    maintenanceMsg: 'نعمل حالياً على تحديث البوابة الرقمية لشركة بيرفيجن السعودية لتوفير أفضل حلول التحول الرقمي والحوسبة السحابية لعملائنا في المملكة. ترقبوا الإطلاق قريباً!',
    launchDate: '2026-12-01',
    twitter: 'https://x.com/pervasionsa',
    linkedin: 'https://linkedin.com/company/pervasionsa',
    adminPassword: 'admin'
  },
  services: [
    {
      id: 'srv-1',
      icon: 'fas fa-cloud',
      title: 'الحوسبة السحابية والبنية التحتية',
      titleEn: 'Cloud Infrastructure & DevOps',
      desc: 'تصميم وإدارة بيئات سحابية هجينة ومتقدمة تضمن أعلى معايير التوافرية بنسبة 99.99% وسرعة فائقة وفق أنظمة هيئة الاتصالات والفضاء والتقنية.',
      category: 'cloud'
    },
    {
      id: 'srv-2',
      icon: 'fas fa-shield-alt',
      title: 'الأمن السيبراني وحماية البيانات',
      titleEn: 'Cybersecurity & Compliance',
      desc: 'حلول وقائية متقدمة لحماية أصول الشركات ومراقبة التهديدات السيبرانية على مدار الساعة بما يتماشى مع ضوابط الهيئة الوطنية للأمن السيبراني (NCA).',
      category: 'security'
    },
    {
      id: 'srv-3',
      icon: 'fas fa-code',
      title: 'تطوير البرمجيات والمنصات الرقمية',
      titleEn: 'Custom Software & Web Platforms',
      desc: 'بناء تطبيقات ويب وهواتف ذكية مصممة خصيصاً لأتمتة أعمال المؤسسات باستخدام أحدث المعماريات السريعة والمستقرة والمستضافة على شبكات CDN عالمية.',
      category: 'software'
    },
    {
      id: 'srv-4',
      icon: 'fas fa-brain',
      title: 'الذكاء الاصطناعي وأتمتة العمليات',
      titleEn: 'AI & Intelligent Automation',
      desc: 'دمج نماذج الذكاء الاصطناعي المخصصة وتحليل البيانات الضخمة وأتمتة المهام الروتينية لرفع الإنتاجية وخفض التكاليف التشغيلية للمؤسسات.',
      category: 'ai'
    },
    {
      id: 'srv-5',
      icon: 'fas fa-network-wired',
      title: 'الربط والتكامل والأنظمة المؤسسية',
      titleEn: 'ERP & System Integrations',
      desc: 'تكامل المنظومات البرمجية وربط واجهات برمجة التطبيقات (APIs) مع الأنظمة الحكومية والبنكية السعودية والحلول المالية المعتمدة.',
      category: 'integration'
    },
    {
      id: 'srv-6',
      icon: 'fas fa-headset',
      title: 'الاستشارات التقنية والدعم المستمر 24/7',
      titleEn: 'IT Consulting & 24/7 Support',
      desc: 'استشارات تقنية استراتيجية يقدمها نخبة من الخبراء التقنيين لضمان استمرارية الأعمال وحل المشكلات الفنية فور حدوثها في أي وقت.',
      category: 'support'
    }
  ],
  stats: [
    { number: '99.99%', label: 'معدل التوافرية السحابية', labelEn: 'Uptime SLA' },
    { number: '+120', label: 'مشروع رقمي منجز', labelEn: 'Completed Projects' },
    { number: '24/7', label: 'دعم ومراقبة مستمرة', labelEn: 'Proactive Support' },
    { number: '100%', label: 'امتثال للأنظمة السعودية', labelEn: 'Saudi Compliance' }
  ],
  inquiries: [
    {
      id: 'inq-101',
      date: '2026-10-24 11:15',
      name: 'عبدالله السعدون',
      email: 'a.saadoun@saudicorp.sa',
      phone: '+966 55 432 1098',
      service: 'الحوسبة السحابية والبنية التحتية',
      message: 'نود استشارة بخصوص نقل خوادمنا الداخلية إلى بيئة سحابية هجينة متوافقة مع متطلبات الأمن السيبراني السعودية.',
      status: 'new'
    }
  ]
};

const PervasionData = {
  get: function() {
    try {
      const stored = localStorage.getItem(PERVASION_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PERVASION_STORAGE_KEY, JSON.stringify(DEFAULT_PERVASION_DATA));
        return JSON.parse(JSON.stringify(DEFAULT_PERVASION_DATA));
      }
      const data = JSON.parse(stored);
      // Ensure missing keys exist
      if (!data.settings) data.settings = DEFAULT_PERVASION_DATA.settings;
      if (!data.services || data.services.length === 0) data.services = DEFAULT_PERVASION_DATA.services;
      if (!data.stats) data.stats = DEFAULT_PERVASION_DATA.stats;
      if (!data.inquiries) data.inquiries = DEFAULT_PERVASION_DATA.inquiries;
      return data;
    } catch (e) {
      console.error('PervasionData get error:', e);
      return JSON.parse(JSON.stringify(DEFAULT_PERVASION_DATA));
    }
  },

  save: function(data) {
    try {
      localStorage.setItem(PERVASION_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('pervasion_data_updated', { detail: data }));
      return true;
    } catch (e) {
      console.error('PervasionData save error:', e);
      return false;
    }
  },

  resetDefaults: function() {
    localStorage.setItem(PERVASION_STORAGE_KEY, JSON.stringify(DEFAULT_PERVASION_DATA));
    window.dispatchEvent(new CustomEvent('pervasion_data_updated', { detail: DEFAULT_PERVASION_DATA }));
    return DEFAULT_PERVASION_DATA;
  },

  addInquiry: function(inquiry) {
    const data = this.get();
    inquiry.id = 'inq-' + Date.now();
    inquiry.date = new Date().toISOString().replace('T', ' ').substring(0, 16);
    inquiry.status = 'new';
    data.inquiries.unshift(inquiry);
    this.save(data);
    return inquiry;
  },

  applyToPage: function() {
    const data = this.get();
    const settings = data.settings;

    // Direct text sync
    document.querySelectorAll('[data-sync="siteName"]').forEach(el => el.textContent = settings.siteName);
    document.querySelectorAll('[data-sync="siteNameEn"]').forEach(el => el.textContent = settings.siteNameEn);
    document.querySelectorAll('[data-sync="tagline"]').forEach(el => el.textContent = settings.tagline);
    document.querySelectorAll('[data-sync="email"]').forEach(el => {
      el.textContent = settings.email;
      if (el.tagName === 'A') el.href = `mailto:${settings.email}`;
    });
    document.querySelectorAll('[data-sync="phone"]').forEach(el => {
      el.textContent = settings.phone;
      if (el.tagName === 'A') el.href = `tel:${settings.phone.replace(/[\s-]/g, '')}`;
    });
    document.querySelectorAll('[data-sync="whatsapp"]').forEach(el => {
      el.textContent = settings.whatsapp;
      if (el.tagName === 'A') el.href = `https://wa.me/${settings.whatsapp.replace(/[\s+-]/g, '')}`;
    });
    document.querySelectorAll('[data-sync="address"]').forEach(el => el.textContent = settings.address);
    document.querySelectorAll('[data-sync="crNumber"]').forEach(el => el.textContent = settings.crNumber);

    // Social links
    if (settings.twitter) {
      document.querySelectorAll('[data-sync="twitter"]').forEach(el => el.href = settings.twitter);
    }
    if (settings.linkedin) {
      document.querySelectorAll('[data-sync="linkedin"]').forEach(el => el.href = settings.linkedin);
    }

    // Render Services if container exists
    const servicesContainer = document.getElementById('services-grid-container');
    if (servicesContainer) {
      servicesContainer.innerHTML = data.services.map(s => `
        <div class="service-card" data-category="${s.category || 'all'}">
          <div class="service-icon-box">
            <i class="${s.icon || 'fas fa-laptop-code'}"></i>
          </div>
          <h3 class="service-title">${s.title}</h3>
          <p class="service-desc">${s.desc}</p>
          <a href="contact.html?service=${encodeURIComponent(s.title)}" class="service-link">
            <span>طلب الخدمة</span>
            <i class="fas fa-arrow-left"></i>
          </a>
        </div>
      `).join('');
    }

    // Render Stats if container exists
    const statsContainer = document.getElementById('stats-grid-container');
    if (statsContainer && data.stats) {
      statsContainer.innerHTML = data.stats.map(st => `
        <div class="stat-box">
          <div class="stat-number">${st.number}</div>
          <div class="stat-label">${st.label}</div>
        </div>
      `).join('');
    }

    // Handle Maintenance Mode Overlay on public pages (except admin)
    if (!window.location.pathname.includes('/admin')) {
      this.checkMaintenanceBanner(settings);
    }
  },

  checkMaintenanceBanner: function(settings) {
    let overlay = document.getElementById('maintenance-overlay');
    if (settings.maintenanceMode) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'maintenance-overlay';
        overlay.innerHTML = `
          <div class="maintenance-box">
            <div class="maintenance-barrier-wrap">
              <img src="images/under-construction-full.png" alt="Under Construction" class="maintenance-img" onerror="this.src='images/under-construction.png'">
            </div>
            <div class="maintenance-badge"><i class="fas fa-tools"></i> وضع التطوير والصيانة</div>
            <h1 class="maintenance-title">${settings.maintenanceTitle || 'الموقع قيد التطوير والترقية'}</h1>
            <p class="maintenance-msg">${settings.maintenanceMsg || 'نعمل حالياً على تحديث البوابة الرقمية لشركة بيرفيجن السعودية.'}</p>
            <div class="maintenance-actions">
              <a href="https://wa.me/${(settings.whatsapp || '').replace(/[\s+-]/g, '')}" class="btn btn-whatsapp" target="_blank">
                <i class="fab fa-whatsapp"></i> تواصل عبر واتساب
              </a>
              <a href="mailto:${settings.email || 'info@pervasionsa.com'}" class="btn btn-outline">
                <i class="fas fa-envelope"></i> راسلنا عبر البريد
              </a>
            </div>
            <div class="maintenance-meta">
              <span><strong>السجل التجاري:</strong> ${settings.crNumber || '1010789456'}</span>
              <span><strong>الرياض:</strong> المملكة العربية السعودية</span>
            </div>
            <div class="maintenance-admin-hint">
              <a href="admin/index.html" class="admin-link-discrete"><i class="fas fa-lock"></i> لوحة التحكم</a>
            </div>
          </div>
        `;
        document.body.prepend(overlay);
        document.body.classList.add('in-maintenance-mode');
      }
    } else {
      if (overlay) {
        overlay.remove();
        document.body.classList.remove('in-maintenance-mode');
      }
    }
  }
};

// Auto-run on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    PervasionData.applyToPage();
  });
}
