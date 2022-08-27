import styled from "styled-components"
import Feeds from "./Feeds"
import Comments from './Comments'
import RecommendUsers from "./RecommendUsers"
import Story from './Story'
import { MdImage } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { dbService, storageService } from "../../firebase/config"
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react"
import { useAuthState } from "../context/authContext"
import { updateDoc, doc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { usePostState } from "../context/postContext"


const Main = () => {
    const { state } = useAuthState();
    const [fileUrl, setFileUrl] = useState("");

    const { postState, postDispatch } = usePostState();

    const onToggle = () => {
        postDispatch({ type: "LOADING", loading: !postState.loading })
    }

    const UploadImg = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "posts"), {
                username: state.id,
                photoUrl: state.photoUrl,
                timestamp: serverTimestamp(),
            });

            const imgRef = ref(storageService, `posts/${docRef.id}/image`);

            await uploadString(imgRef, fileUrl, "data_url")
                .then(async (snapshot) => {
                    const downloadUrl = await getDownloadURL(imgRef)
                    await updateDoc(doc(dbService, "posts", docRef.id), {
                        image: downloadUrl,
                        likes: 0,
                    });
                    // console.log(downloadUrl);
                    onToggle();
                    setFileUrl(null);
                });
        } catch (err) { console.log(err) };
    }

    const onFileChange = (e) => {
        const reader = new FileReader();
        // 받은 파일 중 첫 번째 파일만 가져온다.
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = (finishedEvent) => {
            setFileUrl(finishedEvent.target.result);
        }
    }


    return (
        <HomeStyle>
<MainStyle>
            <div
                className="feed-wrapper">
                <Story />
                <Feeds>
                    <Comments />
                </Feeds>
            </div>
            <RecommendUsers />
        </MainStyle>
         {
            postState.loading && (
                <div
                    className="uploading-wrapper">
                    <div
                        className="uploading-modal">
                        <form
                            onSubmit={UploadImg}>
                            <div
                                className="uploading-sub">
                                <p>새 게시물 만들기</p>
                                <IoCloseOutline
                                    className="btn-cancle"
                                    onClick={onToggle} />
                            </div>
                            <div
                                className="uploading-file">
                                <MdImage
                                    className="uploading-btn" />
                                <p>
                                    사진과 동영상을 여기에 끌어다 놓으세요
                                </p>
                                <input
                                    className="btn-file"
                                    type="file"
                                    onChange={onFileChange} />
                                <input
                                    type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        </HomeStyle>
        
    )
}

export default Main

const MainStyle = styled.div`
    // padding: 0 500px;
    margin: auto 460px;    
    display: flex;
    flex-direction: row; 

    .feed-wrapper {
        background-color: white;
        width: 460px;
    }
`

const HomeStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    .uploading-wrapper {
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .uploading-modal {
        height: 45rem;
        width: 45rem;
        background-color: white;
        border-radius: 10px;
    }

    .uploading-sub {
        border-bottom: 1px solid gray;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .uploading-sub p {
        flex-grow: 1;
    }

    .uploading-sub .btn-cancle {
        color: ##262626;
        width: 26px;
        height: 26px;
        cursor: pointer;
        margin-right: 10px;
    }


    .uploading-file {
        text-align: center;
        padding-top: 180px;
    }

    
    form {
        display: flex;
        flex-direction: column;
        justify-item: center;
        align-items: center;
    }

    .uploading-btn {
        width: 100px;
        height: 100px;
    }

`
