import { createContext, useContext, useEffect, useReducer } from "react";
const CategoryStateContext = createContext();
const CategoryDispatchContext = createContext();

const categoryReducer = (state, action) => {
    switch (action.type) {
        case "INIT_STORED":
            return action.value;
        case "CREATE":
            return state.concat(action.category);
        case "REMOVE":
            return state.filter(item => item.id !== action.id)
        default:
            return state;
    }
}

export const useCategoryDispatch = () => {
    return useContext(CategoryDispatchContext);
}
export const useCategoryState = () => {
    return useContext(CategoryStateContext);
}

const init = [
    {
        id: 0,
        name: "Home",
        slug: '/'
    },
];

export const CategoryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, init);
    
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('categoryState'))) {
            dispatch({
                type: "INIT_STORED",
                value: JSON.parse(localStorage.getItem('categoryState'))
            });
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("categoryState", JSON.stringify(state))
    }, [state])

    return <CategoryStateContext.Provider value={state}>
        <CategoryDispatchContext.Provider value={dispatch}>
            {children}
        </CategoryDispatchContext.Provider>
    </CategoryStateContext.Provider>
}