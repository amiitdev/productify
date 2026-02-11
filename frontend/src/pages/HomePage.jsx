import React, { useEffect } from 'react';
import { PlusCircleIcon, RefreshCcwIcon, PackageIcon } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import Productcard from '../components/Productcard';
import AddProduct from '../components/AddProduct';

const HomePage = () => {
  const { products, loading, error, fetchProducts, retryAfter, resetForm } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              resetForm();
              document.getElementById('add-product-modal')?.showModal();
            }}
          >
            <PlusCircleIcon className="size-4" />
            Add Product
          </button>

          <button
            onClick={fetchProducts}
            className="btn btn-ghost btn-sm"
            aria-label="Refresh products"
          >
            <RefreshCcwIcon
              className={`size-4 ${loading ? 'animate-spin' : ''}`}
            />
            {retryAfter > 0 && (
              <span className="ml-1 text-xs">({retryAfter}s)</span>
            )}
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProduct />

      {/* Error */}
      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="card bg-base-100 shadow animate-pulse">
              <div className="h-40 bg-base-200 rounded-t-lg" />
              <div className="card-body space-y-2">
                <div className="h-4 bg-base-200 rounded w-3/4" />
                <div className="h-4 bg-base-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageIcon className="size-12 text-base-content/40 mb-4" />
          <h2 className="text-lg font-semibold mb-2">No products found</h2>
          <p className="text-base-content/60 mb-4">
            Start by adding your first product.
          </p>
        </div>
      )}

      {/* Products grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const imageSrc =
              product.image ||
              product.imageUrl ||
              'https://placehold.co/400x300?text=No+Image';

            return (
              <Productcard
                key={product.id}
                product={product}
                imageSrc={imageSrc}
                id={product.id}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default HomePage;
