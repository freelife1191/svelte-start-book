<script>
  import { onMount } from 'svelte'
  import { articles, currentArticlesPage, loadingArticle, articlePageLock, articlesMode } from '../stores'
  import Article from './Article.svelte'
  // import ArticleLoading from './ArticleLoading.svelte'
  import { router } from 'tinro'
  import InfiniteScroll from './InfiniteScroll.svelte';

  // let component
  // let element
  let currentMode = $router.path.split("/")[2]

  onMount(() => {
    articlesMode.changeMode(currentMode)
    // articles.resetArticles()
    // articles.fetchArticles()
  })


  /* 무한 스크롤 기능 컴포넌트화를 위한 주석처리 infiniteScroll.svelte로 로직 이동
  $: {
    if(component) {
      element = component.parentNode
      element.addEventListener('scroll', onScroll)
      element.addEventListener('resize', onScroll)
    }
  }

  const onScroll = (e) => {
    const scrollHeight = e.target.scrollHeight
    const clientHeight = e.target.clientHeight
    const scrollTop = e.target.scrollTop
    const realHeight = scrollHeight - clientHeight
    const triggerHeight = realHeight * 0.7

    const triggerComputed = () => {
      return scrollTop > triggerHeight
    }

    // 현재 페이지가 전체 페이지보다 작거나 같으면 true 리턴
    const countCheck = () => {
      const check = $articles.totalPageCount <= $currentArticlesPage
      return check;
    }

    // countCheck를 이용해 현재페이지가 페이지 마지막일 경우 articlePageLock을 true로 해서 이를 통해 더이상 페이지가 증가하지 않게함
    if(countCheck()) {
      articlePageLock.set(true)
    }

    const scrollTrigger = () => {
      return triggerComputed() && !countCheck() && !$articlePageLock
    }

    if(scrollTrigger()) {
      currentArticlesPage.increPage()
    }
  }
  */
</script>

<!-- slog-list-wrap start-->
<!-- <div class="slog-list-wrap infiniteTarget" bind:this={component} > -->
<div class="slog-list-wrap infiniteTarget" >
  <ul class="slog-ul">
    {#each $articles.articleList as article, index}
      <li class="mb-5" >
        <Article {article} />
      </li>
    {/each}
  </ul>

  <!-- {#if $loadingArticle }
    <ArticleLoading />
  {/if} -->

  <InfiniteScroll
      loading={$loadingArticle}
      pageLock={$articlePageLock}
      totalPageCount={$articles.totalPageCount}
      currentPage={$currentArticlesPage}
      domTarget={'.infiniteTarget'}
      on:onPageLock={() => articlePageLock.set(true)}
      on:increPage={() => currentArticlesPage.increPage()}
  />
</div><!-- slog-list-wrap end-->