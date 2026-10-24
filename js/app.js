/**
 * Lumiere Cafe & Roastery - Application Script
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Booking Date Input default to today
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }

    // 2. Mobile Drawer Navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const drawerClose = document.getElementById('drawerClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function openDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-link').forEach(function (link) {
        link.addEventListener('click', closeDrawer);
    });

    // 3. Booking Form Submit
    const bookingForm = document.getElementById('lumiBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
});

// Category Filtering
function filterMenu(category, btn) {
    const buttons = document.querySelectorAll('.menu-tab-pill');
    buttons.forEach(function (b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');

    const items = document.querySelectorAll('.menu-item-card');
    items.forEach(function (item) {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Booking Form & WhatsApp Integration
function handleBookingSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const guests = document.getElementById('bookGuests') ? document.getElementById('bookGuests').value : '2';
    const date = document.getElementById('bookDate') ? document.getElementById('bookDate').value : 'اليوم';
    const time = document.getElementById('bookTime') ? document.getElementById('bookTime').value : 'المساء';
    const location = document.getElementById('bookLocation') ? document.getElementById('bookLocation').value : 'التراس الخارجي';

    // Update modal
    const mg = document.getElementById('modalGuests');
    const md = document.getElementById('modalDate');
    const mt = document.getElementById('modalTime');
    const ml = document.getElementById('modalLocation');

    if (mg) mg.textContent = guests;
    if (md) md.textContent = date;
    if (mt) mt.textContent = time;
    if (ml) ml.textContent = location;

    // Get phone from sync settings if available
    let phone = '966114889900';
    try {
        const stored = localStorage.getItem('lumiere_site_data');
        if (stored) {
            const data = JSON.parse(stored);
            if (data.settings && data.settings.whatsapp) {
                phone = data.settings.whatsapp.replace(/[^0-9]/g, '');
            }
        }
    } catch (err) {}

    const waText = "مرحباً كافيه ومحمصة لوميير، أرغب في تأكيد حجز طاولة:\n" +
                   "👥 عدد الضيوف: " + guests + "\n" +
                   "📅 التاريخ: " + date + "\n" +
                   "⏰ الوقت: " + time + "\n" +
                   "📍 تفضيل الجلسة: " + location;

    const waUrl = "https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(waText);
    const waBtn = document.getElementById('modalWhatsAppBtn');
    if (waBtn) waBtn.href = waUrl;

    // Save inquiry to LocalStorage for Admin CMS
    try {
        const bookingsKey = 'lumiere_bookings_data';
        let bookings = JSON.parse(localStorage.getItem(bookingsKey) || '[]');
        bookings.unshift({
            id: 'BK-' + Date.now().toString().slice(-6),
            guests: guests,
            date: date,
            time: time,
            location: location,
            createdAt: new Date().toLocaleString('ar-SA')
        });
        localStorage.setItem(bookingsKey, JSON.stringify(bookings));
    } catch (err) {}

    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}
