'use client';

import Image from 'next/image';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

function slugForSeo(title, id) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return `product-${base || 'item'}-${id}`;
}

function Rating({ rate, count }) {
  const safeRate = typeof rate === 'number' ? rate : 0;
  const safeCount = typeof count === 'number' ? count : 0;
  return (
    <p
      className="plp-card__rating"
      aria-label={`Rating ${safeRate} out of five stars, ${safeCount} reviews`}
    >
      <span className="plp-card__stars" aria-hidden="true">
        ★
      </span>
      <span className="plp-card__rating-value">{safeRate.toFixed(1)}</span>
      <span className="plp-card__rating-count">({safeCount})</span>
    </p>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWish, isLiked } = useWishlist();
  const liked = isLiked(product.id);
  const alt = `${product.title} — product photo for catalog listing`;
  const imageName = slugForSeo(product.title, product.id);
  const rating = product.rating;

  return (
    <li className="plp-card">
      <article>
        <div className="plp-card__media">
          <button
            type="button"
            className={`plp-card__wish ${liked ? 'plp-card__wish--on' : ''}`}
            aria-pressed={liked}
            aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWish(product);
            }}
          >
            <svg
              className="plp-card__wish-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {liked ? (
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#e53935"
                />
              ) : (
                <path
                  d="M12.62 20.8116C12.28 20.9316 11.72 20.9316 11.38 20.8116C8.48 19.8216 2 15.6916 2 8.69156C2 5.60156 4.49 3.10156 7.56 3.10156C9.38 3.10156 10.99 3.98156 12 5.34156C13.01 3.98156 14.63 3.10156 16.44 3.10156C19.51 3.10156 22 5.60156 22 8.69156C22 15.6916 15.52 19.8216 12.62 20.8116Z"
                  fill="none"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
          <Image
            src={product.image}
            alt={alt}
            width={240}
            height={240}
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-seo-name={imageName}
          />
        </div>
        <div className="plp-card__body">
          <p className="plp-card__category">{product.category}</p>
          <h3 className="plp-card__title">{product.title}</h3>
          {rating ? <Rating rate={rating.rate} count={rating.count} /> : null}
          <div className="plp-card__footer">
            <p className="plp-card__price">${product.price.toFixed(2)}</p>
            <button
              type="button"
              className="plp-card__btn"
              onClick={() => addItem(product)}
            >
              Add to bag
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}
