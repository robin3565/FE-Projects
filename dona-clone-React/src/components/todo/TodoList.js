import { usePathState } from '../../contexts/PathContext';
import { useTodoState } from '../../contexts/TodoConext'
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useTodoState();
  const { path } = usePathState();


  const filterTodos = todos.filter((item) => item.category[0].slug === path);

  const todosList = filterTodos.map(item => {
    return <TodoItem
      key={item.id}
      id={item.id}
      text={item.text}
      done={item.done}
      category={item.category}
    />
  })

  return (
    <ul className='flex flex-col w-full h-full'>
      {todosList}
    </ul>
  )
}

export default TodoList
