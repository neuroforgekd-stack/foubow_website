document.addEventListener('DOMContentLoaded', () => {
  // 密码可见切换
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

  // 注册表单提交（无冲突版）
  const form = document.querySelector('form');
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      const nickname = document.getElementById('nickname')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const pwd = document.getElementById('password')?.value.trim() || '';
      const confirmPwd = document.getElementById('confirm_password')?.value.trim() || '';
      const terms = document.getElementById('terms')?.checked || false;

      if (!nickname || !email || !pwd || !confirmPwd) {
        alert('请填写所有必填项');
        return false;
      }
      if (pwd !== confirmPwd) {
        alert('两次输入的密码不一致');
        return false;
      }
      if (!terms) {
        alert('请同意服务条款与隐私政策');
        return false;
      }

      alert('注册成功！即将跳转到登录页');
      window.location.href = 'login.html';
      return false;
    };
  }

  // 跳转 立即登录
  document.querySelectorAll('a').forEach(a => {
    const text = a.textContent.trim();
    if (text.includes('立即登录')) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
      });
    }
    if (text.includes('隐私政策')) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'privacy.html';
      });
    }
    if (text.includes('服务条款')) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'terms.html';
      });
    }
  });
});