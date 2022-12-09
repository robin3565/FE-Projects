import { useCategoryDispatch } from '../../contexts/CategoryContext';
import { usePathState } from '../../contexts/PathContext';
import { FaTrash, FaRegHeart } from "react-icons/fa";
import { useTodoState } from '../../contexts/TodoConext'

const CategoryItem = ({ id, name, slug }) => {
    const categoryDispath = useCategoryDispatch();
    const { changePath } = usePathState();
    const todoState = useTodoState();
    const filterCategoryCount = todoState.filter(item => item.category[0].slug === slug).length
    
    const handleRemove = (e) => {
        e.preventDefault();
        categoryDispath({ type: "REMOVE", id })
        changePath('/')
    }

    return (
        <div
            id="category-items"
            onClick={() => { changePath(slug) }}
            className='flex flex-nowrap flex-row w-full justify-between 
            bg-gray-100 p-5 my-3 rounded-lg'>
            <FaRegHeart
                className='m-1 mr-6 text-rose-500' />
            <div
                className='w-5/6'
                id='left'>
                <p className='text-gray-700'>
                    {name}
                </p>
            </div>
            <div
                id='right'
                className='flex flex-row'>
                <span
                    id='todo-count'
                    className='bg-gray-300 w-7 h-7 rounded-md mr-1 
                    relative grid justify-center items-center'>
                    <p className='text-gray-500 text-sm'>{filterCategoryCount}</p>
                </span>
                {slug == '/' ?
                    (<span></span>)
                    :
                    (<span
                        className='bg-gray-300 w-7 h-7 rounded-md
                       relative grid justify-center items-center'>
                        <button
                            id='remove-category'
                            className='text-gray-500 text-sm'
                            onClick={handleRemove}>
                            <FaTrash
                                className='text-gray-500' />
                        </button>
                    </span>)
                }
            </div>
        </div>
    )
}



export default CategoryItem
