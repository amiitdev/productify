import React, { useEffect } from 'react';
import { useProductStore } from '../../store/useProductStore';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    updateProduct,
    fetchProduct,
    deleteProduct,
    error,
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(`id:${id}`);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      navigate('/');
      toast.success('Product deleted');
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="btn btn-ghost mb-8 hover:scale-105 transition-transform"
        >
          <ArrowLeftIcon className="size-4 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE - PRODUCT PREVIEW */}
          <div className="bg-base-100/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-base-300">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={formData.image || currentProduct?.image}
                alt={formData.name || currentProduct?.name}
                className="w-full h-[400px] object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="mt-6 space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight">
                {currentProduct?.name}
              </h1>

              <p className="text-2xl font-bold text-primary">
                ${currentProduct?.price}
              </p>

              <div className="badge badge-primary badge-outline px-4 py-3 mt-2">
                Premium Product
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - EDIT FORM */}
          <div className="bg-base-100/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-base-300">
            <h2 className="text-3xl font-bold mb-8 tracking-tight">
              ✏ Edit Product
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id);
              }}
              className="space-y-6"
            >
              {/* Product Name */}
              <div>
                <label className="label font-semibold">Product Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full focus:input-primary transition-all"
                  value={formData.name || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="label font-semibold">Price</label>
                <input
                  type="number"
                  className="input input-bordered w-full focus:input-primary transition-all"
                  value={formData.price || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="label font-semibold">Image URL</label>
                <input
                  type="url"
                  className="input input-bordered w-full focus:input-primary transition-all"
                  value={formData.image || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 hover:scale-105 transition-transform"
                >
                  Update Product
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error flex-1 hover:scale-105 transition-transform"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
