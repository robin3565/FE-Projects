import { useCategoryState } from '../../contexts/CategoryContext'
import CategoryItem from './CategoryItem';


const CategoryList = () => {
    const categoryState = useCategoryState();
    const CategoryList = categoryState.map(item => (
        <CategoryItem
            key={item.id}
            id={item.id}
            name={item.name}
            slug={item.slug} />
    ))

    return (
        <nav className='flex flex-col w-full'>
            {CategoryList}
        </nav>
    )
}

export default CategoryList
