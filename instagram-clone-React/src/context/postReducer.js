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
        case "ON_POST_FILE":
            return {
                ...state,
                init: 'POSTED',
                uploadPage: action.uploadPage,
                imageUrl: action.imageUrl,
            }    
        case "CROP_POSTED":
            return {
                ...state,
                imageUrl: action.imageUrl,
                showImg: action.showImg,
                uploadPage: action.uploadPage
            }
        case "UPDATE_POSTED":
            return {
                ...state,
                init: "UPDATE_POSTED",
                isModal: true,
                uploadPage: 3,
                imageUrl: action.imageUrl,
                content: action.content
            }
        case "POSTED":
            return {
                ...state,
                posted: true,
                uploadPage: 1,
                init: ''
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
        case "PREV_ORDER" : 
            return {
                uploadPage: action.uploadPage
            }
    }
}