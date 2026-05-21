// 导航栏滚动效果
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav, header');
  if (nav) {
    if (window.scrollY > 20) {
      nav.classList.add('shadow-md', 'bg-surface/95');
    } else {
      nav.classList.remove('shadow-md', 'bg-surface/95');
    }
  }
});

// 页面跳转（统一跳转函数）
function goTo(page) {
  window.location.href = page + '.html';
}

// 绑定所有带 href="#xxx" 的跳转
document.addEventListener('DOMContentLoaded', () => {
  // 首页导航
  document.querySelectorAll('nav a').forEach(a => {
    const text = a.textContent.trim();
    if (text === '首页') a.href = 'index.html';
    if (text === '登录') a.href = 'login.html';
    if (text === '注册') a.href = 'register.html';
  });

  // 底部链接
  document.querySelectorAll('footer a').forEach(a => {
    const text = a.textContent.trim();
    if (text === '隐私政策') a.href = 'privacy.html';
    if (text === '服务条款') a.href = 'terms.html';
    if (text === '登录') a.href = 'login.html';
    if (text === '注册') a.href = 'register.html';
  });
});