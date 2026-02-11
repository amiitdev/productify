// import { sql } from '../config/db.js';

// const SAMPLE_PRODUCTS = [
//   {
//     name: 'Premium Wireless Headphones',
//     price: 299.99,
//     image:
//       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
//   },
//   {
//     name: 'Mechanical Gaming Keyboard',
//     price: 159.99,
//     image:
//       'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=60',
//   },
//   {
//     name: 'Smart Watch Pro',
//     price: 249.99,
//     image:
//       'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60',
//   },
//   {
//     name: '4K Ultra HD Camera',
//     price: 899.99,
//     image:
//       'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
//   },
//   {
//     name: 'Portable Bluetooth Speaker',
//     price: 129.99,
//     image:
//       'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop&q=60',
//   },
//   {
//     name: 'Ergonomic Office Chair',
//     price: 349.99,
//     image:
//       'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop&q=60',
//   },
//   {
//     name: 'Gaming Laptop RTX Edition',
//     price: 1799.99,
//     image:
//       'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=60',
//   },
//   {
//     name: 'Wireless Charging Pad',
//     price: 49.99,
//     image:
//       'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60',
//   },
// ];

// async function seedDatabase() {
//   try {
//     // Clear existing data
//     await sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE`;

//     // Insert products
//     for (const product of SAMPLE_PRODUCTS) {
//       await sql`
//         INSERT INTO products (name, price, image)
//         VALUES (${product.name}, ${product.price}, ${product.image})
//       `;
//     }

//     console.log('✅ Database seeded successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//     process.exit(1);
//   }
// }

// seedDatabase();

import { sql } from '../config/db.js';

const SAMPLE_PRODUCTS = [
  {
    name: 'Premium Noise Cancelling Headphones',
    price: 329.99,
    image:
      'https://images.unsplash.com/photo-1635399168977-9ab55a775386?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bm9pc2UlMjBjYW5jZWxsaW5nJTIwaGVhZHBob25lfGVufDB8fDB8fHww',
  },

  {
    name: 'RGB Mechanical Gaming Keyboard',
    price: 179.99,
    image:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Smart Watch Series X',
    price: 279.99,
    image:
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: '4K Professional Mirrorless Camera',
    price: 1199.99,
    image:
      'https://images.unsplash.com/photo-1541766066774-c86dcf76dff2?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlnaXRhbCUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D',
  },

  {
    name: 'Portable Bluetooth Speaker Pro',
    price: 149.99,
    image:
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'UltraWide Curved Monitor 34"',
    price: 699.99,
    image:
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Gaming Laptop RTX 4080 Edition',
    price: 2199.99,
    image:
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Wireless Charging Station 3-in-1',
    price: 89.99,
    image:
      'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Apple MacBook Pro M3',
    price: 2499.99,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'iPhone 15 Pro Max',
    price: 1399.99,
    image:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'PlayStation 5 Console',
    price: 599.99,
    image:
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1600&auto=format&fit=crop&q=80',
  },
  {
    name: 'VR Headset Next Gen',
    price: 499.99,
    image:
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1600&auto=format&fit=crop&q=80',
  },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE`;

    for (const product of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    console.log('✅ HD Digital Products Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
