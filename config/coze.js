require('dotenv').config();

module.exports = {
  baseUrl: process.env.COZE_BASE_URL || 'https://api.coze.cn/v1/workflow/run',
  token: process.env.COZE_TOKEN,
  appId: process.env.COZE_APP_ID,
  loginWorkflowId: process.env.COZE_LOGIN_WF || process.env.COZE_WORKFLOW_ID,
  registerWorkflowId: process.env.COZE_REGISTER_WF || process.env.COZE_WORKFLOW_ID,
};