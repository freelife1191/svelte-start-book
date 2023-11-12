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

    loadingArticle.turnOnLoading()
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
      loadingArticle.turnOffLoading()
    }
    catch(error) {
      loadingArticle.turnOffLoading()
      throw error
    }
  }

  const resetArticles = () => {
    set({...initValues})
    currentArticlesPage.resetPage()
    articlePageLock.set(false)
  }

  const addArticle = async (content) => {

    const access_token = get(auth).Authorization

    try {

      const options =  {
        path:"/articles",
        data: {
          content: content,
        },
        access_token: access_token,
      }

      const newArticle = await postApi(options)

      // 추가된 부분만을 스토어에 저장 변경된 부분만 다시 불러옴
      update(datas => {
        datas.articleList = [newArticle, ...datas.articleList]
        return datas
      })

      // 만약 무조건적으로 새로운 글이 나타나야 한다면, update로 store를 업데이트 하지 말고, 목록을 새로 불러오면 됨.
      // articles.resetArticles()

      return
    }
    catch(error) {
      throw error
    }
  }

  const openMenuPopup = (id) => {
    update(datas => {
      datas.menuPopup = id
      return datas
    })
  }

  const closeMenuPopup = () => {
    update(datas => {
      datas.menuPopup = ''
      return datas
    })
  }

  const openEditModeArticle = (id) => {
    articles.closeMenuPopup()

    update(datas => {
      datas.editMode = id
      return datas
    })
  }

  const closeEditModeArticle = () => {
    update(datas => {
      datas.editMode = ''
      return datas
    })
  }

  const updateArticle = async (article) => {

    const access_token = get(auth).Authorization

    try {
      const updateData = {
        articleId: article.id,
        content: article.content,
      }

      const options = {
        path: '/articles',
        data: updateData,
        access_token: access_token,
      }

      const updateArticle = await putApi(options)

      update(datas => {
        const newArticleList = datas.articleList.map(article => {
          if(article.id === updateArticle.id) {
            article = updateArticle
          }
          return article
        })
        datas.articleList = newArticleList
        return datas
      })

      articles.closeEditModeArticle()
      alert('수정이 완료되었습니다. ')
    }
    catch(error) {
      alert('수정중에 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const deleteArticle = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/articles/${id}`,
        access_token: access_token
      }

      await delApi(options)

      update(datas => {
        const newArticleList = datas.articleList.filter(article => article.id !== id)
        datas.articleList = newArticleList
        return datas
      })

    }
    catch(error) {
      alert('삭제 중 오류가 발생했습니다. ')
    }
  }

  /**
   * 코멘트 개수 증가
   * @param articleId
   */
  const increArticleCommentCount = (articleId) => {
    update(datas => {
      const newArticleList = datas.articleList.map(article => {
        if(article.id === articleId) {
          article.commentCount = article.commentCount + 1
        }
        return article
      })
      datas.articleList = newArticleList
      return datas
    })
  }

  /**
   * 코멘트 개수 감소
   * @param articleId
   */
  const decreArticleCommentCount = (articleId) => {
    update(datas => {
      const newArticleList = datas.articleList.map(article => {
        if(article.id === articleId) {
          article.commentCount = article.commentCount - 1
        }
        return article
      })
      datas.articleList = newArticleList
      return datas
    })
  }

  return {
    subscribe,
    fetchArticles,
    resetArticles,
    addArticle,
    openMenuPopup,
    closeMenuPopup,
    openEditModeArticle,
    closeEditModeArticle,
    updateArticle,
    deleteArticle,
    increArticleCommentCount,
    decreArticleCommentCount,
  }
}

/**
 * 게시물이 불러와 질 떄 서버와의 통신중이라면 로딩상태를 표시하는 기능을 함
 */
function setLoadingArticle() {
  const {subscribe, set} = writable(false)

  const turnOnLoading = () => {
    set(true)
    articlePageLock.set(true)
  }
  const turnOffLoading = () => {
    set(false)
    articlePageLock.set(false)
  }

  return {
    subscribe,
    turnOnLoading,
    turnOffLoading,
  }
}

/**
 * 목록 형태의 여러게시물이 아닌 게시물 하나의 정보만을 담음
 */
function setArticleContent() {
  let initValues = {
    id: '',
    userId: '',
    userEmail: '',
    content: '',
    createdAt: '',
    commentCount: 0,
    likeCount: 0,
    likeUsers: [],
  }

  const { subscribe, set } = writable({...initValues})

  const getArticle = async (id) => {

    try {
      const options = {
        path: `/articles/${id}`
      }

      const getData = await getApi(options)
      set(getData)
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  return {
    subscribe,
    getArticle,
  }
}

/**
 * 특정 게시물의 코멘트들을 담음
 * 코멘트 추가, 수정, 삭제 등을 처리하는 사용자정의 메소드를 가짐
 */
function setComments() {
  const { subscribe, update, set } = writable([])

  const fetchComments = async (id) => {
    try {
      const options = {
        path: `/comments/${id}`
      }

      const getDatas = await getApi(options)
      set(getDatas.comments)
    }
    catch(error) {
      alert('오류가 발생했습니다 다시 시도해 주세요.')
    }
  }

  const addComment = async (articleId, commentContent) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: '/comments',
        data: {
          articleId: articleId,
          content: commentContent,
        },
        access_token: access_token,
      }

      const newData = await postApi(options)
      update(datas => [...datas, newData])
      articles.increArticleCommentCount(articleId)
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const deleteComment = async(commentId, articleId) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: '/comments',
        data: {
          commentId: commentId,
          articleId: articleId,
        },
        access_token: access_token,
      }

      await delApi(options)
      update(datas => datas.filter(comment => comment.id !== commentId))
      articles.decreArticleCommentCount(articleId)
      alert('커멘트가 삭제 되었습니다.')
    }
    catch(error) {
      alert('삭제 중 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  return {
    subscribe,
    fetchComments,
    addComment,
    deleteComment,
  }
}

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
      // alert('오류가 발생했습니다. 다시시도해 주세요')
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
export const articlePageLock = writable(false)
export const loadingArticle = setLoadingArticle()
export const articleContent = setArticleContent()
export const comments = setComments()
export const auth = setAuth()
export const articlesMode = setArticlesMode()
export const isLogin = setIsLogin()
export const isRefresh = writable(false)