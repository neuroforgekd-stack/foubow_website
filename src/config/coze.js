// 顶部加这一行
require('dotenv').config();
const axios = require('axios');

async function register(email, password, username) {
  try {
    const res = await axios.post(
      'https://api.coze.cn/v1/workflow/run',
      {
        workflow_id: process.env.COZE_WORKFLOW_ID,
        app_id: process.env.COZE_APP_ID,
        parameters: {
          email: email,
          login_password: password,
          user_name: username
        }
      },
      {
        headers: {
          // 这里再也没有明文 Token！
          'Authorization': `Bearer ${process.env.COZE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('注册成功', res.data);
  } catch (err) {
    console.error('失败', err.response?.data);
  }
}

register('222@qq.com', '123456', '123456');