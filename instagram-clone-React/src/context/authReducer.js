export const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGNUP":
            return {
                ...state,
                isSignUpAuthenticated: true,
            }
        case "LOGIN":
            return {
                ...state,
                token: action.token,
                id: action.id,
                uid: action.uid,
                token: action.token,
                email: action.email,
                isAuthenticated: true,
                photoUrl: null,
            }
        case "SET_USERINFO":
            return {
                ...state,
                photoUrl: action.photoUrl,
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            }
        case "REMOVE_ERROR":
            return {
                ...state,
                error: null,
            }
        case "UPDATE_USERINFO":
            return {
                ...state,
                id: action.id,
                email: action.email,
                name: action.name,
                photoUrl: action.photoUrl,
            }
    }
}