import { createContext, useContext, useReducer } from "react";

const PostContext = createContext();

export const usePostState = () => {
    return useContext(PostContext);
}

const postReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {
                ...state,
                loading: action.loading,
            }
    }
}

export const PostProvider = ({ children }) => {
    const init = {
        loading: false,
    }

    const [postState, postDispatch] = useReducer(postReducer, init);

    return (
        <PostContext.Provider value={{postState, postDispatch}}>
                {children}
        </PostContext.Provider>
    )
}