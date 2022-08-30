import { useState } from "react"
import styled from "styled-components"
import { useAuthState } from "../../context/authContext"
import AuthFooter from "./AuthFooter"
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "../../firebase/config";
import handleError from "../global/error";

const AuthLogin = () => {
    const { state, dispatch } = useAuthState();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(authService, userInfo.id, userInfo.password)
                .then(result => {
                    let userResult = result?.user;
                    let token = result?.user.accessToken;
                    let uid = result?.user.uid;  
                    let photoUrl = result?.user.photoURL;
                    dispatch({ type: "SIGNUP", payload: userResult, token: token, uid: uid, id: userInfo?.id, photoUrl: photoUrl })
                    navigate("/");
                })
        } catch (error) { dispatch({ type: "SET_ERROR", payload: error.code }) }
    }

    const facebookLogin = async (e) => {
        e.preventDefault();
        const provider = new FacebookAuthProvider();
        try {
            await signInWithPopup(authService, provider)
                .then(result => {
                    const user = result?.user;
                    const credential = FacebookAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    dispatch({ type: "SIGNUP", payload: user, token: token })
                })
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.code });
            setTimeout(() => {
                dispatch({ type: "REMOVE_ERROR" });
            }, 2000);
        }
        navigate("/")
    }

    return (
        <AuthWrapper>
            <div
                id="flex-login">
                <div
                    className="img-phone">
                    <div
                        className="img-wrapper">
                        <img
                            src="a.png"
                            className="img-1" />
                        <img
                            src="b.png"
                            className="img-2" />
                        {/* <img
                            src="c.png"
                            className="img-3"/>
                        <img 
                            src="d.png"
                            className="img-4"/> */}
                    </div>
                </div>
                <div
                    id="signup-form">
                    <div
                        id="signup-form-top">
                        <img
                            id="img-logo"
                            src="logo.png" />

                        <form
                            onSubmit={handleLogin}>
                            <input
                                // value={state.isAuthenticated ? state.userInfo.email : id}
                                type="text"
                                name="id"
                                onChange={(e) => setUserInfo({ ...userInfo, "id": e.target.value })}
                                required
                                placeholder="전화번호, 사용자 이름 또는 이메일" />
                            <input
                                type="password"
                                name="password"
                                required
                                onChange={(e) => setUserInfo({ ...userInfo, "password": e.target.value })}
                                placeholder="비밀번호"
                            />
                            <input
                                type="submit"
                                value="로그인" />
                        </form>

                        <p>또는</p>
                        <button
                            onClick={facebookLogin}>
                            Facebook으로 로그인
                        </button>
                        <p
                            id="error-msg">
                            {state.error && handleError(state.error)}
                        </p>
                        <p>비밀번호를 잊으셨나요?</p>
                    </div>
                    <div
                        id="signup-form-bottom">
                        <p>계정이 없으신가요?</p>
                        <Link to='/signup'><b>가입하기</b></Link>
                    </div>
                    <p>앱을 다운로드하세요.</p>
                    <div
                        id="button-wrapper">
                        <button>Apple Store</button>
                        <button>Google Play</button>
                    </div>
                </div>
            </div>
            <AuthFooter />
        </AuthWrapper>
    )
}

export default AuthLogin

const AuthWrapper = styled.div`
    margin: 120px auto 0;
    max-width: 750px;
    padding-bottom: 32px;
    display: flex;
    align-items: center;
    flex-direction: column;

    #flex-login .img-phone {
        // background-color: thistle;
        width: 350px;
        height: 550px;
        margin-right: 32px;
        background-image: url(iphone.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: center;
        position: relative;
    }

    #flex-login .img-phone img{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -260px;
        margin-left: -119.5px;
        width:69%
    }

    #flex-login .img-phone .img-1 {
        animation: fadeIn 4s infinite;
    }

    #flex-login .img-phone .img-2 {
        animation: fadeOut 4s infinite;
    }

    // #flex-login .img-phone .img-3 {
    //     animation: fadeIn 8s infinite;
    // }

    // #flex-login .img-phone .img-4 {
    //     animation: fadeOut 8s infinite;
    // }

    @keyframes fadeIn{
        0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
    }
    
    @keyframes fadeOut{
        0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
    }

    .img-wrapper {
        height:100%;
        width: 100%;
    }

    #error-msg {
        color: red;
        font-size: 0.9em;
    }

    #img-logo {
        margin-top: 36px;
        margin-bottom: 12px;
    }

    #flex-login {
        display: flex;
        flex-direction: row;
    }

    #signup-form {
        display:flex;
        flex-direction: column;
        align-items: center;
        width: 350px;
        height: 550px;
    }

    #signup-form-top {
        background-color: white;
        margin-bottom: 10px;
        border: 1px solid #dbdbdb;
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
    }

    #signup-form-top form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    #signup-form-top button {
        width: 100%;
        height: 35px;
        cursor: pointer;
        background-color: white;
        border: none;
    }

    #flex-login input {
        width: 70%;
        height: 35px;
        margin-bottom: 5px;
        border-radius: 5px;
        border: 1px solid #dbdbdb;
    }

    #flex-login input:last-child {
        border: none;
    }

    #signup-form-bottom {
        background-color: white;
        border: 1px solid #dbdbdb;
        width: 100%;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    #button-wrapper {
        display:flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;
    }

    #button-wrapper button {
        width: 120px;
        height: 40px;
        margin: 5px;
        border: none;
        border-radius: 10px;
    }

`
