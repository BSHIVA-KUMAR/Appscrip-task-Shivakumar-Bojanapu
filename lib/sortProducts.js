export function sortProducts(list, sortId) {
  const arr = [...list];
  switch (sortId) {
    case 'newest':
      return arr.sort((a, b) => b.id - a.id);
    case 'popular':
      return arr.sort(
        (a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0),
      );
    case 'priceDesc':
      return arr.sort((a, b) => b.price - a.price);
    case 'priceAsc':
      return arr.sort((a, b) => a.price - b.price);
    default: {
      return arr.sort((a, b) => {
        const byRate = (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
        if (byRate !== 0) return byRate;
        return (b.rating?.count ?? 0) - (a.rating?.count ?? 0);
      });
    }
  }
}
