import { useState } from 'react'
import { useUserState } from '../../contexts/UserContext'

export default function Welcome() {
    const { setUserName } = useUserState();
    const [name, setName] = useState();
    const handleSetName = () => {
        setUserName(name);
    }

    return (
        // wrapper
        <div className='absolute grid place-items-center 
        inset-0 w-screen h-full z-10 bg-gray-900/[.2]'>
            {/* modal */}
            <div className='flex flex-col w-96 h-96 bg-neutral-50 
            rounded-lg justify-center p-20 drop-shadow-lg'>
                <div className='flex flex-col place-items-center'>
                    <p className='text-black text-2xl my-3'>
                        What's your name?
                    </p>
                    <input
                        className='my-3 bg-neutral-50 bg-white 
                        focus:outline-none focus:border-rose-500
                        border border-gray-300 rounded-lg py-2 px-4 
                        block w-full appearance-none leading-normal'
                        placeholder='Type it here...'
                        type='text'
                        onChange={(e) => setName(e.target.value)} />
                    <button
                        className='my-3 bg-rose-500 text-white hover:bg-rose-700
                        font-bold py-2 px-4 rounded-lg'
                        onClick={handleSetName}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}