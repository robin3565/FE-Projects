import { useState } from 'react'
import { useTodoDispatch } from '../../contexts/TodoConext'
import { FaCheck, FaTrash, FaRegEdit } from "react-icons/fa";

const TodoItem = ({ id, text, done }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text)
  const [clear, setClear] = useState(false);

  const dispatch = useTodoDispatch();
  const onClear = () => {
    dispatch({ type: 'CLEAR', id });
    setClear(prev => !prev);
  }
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  const onToggle = () => setEditing((prev) => !(prev));

  const onUpdate = (e, id, newText) => {
    e.preventDefault();
    if (text == newText) {
      setEditing((prev) => !(prev))
    }
    dispatch({ type: 'UPDATE', id, newText });
    setEditing((prev) => !(prev))
  }


  return (
    <li
      id="todo-items"
      className='flex flex-row flex-nowrap w-full items-center 
    justify-between rounded-lg py-6 my-2 bg-white'>
      <div className='flex flex-row w-4/5'>
        <button
          className={done
            ? 'bg-black text-white rounded-md mx-3 w-7 h-7 relative grid justify-center items-center'
            : 'bg-gray-300 text-white rounded-md mx-3 w-7 h-7 relative grid justify-center items-center hover:bg-gray-400'}
          onClick={onClear}>
          <FaCheck />
        </button>
        {editing ?
          (
            <form
              className='w-full'
              onSubmit={(e) => onUpdate(e, id, newText)}>
              <input
                className='w-full focus:outline-none'
                type='text'
                value={newText}
                onChange={e => setNewText(e.target.value)}
              />
            </form>
          )
          :
          (
            <p className={`${clear ? 'line-through' : ''}`}>{newText}</p>
          )}
      </div>
      <div className='flex flex-row flex-nowrap'>
        <button
          className='rounded-md w-8 h-8 relative grid justify-center 
          mx-1 items-center hover:bg-gray-300'
          onClick={onToggle}>
          <FaRegEdit className='text-gray-500' />
        </button>
        <button
          className='rounded-md w-8 h-8 relative grid justify-center 
          items-center mr-3 hover:bg-gray-300'
          onClick={onRemove}>
          <FaTrash className='text-gray-500' />
        </button>
      </div>
    </li>
  )
}

export default TodoItem