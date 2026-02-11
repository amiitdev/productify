import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '';

const RETRY_TIME = 60; // seconds

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  retryAfter: 0,
  currentProduct: null,

  // ✅ FORM STATE
  formData: {
    name: '',
    price: '',
    image: '',
  },

  // ✅ IMPORTANT: merge form data, don’t replace
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  resetForm: () =>
    set({
      formData: { name: '', price: '', image: '' },
    }),

  // ✅ ADD PRODUCT
  addProduct: async (e) => {
    e.preventDefault();

    const { formData, fetchProducts, resetForm } = get();

    // Frontend validation
    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Please fill all fields');
      return;
    }

    set({ loading: true });

    try {
      await axios.post(`${BASE_URL}/api/products`, {
        name: formData.name.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
      });

      await fetchProducts();
      resetForm();

      toast.success('Product added successfully');
      document.getElementById('add-product-modal')?.close();
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error('Too many requests. Please wait.');
      } else {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            'Failed to add product',
        );
      }
    } finally {
      set({ loading: false });
    }
  },

  // ✅ FETCH PRODUCTS
  fetchProducts: async () => {
    const { retryAfter } = get();
    if (retryAfter > 0) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      set({ products: res.data.data, loading: false });
    } catch (error) {
      if (error.response?.status === 429) {
        set({
          error: `Too many requests. Try again in ${RETRY_TIME}s`,
          loading: false,
          retryAfter: RETRY_TIME,
        });

        const interval = setInterval(() => {
          set((state) => {
            if (state.retryAfter <= 1) {
              clearInterval(interval);
              return { retryAfter: 0, error: null };
            }
            return { retryAfter: state.retryAfter - 1 };
          });
        }, 1000);
      } else {
        set({
          error: error.message || 'Something went wrong',
          loading: false,
        });
      }
    }
  },

  // ✅ DELETE PRODUCT
  deleteProduct: async (id) => {
    set({ loading: true });

    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
      toast.success('Product deleted');
    } catch (error) {
      toast.error(error.message || 'Failed to delete');
    } finally {
      set({ loading: false });
    }
  },

  // ✅ FETCH SINGLE PRODUCT
  fetchProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${id}`);
      console.log('response', res.data.data);
      set({
        currentProduct: res.data.data,
        formData: res.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch product',
      });
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    const { formData, fetchProducts } = get();

    // Frontend validation
    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Please fill all fields');
      return;
    }

    set({ loading: true });

    try {
      await axios.put(`${BASE_URL}/api/products/${id}`, {
        name: formData.name.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
      });

      await fetchProducts();
      toast.success('Product updated successfully');
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error('Too many requests. Please wait.');
      } else {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            'Failed to update product',
        );
      }
    } finally {
      set({ loading: false });
    }
  },
}));
