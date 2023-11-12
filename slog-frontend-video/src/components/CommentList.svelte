<script>
  import Comment from "./Comment.svelte"

  import { onMount } from 'svelte'
  import { router, meta } from 'tinro'
  import { articleContent } from '../stores'

  const route = meta()
  const articleId = Number(route.params.id)

  onMount(() => {
    articleContent.getArticle(articleId)
  })

  const goArticles = () => router.goto(`/articles`)
</script>

<!-- slog-comment-wrap start-->
<div class="slog-comment-wrap">
  <!-- slog-comment-box start-->
  <div class="slog-comment-box" >
    <div class="comment-box-header ">
      <div class="content-box-header-inner-left" >
        <p class="p-user" >{$articleContent.userEmail}</p>
        <p class="p-date" >{$articleContent.createdAt}</p>
      </div>
    </div>

    <div class="comment-box-main ">
      <p class="whitespace-pre-line">{$articleContent.content}</p>
      <div class="inner-button-box ">
        <button class="button-base" on:click={goArticles} >글 목록 보기</button>
      </div>
    </div>

    <div class="commnet-list-box ">
      <h1 class="comment-title">Comments</h1>
      <ul class="my-5">
        <Comment />
      </ul>
    </div>

    <div class="comment-box-bottom ">
      <textarea id="message" rows="5" class="slog-content-textarea " placeholder="내용을 입력해 주세요."></textarea>
      <div class="button-box-full">
        <button class="button-base" >입력</button>
      </div>
    </div>
  </div><!-- slog-comment-box end -->

</div><!-- slog-comment-wrap end -->