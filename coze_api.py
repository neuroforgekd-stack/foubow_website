from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import requests

load_dotenv()
app = Flask(__name__)

# 基础配置
COZE_URL = "https://api.coze.cn/v1/workflow/stream_run"
TOKEN = os.getenv("COZE_TOKEN")
APP_ID = os.getenv("COZE_APP_ID")

# --------------------------
# 登录接口（你要的登录功能）
# --------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("login_password")

    if not email or not password:
        return jsonify({"code": 0, "msg": "参数不完整"}), 400

    # 调用 Coze 登录 API
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
        },
        stream=True
    )

    try:
        result = resp.json()
        output = result.get("output", 0)
    except:
        output = 0

    # output=1 登录成功
    if output == 1:
        return jsonify({
            "code": 1,
            "msg": "登录成功"
        })
    else:
        return jsonify({
            "code": 0,
            "msg": "邮箱或密码错误"
        })

# --------------------------
# 注册接口
# --------------------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("login_password")
    username = data.get("user_name")

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
        },
        stream=True
    )

    return jsonify({
        "code": 1,
        "msg": "注册成功",
        "data": resp.text
    })

# Vercel 必须
if __name__ == "__main__":
    app.run()