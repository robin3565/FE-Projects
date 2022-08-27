export const postReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {
                ...state,
                loading: action.loading,
            }
    }
}