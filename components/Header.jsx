'use client';

import { createPortal } from 'react-dom';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

const PAY_METHODS = [
  { id: 'card', label: 'Credit / debit card' },
  { id: 'upi', label: 'UPI' },
  { id: 'cod', label: 'Cash on delivery' },
];

export default function Header({ defaultSearch = '' }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagView, setBagView] = useState('cart');
  const [payMethod, setPayMethod] = useState('card');
  const [orderId, setOrderId] = useState('');
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [portalReady, setPortalReady] = useState(false);
  const thankYouContinueRef = useRef(null);
  const searchPanelId = useId().replace(/:/g, '');
  const searchInputId = `${searchPanelId}-q`;
  const bagRef = useRef(null);
  const panelRef = useRef(null);
  const wishRef = useRef(null);
  const wishPanelRef = useRef(null);

  const {
    lines,
    open: cartOpen,
    toggleCart,
    setOpen: setCartOpen,
    totalCount,
    subtotal,
    removeLine,
    setQty,
    clearCart,
  } = useCart();

  const {
    items: wishItems,
    open: wishOpen,
    setOpen: setWishOpen,
    togglePanel: toggleWishPanel,
    wishCount,
    removeWish,
  } = useWishlist();

  const finishThankYou = useCallback(() => {
    clearCart();
    setThankYouOpen(false);
    setOrderReceipt(null);
    setCartOpen(false);
    setBagView('cart');
    setOrderId('');
  }, [clearCart, setCartOpen]);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!thankYouOpen) return;
    const t = window.setTimeout(() => {
      thankYouContinueRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [thankYouOpen]);

  useEffect(() => {
    if (!thankYouOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [thankYouOpen]);

  useEffect(() => {
    if (!cartOpen && !wishOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        if (thankYouOpen) {
          finishThankYou();
          return;
        }
        setCartOpen(false);
        setWishOpen(false);
      }
    }
    function onPointerDown(e) {
      if (thankYouOpen) return;
      const t = e.target;
      if (bagRef.current?.contains(t) || wishRef.current?.contains(t)) {
        return;
      }
      setCartOpen(false);
      setWishOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [cartOpen, wishOpen, thankYouOpen, finishThankYou, setCartOpen, setWishOpen]);

  useEffect(() => {
    if (!cartOpen) {
      setBagView('cart');
      setOrderId('');
      setThankYouOpen(false);
      setOrderReceipt(null);
    }
  }, [cartOpen]);

  useEffect(() => {
    if (lines.length === 0 && !thankYouOpen) {
      setBagView('cart');
      setOrderId('');
    }
  }, [lines.length, thankYouOpen]);

  const taxEstimate = subtotal * 0.08;
  const orderTotal = subtotal + taxEstimate;

  function startCheckout() {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID().slice(0, 8).toUpperCase()
        : String(Date.now()).slice(-8);
    setOrderId(id);
    setBagView('checkout');
  }

  function completePayment() {
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    setOrderReceipt({
      orderId,
      dateLabel: new Date().toLocaleDateString(),
      lines: lines.map((l) => ({
        id: l.id,
        title: l.title,
        quantity: l.quantity,
        price: l.price,
      })),
      subtotal,
      taxEstimate: tax,
      orderTotal: total,
    });
    setThankYouOpen(true);
  }

  const thankYouModal =
    portalReady && thankYouOpen && orderReceipt
      ? createPortal(
          <div
            className="plp-thankyou-backdrop"
            role="presentation"
            onClick={finishThankYou}
          >
            <div
              className="plp-thankyou-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="thankyou-heading"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="thankyou-heading" className="plp-thankyou__title">
                Thank you for shopping with us
              </h3>
              <div className="plp-payslip plp-thankyou__slip" aria-label="Payment slip">
                <p className="plp-payslip__brand">mettā muse</p>
                <p className="plp-payslip__meta">
                  Order #{orderReceipt.orderId} · {orderReceipt.dateLabel}
                </p>
                <ul className="plp-payslip__lines">
                  {orderReceipt.lines.map((line) => (
                    <li key={line.id} className="plp-payslip__line">
                      <span className="plp-payslip__line-title">
                        {line.quantity} × {line.title}
                      </span>
                      <span className="plp-payslip__line-price">
                        ${(line.price * line.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="plp-payslip__rule" />
                <div className="plp-payslip__row">
                  <span>Subtotal</span>
                  <span>${orderReceipt.subtotal.toFixed(2)}</span>
                </div>
                <div className="plp-payslip__row plp-payslip__row--muted">
                  <span>Estimated tax (8%)</span>
                  <span>${orderReceipt.taxEstimate.toFixed(2)}</span>
                </div>
                <div className="plp-payslip__row plp-payslip__total">
                  <span>Total paid</span>
                  <span>${orderReceipt.orderTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                ref={thankYouContinueRef}
                type="button"
                className="plp-thankyou__continue"
                onClick={finishThankYou}
              >
                Continue shopping
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
    <header className="plp-header">
      <div className="plp-header__shell">
        <div className="plp-header__main">
          <a href="/" className="plp-header__mark" aria-label="Home">
            <span className="plp-header__mark-bg">
              <img
                className="plp-header__mark-img"
                src="/Logo.svg"
                width={24}
                height={24}
                alt=""
                decoding="async"
              />
            </span>
          </a>
          <a href="/" className="plp-header__logo-title">
            LOGO
          </a>
          <div className="plp-header__actions">
            <button
              type="button"
              className="plp-header__action"
              aria-expanded={searchOpen}
              aria-controls={searchPanelId}
              onClick={() => setSearchOpen((o) => !o)}
            >
              <img
                src="/search-normal.svg"
                width={24}
                height={24}
                alt=""
                decoding="async"
              />
              <span className="plp-sr-only">Search</span>
            </button>
            <div className="plp-header__wish-wrap" ref={wishRef}>
              <button
                type="button"
                className={`plp-header__action plp-header__wish-btn ${wishCount > 0 ? 'plp-header__wish-btn--active' : ''}`}
                aria-expanded={wishOpen}
                aria-controls="wishlist-panel"
                aria-label={`Wishlist, ${wishCount} saved ${wishCount === 1 ? 'item' : 'items'}`}
                onClick={() => {
                  setCartOpen(false);
                  toggleWishPanel();
                }}
              >
                <img src="/heart.svg" width={24} height={24} alt="" decoding="async" />
                {wishCount > 0 ? (
                  <span className="plp-cart-badge">{wishCount > 99 ? '99+' : wishCount}</span>
                ) : null}
              </button>
              <div
                id="wishlist-panel"
                ref={wishPanelRef}
                className="plp-cart-panel plp-wishlist-panel"
                data-open={wishOpen ? 'true' : 'false'}
                hidden={!wishOpen}
              >
                <div className="plp-cart-panel__head">
                  <span className="plp-cart-panel__head-spacer" aria-hidden="true" />
                  <h2 className="plp-cart-panel__title">Liked items</h2>
                  <button
                    type="button"
                    className="plp-cart-panel__close"
                    aria-label="Close wishlist"
                    onClick={() => setWishOpen(false)}
                  >
                    ×
                  </button>
                </div>
                {wishItems.length === 0 ? (
                  <p className="plp-cart-panel__empty">No liked items yet. Tap the heart on a product.</p>
                ) : (
                  <ul className="plp-cart-list plp-wishlist-list">
                    {wishItems.map((p) => (
                      <li key={p.id} className="plp-cart-card plp-wishlist-card">
                        <img
                          className="plp-cart-card__img"
                          src={p.image}
                          alt=""
                          width={64}
                          height={64}
                          loading="lazy"
                        />
                        <div className="plp-cart-card__body">
                          <p className="plp-cart-card__title">{p.title}</p>
                          <p className="plp-cart-card__price">${p.price.toFixed(2)}</p>
                          <div className="plp-cart-card__row">
                            <span className="plp-wishlist-card__hint">{p.category}</span>
                            <button
                              type="button"
                              className="plp-cart-card__remove"
                              onClick={() => removeWish(p.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="plp-header__bag-wrap" ref={bagRef}>
              <button
                type="button"
                className="plp-header__action plp-header__bag-btn"
                aria-expanded={cartOpen}
                aria-controls="cart-panel"
                aria-label={`Shopping bag, ${totalCount} items`}
                onClick={() => {
                  setWishOpen(false);
                  toggleCart();
                }}
              >
                <img src="/shopping-bag.svg" width={24} height={24} alt="" decoding="async" />
                {totalCount > 0 ? (
                  <span className="plp-cart-badge">{totalCount > 99 ? '99+' : totalCount}</span>
                ) : null}
              </button>
              <div
                id="cart-panel"
                ref={panelRef}
                className="plp-cart-panel"
                data-open={cartOpen ? 'true' : 'false'}
                hidden={!cartOpen}
              >
                <div className="plp-cart-panel__head">
                  {bagView === 'checkout' ? (
                    <button
                      type="button"
                      className="plp-cart-panel__back"
                      onClick={() => {
                        setBagView('cart');
                        setOrderId('');
                      }}
                    >
                      ← Bag
                    </button>
                  ) : (
                    <span className="plp-cart-panel__head-spacer" aria-hidden="true" />
                  )}
                  <h2 className="plp-cart-panel__title">
                    {bagView === 'checkout' ? 'Checkout' : 'Shopping bag'}
                  </h2>
                  <button
                    type="button"
                    className="plp-cart-panel__close"
                    aria-label="Close bag"
                    onClick={() => setCartOpen(false)}
                  >
                    ×
                  </button>
                </div>
                {lines.length === 0 ? (
                  <p className="plp-cart-panel__empty">Your bag is empty.</p>
                ) : bagView === 'checkout' ? (
                  <div className="plp-checkout">
                    <div className="plp-payslip" aria-label="Payment slip">
                      <p className="plp-payslip__brand">mettā muse</p>
                      <p className="plp-payslip__meta">
                        Order #{orderId} · {new Date().toLocaleDateString()}
                      </p>
                      <ul className="plp-payslip__lines">
                        {lines.map((line) => (
                          <li key={line.id} className="plp-payslip__line">
                            <span className="plp-payslip__line-title">
                              {line.quantity} × {line.title}
                            </span>
                            <span className="plp-payslip__line-price">
                              ${(line.price * line.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="plp-payslip__rule" />
                      <div className="plp-payslip__row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="plp-payslip__row plp-payslip__row--muted">
                        <span>Estimated tax (8%)</span>
                        <span>${taxEstimate.toFixed(2)}</span>
                      </div>
                      <div className="plp-payslip__row plp-payslip__total">
                        <span>Total due</span>
                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <fieldset className="plp-pay-options">
                      <legend className="plp-pay-options__legend">Pay with</legend>
                      {PAY_METHODS.map((m) => (
                        <label key={m.id} className="plp-pay-option">
                          <input
                            type="radio"
                            name="pay-method"
                            value={m.id}
                            checked={payMethod === m.id}
                            onChange={() => setPayMethod(m.id)}
                          />
                          <span>{m.label}</span>
                        </label>
                      ))}
                    </fieldset>

                    <div className="plp-checkout__actions">
                      <button
                        type="button"
                        className="plp-checkout__secondary"
                        onClick={() => {
                          setBagView('cart');
                          setOrderId('');
                        }}
                      >
                        Back to bag
                      </button>
                      <button
                        type="button"
                        className="plp-checkout__pay"
                        onClick={completePayment}
                      >
                        Pay ${orderTotal.toFixed(2)}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <ul className="plp-cart-list">
                      {lines.map((line) => (
                        <li key={line.id} className="plp-cart-card">
                          <img
                            className="plp-cart-card__img"
                            src={line.image}
                            alt=""
                            width={64}
                            height={64}
                            loading="lazy"
                          />
                          <div className="plp-cart-card__body">
                            <p className="plp-cart-card__title">{line.title}</p>
                            <p className="plp-cart-card__price">
                              ${line.price.toFixed(2)} each
                            </p>
                            <div className="plp-cart-card__row">
                              <div className="plp-cart-card__qty">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  onClick={() => setQty(line.id, line.quantity - 1)}
                                >
                                  −
                                </button>
                                <span aria-live="polite">{line.quantity}</span>
                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() => setQty(line.id, line.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                className="plp-cart-card__remove"
                                onClick={() => removeLine(line.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="plp-cart-panel__foot">
                      <p className="plp-cart-panel__subtotal">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </p>
                      <button
                        type="button"
                        className="plp-cart-panel__checkout"
                        onClick={startCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <a className="plp-header__action" href="#footer" aria-label="Account">
              <img src="/profile.svg" width={24} height={24} alt="" decoding="async" />
            </a>
            <button type="button" className="plp-header__action plp-header__action--lang" aria-label="Language: English">
              <img
                className="plp-header__lang-img"
                src="/Language.svg"
                width={52}
                height={16}
                alt=""
                decoding="async"
              />
            </button>
          </div>
        </div>

        <div
          id={searchPanelId}
          className="plp-header__search-panel"
          data-open={searchOpen ? 'true' : 'false'}
          hidden={!searchOpen}
        >
          <form className="plp-header__search-form" action="/" method="get" role="search">
            <label className="plp-sr-only" htmlFor={searchInputId}>
              Search products
            </label>
            <input
              id={searchInputId}
              className="plp-header__search-input"
              type="search"
              name="q"
              placeholder="Search for products, brands and more"
              defaultValue={defaultSearch}
              autoComplete="off"
            />
            <button type="submit" className="plp-header__search-submit">
              Search
            </button>
          </form>
        </div>

        <nav className="plp-header__nav-row" aria-label="Primary">
          <ul className="plp-nav plp-nav--secondary">
            <li>
              <a href="#products">Shop</a>
            </li>
            <li>
              <a href="#footer">Skills</a>
            </li>
            <li>
              <a href="#footer">Stories</a>
            </li>
            <li>
              <a href="#footer">About</a>
            </li>
            <li>
              <a href="#footer">Contact Us</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    {thankYouModal}
    </>
  );
}
