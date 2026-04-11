
async function getProduct() {

  const res = await fetch('https://dummyjson.com/products/category/mens-shirts', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const products = data.products;

  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex];
}

export default async function Home() {

  const product = await getProduct();

  return (
    <main className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center p-6">
      
      <h1 className="text-2xl font-extrabold text-gray-800 mb-8">
        Fashion Trending 2026
      </h1>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-5 w-full max-w-[320px]">

        <div className="w-full h-56 bg-gray-50 rounded-xl overflow-hidden mb-5 flex items-center justify-center p-4">
          <img
            src={product.thumbnail} 
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-500 bg-blue-50 text-[10px] font-bold px-2 py-1 rounded">
            New Arrival
          </span>
          <span className="text-red-500 font-bold text-lg">
            ${product.price}
          </span>
        </div>

        <h2 className="text-gray-900 font-bold text-base mb-5 truncate" title={product.title}>
          {product.title}
        </h2>

        <button className="w-full bg-black text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Thêm vào giỏ hàng
        </button>

      </div>
      
    </main>
  );
}