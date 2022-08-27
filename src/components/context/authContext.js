import { createContext, useContext, useReducer } from "react";
import { authReducer } from "./authReducer";

const AuthContext = createContext();
// const AuthDispatch = createContext();

export const useAuthState = () => {
    return useContext(AuthContext);
}

// export const useAuthDispath = () => {
//     return useContext(AuthDispatch);
// }

export const AuthProvider = ({ children }) => {
    const init = {
        error: null,
        isAuthenticated: true,
        id: "Robin",
        uid: "8lRT9L7g2qP1tnZmntiN7lExkEr1",
        photoUrl: null,
        userInfo: {
            id: "Robin",
            email: "test@test.com",
            uid: "8lRT9L7g2qP1tnZmntiN7lExkEr1",
        },
        token: "da9sd8af8ad1qada01fb3baasa",
    };

    const [state, dispatch] = useReducer(authReducer, init);

    return (
        <AuthContext.Provider value={{state, dispatch}}>
                {children}
        </AuthContext.Provider>
    )
}