import TodoCreate from './TodoCreate'
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'

export default function Todo() {

    return (
        <div className='flex flex-col w-screen h-screen items-center '>
            <div className="flex flex-col w-4/5 h-full gap-2.5 p-12 pb-0">
                <TodoHeader />
                <TodoCreate />
                <TodoList />
            </div>
        </div>
    )
}
