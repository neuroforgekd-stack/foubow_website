async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://127.0.0.1:2300/api/coze/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      login_password: password
    })
  });

  const result = await res.json();

  if (result.code === 1) {
    alert("登录成功！");
    location.href = "/home.html";
  } else {
    alert("登录失败：" + result.msg);
  }
}