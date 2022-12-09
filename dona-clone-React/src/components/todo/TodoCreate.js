import React, { useEffect, useRef, useState } from 'react'
import { useCategoryState } from '../../contexts/CategoryContext';
import { usePathState } from '../../contexts/PathContext';
import { useTodoDispatch } from '../../contexts/TodoConext'
import { v4 as uuidv4 } from 'uuid';

const TodoCreate = () => {
  const [todoText, setTodoText] = useState('');
  const { path } = usePathState();
  const todoDispatch = useTodoDispatch();
  const categoryState = useCategoryState();
  const inputRef = useRef();

  const filterCategory = categoryState.filter(item => item.slug === path);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (!todoText) return;

    todoDispatch({
      type: 'CREATE',
      todo: {
        text: todoText,
        id: uuidv4(),
        done: false,
        category: filterCategory
      }
    });
    setTodoText('');
  }

  return (
    <div
      id="todo-create-input"
      className='flex flex-row w-full rounded-lg items-center 
      bg-gray-200 rounded-2xl'>
      <form
        className='w-full'
        onSubmit={onSubmit}>
        <input
          className='bg-gray-200 w-full block rounded-lg pl-3 pr-3 py-6 focus:outline-none'
          placeholder='Write a new task...'
          ref={inputRef}
          type="text"
          onChange={(e) => setTodoText(e.target.value)}
          value={todoText}
        />
      </form>
    </div>
  )
}

export default React.memo(TodoCreate)