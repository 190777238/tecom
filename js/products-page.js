document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  const filter = document.body.dataset.filter;
  if (filter && document.getElementById('productGrid')) {
    const mergeVariants = document.body.dataset.mergeVariants === 'true';
    renderProductGrid(filter, 'productGrid', { mergeVariants });
  }
  if (document.getElementById('countdown')) initCountdown();
});
