<script>
  import TodoItem from "./TodoItem.svelte";

  export let todos; // 추가
  export let handleCheckTodo;
</script>
<div class="main">
  <ul>
    {#each todos as todo, index(todo)} <!-- 추가 -->
      <li>
        <TodoItem {todo} {handleCheckTodo} /> <!-- handleCheckTodo 전달 -->
      </li>
    {/each}
  </ul>
</div>