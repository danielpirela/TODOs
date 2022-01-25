import React, {useState} from 'react'
import { TodoCounter } from './components/TodoCounter';
import { TodoSearch } from './components/TodoSearch';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { CreateTodoButton } from './components/CreateTodoButton';

function useLocalStorage (itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = [];
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = useState(parsedItem);

  const saveItem = (newItem) => {
    const stringTodos = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringTodos);
    setItem(newItem);
  }

  return [
    item,
    saveItem,
  ]
}

function App() {

  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = useState('')

  const todoComplete = todos.filter(todo => !!todo.completed).length;
  const todoTotal = todos.length;

  let searched = []

  if (!searchValue.length >= 1) {
    searched = todos;
  }else {

    searched = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase()
      return todoText.includes(searchText)
    })
  }

  const completeTodo = (text) => {
    const index = todos.findIndex(todo => todo.text === text)
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    saveTodos(newTodos)

  }

  const deleteTodo = (text) => {
    const index = todos.findIndex(todo => todo.text === text)
    const newTodos = [...todos];
    newTodos.splice(index, 1)
    saveTodos(newTodos)

  }


  return (
    <React.Fragment>
      <TodoCounter
      total={todoTotal}
      completed={todoComplete}
      />
      <TodoSearch
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      />

      <TodoList>
        {searched.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            btnCompleteTodo={ () => completeTodo(todo.text) }
            btnDeleteTodo={ () => deleteTodo(todo.text) }
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
