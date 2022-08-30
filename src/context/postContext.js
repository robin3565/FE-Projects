import { createContext, useContext, useReducer } from "react";
import { postReducer } from "./postReducer";
import { dbService, storageService } from "../firebase/config"
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { setDoc, doc, updateDoc } from 'firebase/firestore'

const PostContext = createContext();

export const usePostState = () => {
    return useContext(PostContext);
}

export const PostProvider = ({ children }) => {

    const uploadImg = async (fileUrl, state, content) => {
        const time = new Date().getTime();
        const imgRef = ref(storageService, `posts/${state.uid}${time}/image`);
        await uploadString(imgRef, fileUrl, "data_url")
            .then(async (snapshot) => {
                const downloadUrl = await getDownloadURL(imgRef)
                await setDoc(doc(dbService, "posts", `${state.uid}${time}`), {
                    username: state.id,
                    photoUrl: state.photoUrl,
                    timestamp: time,
                    contents: content,
                    image: downloadUrl,
                    likes: [],
                    comments: [],
                }).then(()=>{
                    postDispatch({type: "POSTED", uploadPage: 1})
                    setTimeout(() => {
                        postDispatch({ type: "REMOVE_POSTED" });
                    }, 2000);
                })
                // console.log(downloadUrl);
            });
    }

    const updateComment = async (comments, postId) => {
        await updateDoc(doc(dbService, "posts", postId), {
            "comments": comments,
          })
    }

    const updateLike = async (likes, postId) => {
        await updateDoc(doc(dbService, "posts", postId), {
            "likes": likes,
          })
    }

    const onToggle = () => {
        postDispatch({ type: "LOADING", loading: !postState.loading, uploadPage: 1 })
    }

    const init = {
        loading: false,
        posted: false,
        uploadPage: 1,
    }

    const [postState, postDispatch] = useReducer(postReducer, init);

    return (
        <PostContext.Provider value={{ postState, postDispatch, updateComment, updateLike, uploadImg, onToggle}}>
            {children}
        </PostContext.Provider>
    )
}