from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

load_dotenv()
app = Flask(__name__)
CORS(app)  # 允许所有跨域请求

# 基础配置
COZE_URL = "https://api.coze.cn/v1/workflow/run"  # 使用非流式接口
TOKEN = os.getenv("COZE_TOKEN")
APP_ID = os.getenv("COZE_APP_ID")

# --------------------------
# 登录接口
# --------------------------
@app.route("/api/coze/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("login_password")

    if not email or not password:
        return jsonify({"code": 0, "msg": "参数不完整"}), 400

    # 调用 Coze 登录 API（非流式响应）
    try:
        resp = requests.post(
            COZE_URL,
            headers={
                "Authorization": f"Bearer {TOKEN}",
                "Content-Type": "application/json"
            },
            json={
                "workflow_id": os.getenv("COZE_LOGIN_WF"),
                "app_id": APP_ID,
                "parameters": {
                    "email": email,
                    "login_password": password
                }
            }
        )
        resp.raise_for_status()
        result = resp.json()
        output = result.get("output", 0)
        
    except requests.exceptions.RequestException as e:
        return jsonify({"code": 0, "msg": f"调用 Coze API 失败: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"code": 0, "msg": f"解析响应失败: {str(e)}"}), 500

    if output == 1:
        return jsonify({"code": 1, "msg": "登录成功"})
    else:
        return jsonify({"code": 0, "msg": "邮箱或密码错误"})

# --------------------------
# 注册接口
# --------------------------
@app.route("/api/coze/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("login_password")
    username = data.get("user_name")

    if not email or not password or not username:
        return jsonify({"code": 0, "msg": "参数不完整"}), 400

    try:
        resp = requests.post(
            COZE_URL,
            headers={
                "Authorization": f"Bearer {TOKEN}",
                "Content-Type": "application/json"
            },
            json={
                "workflow_id": os.getenv("COZE_REGISTER_WF"),
                "app_id": APP_ID,
                "parameters": {
                    "email": email,
                    "login_password": password,
                    "user_name": username
                }
            }
        )
        resp.raise_for_status()
        result = resp.json()
        output = result.get("output", 0)
        
    except requests.exceptions.RequestException as e:
        return jsonify({"code": 0, "msg": f"调用 Coze API 失败: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"code": 0, "msg": f"解析响应失败: {str(e)}"}), 500

    if output == 1:
        return jsonify({"code": 1, "msg": "注册成功"})
    else:
        return jsonify({"code": 0, "msg": "注册失败"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=2300, debug=True)

# 在文件末尾添加
from vercel_wsgi import handle_wsgi

def handler(request, **kwargs):
    return handle_wsgi(app, request)