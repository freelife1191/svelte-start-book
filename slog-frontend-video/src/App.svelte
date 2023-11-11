<script>
  import { onMount } from 'svelte'
  import { auth, isRefresh } from './stores'
  import Router from './router.svelte'

  // 14분
  const refresh_time =1000 * 60 * 14

  // 해당 컴포넌트가 mount 되기 전에 어떤 기능들을 실행시킬 때 사용됨
  onMount(async () => {
    const onRefresh = setInterval(async () => {
      if($isRefresh) {
        await auth.refresh()
      }
      else {
        // 반복적으로 실행되는 특정 interval이 실행되는 것을 중지시키는 기능
        clearInterval(onRefresh)
      }
    }, refresh_time)
  })
</script>

<div class="main-container">
  <!-- {#await auth.refresh() then} -->
  <Router />
  <!-- {/await} -->
</div>