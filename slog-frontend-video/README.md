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


## 4. 라우터 설정

---

1. tinro 설치
```bash
$ npm i -D tinro
```

2. pages 및 router 추가
- `src/pages/Articles.svelte`
- `src/pagesComments.svelte
- `src/pages/Login.svelte`
- `src/pages/Register.svelte`
- `src/pages/notFound.svelte`
- `src/router.svelte`

3. App.svelte, main.js, main.css 수정
- `src/App.svelte`
- `main.js`
- `styles/main.css`


## 5. axios를 이용한 서버통신 설정

---

1. axios 설치
```bash
$ npm i axios
```

axios 사용법
```js
axios.get("http://localhost:3000/api/articles", {
  headers: {
    X-Auth-Token: '###'
  }
})

axios.get("http://localhost:3000/api/likes", {
  headers: {
    X-Auth-Token: '###'
  }
})

axios.post("http://localhost:3000/api/articles",
  {
    content" '###'
  },
  {
  headers: {
    X-Auth-Token: '###'
  }
})
```

axios 중복 제거 함수
```js
getApi({path: '/articles'})
getApi({path: '/likes'})

const options = {
  path: '/article',
  data: {
    email: '###'
  }
}

postApi(options);
```

`src/services/api.js` 추가