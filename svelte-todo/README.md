# 8. 실전 프로젝트(1) Todo 서비스 만들기

## 1. Todo 프로젝트 설명
---

### 1.1 Todo 서비스 기능
- TodoHeader 컴포넌트
- TodoInfo 컴포넌트
- TodoList 컴포넌트
- TodoItem 컴포넌트

### 1.2 기본 환경설정
Svelte Template 프로젝트 생성 및 설치
```bash
$ npx digit sveltejs/template ./
$ npm install
```

실행
```
$ npm run dev
```

설치 경로
```bash
설치경로
├── node_modules
├── public
│   ├── favicon.png
│   ├── global.css
│   └── index.html
├── scripts
├── src
│   ├── App.svelte
│   └── main.js
├── package.json
└── rollup.config.js
```

`/public/global.css`교체


## 2. 컴포넌트 배치
---

기본적인 컴포넌트 배치
```bash
...
├── src
│   ├── components
│   │   ├── TodoHeader.svelte // 추가
│   │   ├── TodoInfo.svelte // 추가
│   │   ├── TodoList.svelte // 추가
│   │   └── TodoItem.svelte // 추가
│   ├── App.svelte
│   └── main.js
...
```

![](attachments/20231105164311.png)