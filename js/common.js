let cart = [];
try {
  const stored = JSON.parse(localStorage.getItem('tecomlight-cart') || '[]');
  cart = Array.isArray(stored)
    ? stored.filter(c =>
      c && typeof c.id === 'number' && c.title
      && typeof c.price === 'number' && c.image
      && typeof c.qty === 'number' && c.qty > 0
    )
    : [];
} catch {
  cart = [];
}

function initCommon() {
  initCart();
  initNavigation();
  initSearch();
  initCookieBanner();
  initNewsletter();
  initEscapeClose();
  initPaymentIcons();
  updateCartUI();
  highlightActiveNav();
}

const PAYMENT_METHODS = [
  { name: 'Visa', icon: 'images/payment/visa.svg' },
  { name: 'Mastercard', icon: 'images/payment/mastercard.svg' },
  { name: 'PayPal', icon: 'images/payment/paypal.svg' },
  { name: 'Apple Pay', icon: 'images/payment/apple-pay.svg' },
  { name: 'Google Pay', icon: 'images/payment/google-pay.svg' },
  { name: 'Shop Pay', icon: 'images/payment/shop-pay.svg' }
];

function initPaymentIcons() {
  document.querySelectorAll('.payment-icons').forEach(container => {
    if (container.dataset.rendered) return;
    container.dataset.rendered = '1';
    container.innerHTML = PAYMENT_METHODS.map(p =>
      `<span class="pay-icon" title="${p.name}"><img src="${p.icon}" alt="${p.name}" width="38" height="24" loading="lazy"></span>`
    ).join('');
  });
}

function initEscapeClose() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeQuickView();
    document.getElementById('searchModal')?.classList.remove('open');
    closeCartDrawer();
    closeMobileNav();
  });
}

function highlightActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('.nav-list a, .mobile-nav-list a').forEach(link => {
    if (link.dataset.nav === page) link.classList.add('active');
  });
}

function buildProductGalleryHtml(product) {
  const images = getProductImages(product);
  const main = images[0] || '';
  if (images.length <= 1) {
    return `<img src="${main}" alt="${product.title}" loading="lazy" decoding="async">`;
  }
  const dots = images.map((_, i) =>
    `<button type="button" class="pg-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Image ${i + 1}"></button>`
  ).join('');
  return `
    <img class="pg-main" src="${main}" alt="${product.title}" loading="lazy" decoding="async">
    <button type="button" class="pg-arrow pg-prev" aria-label="Previous image">&#8249;</button>
    <button type="button" class="pg-arrow pg-next" aria-label="Next image">&#8250;</button>
    <div class="pg-dots">${dots}</div>
  `;
}

function initProductGalleries(root) {
  root.querySelectorAll('.product-gallery').forEach(wrap => {
    let images;
    try {
      images = JSON.parse(wrap.dataset.images);
    } catch {
      return;
    }
    if (!Array.isArray(images) || !images.length) return;

    let index = 0;
    const img = wrap.querySelector('.pg-main');
    const dots = wrap.querySelectorAll('.pg-dot');
    if (!img) return;

    function show(i) {
      index = ((i % images.length) + images.length) % images.length;
      img.src = images[index];
      dots.forEach((d, j) => d.classList.toggle('active', j === index));
    }

    wrap.querySelector('.pg-prev')?.addEventListener('click', e => { e.stopPropagation(); show(index - 1); });
    wrap.querySelector('.pg-next')?.addEventListener('click', e => { e.stopPropagation(); show(index + 1); });
    dots.forEach(dot => dot.addEventListener('click', e => { e.stopPropagation(); show(+dot.dataset.index); }));
  });
}

function renderProductGrid(filter, containerId = 'productGrid', options = {}) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  let products = filterProducts(filter);
  if (options.mergeVariants) products = mergeProductsByVariantGroup(products);
  if (!products.length) {
    grid.innerHTML = '<p class="empty-message">No products found in this collection.</p>';
    return;
  }

  grid.innerHTML = products.map(p => {
    const isMergedVariant = options.mergeVariants && p.variantGroup;
    const price = isMergedVariant ? getVariantGroupMinPrice(p.variantGroup) : getDisplayPrice(p);
    const images = getProductImages(p);
    const original = p.onSale && p.salePrice
      ? `<span class="product-price-original">$${p.price.toFixed(2)}</span>`
      : '';
    const badge = p.onSale ? '<span class="product-badge sale">Sale</span>' : (p.isNew ? '<span class="product-badge new">New</span>' : '');
    const galleryClass = images.length > 1 ? ' product-gallery' : '';
    const galleryData = images.length > 1 ? ` data-images='${JSON.stringify(images)}'` : '';
    const title = isMergedVariant ? getMergedDisplayTitle(p) : p.title;
    const variantLabel = isMergedVariant
      ? getMergedVariantLabel(p.variantGroup)
      : getProductVariantLabel(p);

    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-image-wrap${galleryClass}"${galleryData}>
          ${badge}
          ${buildProductGalleryHtml(p)}
          <div class="product-actions">
            <button class="product-action-btn quick-view-btn" data-id="${p.id}">Quick view</button>
            <button class="product-action-btn add-cart-btn" data-id="${p.id}">Add to cart</button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">${title}</h3>
          <p class="product-price">${original}${isMergedVariant ? 'From ' : ''}$${price.toFixed(2)}</p>
          ${variantLabel ? `<p class="product-colors">${variantLabel}</p>` : ''}
        </div>
      </article>
    `;
  }).join('');

  initProductGalleries(grid);

  if (!grid.dataset.actionsBound) {
    grid.dataset.actionsBound = '1';
    grid.addEventListener('click', e => {
      const qvBtn = e.target.closest('.quick-view-btn');
      const cartBtn = e.target.closest('.add-cart-btn');
      if (qvBtn) openQuickView(+qvBtn.dataset.id);
      if (cartBtn) addToCart(+cartBtn.dataset.id);
    });
  }
}

function openCartDrawer() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('overlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  if (!document.getElementById('mobileNav')?.classList.contains('open')) {
    document.getElementById('overlay')?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initCart() {
  document.getElementById('cartBtn')?.addEventListener('click', openCartDrawer);
  document.getElementById('mbCart')?.addEventListener('click', openCartDrawer);
  document.getElementById('closeCart')?.addEventListener('click', closeCartDrawer);
  document.getElementById('startShopping')?.addEventListener('click', closeCartDrawer);

  document.getElementById('overlay')?.addEventListener('click', () => {
    closeCartDrawer();
    closeMobileNav();
    closeSearch();
    closeQuickView();
  });
}

function addToCart(id) {
  const product = getProductById(id);
  if (!product) return;
  addToCartItem({
    id: product.id,
    title: product.title,
    price: getDisplayPrice(product),
    image: getProductImage(product)
  });
}

function addToCartItem(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  saveCart();
  updateCartUI();
  showToast('Added to cart');
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('tecomlight-cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });

  const empty = document.getElementById('cartEmpty');
  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const total = document.getElementById('cartTotal');
  if (!empty) return;

  if (cart.length === 0) {
    empty.style.display = 'block';
    items.innerHTML = '';
    footer.hidden = true;
    return;
  }

  empty.style.display = 'none';
  footer.hidden = false;
  total.textContent = `$${cart.reduce((sum, c) => sum + c.price * c.qty, 0).toFixed(2)}`;

  items.innerHTML = cart.map(c => `
    <li>
      <img class="cart-item-img" src="${c.image}" alt="${c.title}">
      <div class="cart-item-info">
        <p class="cart-item-title">${c.title}</p>
        <p class="cart-item-price">$${c.price.toFixed(2)} × ${c.qty}</p>
        <button class="cart-item-remove" data-id="${c.id}">Remove</button>
      </div>
    </li>
  `).join('');

  items.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(+btn.dataset.id));
  });
}

function buildQvThumbsHtml(images) {
  if (images.length <= 1) return '';
  return `<div class="qv-thumbs">${images.map((src, i) =>
    `<button type="button" class="qv-thumb${i === 0 ? ' active' : ''}" data-src="${src}" aria-label="View image ${i + 1}"><img src="${src}" alt="" loading="lazy" decoding="async"></button>`
  ).join('')}</div>`;
}

function buildQvPriceHtml(product) {
  const price = getDisplayPrice(product);
  if (product.onSale && product.salePrice) {
    return `<p class="product-price"><span class="product-price-original">$${product.price.toFixed(2)}</span> $${price.toFixed(2)}</p>`;
  }
  return `<p class="product-price">$${price.toFixed(2)}</p>`;
}

function buildQvVariantPickerHtml(product) {
  const { colors, packs } = getVariantOptions(product.variantGroup);
  const colorGroup = colors.length > 1 ? `
      <div class="qv-option-group">
        <span class="qv-option-label">Color</span>
        <div class="qv-options">${colors.map(c =>
    `<button type="button" class="qv-option-btn${c === product.color ? ' active' : ''}" data-type="color" data-value="${c}">${c}</button>`
  ).join('')}</div>
      </div>` : '';
  const packGroup = packs.length > 1 ? `
      <div class="qv-option-group">
        <span class="qv-option-label">Pack</span>
        <div class="qv-options">${packs.map(p =>
    `<button type="button" class="qv-option-btn${p === product.pack ? ' active' : ''}" data-type="pack" data-value="${p}">${p}</button>`
  ).join('')}</div>
      </div>` : '';
  return `<div class="qv-variants">${colorGroup}${packGroup}</div>`;
}

function bindQvThumbs(content) {
  content.querySelectorAll('.qv-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const mainImg = content.querySelector('#qvMainImg');
      if (mainImg) mainImg.src = btn.dataset.src;
      content.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function updateQuickViewVariant(content, product) {
  const images = getProductImages(product);
  content.dataset.currentId = product.id;
  content.dataset.variantGroup = product.variantGroup || '';

  const mainImg = content.querySelector('#qvMainImg');
  if (mainImg) {
    mainImg.src = images[0] || '';
    mainImg.alt = product.title;
  }

  const imageWrap = content.querySelector('.qv-image');
  const existingThumbs = content.querySelector('.qv-thumbs');
  if (existingThumbs) existingThumbs.remove();
  if (imageWrap && images.length > 1) {
    imageWrap.insertAdjacentHTML('beforeend', buildQvThumbsHtml(images));
    bindQvThumbs(content);
  }

  const titleEl = content.querySelector('#qvTitle');
  if (titleEl) titleEl.textContent = product.title;

  const priceEl = content.querySelector('#qvPrice');
  if (priceEl) priceEl.innerHTML = buildQvPriceHtml(product);

  const descEl = content.querySelector('#qvDesc');
  if (descEl) descEl.textContent = product.desc;

  content.querySelectorAll('.qv-option-btn').forEach(btn => {
    const type = btn.dataset.type;
    const value = btn.dataset.value;
    const isActive = type === 'color' ? value === product.color : value === product.pack;
    btn.classList.toggle('active', isActive);
  });
}

function bindQvVariantPicker(content) {
  const variantsEl = content.querySelector('.qv-variants');
  if (!variantsEl) return;

  variantsEl.addEventListener('click', e => {
    const btn = e.target.closest('.qv-option-btn');
    if (!btn) return;

    const group = btn.closest('.qv-options');
    group?.querySelectorAll('.qv-option-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const { colors, packs } = getVariantOptions(content.dataset.variantGroup);
    const color = content.querySelector('.qv-option-btn[data-type="color"].active')?.dataset.value
      || colors[0];
    const pack = content.querySelector('.qv-option-btn[data-type="pack"].active')?.dataset.value
      || packs[0];
    if (!color || !pack) return;

    const variant = findProductVariant(content.dataset.variantGroup, color, pack);
    if (variant) updateQuickViewVariant(content, variant);
  });
}

function openQuickView(id) {
  const product = getProductById(id);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  const images = getProductImages(product);
  const variantOptions = product.variantGroup ? getVariantOptions(product.variantGroup) : null;
  const variantPicker = variantOptions?.variants.length > 1 ? buildQvVariantPickerHtml(product) : '';

  content.innerHTML = `
    <button class="close-btn qv-close" id="qvClose">&times;</button>
    <div class="qv-image">
      <img id="qvMainImg" src="${images[0] || ''}" alt="${product.title}">
      ${buildQvThumbsHtml(images)}
    </div>
    <div class="qv-details">
      <h3 id="qvTitle">${product.title}</h3>
      <div id="qvPrice">${buildQvPriceHtml(product)}</div>
      ${variantPicker}
      <p id="qvDesc">${product.desc}</p>
      <button class="btn btn-primary" id="qvAddCart">Add to cart</button>
    </div>
  `;

  content.dataset.currentId = product.id;
  content.dataset.variantGroup = product.variantGroup || '';
  bindQvThumbs(content);
  if (product.variantGroup) bindQvVariantPicker(content);

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('qvClose').addEventListener('click', closeQuickView);
  document.getElementById('qvAddCart').addEventListener('click', () => {
    addToCart(+content.dataset.currentId);
    closeQuickView();
  });
  modal.onclick = e => { if (e.target === modal) closeQuickView(); };
}

function closeQuickView() {
  document.getElementById('quickViewModal')?.classList.remove('open');
  if (!document.getElementById('cartDrawer')?.classList.contains('open')
    && !document.getElementById('mobileNav')?.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function initNavigation() {
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('mobileNav').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('closeMobileNav')?.addEventListener('click', closeMobileNav);
  document.querySelectorAll('.mobile-nav-list a').forEach(link => link.addEventListener('click', closeMobileNav));
  document.querySelectorAll('.mobile-accordion').forEach(btn => {
    btn.addEventListener('click', () => document.getElementById(btn.dataset.target)?.classList.toggle('open'));
  });
}

function closeMobileNav() {
  document.getElementById('mobileNav')?.classList.remove('open');
  if (!document.getElementById('cartDrawer')?.classList.contains('open')) {
    document.getElementById('overlay')?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initSearch() {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!modal || !input || !results) return;

  const open = () => { modal.classList.add('open'); input.value = ''; results.innerHTML = ''; setTimeout(() => input.focus(), 100); };
  const close = () => modal.classList.remove('open');

  document.getElementById('searchBtn')?.addEventListener('click', open);
  document.getElementById('mbSearch')?.addEventListener('click', open);
  document.getElementById('closeSearch')?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const matches = PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.category.includes(q));
    results.innerHTML = matches.length
      ? matches.map(p => `<div class="search-result-item" data-id="${p.id}"><img src="${getProductImage(p)}" alt=""><span>${p.title}</span></div>`).join('')
      : '<p style="padding:12px;color:#666;font-size:13px">No results found</p>';
    results.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => { openQuickView(+item.dataset.id); close(); });
    });
  });
}

function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner || localStorage.getItem('tecomlight-cookie')) return;
  setTimeout(() => banner.classList.add('show'), 1000);
  document.getElementById('cookieAccept')?.addEventListener('click', () => { localStorage.setItem('tecomlight-cookie', 'accepted'); banner.classList.remove('show'); });
  document.getElementById('cookieDecline')?.addEventListener('click', () => { localStorage.setItem('tecomlight-cookie', 'declined'); banner.classList.remove('show'); });
}

function initNewsletter() {
  document.getElementById('newsletterForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value) { showToast('Thanks for subscribing!'); input.value = ''; }
  });
}

let countdownTimer;

function initCountdown() {
  if (!document.getElementById('cdDays')) return;
  if (countdownTimer) clearInterval(countdownTimer);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  endDate.setHours(23, 59, 59, 0);

  function tick() {
    const diff = Math.max(0, endDate - Date.now());
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = String(val).padStart(2, '0'); };
    set('cdDays', Math.floor(diff / 86400000));
    set('cdHours', Math.floor((diff % 86400000) / 3600000));
    set('cdMins', Math.floor((diff % 3600000) / 60000));
    set('cdSecs', Math.floor((diff % 60000) / 1000));
  }
  tick();
  countdownTimer = setInterval(tick, 1000);
}

function showToast(msg) {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  Object.assign(toast.style, { position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '4px', fontSize: '13px', zIndex: '400', transition: 'opacity 0.3s', opacity: '0' });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
}
