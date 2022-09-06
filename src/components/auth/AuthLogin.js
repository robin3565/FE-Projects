import { useState } from "react"
import styled from "styled-components"
import { useAuthState } from "../../context/authContext"
import AuthFooter from "./AuthFooter"
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "../../firebase/config";
import handleError from "../global/error";
import { IoLogoFacebook } from "react-icons/io";

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
                className="login__img">
                <div
                    className="login__img--inner">
                    <div
                        className="login__img--background">
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
                    className="login">
                    <div
                        className="login--inner">
                        <img
                            className="login--logo"
                            src="logo.png" />

                        <form
                            className="form__login"
                            onSubmit={handleLogin}>
                            <input
                                className="form__input--auth"
                                type="text"
                                name="id"
                                onChange={(e) => setUserInfo({ ...userInfo, "id": e.target.value })}
                                required
                                placeholder=" 전화번호, 사용자 이름 또는 이메일" />
                            <input
                                className="form__input--auth"
                                type="password"
                                name="password"
                                required
                                onChange={(e) => setUserInfo({ ...userInfo, "password": e.target.value })}
                                placeholder=" 비밀번호"
                            />
                            <input
                                className="form__input--submit"
                                type="submit"
                                value="로그인" />
                        </form>

                        <div
                            className="login__middle">
                            <div
                                className="login__middle--break"></div>
                            <div
                                className="login__middle-or">또는</div>
                            <div
                                className="login__middle--break"></div>
                        </div>
                        <div
                            className="login__facebook">
                            <IoLogoFacebook
                                    className="login__facebook--logo"/>
                            <button
                                className="login__facebook--btn"
                                onClick={facebookLogin}>
                                        Facebook으로 로그인
                            </button>
                        </div>
                        <p
                            className="login--error">
                            {state.error && handleError(state.error)}
                        </p>
                        <p
                            className="login__password">비밀번호를 잊으셨나요?</p>
                    </div>
                    <div
                        className="login__signup">
                        <p>계정이 없으신가요?</p>
                        <Link
                            to='/signup'
                            className="login__signup--link"><b>가입하기</b></Link>
                    </div>
                    <div
                        className="login__app">
                        <p>앱을 다운로드하세요.</p>
                        <div
                            className="login__app--btn">
                            <img
                                src="/apple.png"/>
                            <img
                                src="/google.png"/>
                        </div>
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

    .login__img {
        display: flex;
        flex-direction: row;
    }

    .login__img--inner {
        width: 350px;
        height: 550px;
        margin-right: 32px;
        background-image: url(iphone.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: center;
        position: relative;
    }

    .login__img--background {
        height:100%;
        width: 100%;
    }
    

    .login__img--inner img{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -260px;
        margin-left: -119.5px;
        width:69%
    }

    .img-1 {
        animation: fadeIn 4s infinite;
    }

    .img-2 {
        animation: fadeOut 4s infinite;
    }

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

    .login {
        display:flex;
        flex-direction: column;
        align-items: center;
        width: 350px;
        height: 550px;
    }

    .login--inner {
        background-color: white;
        padding-bottom: 22px;
        margin-bottom: 10px;
        border: 1px solid #dbdbdb;
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
    }

    .login--logo {
        margin-top: 36px;
        margin-bottom: 12px;
        padding: 20px 0;
    }

    .form__login {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .form__input--auth {
        width: 70%;
        height: 35px;
        margin-bottom: 5px;
        border-radius: 5px;
        border: 1px solid #dbdbdb;
    }

    .form__input--submit {
        width: 70%;
        height: 30px;
        border: none;
        background-color: #0095f6;
        color: white;
        font-weight: 600;
        border-radius: 5px;
        margin: 5px 0;
        cursor: pointer;
    }

    .login__middle {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 40px 18px;
    }

    .login__middle--break {
        height: 1px;
        width: 90px;
        background-color: #8e8e8e;
    }

    .login__middle-or {
        font-size: 13px;
        color: #8e8e8e;
        font-weight: 600;
        margin: 0 18px;
    }

    .login__facebook {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .login__facebook--logo {
        width: 25px;
        height: 25px;
        color: #385185;
        margin-right: 1px;
    }

    .login__facebook--btn {
        width: 100%;
        height: 35px;
        cursor: pointer;
        background-color: white;
        border: none;
        font-weight: 600;
        color: #385185;
        font-size: 14px;
    }

    .login__password {
        font-size: 12px;
    }

    .login--error {
        color: red;
        font-size: 15px;
        margin-bottom: 10px;
    }

    .login__signup {
        background-color: white;
        border: 1px solid #dbdbdb;
        width: 100%;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        padding: 16px 0;
        font-size: 14px;
    }

    .login__signup--link {
        text-decoration: none;
        color: #0095f6;
        margin-left: 3px;
    }

    .login__app {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .login__app--btn {
        display:flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        margin-top: 10px;
        font-size: 14px;
    }

    .login__app--btn img {
        width: 140px;
        margin: 0 5px;
        border: none;
        cursor: pointer;
    }

`
