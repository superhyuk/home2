# 🚀 Next BRG Flask 프로젝트 설정 가이드

## 📋 사전 준비사항
- Python 3.8 이상 설치
- Git (선택사항)

## 📁 1. 프로젝트 폴더 생성

```bash
# 프로젝트 폴더 생성 및 이동
mkdir nextbrg_flask
cd nextbrg_flask
```

## 🔧 2. 가상환경 생성

### Windows
```bash
# 가상환경 생성
python -m venv venv

# 가상환경 활성화
venv\Scripts\activate

# 활성화 확인 (프롬프트 앞에 (venv)가 표시됨)
```

### macOS/Linux
```bash
# 가상환경 생성
python3 -m venv venv

# 가상환경 활성화
source venv/bin/activate

# 활성화 확인 (프롬프트 앞에 (venv)가 표시됨)
```

## 📦 3. 패키지 설치

```bash
# pip 업그레이드
pip install --upgrade pip

# requirements.txt 생성 후 패키지 설치
pip install Flask==2.3.3
pip install Werkzeug==2.3.7
pip install python-dotenv==1.0.0
pip install gunicorn==21.2.0

# 또는 requirements.txt 파일이 있다면
pip install -r requirements.txt
```

## 📄 4. 프로젝트 파일 구조 생성

```
nextbrg_flask/
├── app.py
├── requirements.txt
├── .env
├── .gitignore
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── (이미지 파일들)
└── templates/
    ├── base.html
    ├── index.html
    ├── about.html
    ├── portfolio.html
    ├── services.html
    └── contact.html
```

## 🛠️ 5. 환경변수 설정 (.env 파일)

```bash
# .env 파일 생성
touch .env  # Windows에서는 메모장으로 .env 파일 생성
```

`.env` 파일 내용:
```
FLASK_APP=app.py
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-change-this-in-production
```

## 🚫 6. .gitignore 파일 생성

```gitignore
# 가상환경
venv/
env/
ENV/

# Flask
instance/
.webassets-cache

# 환경변수
.env
.env.local

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## ▶️ 7. 애플리케이션 실행

### 개발 모드 실행
```bash
# 방법 1: Flask CLI 사용 (권장)
flask run

# 방법 2: Python으로 직접 실행
python app.py

# 방법 3: 포트 지정해서 실행
flask run --port=5001

# 방법 4: 외부 접속 허용
flask run --host=0.0.0.0
```

### 프로덕션 모드 실행
```bash
# Gunicorn 사용 (Linux/macOS)
gunicorn --bind 0.0.0.0:8000 app:app

# Windows에서는 waitress 사용
pip install waitress
waitress-serve --port=8000 app:app
```

## 🌐 8. 브라우저에서 확인

- **로컬 개발:** http://localhost:5000
- **포트 변경시:** http://localhost:5001
- **외부 접속:** http://YOUR_IP:5000

## 🔄 9. 가상환경 종료

```bash
deactivate
```

## 📋 10. 자주 사용하는 명령어

```bash
# 가상환경 활성화 (매번 작업 시작할 때)
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# 패키지 목록 확인
pip list

# requirements.txt 생성 (패키지 추가 후)
pip freeze > requirements.txt

# Flask 애플리케이션 실행
flask run

# 개발 서버 재시작 (코드 변경 시 자동 재시작)
# FLASK_DEBUG=True 설정 시 자동으로 재시작됨
```

## 🐛 11. 문제 해결

### 포트 이미 사용 중
```bash
# 다른 포트로 실행
flask run --port=5001
```

### 가상환경 인식 안됨
```bash
# 가상환경 재생성
rm -rf venv  # Windows: rmdir /s venv
python -m venv venv
```

### 패키지 설치 오류
```bash
# pip 업그레이드
python -m pip install --upgrade pip

# 캐시 클리어
pip cache purge
```

## 📱 12. 개발 팁

1. **코드 변경 시 자동 재시작:** `FLASK_DEBUG=True` 설정
2. **CSS/JS 캐시 문제:** 브라우저에서 Ctrl+F5로 강제 새로고침
3. **파일 경로 문제:** 상대 경로 대신 `url_for()` 사용
4. **포트 확인:** `netstat -ano | findstr :5000` (Windows)

## 🚀 13. 다음 단계

1. **데이터베이스 연동:** SQLAlchemy 추가
2. **이메일 기능:** Flask-Mail 설정
3. **사용자 인증:** Flask-Login 구현
4. **API 구축:** Flask-RESTful 추가
5. **배포:** Heroku, AWS, 또는 DigitalOcean

---

## 🎯 빠른 시작 스크립트

**setup.bat (Windows)**
```batch
@echo off
echo Creating Next BRG Flask Project...
mkdir nextbrg_flask
cd nextbrg_flask
python -m venv venv
venv\Scripts\activate
pip install --upgrade pip
pip install Flask python-dotenv
echo FLASK_APP=app.py > .env
echo FLASK_ENV=development >> .env
echo FLASK_DEBUG=True >> .env
echo Project setup complete!
echo Run: venv\Scripts\activate then flask run
```

**setup.sh (macOS/Linux)**
```bash
#!/bin/bash
echo "Creating Next BRG Flask Project..."
mkdir nextbrg_flask
cd nextbrg_flask
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install Flask python-dotenv
echo "FLASK_APP=app.py" > .env
echo "FLASK_ENV=development" >> .env
echo "FLASK_DEBUG=True" >> .env
echo "Project setup complete!"
echo "Run: source venv/bin/activate then flask run"
```