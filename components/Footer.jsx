export default function Footer() {
  return (
    <footer id="footer" className="plp-footer">
      <div className="plp-footer__newsletter">
        <div className="plp-footer__newsletter-inner">
          <h2 className="plp-footer__newsletter-title">Be the first to know</h2>
          <p className="plp-footer__newsletter-text">
            Hear about new arrivals, inspiration, and exclusive offers.
          </p>
          <form className="plp-footer__newsletter-form" action="#" method="post">
            <label className="plp-sr-only" htmlFor="footer-email">
              Email for newsletter
            </label>
            <input
              id="footer-email"
              className="plp-footer__newsletter-input"
              type="email"
              name="email"
              placeholder="Your email address"
              autoComplete="email"
            />
            <button type="submit" className="plp-footer__newsletter-btn">
              Sign up
            </button>
          </form>
        </div>
      </div>
      <div className="plp-footer__inner">
        <div>
          <h2>Quick links</h2>
          <ul>
            <li>
              <a href="#products">All products</a>
            </li>
            <li>
              <a href="#filters">Filters</a>
            </li>
            <li>
              <a href="#footer">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Customer care</h2>
          <ul>
            <li>
              <a href="#footer">Shipping</a>
            </li>
            <li>
              <a href="#footer">Returns</a>
            </li>
            <li>
              <a href="#footer">FAQ</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Region</h2>
          <p className="plp-footer__currency">USD ($) · English</p>
        </div>
      </div>
      <div className="plp-footer__accepts">
        <p className="plp-footer__accepts-title">mettā muse accepts</p>
        <img
          className="plp-footer__accepts-img"
          src="/mettāmuseAccepts.svg"
          width={376}
          height={35}
          alt="Payment methods: Google Pay, Mastercard, PayPal, Amex, Apple Pay, and more"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="plp-footer__copy">
        © {new Date().getFullYear()} mettā muse — design task demo. Not a real store.
      </p>
    </footer>
  );
}
