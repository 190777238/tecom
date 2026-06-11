const PRODUCTS = [
  {
    id: 1,
    title: 'TECOMLIGHT LED Puck Lights with Remote Control, Battery Operated Wireless Closet Light, Under Cabinet Lighting Stick on Tap Push Lights, Color Changing Under Counter Light for Kitchen, 6 Pack - Black',
    price: 25.99,
    color: 'Black',
    pack: '6 Pack',
    variantGroup: 'puck-lights-remote',
    image: 'images/images-bl6-1.jpg',
    images: [
      'images/images-bl6-1.jpg',
      'images/images-bl6-2.jpg',
      'images/images-bl6-3.jpg',
      'images/images-bl6-4.jpg',
      'images/images-bl6-5.jpg',
      'images/images-bl6-6.jpg',
    ],
    category: 'under-cabinet',
    isNew: true,
    isBestSeller: true,
    onSale: true,
    salePrice: 22.99,
    desc: 'Wireless double-sided adhesive mount, tap-activated, AA battery powered. Black, 6 pack — perfect for kitchen, pantry, and closet.'
  },
  {
    id: 2,
    title: 'TECOMLIGHT LED Puck Lights with Remote Control, Battery Operated Wireless Closet Light, Under Cabinet Lighting Stick on Tap Push Lights, Color Changing Under Counter Light for Kitchen, 2 Pack - Black',
    price: 15.99,
    color: 'Black',
    pack: '2 Pack',
    variantGroup: 'puck-lights-remote',
    image: 'images/images-bl2-1.jpg',
    images: [
      'images/images-bl2-1.jpg',
      'images/images-bl2-2.jpg',
      'images/images-bl2-3.jpg',
      'images/images-bl2-4.jpg',
      'images/images-bl2-5.jpg',
      'images/images-bl2-6.jpg'
    ],
    category: 'under-cabinet',
    isNew: true,
    isBestSeller: false,
    onSale: true,
    salePrice: 12.99,
    desc: 'Wireless double-sided adhesive mount, tap-activated, AA battery powered. Black, 2 pack — ideal for smaller spaces or trying before a full set.'
  },
  {
    id: 3,
    title: 'TECOMLIGHT LED Puck Lights with Remote Control, Battery Operated Wireless Closet Light, Under Cabinet Lighting Stick on Tap Push Lights, Color Changing Under Counter Light for Kitchen, 6 Pack - White',
    price: 25.99,
    color: 'White',
    pack: '6 Pack',
    variantGroup: 'puck-lights-remote',
    image: 'images/images-wh6-1.jpg',
    images: [
      'images/images-wh6-1.jpg',
      'images/images-wh6-2.jpg',
      'images/images-wh6-3.jpg',
      'images/images-wh6-4.jpg',
      'images/images-wh6-5.jpg',
      'images/images-wh6-6.jpg'
    ],
    category: 'under-cabinet',
    isNew: true,
    isBestSeller: false,
    onSale: true,
    salePrice: 22.99,
    desc: 'Wireless double-sided adhesive mount, tap-activated, AA battery powered. White, 6 pack — perfect for kitchen, pantry, and closet.'
  },
  {
    id: 4,
    title: 'TECOMLIGHT LED Puck Lights with Remote Control, Battery Operated Wireless Closet Light, Under Cabinet Lighting Stick on Tap Push Lights, Color Changing Under Counter Light for Kitchen, 2 Pack - White',
    price: 15.99,
    color: 'White',
    pack: '2 Pack',
    variantGroup: 'puck-lights-remote',
    image: 'images/images-wh2-1.jpg',
    images: [
      'images/images-wh2-1.jpg',
      'images/images-wh2-2.jpg',
      'images/images-wh2-3.jpg',
      'images/images-wh2-4.jpg',
      'images/images-wh2-5.jpg',
      'images/images-wh2-6.jpg'
    ],
    category: 'under-cabinet',
    isNew: true,
    isBestSeller: false,
    onSale: true,
    salePrice: 12.99,
    desc: 'Wireless double-sided adhesive mount, tap-activated, AA battery powered. White, 2 pack — ideal for smaller spaces or trying before a full set.'
  },
  {
    id: 5,
    title: 'TECOMLIGHT Groupable & Linkable LED Puck Lights Pro, 2.4G Remote Control, Rechargeable Under Cabinet Lighting, Tap & Touch Activated, 3 CCT & RGB Color Changing, Auto-Off Timer, 6 Pack - White',
    price: 45.99,
    color: 'White',
    pack: '6 Pack',
    variantGroup: 'puck-lights-t036',
    image: 'images/images-t036-wh6-1.jpg',
    images: [
      'images/images-t036-wh6-1.jpg',
      'images/images-t036-wh6-2.jpg',
      'images/images-t036-wh6-3.jpg',
      'images/images-t036-wh6-4.jpg',
      'images/images-t036-wh6-5.jpg',
      'images/images-t036-wh6-6.jpg'
    ],
    category: 'under-cabinet',
    isNew: false,
    isBestSeller: true,
    onSale: false,
    salePrice: 39.99,
    desc: 'Complete 5-pack set with remote control, timer function, and adjustable brightness for any space.'
  },
  {
    id: 6,
    title: 'TECOMLIGHT Groupable & Linkable LED Puck Lights Pro, 2.4G Remote Control, Rechargeable Under Cabinet Lighting, Tap & Touch Activated, 3 CCT & RGB Color Changing, Auto-Off Timer, 6 Pack - Black',
    price: 45.99,
    color: 'Black',
    pack: '6 Pack',
    variantGroup: 'puck-lights-t036',
    image: 'images/images-t036-bl6-1.jpg',
    images: [
      'images/images-t036-bl6-1.jpg',
      'images/images-t036-bl6-2.jpg',
      'images/images-t036-bl6-3.jpg',
      'images/images-t036-bl6-4.jpg',
      'images/images-t036-bl6-5.jpg',
      'images/images-t036-bl6-6.jpg',
    ],
    category: 'under-cabinet',
    isNew: false,
    isBestSeller: true,
    onSale: false,
    salePrice: 39.99,
    desc: 'Complete 5-pack set with remote control, timer function, and adjustable brightness for any space.'
  },
  {
    id: 7,
    title: 'TECOMLIGHT Groupable & Linkable LED Puck Lights Pro, 2.4G Remote Control, Rechargeable Under Cabinet Lighting, Tap & Touch Activated, 3 CCT & RGB Color Changing, Auto-Off Timer, 3 Pack - White',
    price: 29.99,
    color: 'White',
    pack: '3 Pack',
    variantGroup: 'puck-lights-t036',
    image: 'images/images-t036-wh3-1.jpg',
    images: [
      'images/images-t036-wh3-1.jpg',
      'images/images-t036-wh6-2.jpg',
      'images/images-t036-wh6-3.jpg',
      'images/images-t036-wh6-4.jpg',
      'images/images-t036-wh6-5.jpg',
      'images/images-t036-wh6-6.jpg'
    ],
    category: 'under-cabinet',
    isNew: false,
    isBestSeller: true,
    onSale: false,
    salePrice: 24.99,
    desc: 'Versatile puck lights with RGB color options, remote control, and magnetic adhesive backing for easy placement.'
  },
  {
    id: 8,
    title: 'TECOMLIGHT Groupable & Linkable LED Puck Lights Pro, 2.4G Remote Control, Rechargeable Under Cabinet Lighting, Tap & Touch Activated, 3 CCT & RGB Color Changing, Auto-Off Timer, 3 Pack - Black',
    price: 29.99,
    color: 'Black',
    pack: '3 Pack',
    variantGroup: 'puck-lights-t036',
    image: 'images/images-t036-bl3-1.jpg',
    images: [
      'images/images-t036-bl3-1.jpg',
      'images/images-t036-bl6-2.jpg',
      'images/images-t036-bl6-3.jpg',
      'images/images-t036-bl6-4.jpg',
      'images/images-t036-bl6-5.jpg',
      'images/images-t036-bl6-6.jpg',
    ],
    category: 'under-cabinet',
    isNew: false,
    isBestSeller: true,
    onSale: false,
    salePrice: 24.99,
    desc: 'Versatile puck lights with RGB color options, remote control, and magnetic adhesive backing for easy placement.'
  },
  {
    id: 9,
    title: 'TECOMLIGHT Battery Operated Wall Sconce Lights for Bedroom Set of 2, Wireless Rechargeable LED Wall Lamp with Remote & On/Off Pull Chain, Wall Mount Lighting Fixtures for Living Room, Satin Gold',
    price: 59.99,
    color: 'Satin Gold',
    pack: 'Set of 2',
    variantGroup: 'tws-001',
    image: 'images/images-tws001-gld1.jpg',
    images: [
      'images/images-tws001-gld1.jpg',
      'images/images-tws001-gld2.jpg',
      'images/images-tws001-gld3.jpg',
      'images/images-tws001-gld4.jpg',
      'images/images-tws001-gld5.jpg',
      'images/images-tws001-gld6.jpg',
      'images/images-tws001-gld7.jpg',
      'images/images-tws001-gld8.jpg',
    ],
    category: 'wall-lights',
    isNew: true,
    isBestSeller: true,
    onSale: false,
    salePrice: 39.99,
    desc: 'Cordless wall sconce with detachable rechargeable battery, pull chain & remote control, ideal for bedroom ambient and bedside lighting.'
  },
  {
    id: 10,
    title: 'TECOMLIGHT Rechargeable Battery Operated Wall Sconces Set of 2, Wireless LED Wall Lights with Remote & On/Off Pull Chain, Wall Mounted Lamp Lighting Fixture for Bedroom Living Room, Matte Black',
    price: 59.99,
    color: 'Matte Black',
    pack: 'Set of 2',
    variantGroup: 'tws-001',
    image: 'images/images-tws001-bl1.jpg',
    images: [
      'images/images-tws001-bl1.jpg',
      'images/images-tws001-bl2.jpg',
      'images/images-tws001-bl3.jpg',
      'images/images-tws001-bl4.jpg',
      'images/images-tws001-bl5.jpg',
      'images/images-tws001-gld6.jpg',
      'images/images-tws001-bl7.jpg',
      'images/images-tws001-bl8.jpg',
    ],
    category: 'wall-lights',
    isNew: true,
    isBestSeller: true,
    onSale: false,
    salePrice: 39.99,
    desc: 'Cordless wall sconce with detachable rechargeable battery, pull chain & remote control, ideal for bedroom ambient and bedside lighting.'
  },


  {
    id: 11,
    title: 'Solar Brick Paver Lights 8x4 Outdoor LED Pathway Ground Lights, IP67 Waterproof Landscape Lighting for Walkway, Driveway, Patio, Pool Deck, Remote Control & Tunable White - Pack of 2',
    price: 79.99,
    color: 'Tunable White',
    pack: 'Pack of 2',
    variantGroup: 'solar-brick-paver-lights',
    image: 'images/images-sbl-w1.jpg',
    images: [
      'images/images-sbl-w1.jpg',
      'images/images-sbl-w2.jpg',
      'images/images-sbl-w3.jpg',
      'images/images-sbl-w4.jpg',
      'images/images-sbl-w5.jpg',
      'images/images-sbl-w6.jpg',
    ],
    category: 'outdoor',
    isNew: true,
    isBestSeller: false,
    onSale: false,
    salePrice: 59.99,
    desc: 'Solar-powered outdoor security lights with IP65 waterproof rating and intelligent motion detection.'
  },
  {
    id: 12,
    title: 'Solar Brick Paver Lights 8x4 Outdoor LED Pathway Ground Lights, IP67 Waterproof Landscape Lighting for Walkway, Driveway, Patio, Pool Deck, Remote Control & RGB Color Changing - Pack of 2',
    price: 79.99,
    color: 'RGB Color Changing',
    pack: 'Pack of 2',
    variantGroup: 'solar-brick-paver-lights',
    image: 'images/images-sbl-rgb1.jpg',
    images: [
      'images/images-sbl-rgb1.jpg',
      'images/images-sbl-rgb2.jpg',
      'images/images-sbl-rgb3.jpg',
      'images/images-sbl-rgb4.jpg',
      'images/images-sbl-rgb5.jpg',
      'images/images-sbl-rgb6.jpg',
    ],
    category: 'outdoor',
    isNew: true,
    isBestSeller: false,
    onSale: false,
    salePrice: 59.99,
    desc: 'Solar-powered outdoor security lights with IP65 waterproof rating and intelligent motion detection.'
  },
];

function getProductImages(product) {
  if (Array.isArray(product.images) && product.images.length) return product.images;
  if (typeof product.image === 'string' && product.image.includes(',')) {
    return product.image.split(',').map(s => s.trim()).filter(Boolean);
  }
  return product.image ? [product.image] : [];
}

function getProductImage(product) {
  const images = getProductImages(product);
  return images[0] || '';
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function filterProducts(filter) {
  switch (filter) {
    case 'new': return PRODUCTS.filter(p => p.isNew);
    case 'bestseller': return PRODUCTS.filter(p => p.isBestSeller);
    case 'sale': return PRODUCTS.filter(p => p.onSale);
    case 'all': return PRODUCTS;
    default: return PRODUCTS.filter(p => p.category === filter);
  }
}

function getDisplayPrice(product) {
  return product.onSale && product.salePrice ? product.salePrice : product.price;
}

function getProductVariantLabel(product) {
  if (product.color && product.pack) return `${product.color} · ${product.pack}`;
  if (product.colors > 1) return `${product.colors} colors available`;
  return '';
}

function getVariantOptions(variantGroup) {
  const variants = PRODUCTS.filter(p => p.variantGroup === variantGroup);
  const colors = [...new Set(variants.map(v => v.color).filter(Boolean))].sort();
  const packs = [...new Set(variants.map(v => v.pack).filter(Boolean))];
  packs.sort((a, b) => (parseInt(a, 10) || 0) - (parseInt(b, 10) || 0));
  return { colors, packs, variants };
}

function findProductVariant(variantGroup, color, pack) {
  return PRODUCTS.find(p =>
    p.variantGroup === variantGroup && p.color === color && p.pack === pack
  );
}

function mergeProductsByVariantGroup(products) {
  const seen = new Set();
  return products.filter(p => {
    if (!p.variantGroup) return true;
    if (seen.has(p.variantGroup)) return false;
    seen.add(p.variantGroup);
    return true;
  });
}

function getMergedDisplayTitle(product) {
  let title = product.title;
  if (product.pack && product.color) {
    const packColorSuffix = `, ${product.pack} - ${product.color}`;
    if (title.endsWith(packColorSuffix)) title = title.slice(0, -packColorSuffix.length);
    const dashColorPackSuffix = ` - ${product.color} - ${product.pack}`;
    if (title.endsWith(dashColorPackSuffix)) title = title.slice(0, -dashColorPackSuffix.length);
  }
  if (product.pack) {
    const packSuffix = ` - ${product.pack}`;
    if (title.endsWith(packSuffix)) title = title.slice(0, -packSuffix.length);
  }
  if (product.color) {
    const colorSuffix = `, ${product.color}`;
    if (title.endsWith(colorSuffix)) title = title.slice(0, -colorSuffix.length);
  }
  return title;
}

function getMergedVariantLabel(variantGroup) {
  const { colors, packs } = getVariantOptions(variantGroup);
  const parts = [];
  if (colors.length > 1) parts.push(`${colors.length} colors`);
  else if (colors.length === 1) parts.push(colors[0]);
  if (packs.length > 1) parts.push(`${packs.length} pack sizes`);
  else if (packs.length === 1) parts.push(packs[0]);
  return parts.join(' · ');
}

function getVariantGroupMinPrice(variantGroup) {
  const variants = PRODUCTS.filter(p => p.variantGroup === variantGroup);
  if (!variants.length) return 0;
  return Math.min(...variants.map(getDisplayPrice));
}