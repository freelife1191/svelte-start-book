import { writable, derived } from 'svelte/store'
import { v4 as uuid } from 'uuid'
import Constant from './constant'


function setFormTodo() {

  const todoValue = ''

  const { subscribe, update, set } = writable(todoValue)

  const resetForm = () => {
    set('');
  }

  return { // 필요한 기능들을 한 번에 리턴: 이 부분은 일종의 명세서 역할도 함
    subscribe,
    set,
    resetForm
  }

}

function setTodoData() {
  let initTodoData = {
    todoLists: [
      {
        id:uuid(),
        content: '첫 번째 할일',
        done: false
      },
      {
        id:uuid(),
        content: '두 번째 할일',
        done: false
      },
      {
        id:uuid(),
        content: '세 번째 할일',
        done: true
      },
      {
        id:uuid(),
        content: '네 번째 할일',
        done: false
      }	
    ],  
    editMode: '',
    viewMode: Constant.ALL  
  }

  let todoData = {...initTodoData};

  const { subscribe, update } = writable(todoData);

  const addTodo = (content) => {

    if(content) {

      const newTodo = {
        id:uuid(),
        content: content,
        done: false
      }

      update(
        datas => { // datas에는 todoData 값이 들어 있음
          const setData = [...datas.todoLists, newTodo] 
          datas.todoLists = setData
          return datas
        }
      )
      // todoForm.resetForm()
    }
  }
  const editTodo = (editMode) => {
    update(
      datas => {
        const setData = datas.todoLists.map(todo => {
          if(todo.id === editTodo.id) {
            todo = editTodo
          }
          return todo
        })
        datas.todoLists = setData
        return datas
      }
    )

  }
  const removeTodo = id => {
    update(
      datas => {
        const setData = datas.todoLists.filter(todo => todo.id !== id)
        datas.todoLists = setData
        return datas
      }
    )
  }
  const checkTodo = id => {
    update(
      datas => {
        const setData = datas.todoLists.map(todo => {
          if(todo.id === id) {
            todo.done = !todo.done
          }
          return todo
        })

        datas.todoLists = setData
        return datas
      }
    )
  }
  const changeTodoEditMode = id => {
    update(
      datas => {
        datas.editMode = id
        return datas
      }
    )
  }
  const closeTodoEditMode = () => {
    update(
      datas => {
        datas.editMode = ''
        return datas
      }
    )
  }

  const changeTodoView = mode => {
    update(
      datas => {
        datas.viewMode = mode
        return datas
      }
    )
  }
  
  return { // 기본 메소드와 사용자정의 메소드를 한 번에 리턴
    subscribe,
    addTodo,
    editTodo,
    removeTodo,
    checkTodo,
    changeTodoEditMode,
    closeTodoEditMode,
    changeTodoView
  }
}

function setFetchTodos() {
  const fetch = derived(todos, $todos => {

    if($todos.viewMode === Constant.ACTIVE) {
      return $todos.todoLists.filter(todo => todo.done === false)
    }

    if($todos.viewMode === Constant.DONE) {
      return $todos.todoLists.filter(todo => todo.done === true)
    }

    if($todos.viewMode === Constant.ALL) {
      return $todos.todoLists;
    }

  });

  return fetch
}

function setCountTodo() {
  const count = derived(fetchTodos, $fetchTodos => { // fetchTodos를 참조
    return $fetchTodos.length
  })

  return count
}

export const todoForm = setFormTodo()
export const todos = setTodoData()
export const fetchTodos = setFetchTodos()
export const countTodo = setCountTodo()
