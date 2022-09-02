export const postReducer = (state, action) => {
    switch(action.type) {
        case "POP_MODAL":
            return {
                ...state,
                isModal: true,
                uploadPage: action.uploadPage,
            }
        case "CLOSE_MODAL":
            return {
                ...state,
                isModal: false,
                uploadPage: 1,
                imageUrl: null,
                content: ""
            }
        case "UPDATE_POSTED":
            return {
                ...state,
                type: "UPDATE_POSTED",
                isModal: true,
                uploadPage: 2,
                imageUrl: action.imageUrl,
                content: action.content
            }
        case "POSTED":
            return {
                ...state,
                posted: true,
                uploadPage: action.uploadPage,
            }
        
        case "POSTED_2":
            return {
                ...state,
                type: "POSTED",
                uploadPage: action.uploadPage,
                imageUrl: action.imageUrl,
            }
        case "REMOVE_POSTED":
            return {
                ...state,
                posted: false,
            }
        case "REMOVE":
            return {
                ...state,
                posted: true,
            }
    }
}