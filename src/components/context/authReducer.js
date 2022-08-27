export const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGNUP":
            return {
                ...state,
                isAuthenticated: true,
                userInfo: action.payload,
                token: action.token,
                uid: action.uid,
                id: action.id,
                photoUrl: action.photoUrl
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
    }
}