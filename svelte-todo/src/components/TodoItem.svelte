<script>
  export let todo;
  export let handleCheckTodo; // 추가
</script>

<input
    type="checkbox"
    bind:checked={todo.done}
    on:click={() => handleCheckTodo(todo.id)}
> <!-- 추가 -->
<span>{todo.content}</span>
<a href="#">X</a>