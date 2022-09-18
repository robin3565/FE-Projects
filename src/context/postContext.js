import { createContext, useContext, useReducer } from "react";
import { postReducer } from "./postReducer";
import { dbService, storageService } from "../firebase/config"
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const PostContext = createContext();

export const usePostState = () => {
    return useContext(PostContext);
}

export const PostProvider = ({ children }) => {

    const init = {
        isModal: false,
        posted: false,
        uploadPage: 1,
        imageUrl: null,
        content: "",
    }

    const uploadImg = async (fileUrl, state, content) => {
        const time = new Date().getTime();
        const imgRef = ref(storageService, `posts/${state.uid}${time}/image`);
        await uploadString(imgRef, fileUrl, "data_url")
            .then(async (snapshot) => {
                const downloadUrl = await getDownloadURL(imgRef)
                await setDoc(doc(dbService, "posts", `${state.uid}${time}`), {
                    username: state.id,
                    uid: state.uid,
                    photoUrl: state.photoUrl,
                    timestamp: time,
                    contents: content,
                    image: downloadUrl,
                    likes: [],
                    comments: [],
                }).then(() => {
                    postDispatch({ type: "POSTED", uploadPage: 1 })
                    setTimeout(() => {
                        postDispatch({ type: "REMOVE_POSTED" });
                    }, 2000);
                })
                // console.log(downloadUrl);
            });
    }

    const removePost = async (postId) => {
        await deleteDoc(doc(dbService, "posts", postId))
            .then(() => {
                const desertRef = ref(storageService, `posts/${postId}/image`);
                deleteObject(desertRef)
                postDispatch({ type: "REMOVE" });
                setTimeout(() => {
                    postDispatch({ type: "REMOVE_POSTED" });
                    }, 2000);
            })
    }

    const updateComment = async (comments, postId) => {
        await updateDoc(doc(dbService, "posts", postId), {
            "comments": comments,
        })
    }

    const updateContent = async (content, postId) => {
        await updateDoc(doc(dbService, "posts", postId), {
            "contents": content,
        })
    }

    const updateLike = async (likes, postId) => {
        await updateDoc(doc(dbService, "posts", postId), {
            "likes": likes,
        })
    }

    const [postState, postDispatch] = useReducer(postReducer, init);

    return (
        <PostContext.Provider value={{ postState, postDispatch, updateComment, updateLike, uploadImg, removePost, updateContent }}>
            {children}
        </PostContext.Provider>
    )
}