import { createContext, useContext, useReducer } from "react";
import { postReducer } from "./postReducer";
import { dbService, storageService } from "../../firebase/config"
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { updateDoc, doc, addDoc, collection, serverTimestamp } from 'firebase/firestore'

const PostContext = createContext();

export const usePostState = () => {
    return useContext(PostContext);
}

export const PostProvider = ({ children }) => {

    const uploadImg = async (fileUrl, state, content) => {
        const docRef = await addDoc(collection(dbService, "posts"), {
            username: state.id,
            photoUrl: state.photoUrl,
            timestamp: serverTimestamp(),
            contents: content,
            likes: [],
            comments: []
        });

        const imgRef = ref(storageService, `posts/${docRef.id}/image`);

        await uploadString(imgRef, fileUrl, "data_url")
            .then(async (snapshot) => {
                const downloadUrl = await getDownloadURL(imgRef)
                await updateDoc(doc(dbService, "posts", docRef.id), {
                    image: downloadUrl,
                }).then(()=>{
                    postDispatch({type: "POSTED", uploadPage: 1})
                    setTimeout(() => {
                        postDispatch({ type: "REMOVE_POSTED" });
                    }, 2000);
                })
                // console.log(downloadUrl);
            });
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
        <PostContext.Provider value={{ postState, postDispatch, uploadImg, onToggle}}>
            {children}
        </PostContext.Provider>
    )
}