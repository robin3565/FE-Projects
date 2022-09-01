export const postReducer = (state, action) => {
    switch(action.type) {
        case "POP_MODAL":
            return {
                ...state,
                isModal: action.isModal,
                uploadPage: action.uploadPage,
            }
        case "POSTED":
            return {
                ...state,
                posted: true,
                uploadPage: action.uploadPage,
            }
        case "REMOVE_POSTED":
            return {
                ...state,
                posted: false,
            }
        case "POSTING_PAGE":
            return {
                ...state,
                uploadPage: action.uploadPage,
            }
        case "REMOVE":
            return {
                ...state,
                posted: true,
            }
    }
}