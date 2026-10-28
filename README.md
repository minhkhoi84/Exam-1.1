# Exam-1.1

Bài tập React Hooks: **Stopwatch** và **SearchFilter**. Hướng dẫn chi tiết xem [my-react-app/README.md](my-react-app/README.md).

## Cấu trúc thư mục

```
Exam-1.1/
├── README.md                  ← file này
└── my-react-app/              ← dự án React (Vite)
    ├── README.md              ← giải thích bài tập và các hook
    ├── index.html             ← trang HTML gốc, chứa <div id="root">
    ├── package.json           ← thư viện và các lệnh npm
    ├── package-lock.json
    ├── vite.config.js         ← cấu hình Vite
    ├── eslint.config.js       ← cấu hình ESLint
    ├── .gitignore
    ├── public/
    │   └── favicon.svg        ← icon trang (phục vụ nguyên bản)
    └── src/
        ├── main.jsx           ← điểm khởi động: gắn <App /> vào #root
        ├── App.jsx            ← component gốc, bật/tắt từng bài tập
        ├── index.css          ← CSS chung cho cả app
        └── components/        ← các component (giao diện dùng MUI)
            ├── Stopwatch.jsx
            └── SearchFilter.jsx
```

## Chạy dự án

```bash
cd my-react-app
npm install
npm run dev     # mở http://localhost:5173
```
