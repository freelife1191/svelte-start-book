<script>
  import { todos } from '../store';

  export let todo;

  const handleCheckTodo = () => todos.checkTodo(todo.id);
  const handleChangeTodoEditMode = () => todos.changeTodoEditMode(todo.id);
  const handleEditTodo = (e) => {
    if(e.keyCode === 13) {
      editTodo()
    }
  }

  const editTodo = () => {
    todos.editTodo(todo);
    todos.closeTodoEditMode();
  }
  const handleRemoveTodo = () => todos.removeTodo(todo.id);

</script>

<input type="checkbox" bind:checked={todo.done} on:click={handleCheckTodo} />
{#if $todos.editMode === todo.id }
  <input type="text" bind:value={todo.content} on:keyup={handleEditTodo} on:focusout={editTodo} >
{:else}
  <span on:dblclick={handleChangeTodoEditMode}>{todo.content}</span>
{/if}
<a href="#null" on:click={handleRemoveTodo} >X</a>