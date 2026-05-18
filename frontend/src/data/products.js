export const products = [
  {
    _id: '1',
    name: 'Logitech MX Master 3',
    brand: 'Logitech',
    category: 'accessories',
    price: 99.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 324,
    countInStock: 15,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c3c9c?w=800&auto=format&fit=crop',
    ],
    description: 'Ultrafast magspeed scrolling - remarkable speed, precision & quietness of electromagnetic scrolling with all new magspeed wheel - up to 90% faster, 87% more precise & ultra quiet.',
    specs: [
      { label: 'Connectivity', value: 'Bluetooth / USB Receiver' },
      { label: 'Battery Life', value: 'Up to 70 days' },
      { label: 'Sensor', value: 'Darkfield high precision (4000 DPI)' },
      { label: 'Weight', value: '141 g' },
    ]
  },
  {
    _id: '2',
    name: 'Smart Water Bottle',
    brand: 'HydraTech',
    category: 'accessories',
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.5,
    reviews: 128,
    countInStock: 30,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop',
    ],
    description: 'Keep track of your daily water intake with this stainless steel smart water bottle. It syncs with your phone and glows to remind you to drink.',
    specs: [
      { label: 'Material', value: 'Stainless Steel' },
      { label: 'Capacity', value: '20 oz' },
      { label: 'Battery', value: 'Rechargeable (lasts 12 days)' },
    ]
  },
  {
    _id: '3',
    name: 'HomePod Mini',
    brand: 'Apple',
    category: 'audio',
    price: 99.00,
    originalPrice: null,
    rating: 4.9,
    reviews: 512,
    countInStock: 0,
    images: [
      'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop',
    ],
    description: 'Jam-packed with innovation, HomePod mini delivers unexpectedly big sound for a speaker of its size. At just 3.3 inches tall, it takes up almost no space but fills the entire room with rich 360-degree audio.',
    specs: [
      { label: 'Audio Technology', value: 'Full-range driver and dual passive radiators' },
      { label: 'Connectivity', value: 'Wi-Fi / Bluetooth 5.0' },
      { label: 'Smart Assistant', value: 'Siri built-in' },
    ]
  },
  {
    _id: '4',
    name: 'AirPods Pro Case',
    brand: 'Spigen',
    category: 'cases',
    price: 29.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    countInStock: 50,
    images: [
      'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&auto=format&fit=crop',
    ],
    description: 'A rugged, matte black protective case for your AirPods Pro. Includes a carabiner for easy carrying.',
    specs: [
      { label: 'Material', value: 'TPU / Polycarbonate' },
      { label: 'Compatibility', value: 'AirPods Pro 1st & 2nd Gen' },
      { label: 'Color', value: 'Matte Black' },
    ]
  },
  {
    _id: '5',
    name: 'Apple Watch Ultra',
    brand: 'Apple',
    category: 'technology',
    price: 799.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 215,
    countInStock: 8,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop',
    ],
    description: 'The most rugged and capable Apple Watch ever. With a robust titanium case, precision dual-frequency GPS, up to 36 hours of battery life, and three specialized bands made for athletes and adventurers of all kinds.',
    specs: [
      { label: 'Case Material', value: 'Aerospace-grade titanium' },
      { label: 'Display', value: 'Always-On Retina LTPO OLED (2000 nits)' },
      { label: 'Water Resistance', value: '100m' },
    ]
  },
  {
    _id: '6',
    name: 'Wireless Charging Stand',
    brand: 'Belkin',
    category: 'accessories',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviews: 75,
    countInStock: 20,
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop',
    ],
    description: 'Fast wireless charging for your Qi-enabled devices. The minimalist design perfectly holds your phone at a comfortable viewing angle.',
    specs: [
      { label: 'Output', value: 'Up to 15W' },
      { label: 'Compatibility', value: 'Qi-enabled smartphones' },
      { label: 'Included', value: 'Wall adapter & cable' },
    ]
  },
  {
    _id: '7',
    name: 'VR Headset (Oculus Quest 2)',
    brand: 'Meta',
    category: 'technology',
    price: 399.00,
    originalPrice: 499.00,
    rating: 4.7,
    reviews: 1042,
    countInStock: 12,
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&auto=format&fit=crop',
    ],
    description: 'Experience our most advanced all-in-one VR system yet. Every detail has been engineered to make virtual worlds adapt to your movements.',
    specs: [
      { label: 'Storage', value: '128GB' },
      { label: 'Display', value: 'LCD 1832 x 1920 per eye' },
      { label: 'Refresh Rate', value: '90 Hz / 120 Hz' },
    ]
  },
  {
    _id: '8',
    name: 'Mechanical Keyboard RGB',
    brand: 'Keychron',
    category: 'accessories',
    price: 129.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 310,
    countInStock: 25,
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop',
    ],
    description: 'A premium wireless mechanical keyboard crafted for maximum productivity. Hot-swappable switches and customizable RGB backlight.',
    specs: [
      { label: 'Switches', value: 'Gateron G Pro Mechanical' },
      { label: 'Connectivity', value: 'Bluetooth 5.1 / Type-C' },
      { label: 'Battery', value: '4000mAh' },
    ]
  },
  {
    _id: '9',
    name: 'MacBook Pro 16" M3 Max',
    brand: 'Apple',
    category: 'technology',
    price: 3499.00,
    originalPrice: 3699.00,
    rating: 4.9,
    reviews: 128,
    countInStock: 5,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop',
    ],
    description: 'The new MacBook Pro is a powerhouse of a laptop. Supercharged by M3 Pro or M3 Max, it takes its power and efficiency further than ever.',
    specs: [
      { label: 'Processor', value: 'Apple M3 Max chip' },
      { label: 'Memory', value: '36GB unified memory' },
      { label: 'Storage', value: '1TB SSD' },
      { label: 'Display', value: '16.2-inch Liquid Retina XDR' },
    ]
  },
  {
    _id: '10',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'audio',
    price: 348.00,
    originalPrice: 399.00,
    rating: 4.8,
    reviews: 845,
    countInStock: 40,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop',
    ],
    description: 'Industry leading noise cancellation with two processors controlling 8 microphones. Magnificent sound, engineered to perfection.',
    specs: [
      { label: 'Noise Canceling', value: 'Active Noise Cancellation (ANC)' },
      { label: 'Battery Life', value: 'Up to 30 hours' },
      { label: 'Connectivity', value: 'Bluetooth 5.2' },
    ]
  },
  {
    _id: '11',
    name: 'Minimalist Phone Case',
    brand: 'Nomad',
    category: 'cases',
    price: 49.95,
    originalPrice: null,
    rating: 4.5,
    reviews: 112,
    countInStock: 60,
    images: [
      'https://images.unsplash.com/photo-1601593346740-925612772716?w=800&auto=format&fit=crop',
    ],
    description: 'A rugged yet elegant leather case designed to protect your phone from everyday drops and scratches.',
    specs: [
      { label: 'Material', value: 'Horween Leather' },
      { label: 'Drop Protection', value: '10ft drop protection' },
      { label: 'MagSafe', value: 'Fully compatible' },
    ]
  }
];
