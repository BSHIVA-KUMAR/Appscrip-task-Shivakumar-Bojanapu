'use client';

function UsFlag({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 14"
      width="20"
      height="14"
      aria-hidden="true"
    >
      <rect width="20" height="14" fill="#b22234" rx="1" />
      <path
        fill="#fff"
        d="M0 2h20v1H0V2zm0 2h20v1H0V4zm0 2h20v1H0V6zm0 2h20v1H0V8zm0 2h20v1h-20z"
      />
      <rect width="9" height="8" fill="#3c3b6e" rx="0.5" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm6.4-8.5a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0zM12 2.2c2.7 0 3 .01 4 .06 1 .05 1.7.24 2.3.5.6.28 1.1.65 1.6 1.1.46.46.83 1 1.1 1.6.27.6.45 1.3.5 2.3.05 1 .06 1.3.06 4s-.01 3-.06 4c-.05 1-.24 1.7-.5 2.3a4.3 4.3 0 0 1-2.7 2.7c-.6.26-1.3.45-2.3.5-1 .05-1.3.06-4 .06s-3-.01-4-.06c-1-.05-1.7-.24-2.3-.5a4.3 4.3 0 0 1-2.7-2.7c-.26-.6-.45-1.3-.5-2.3-.05-1-.06-1.3-.06-4s.01-3 .06-4c.05-1 .24-1.7.5-2.3.28-.6.65-1.1 1.1-1.6.46-.46 1-.83 1.6-1.1.6-.27 1.3-.45 2.3-.5 1-.05 1.3-.06 4-.06zm0 1.8c-2.6 0-2.9.01-3.9.06-.9.04-1.4.2-1.7.34-.43.2-.74.44-1.06.76a2.9 2.9 0 0 0-.76 1.06c-.14.3-.3.8-.34 1.7-.05 1-.06 1.3-.06 3.9s.01 2.9.06 3.9c.04.9.2 1.4.34 1.7.2.43.44.74.76 1.06.32.32.63.56 1.06.76.3.14.8.3 1.7.34 1 .05 1.3.06 3.9.06s2.9-.01 3.9-.06c.9-.04 1.4-.2 1.7-.34.43-.2.74-.44 1.06-.76.32-.32.56-.63.76-1.06.14-.3.3-.8.34-1.7.05-1 .06-1.3.06-3.9s-.01-2.9-.06-3.9c-.04-.9-.2-1.4-.34-1.7a2.9 2.9 0 0 0-.76-1.06 2.9 2.9 0 0 0-1.06-.76c-.3-.14-.8-.3-1.7-.34-1-.05-1.3-.06-3.9-.06z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.5 8.2h-3v11.5h3V8.2zm-1.5-4.9c-1 0-1.7.8-1.7 1.7 0 1 .8 1.7 1.7 1.7s1.7-.8 1.7-1.7c0-.9-.8-1.7-1.7-1.7zm12.7 6.2c-1.4 0-2.4.6-3 1.5v-1.3h-3v11.5h3v-5.7c0-1.3.2-2.5 1.8-2.5 1.5 0 1.6 1.4 1.6 2.5v5.7h3v-6.4c0-2.5-.5-4.4-3.4-4.4z"
      />
    </svg>
  );
}

const MUSE_LINKS = [
  { label: 'About Us', href: '#footer' },
  { label: 'Stories', href: '#footer' },
  { label: 'Artisans', href: '#footer' },
  { label: 'Boutiques', href: '#footer' },
  { label: 'Contact Us', href: '#footer' },
  { label: 'EU Compliances Docs', href: '#footer' },
];

const QUICK_LINKS = [
  { label: 'Orders & Shipping', href: '#footer' },
  { label: 'Join/Login as a Seller', href: '#footer' },
  { label: 'Payment & Pricing', href: '#footer' },
  { label: 'Return & Refunds', href: '#footer' },
  { label: 'FAQs', href: '#footer' },
  { label: 'Privacy Policy', href: '#footer' },
  { label: 'Terms & Conditions', href: '#footer' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="plp-footer">
      <div className="plp-footer__shell">
        <div className="plp-footer__top">
          <div className="plp-footer__newsletter">
            <h2 className="plp-footer__kicker">Be the first to know</h2>
            <p className="plp-footer__lede">Sign up for updates from mettā muse.</p>
            <form
              className="plp-footer__newsletter-form"
              action="#"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="plp-sr-only" htmlFor="footer-email">
                Email for newsletter
              </label>
              <input
                id="footer-email"
                className="plp-footer__newsletter-input"
                type="email"
                name="email"
                placeholder="Enter your e-mail..."
                autoComplete="email"
              />
              <button type="submit" className="plp-footer__newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>

          <div className="plp-footer__aside">
            <div className="plp-footer__contact">
              <h3 className="plp-footer__block-title">Contact us</h3>
              <p className="plp-footer__contact-line">
                <a href="tel:+442211335360">+44 221 133 5360</a>
              </p>
              <p className="plp-footer__contact-line">
                <a href="mailto:customercare@mettamuse.com">customercare@mettamuse.com</a>
              </p>
            </div>
            <div className="plp-footer__currency-wrap">
              <h3 className="plp-footer__block-title">Currency</h3>
              <p
                className="plp-footer__currency-row"
                title="Transactions will be completed in Euros and a currency reference is available on hover."
              >
                <UsFlag className="plp-footer__flag" />
                <span className="plp-footer__currency-sep" aria-hidden="true">
                  •
                </span>
                <span>USD</span>
              </p>
              <p className="plp-footer__currency-note">
                Transactions will be completed in Euros and a currency reference is available on
                hover.
              </p>
            </div>
          </div>
        </div>

        <hr className="plp-footer__rule" />

        <div className="plp-footer__cols">
          <div className="plp-footer__col">
            <h3 className="plp-footer__brand-title">mettā muse</h3>
            <ul className="plp-footer__list">
              {MUSE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="plp-footer__col">
            <h3 className="plp-footer__block-title">Quick links</h3>
            <ul className="plp-footer__list">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="plp-footer__col plp-footer__col--social">
            <h3 className="plp-footer__block-title">Follow us</h3>
            <div className="plp-footer__social">
              <a
                className="plp-footer__social-btn"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                className="plp-footer__social-btn"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <IconLinkedIn />
              </a>
            </div>
            <p className="plp-footer__accepts-label">mettā muse accepts</p>
            <img
              className="plp-footer__accepts-img"
              src="/mettāmuseAccepts.svg"
              width={376}
              height={35}
              alt="Payment methods: Google Pay, Mastercard, PayPal, Amex, Apple Pay, and Shop Pay"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <p className="plp-footer__copy">
          Copyright © {year} mettamuse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
