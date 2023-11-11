import { writable } from "svelte/store"
import { getApi, putApi, delApi, postApi } from "../service/api.js"
import { router } from "tinro"

/**
 * 게시물을 스크롤 할 때 페이지가 증가되는 부분을 다룸
 */
function setCurrentArticlesPage() {}

/**
 * 메인 서비스
 * 게시물 목록이 쌓여지게 되고, 게시물의 수정, 삭제 등과 관련된 사용자정의 메소드와 좋아요나 댓글을 추가 했을 때 상태를 변경해주는 사용자정의 메소드 등을 가지게 됨
 */
function setArticles() {}

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
function setAuth() {}

/**
 * 보기의 상태를 나타냄
 * 보기모드는 모두보기, 좋아요보기, 내글보기의 3가지를 가질 예정
 */
function setArticlesMode() {}

/**
 * 로그인 상태인지 아닌지를 파악함
 */
function setIsLogin() {}

export const currentArticlesPage = setCurrentArticlesPage()
export const articles = setArticles()
export const loadingArticle = setLoadingArticle()
export const articleContent = setArticleContent()
export const comments = setComments()
export const auth = setAuth()
export const articlesMode = setArticlesMode()
export const isLogin = setIsLogin()