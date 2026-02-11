import {
  XIcon,
  PlusCircleIcon,
  ImageIcon,
  DollarSignIcon,
  PackageIcon,
} from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useState } from 'react';

const AddProduct = () => {
  const { formData, setFormData, addProduct, loading } = useProductStore();
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  return (
    <dialog id="add-product-modal" className="modal modal-middle">
      <div className="modal-box rounded-2xl max-w-xl">
        {/* Close */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
            <XIcon className="size-4" />
          </button>
        </form>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <PlusCircleIcon className="size-6 text-primary" />
          <h3 className="font-semibold text-lg">Add New Product</h3>
        </div>

        {/* FORM */}
        <form onSubmit={addProduct} className="space-y-4">
          {/* Product Name */}
          <div className="form-control">
            <label className="label gap-2">
              <PackageIcon className="size-4" />
              <span className="label-text font-medium">Product Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="iPhone 15 Pro"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              required
            />
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label gap-2">
              <DollarSignIcon className="size-4" />
              <span className="label-text font-medium">Price</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              placeholder="99999"
              value={formData.price}
              onChange={(e) => setFormData({ price: e.target.value })}
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label gap-2">
              <ImageIcon className="size-4" />
              <span className="label-text font-medium">Image URL</span>
            </label>
            <input
              type="url"
              className="input input-bordered"
              placeholder="https://image-url.com/product.png"
              value={formData.image}
              onChange={(e) => {
                setImgError(false);
                setImgLoading(true);
                setFormData({ image: e.target.value });
              }}
              required
            />
          </div>

          {/* ✅ BIG IMAGE PREVIEW */}
          {formData.image && !imgError && (
            <div className="relative w-full aspect-[4/3] rounded-xl border bg-base-200 overflow-hidden">
              {/* Loading Skeleton */}
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="loading loading-spinner loading-md" />
                </div>
              )}

              <img
                src={formData.image}
                alt="Product Preview"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                onLoad={() => setImgLoading(false)}
                onError={() => {
                  setImgError(true);
                  setImgLoading(false);
                }}
              />
            </div>
          )}

          {/* ❌ Invalid image */}
          {imgError && (
            <div className="alert alert-error">
              <span>Invalid image URL. Please check the link.</span>
            </div>
          )}

          {/* Submit */}
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-1" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddProduct;
