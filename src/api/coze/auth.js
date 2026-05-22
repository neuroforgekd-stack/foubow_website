const axios = require("axios");
const cozeConfig = require("../../../config/coze");

/**
 * 调用 Coze API 实现用户注册
 * @param {Object} params 注册参数
 * @param {string} params.email 邮箱
 * @param {string} params.loginPassword 登录密码
 * @param {string} params.userName 用户名
 * @returns {Promise<any>} Coze 接口返回结果
 */
async function cozeRegister(params) {
  try {
    // 构造请求参数（匹配 Coze API 要求）
    const requestData = {
      workflow_id: cozeConfig.registerWorkflowId,
      app_id: cozeConfig.appId,
      parameters: {
        email: params.email,
        login_password: params.loginPassword, // 与 API 字段一致
        user_name: params.userName,
      },
    };

    // 发送 POST 请求（不使用流式响应）
    const response = await axios.post(
      cozeConfig.baseUrl,
      requestData,
      {
        headers: {
          "Authorization": `Bearer ${cozeConfig.token}`,
          "Content-Type": "application/json",
        },
        // 不使用流式响应
      }
    );

    return response.data;
  } catch (error) {
    console.error("Coze 注册接口调用失败：", error.message);
    throw new Error(`注册失败：${error.response?.data?.message || error.message}`);
  }
}

/**
 * 调用 Coze API 实现用户登录
 * @param {Object} params 登录参数（根据你的 login workflow 调整）
 * @param {string} params.email 邮箱
 * @param {string} params.loginPassword 密码
 * @returns {Promise<any>} Coze 接口返回结果
 */
async function cozeLogin(params) {
  try {
    const requestData = {
      workflow_id: cozeConfig.loginWorkflowId,
      app_id: cozeConfig.appId,
      parameters: {
        email: params.email,
        login_password: params.loginPassword,
      },
    };

    const response = await axios.post(
      cozeConfig.baseUrl,
      requestData,
      {
        headers: {
          "Authorization": `Bearer ${cozeConfig.token}`,
          "Content-Type": "application/json",
        },
        // 不使用流式响应
      }
    );

    return response.data;
  } catch (error) {
    console.error("Coze 登录接口调用失败：", error.message);
    throw new Error(`登录失败：${error.response?.data?.message || error.message}`);
  }
}

// 导出方法
module.exports = {
  cozeRegister,
  cozeLogin,
};