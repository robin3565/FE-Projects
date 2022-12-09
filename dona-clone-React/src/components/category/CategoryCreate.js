import React, { useState } from 'react'
import { useCategoryDispatch, useCategoryState } from '../../contexts/CategoryContext';
import { FaPlus } from "react-icons/fa";
import { usePathState } from '../../contexts/PathContext';
import { v4 as uuidv4 } from 'uuid';

export default function CategoryCreate() {
    const [categoryName, setCategoryName] = useState("");
    const categoryState = useCategoryState();
    const dispatch = useCategoryDispatch();
    const { changePath } = usePathState();

    const handleCreateCategory = (e) => {
        e.preventDefault();
        if (!categoryName) return;
        if (categoryState.map(item => item.name).includes(categoryName)) return;

        dispatch({
            type: "CREATE",
            category: {
                id: uuidv4(),
                name: categoryName,
                slug: `${categoryName}`
            }
        })
        setCategoryName("")
        changePath(`${categoryName}`);
    }

    return (
        <div
            id="category-text-input"
            className='rounded-lg w-full mt-3'>
            <form
                className='flex flex-row w-full items-center gap-2'
                onSubmit={handleCreateCategory}>
                <span><FaPlus className='text-gray-300' /></span>
                <input
                    maxLength={10}
                    placeholder='Create new category...'
                    className='w-full p-3 rounded-lg focus:outline-none'
                    type="text"
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName} />
            </form>
        </div>
    )
}
