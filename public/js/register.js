async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  const res = await fetch("http://127.0.0.1:2300/api/coze/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      login_password: password,
      user_name: username
    })
  });

  const result = await res.json();
  alert(result.msg);
}