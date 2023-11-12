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


## 6. 스토어 배치

---

`src/stores/index.js` 추가


## 7. 인증 구현 - store

---

- **access_token**
   - 15분~1시간 정도의 만료시간
   - 클라이언트 메모리에 저장
   - 자바스크립트로 로드 가능
- **refresh_token**
   - 1주 혹은 이상의 만료시간
   - 쿠키로 로컬에 저장
   - httpOnly라 자바스크립트로 로드 불가능
      - 서버의 요청에 의해서만 읽거나 쓸수 있어 보안이 좀 더 강화됨

인증 절차
![](attachments/Pasted%20image%2020231111195521.png)

`refresh_token` 만료되기 전이라면 `access_token`을 정상 발급

![](attachments/Pasted%20image%2020231111201308.png)

`refresh_token`이 만료되었다면 **isRefresh store**로 체크해서 `access_token` 발급을 거부함
![](attachments/Pasted%20image%2020231111201330.png)


## 8. 인증구현 - 컴포넌트

---

- `Derived`: 이미 만들어진 store를 참조해서 새로운 값을 리턴하는 형태의 스토어

- `class:main-menu-selected={url==='/login'}`: `url`이 `/login`일 때 `main-menu-selected` css 적용

- refresh_token 위치
    -  개발자모드 - Application - Storage - Cookies - http://localhost:5173


## 9. 글 목록 구현

---

- 서버 페이지 요청 URL: http://localhost:3000/articles?pageNumber=1

### 1. 무한 스크롤 페이지 기능 구현

- `src/stores/index.js`
    - `currentArticlePage`
    - `articles`
- `src/components`
    - `Article.svelte`
    - `ArticleList.svelte`

- **onScroll**
    -  `e.target.scrollHeight`: 브라우저의 스크롤 높이
    - `e.target.clientHeight`: 브라우저의 화면 높이
    - `e.target.scrollTop`: 브라우저에서 현재 스크롤 위치
- 목록에 추가
    - `realHeight`: 실제 스크롤 사이즈
    - `triggerHeight`: 다음 페이지가 호출된 스크롤 위치(`realHeight * 0.7`)

### 2. 무한 스크롤 페이지 기능 보완

데이터를 다 받아왔는데도 일정 높이에서 스크롤 이동시 데이터를 계속 받아오고 페이지가 계속 증가되는 문제 해결

- `src/stores/index.js`
  - `articlePageLock`: 특정조건에 해당하면 더이상 페이지를 증가하지 않는 잠금장치 역할
  - `loadingArticle`: 데이터를 받아오는 동안 로딩중임을 나타냄
- `src/components`
  - `ArticleList.svelte`: 위의 보완사항을 적용


## 10. 글 작성 구현

---

- `src/stores/index.js`
  - `addArticle`: 게시글 작성 기능 추가
- `src/components`
  - `ArticleAddForm.svelte`: 게시글 작성 시 서버에 등록되어 리스트에 보여짐
- `src/pages`
  - `Articles.svelte`: 로그인 시에만 게시글 작성 폼이 보임


## 11. 글 수정 및 삭제 구현

---

### 마우스 클릭시 수정/삭제 팝업 토글
- `src/stores/index.js`
  - `openMenuPopup`
  - `closeMenuPopup`
- `src/components`
  - `Article.svelte`

### 수정 버튼 클릭시 EditForm 열기
- `src/stores/index.js`
  - `openEditModeArticle`
  - `closeEditModeArticle`
- `src/components`
  - `Article.svelte`: 수정 버튼 클릭시 EditForm 열기 기능 추가
  - `ArticleEditForm.svelte`: EditForm에 조회된 데이터 채워서 보여주는 기능 추가

