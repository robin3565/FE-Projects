import { createContext, useContext, useReducer } from "react";
import { postReducer } from "./postReducer";

const PostContext = createContext();

export const usePostState = () => {
    return useContext(PostContext);
}

export const PostProvider = ({ children }) => {
    const init = {
        loading: false,
    }

    const [postState, postDispatch] = useReducer(postReducer, init);

    return (
        <PostContext.Provider value={{ postState, postDispatch }}>
            {children}
        </PostContext.Provider>
    )
}