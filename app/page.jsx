import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductListing from '@/components/ProductListing';
import { buildItemListSchema, getProducts } from '@/lib/fakestore';

export const dynamic = 'force-dynamic';

export default async function HomePage(props) {
  const searchParams = await props.searchParams;
  const qRaw = searchParams?.q;
  const defaultSearch = typeof qRaw === 'string' ? qRaw : '';

  let products = [];
  let fetchError = null;
  try {
    products = await getProducts();
  } catch (err) {
    fetchError = err?.message ?? 'Unknown error';
  }

  const schemaJson =
    products.length > 0 ? JSON.stringify(buildItemListSchema(products)) : null;

  return (
    <>
      {schemaJson ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      ) : null}
      <Header defaultSearch={defaultSearch} />
      <main className="plp-main">
        <nav className="plp-breadcrumb" aria-label="Breadcrumb">
          <ol className="plp-breadcrumb__list">
            <li>
              <a href="/">Home</a>
            </li>
            <li className="plp-breadcrumb__sep" aria-hidden="true">
              /
            </li>
            <li aria-current="page">Products</li>
          </ol>
        </nav>
        <div className="plp-intro">
          <h1 className="plp-page-title">All products</h1>
          <p className="plp-lead">
            Discover styles and essentials. Use filters to narrow by category and price.
          </p>
        </div>
        {fetchError ? (
          <p className="plp-error" role="alert">
            We could not load products ({fetchError}). Please refresh the page.
          </p>
        ) : (
          <ProductListing products={products} initialQuery={defaultSearch} />
        )}
      </main>
      <Footer />
    </>
  );
}
