/**
 * Pervasion SA - Client Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.main-nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Handle Contact Form Submission if present
  const contactForm = document.getElementById('pervasion-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
      }

      const inquiry = {
        name: document.getElementById('contact-name')?.value || 'عميل',
        email: document.getElementById('contact-email')?.value || '',
        phone: document.getElementById('contact-phone')?.value || '',
        service: document.getElementById('contact-service')?.value || 'استفسار عام',
        message: document.getElementById('contact-message')?.value || ''
      };

      setTimeout(() => {
        if (window.PervasionData) {
          window.PervasionData.addInquiry(inquiry);
        }

        contactForm.innerHTML = `
          <div style="background: #ECFDF5; border: 1px solid #10B981; color: #065F46; padding: 24px; border-radius: 12px; text-align: center;">
            <i class="fas fa-check-circle" style="font-size: 40px; color: #10B981; margin-bottom: 12px; display: block;"></i>
            <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">تم استلام طلبكم بنجاح!</h3>
            <p style="font-size: 15px; color: #047857; margin-bottom: 16px;">شكراً لتواصلكم مع شركة بيرفيجن السعودية. سيقوم أحد مستشارينا التقنيين بالتواصل معكم خلال 24 ساعة.</p>
            <a href="index.html" class="btn btn-primary" style="font-size: 14px; padding: 8px 20px;">العودة للرئيسية</a>
          </div>
        `;
      }, 700);
    });
  }
});
