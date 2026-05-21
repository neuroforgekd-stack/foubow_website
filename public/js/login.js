document.addEventListener('DOMContentLoaded', () => {
  // 密码显示/隐藏切换
  const eyeBtn = document.querySelector('.material-symbols-outlined');
  const pwdInput = document.getElementById('password');
  if (eyeBtn && pwdInput) {
    eyeBtn.addEventListener('click', () => {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeBtn.textContent = 'visibility_off';
      } else {
        pwdInput.type = 'password';
        eyeBtn.textContent = 'visibility';
      }
    });
  }

  // 登录表单提交（唯一、不冲突、安全）
  const form = document.querySelector('form');
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      const email = document.getElementById('email')?.value.trim() || '';
      const pwd = document.getElementById('password')?.value.trim() || '';

      if (!email || !pwd) {
        alert('请输入邮箱和密码');
        return false;
      }

      alert('登录成功！即将跳转到首页');
      window.location.href = 'index.html';
      return false;
    };
  }

  // 立即注册跳转
  document.querySelectorAll('a').forEach(a => {
    const text = a.textContent.trim();
    if (text.includes('立即注册')) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'register.html';
      });
    }
  });
});