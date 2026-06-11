let heroIndex = 0;
let heroTimer;

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  renderProductGrid('bestseller', 'productGrid', { mergeVariants: true });
  initHeroSlider();
  initCountdown();
});

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  if (!slides.length || !dotsContainer) return;

  dotsContainer.innerHTML = Array.from(slides, (_, i) =>
    `<button class="hero-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
  ).join('');

  dotsContainer.addEventListener('click', e => { const dot = e.target.closest('.hero-dot'); if (dot) goToSlide(+dot.dataset.index); });
  document.getElementById('heroPrev')?.addEventListener('click', () => goToSlide(heroIndex - 1));
  document.getElementById('heroNext')?.addEventListener('click', () => goToSlide(heroIndex + 1));
  startHeroAutoplay();
  const hero = document.getElementById('hero');
  hero?.addEventListener('mouseenter', () => clearInterval(heroTimer));
  hero?.addEventListener('mouseleave', startHeroAutoplay);
}

function loadHeroSlideImage(slide) {
  const img = slide?.querySelector('.hero-slide-img');
  if (!img?.dataset.src || img.src) return;
  img.src = img.dataset.src;
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  heroIndex = ((index % slides.length) + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === heroIndex));
  dots.forEach((d, i) => d.classList.toggle('active', i === heroIndex));
  loadHeroSlideImage(slides[heroIndex]);
  loadHeroSlideImage(slides[(heroIndex + 1) % slides.length]);
}

function startHeroAutoplay() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), 5000);
}
