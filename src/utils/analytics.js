/**
 * Analytics and Notification Utility
 * Supports Google Analytics 4 (GA4) and instant Telegram notifications
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const TG_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TG_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';

/**
 * Initialize Google Analytics 4 (GA4)
 */
export function initGA() {
  if (!GA_ID || typeof window === 'undefined') return;

  // Check if script is already added
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: true,
  });
}

/**
 * Helper to dispatch custom events to GA4
 */
function sendGAEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * Helper to send a message via Telegram Bot API
 */
async function sendTelegramMessage(text) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;

  const cleanToken = TG_BOT_TOKEN.trim();
  const cleanChatId = TG_CHAT_ID.trim();

  if (!cleanToken.includes(':')) {
    console.warn(
      '⚠️ Telegram Bot Token format issue: A valid Telegram Bot Token starts with a number and a colon, e.g. "7812345678:AAF6LA9Wzc83GMa5hokEAksRMb19wJ6Ewmg". Please check the full token from @BotFather.'
    );
  }

  try {
    const encodedText = encodeURIComponent(text);
    const url = `https://api.telegram.org/bot${cleanToken}/sendMessage?chat_id=${encodeURIComponent(cleanChatId)}&text=${encodedText}&parse_mode=HTML`;

    await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
    });
  } catch (err) {
    console.warn('Telegram notification failed:', err);
  }
}

/**
 * Track Page Views (once per session for Telegram to avoid refresh spam)
 */
export function trackPageView() {
  if (typeof window === 'undefined') return;

  sendGAEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
  });

  // Telegram alert for site visit
  try {
    sessionStorage.removeItem('portfolio_visit_alert_sent'); // Clear old static key if present
    const lastVisitKey = 'portfolio_visit_last_time';
    const lastVisit = sessionStorage.getItem(lastVisitKey);
    const now = Date.now();
    // 15 seconds in dev mode for easy testing, 3 minutes in production to prevent spam
    const cooldown = import.meta.env.DEV ? 15 * 1000 : 3 * 60 * 1000;

    if (!lastVisit || now - Number(lastVisit) > cooldown) {
      sessionStorage.setItem(lastVisitKey, String(now));

      const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
      const referrer = document.referrer || 'Direct / Bookmark';
      const screenRes = `${window.innerWidth}x${window.innerHeight}`;
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const msg = `👀 <b>New Portfolio Visitor!</b>\n\n` +
        `🕒 <b>Time:</b> ${time}\n` +
        `📱 <b>Device:</b> ${isMobile ? 'Mobile' : 'Desktop'} (${screenRes})\n` +
        `🌐 <b>Referrer:</b> ${referrer}`;

      sendTelegramMessage(msg);
    }
  } catch {
    // Ignore storage issues in private modes
  }
}

/**
 * Track Resume / CV Downloads
 */
export function trackResumeDownload() {
  // 1. Google Analytics event
  sendGAEvent('resume_download', {
    event_category: 'engagement',
    event_label: 'Banti_Singh_CV.pdf',
    value: 1,
  });

  // 2. Instant Telegram Notification
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const referrer = document.referrer || 'Direct';
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const msg = `📥 <b>Resume Downloaded!</b> 🎉\n\n` +
    `Someone just downloaded your CV (<b>Banti_Singh_CV.pdf</b>) from your portfolio!\n\n` +
    `🕒 <b>Time:</b> ${time}\n` +
    `📱 <b>Device:</b> ${isMobile ? 'Mobile' : 'Desktop'}\n` +
    `🌐 <b>Referrer:</b> ${referrer}`;

  sendTelegramMessage(msg);
}

/**
 * Track Contact link clicks (email, phone, linkedin)
 */
export function trackContactClick(channel) {
  sendGAEvent('contact_click', {
    event_category: 'contact',
    event_label: channel,
  });

  const msg = `💬 <b>Contact Clicked: ${channel.toUpperCase()}</b>\n\n` +
    `Someone clicked your ${channel} link on your portfolio!`;

  sendTelegramMessage(msg);
}
