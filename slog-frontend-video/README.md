# 11. 실전 프로젝트(2) - SNS 서비스 만들기

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

### 수정/삭제 서버와 통신하여 처리하기
- `src/stores/index.js`
  - `updateArticle`
  - `deleteArticle`
- `src/components`
  - `Article.svelte`: 삭제 버튼 클릭시 서버와 통신하여 삭제처리
  - `ArticleEditForm.svelte`: 수정 완료 버튼 클릭시 서버와 통신하여 수정처리


## 12. 코멘트 관련 기능 구현

---

### 코멘트 버튼 클릭시 코멘트 팝업 오픈
- `src/components`
  - `Article.svelte`: 코멘트 버튼 클릭시 코멘트 페이지 오픈 요청
- `src/pages`
  - `Articles.svelte`: 게시글 하위에 코멘트 페이지 배치
  - `Comments.svelte`: 게시글 하위에 배치된 코멘트 리스트 페이지

### 코멘트 팝업화면에 실제 코멘트 내용 보여주기, 글 목록 보기 클릭시 글 목록으로 이동
- `src/stores/index.js`
  - `setArticleContent`: 목록 형태의 여러게시물이 아닌 게시물 하나의 정보만을 담는 함수 구현
- `src/components`
  - `CommentList.svelte`: 코멘트 팝업 화면에 코멘트 내용 가져와서 보여주고 글 목록 보기 클릭시 글 목록으로 이동하는 기능 추가

### 코멘트 목록/추가/삭제 기능 추가
- `src/stores/index.js`
  - `setComments`: 코멘트 목록 조회/추가/삭제 스토어 기능 추가
- `src/components`
  - `Comment.svelte`: 코멘트 내용을 출력하고 삭제 버튼 클릭시 삭제 처리하는 기능 추가
  - `CommentList.svelte`: 코멘트 리스트를 출력하고 코멘트를 추가하는 기능 추가

### 코멘트 추가/삭제시 카운트 증가/감소 처리
- `src/stores/index.js`
  - `increArticleCommentCount`: 코멘트 개수 증가 처리
  - `decreArticleCommentCount`: 코멘트 개수 감소 처리
  - `setComments.addComment`: 코멘트 개수 증가 처리 추가
  - `setComments.deleteComment`: 코멘트 개수 감소 처리 추가


## 13. '좋아요' 기능 구현

---

### 게시글 좋아요/좋아요 취소 기능 추가
- `src/stores/index.js`
  - `likeArticle`: 게시글 좋아요 스토어 기능
  - `cancelLikeArticle`: 게시글 좋아요 취소 스토어 기능
- `src/components`
  - `Article.svelte`: 게시글 좋아요/좋아요 취소 기능 추가


## 14. 보기모드 변경 구현

---

1. 전체글 보기
  - localhost:3000/articles/?pageNumber=1
2. 내가 작성한 글
  - localhost:3000/articles/?pageNumber=1&mode='my'
3. 상수 추가
  - `ALL`: 모든글보기
  - `MY`: 내글보기
  - `LIKE`: 좋아요글 보기

- `src/utils`
  - `constant.js`: 상수 파일 추가
- `src/stores/index.js`
  - `setArticlesMode`: 보기모드(모두보기, 좋아요보기, 내글보기) 상태 설정
  - `setArticles.fetchArticles`: 선택된 모드에 따라 path 설정
- `src/components`
  - `ArticleHeader.svelte`: 선택된 모드에 따라 해당 화면이 호출됨

### 로그아웃시 모두 보기로 자동으로 이동
- `src/stores/index.js`
  - `setAuth.logout`: `articlesMode.changeMode(ALL)` 코드를 수정


## 15. 앱 완성도 높이기1 - 폼검증
---

폼검증을 위한 `yup` 라이브러리 설치
```bash
$ npm i yup
```

`yup` 사용 예
```js
yup.object().shape({
  formName: yup.string().required('이메일을 입력해주세요.').email('이메일 형식이 잘못 되었습니다.').label('이메일'),
})
```

### 로그인 Form Validation 검증 기능 추가
- `src/utils`
  - `validates.js`: 폼검증을 위한 유틸 추가
- `src/components`
  - `AuthLogin.svelte`: 로그인 이메일/비밀번호 Validation 검증 기능 추가

### 회원가입 Form Validation 검증 기능 추가
- `src/components`
  -  `AuthRegister.svelte`: 로그인 이메일/비밀번호 Validation 검증 기능 추가

### 게시글 입력 Form Validation 검증 기능 추가
- `src/components`
  -  `ArticleAddForm.svelte`: 게시글 입력 Form Validation 검증 기능 추가

### 코멘트 입력 Form Validation 검증 기능 추가
- `src/components`
  -  `CommentList.svelte`: 게시글 입력 Form Validation 검증 기능 추가


## 16. 앱 완성도 높이기 2 - 날짜보기

---

날짜 표시를 위한 `dayjs` 라이브러리 설치
```bash
$ npm i dayjs
```

### 날짜를 직관적으로 표현하기
- `src/utils`
  - `date.js`: `dayjs`에 대한 설정들 작성한 유틸
- `src/components`
  - `Article.svelte`: 게시글 등록 일시에 `dateView` 유틸 적용
  - `CommentList.svelte`: 코멘트 리스트 일시에 `dateView` 유틸 적용
  - `Comment.svelte`: 코멘트 등록 일시에 `dateView` 유틸 적용


## 17. 앱 완성도 높이기 3 - URL을 통한 보기모드 변경

---

- http://localhost:3011/articles/all
- http://localhost:3011/articles/like
- http://localhost:3011/articles/my

### URL 주소로 이동해서 제어하기 위한 설정 추가

- `src/route.svelte`: 로그인 상태일때만 my, like path로 이동되도록 로그아웃일 경우에는 모두보기로
- `src/components`
  - `ArticleList.svelte`: 현재모드를 확인하고 모드를 적용시켜주는 로직 추가
  - `ArticleHeader.svelte`: `router.goto`를 이용해 선택된 url로 이동하도록 수정
  - `Article.svelte`: 커멘트 이동 url에 `currentMode`를 끼워넣음
  - `CommentList.svelte`: 이전 목록 가기에도 `currentMode` 적용


## 18. 앱 완성도 높이기 4 - 게시글 중복 제거

---

게시글이 추가되기 전에 계산된 페이지네이션과 게시글이 추가된 후에 계산된 페이지네이션 결과가 달라서 중복이 발생

### 페이지네이션에 따른 게시글 중복 제거를 위한 유니크 처리 로직 추가
- `src/stores/index.js`
  - `setArticles.fetchArticles`: `uniqueArr` 게시글 유니크 처리 로직을 추가하여 중복 제거


## 19. 앱 완성도 높이기 5 - 페이지네이션 컴포넌트화

---

페이지네이션과 관련된 기능을 다른 컴포넌트로 분리

### InfiniteScroll 컴포넌트 분리
- `src/components`
  - `InfiniteScroll.svelte`: 코드 재사용을 위한 무한 스크롤 기능 컴포넌트 분리
  - `ArticleList.svelte`: 무한 스크롤 기능 `InfiniteScroll.svelte`로 코드 이동

### InfiniteScroll 컴포넌트로 넘겨질 값
- `totalPageCount`: 전체 페이지 수
- `currentPage`: 현재 페이지
- `pageLock`: 다음페이지 호출에 대한 잠금상태
- `loading`: 로딩중 상태
- `domTarget`: 스크롤정보를 얻을 돔 영역
- `articlePageLock.set(true)`: `pageLock` 설정하는 메소드
- `currentArticlesPage.increPage()`: 다음 페이지 호출

### 이벤트 처리
- `dispatch`: 하위 컴포넌트에서 상위 컴포넌트의 이벤트를 실행시키는 역할

- `src/components`
  - `ArticleList.svelte`: `on:onPageLock`, `on:increPage` 추가
  - `InfiniteScroll.svelte`: `onScroll` 로직을 `dispatch` 로직으로 수정

### 역할을 다한 스크롤을 브라우저 메모리에서 해제하여 PC에 주는 부담 감소
- `src/components`
  - `InfiniteScroll.svelte`: `onDestroy`추가


## 20. 마무리
---

- 서버와 REST API로 통신하는 방법
- 라우터를 이용한 페이지이동
- store를 이용한 상태값 처리 패턴
- jwt 토큰을 이용한 인증 패턴
- 무한스크롤을 이용한 페이지네이션
- 폼검증
- 날짜를 보기편하게 표시하는 방법
- 재사용 가능한 컴포넌트를 만드는 법