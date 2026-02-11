import {
  Delete,
  Edit2Icon,
  LucideDelete,
  Trash2Icon,
  ViewIcon,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
const Productcard = ({ product, imageSrc }) => {
  const { deleteProduct } = useProductStore();
  return (
    <div className="card bg-base-100 shadow hover:shadow-xl transition overflow-hidden">
      {/* Product image */}
      <figure className="relative h-44 bg-base-200">
        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x300?text=No+Image';
          }}
        />
      </figure>

      {/* Product info */}
      <div className="card-body p-4">
        <h2 className="card-title text-sm line-clamp-2">{product.name}</h2>

        <p className="text-sm text-base-content/70">${product.price}</p>

        <div className="card-actions justify-end mt-2">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm btn-outline border-t-cyan-7000 hover:border-t-cyan-700/80"
          >
            <Edit2Icon size={15} />
          </Link>
          <button
            onClick={() => deleteProduct(product.id)}
            className="btn btn-sm btn-outline btn-error"
          >
            <Trash2Icon size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
