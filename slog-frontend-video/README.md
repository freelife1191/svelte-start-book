# 11. Svelte REST API Project

https://www.youtube.com/playlist?list=PLEU9vwKdoCqSOCmW55QZM2k2RE3EKChHY

- 디자인(html+css): https://github.com/freeseamew/slog-with-tailwindcss
- Backend Server: https://github.com/freeseamew/SLOG-FASTIFY-PRISMA-SERVER
- Frontend: https://github.com/freeseamew/SLOG-FRONTEND-SVELTE


## 1. API 서버 설치 및 사용법 학습

---

1. node.js 설치
```bash
$ brew install node

# n 설치
$ npm i -g n
# lts node 설치
$ sudo n lts
```

2. backend server 설치 후 실행
```bash
$ git clone https://github.com/freeseamew/SLOG-FASTIFY-PRISMA-SERVER
$ cd SLOG-FASTIFY-PRISMA-SERVER
$ npm install
$ npm start
```

3. Swagger 접속 확인
   http://localhost:3000/documentation/static/index.html


## 2. 프로젝트 생성 및 컴포넌트 배치

---

1. 프로젝트 생성
```bash
$ mkdir slog-frontend-video
$ cd slog-frontend-video
$ npm init vite ./
# svelte, javascript 선택
$ npm install
```

2. 실행
```bash
$ npm run dev
```

3. 불필요한 파일제거
`src` 디렉토리 내에 `App.svelte`, `main.js`를 제외하고 모두 삭제

4. Component 생성 및 Style Tag 적용
   https://github.com/freeseamew/slog-with-tailwindcss

CSS 적용
