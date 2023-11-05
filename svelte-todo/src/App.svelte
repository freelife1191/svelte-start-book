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

	let todoValue = '';
	let editMode = '';

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

	function handleTodoInputKeyup(e) {
		if(e.keyCode === 13) {
			todoValue = e.target.value;
			addTodoItem();
		}
	}

	function handleRemoveTodo(id) {
		todos = todos.filter(todo => todo.id !== id);
	}

	function handleChangeEditMode(id) {
		editMode = id;
	}

	function handleEditTodoItem(editTodo) {
		todos = todos.map(todo => {
			if(todo.id === editTodo.id) {
				todo.content = editTodo.content;
			}
			return todo;
		});

		closeEditMode();
	}

	function closeEditMode() {
		editMode = '';
	}
</script>

<div class="app">
	<TodoHeader {todoValue} {handleTodoInputKeyup} />
	<TodoInfo />
	<TodoList {todos} {handleCheckTodo} {handleRemoveTodo} {editMode} {handleChangeEditMode} {handleEditTodoItem} />
</div>