import { useUserState } from '../../contexts/UserContext'
import Category from '../category/Category'
import Todo from '../todo/Todo'
import Welcome from './Welcome'

const Home = () => {
    const {userName} = useUserState();

    return (
        <div className="flex flex-row max-w-screen max-h-screen 
            items-center justify-between p-10 bg-gray-100">
            <Category />
            <Todo />
            {userName=="" && <Welcome/>}
        </div>
    )
}

export default Home