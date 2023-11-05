<script>
  import TodoHeader from './components/TodoHeader.svelte';
  import TodoInfo from './components/TodoInfo.svelte';
  import TodoList from './components/TodoList.svelte';

	import { v4 as uuid } from 'uuid';

	let todos = [
		{
			id: uuid(),
			content: '첫 번째 할일',
			done: false
		},
		{
			id: uuid(),
			content: '두 번째 할일',
			done: false
		},
		{
			id: uuid(),
			content: '세 번째 할일',
			done: true
		},
		{
			id: uuid(),
			content: '네 번째 할일',
			done: false
		}
	]

	function handleCheckTodo(id) {
		todos = todos.map(todo => {
			if(todo.id === id) { // 선택된 todo 값 찾기
				todo.done = !todo.done; // 선택된 todo의 done 상태 변경
			}
			return todo;
		})
	}
</script>

<div class="app">
	<TodoHeader />
	<TodoInfo />
	<TodoList {todos} {handleCheckTodo} /> <!-- handleCheckTodo Props로 넘김 -->
</div>