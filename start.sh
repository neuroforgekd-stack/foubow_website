#!/bin/bash
set -e

# 检查环境变量
echo "Checking environment..."
echo "PORT: ${PORT:-2300}"

# 安装依赖
echo "Installing dependencies..."
pip install -r requirements.txt

# 启动应用
echo "Starting application..."
exec gunicorn --bind "0.0.0.0:${PORT:-2300}" app:app
