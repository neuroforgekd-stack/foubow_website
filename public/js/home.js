// 卡片hover动画加强
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.boxShadow = '0 25px 50px -15px rgba(6,182,212,0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // 按钮跳转
  const startBtn = document.querySelector('button:has(.material-symbols-outlined)');
  if (startBtn) {
    startBtn.addEventListener('click', () => goTo('register'));
  }
});