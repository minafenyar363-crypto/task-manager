# Task Manager - DevOps Learning Project

مشروع بسيط (Frontend + Backend + Database) اتبني عشان تطبيق مفاهيم:
Docker, Docker Compose, Networks, Volumes, وCI/CD.

## Architecture

```
[ Frontend (nginx) ] --/api--> [ Backend (Node/Express) ] --> [ Database (PostgreSQL) ]
      :8080                          :3000                         :5432
```

## تشغيل المشروع

```bash
docker-compose up --build
```

بعدين افتح المتصفح على:
```
http://localhost:8080
```

## إيقاف المشروع

```bash
docker-compose down
```

لو عايز تمسح بيانات الـ database كمان (الـ volume):
```bash
docker-compose down -v
```

## بنية المشروع

```
task-manager/
├── backend/          # Express API
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── frontend/         # Static frontend + nginx reverse proxy
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   ├── nginx.conf
│   └── Dockerfile
├── db/
│   └── init.sql      # بيعمل الجدول تلقائياً أول مرة
├── docker-compose.yml
└── .github/workflows/ci.yml   # CI pipeline (test + build)
```
