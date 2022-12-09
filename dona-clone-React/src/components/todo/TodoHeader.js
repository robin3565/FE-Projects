import { useUserState } from '../../contexts/UserContext'
import { FaRegHeart } from "react-icons/fa";
import { getDate, getDay, getGreeting, getMonth } from '../../functions/getDate'

export default function TodoHeader() {
    const { userName } = useUserState();

    return (
        <header className="flex flex-row w-fit h-fit justify-center my-7">
            <div
                className='text-4xl'>
                <FaRegHeart className='m-4 mr-5 text-rose-500' />
            </div>
            <div>
                <p className='text-4xl font-normal text-gray-800 mb-1'>
                    Good {getGreeting()}, {userName}
                </p>
                <p className='text-xl font-normal text-gray-400'>
                    It's {getDay()}day,&nbsp;{getMonth()} {getDate()}
                </p>
            </div>
        </header>
    )
}
