import { writable, get, derived } from "svelte/store"
import { getApi, putApi, delApi, postApi } from "../service/api.js"
import { router } from "tinro"

/**
 * 게시물을 스크롤 할 때 페이지가 증가되는 부분을 다룸
 */
function setCurrentArticlesPage() {
  const {subscribe, update, set} = writable(1)

  const resetPage = () => set(1)
  const increPage = () => {
    update(data => data + 1)
    articles.fetchArticles()
  }

  return {
    subscribe,
    resetPage,
    increPage,
  }
}

/**
 * 메인 서비스
 * 게시물 목록이 쌓여지게 되고, 게시물의 수정, 삭제 등과 관련된 사용자정의 메소드와 좋아요나 댓글을 추가 했을 때 상태를 변경해주는 사용자정의 메소드 등을 가지게 됨
 */
function setArticles() {
  let initValues = {
    articleList: [],
    totalPageCount: 0,
    menuPopup: '',
    editMode: '',
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchArticles = async () => {
    const currentPage = get(currentArticlesPage)
    let path = `/articles/?pageNumber=${currentPage}`

    try {

      const access_token = get(auth).Authorization

      const options = {
        path: path,
        access_token: access_token,
      }

      const getDatas = await getApi(options)

      const newData = {
        articleList: getDatas.articleList,
        totalPageCount: getDatas.totalPageCount,
      }

      update(datas => {

        if(currentPage === 1) {
          datas.articleList = newData.articleList
          datas.totalPageCount = newData.totalPageCount
        }
        else {
          const newArticles = [...datas.articleList, ...newData.articleList]
          datas.articleList = newArticles
          datas.totalPageCount = newData.totalPageCount
        }

        return datas
      })
    }
    catch(error) {
      throw error
    }
  }

  const resetArticles = () => {
    set({...initValues})
    currentArticlesPage.resetPage()
  }

  return {
    subscribe,
    fetchArticles,
    resetArticles,
  }
}

/**
 * 게시물이 불러와 질 떄 서버와의 통신중이라면 로딩상태를 표시하는 기능을 함
 */
function setLoadingArticle() {}

/**
 * 목록 형태의 여러게시물이 아닌 게시물 하나의 정보만을 담음
 */
function setArticleContent() {}

/**
 * 특정 게시물의 코멘트들을 담음
 * 코멘트 추가, 수정, 삭제 등을 처리하는 사용자정의 메소드를 가짐
 */
function setComments() {}

/**
 * 로그인된 유저의 유저정보(_id, email)를 담음
 * 로그인, 로그아웃, 회원가입 등의 사용자정의 메소드를 가짐
 */
function setAuth() {
  let initValues = {
    id: '',
    email: '',
    Authorization: '',
  }

  // ...initValues가 참조되지 않고 복제되서 나중에 초기화 시킬일이 있을때 변수로 만든 initValues를 이용해 초기화
  // 스토어 내부에서 사용자 정의 메소드를 만들고 외부에서는 이 메소드를 호출해 스토어 값을 변경하는 것이 훨씬 효율적
  // 이유는 발생할 수 있는 오류도 막을 수 있고, 코드의 재사용도 가능하기 때문
  const { subscribe, set, update } = writable({...initValues})

  /**
   * refresh 토큰을 이용해 access_token을 요청함
   * @returns {Promise<void>}
   */
  const refresh = async () => {
    try {
      const authenticationUser = await postApi({path: '/auth/refresh'})
      set(authenticationUser)
      isRefresh.set(true)
    }
    catch(err) {
      auth.resetUserInfo()
      isRefresh.set(false)
    }
  }
  /**
   * 해당 스토어를 초기화 시켜줌
   */
  const resetUserInfo = () => set({...initValues})
  /**
   * 로그인
   * @returns {Promise<void>}
   */
  const login = async(email, password) => {
    try {
      const options = {
        path: '/auth/login',
        data: {
          email: email,
          pwd: password,
        }
      }

      const result = await postApi(options)
      set(result)
      isRefresh.set(true)
      router.goto('/')
    }
    catch(error) {
      alert('오류가 발생했습니다. 로그인을 다시시도해 주세요.')
    }
  }
  /**
   * 로그아웃
   * @returns {Promise<void>}
   */
  const logout = async () => {
    try {
      const options = {
        path: '/auth/logout',
      }

      await delApi(options)
      set({...initValues})
      isRefresh.set(false)
      // router.goto('/')
      articlesMode.changeMode(ALL)
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시시도해 주세요')
    }
  }
  /**
   * 회원가입
   * @returns {Promise<void>}
   */
  const register = async (email, pwd) => {
    try {
      const options = {
        path: '/auth/register',
        data: {
          email: email,
          pwd: pwd,
        }
      }

      await postApi(options)
      alert('가입이 완료되었습니다. ')
      router.goto('/login')
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }


  return {
    subscribe,
    refresh,
    login,
    logout,
    resetUserInfo,
    register,
  }
}

/**
 * 보기의 상태를 나타냄
 * 보기모드는 모두보기, 좋아요보기, 내글보기의 3가지를 가질 예정
 */
function setArticlesMode() {}

/**
 * 로그인 상태인지 아닌지를 파악함
 */
function setIsLogin() {
  const checkLogin = derived(auth, $auth => $auth.Authorization ? true : false)
  return checkLogin
}

export const currentArticlesPage = setCurrentArticlesPage()
export const articles = setArticles()
export const loadingArticle = setLoadingArticle()
export const articleContent = setArticleContent()
export const comments = setComments()
export const auth = setAuth()
export const articlesMode = setArticlesMode()
export const isLogin = setIsLogin()
export const isRefresh = writable(false)