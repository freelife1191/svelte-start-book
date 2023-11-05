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

	let todoValue = ''; // 추가

	function handleCheckTodo(id) {
		todos = todos.map(todo => {
			if(todo.id === id) { // 선택된 todo 값 찾기
				todo.done = !todo.done; // 선택된 todo의 done 상태 변경
			}
			return todo;
		})
	}

	function addTodoItem() { // 추가
		if(todoValue) {
			const newTodo = {
				id: uuid(),
				content: todoValue,
				doen: false,
			}

			todos = [...todos, newTodo];
			todoValue = '';
		}
	}

	function handleTodoInputKeyup(e) { // 추가
		if(e.keyCode === 13) {
			todoValue = e.target.value; // 추가
			addTodoItem();
		}
	}
</script>

<div class="app">
	<TodoHeader {todoValue} {handleTodoInputKeyup} /> <!-- 수정 -->
	<TodoInfo />
	<TodoList {todos} {handleCheckTodo} /> <!-- handleCheckTodo Props로 넘김 -->
</div>