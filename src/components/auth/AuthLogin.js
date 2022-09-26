import { useState } from "react"
import styled from "styled-components"
import { useAuthState } from "../../context/authContext"
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
                className="login--img">
                <div
                    className="login--img-inner">
                    <div
                        className="login--img-background">
                        <img
                            src="b.png"
                            className="img-1" />
                        <img
                            src="d.png"
                            className="img-2" />
                    </div>
                </div>
                <div
                    className="login">
                    <div
                        className="login-inner">
                        <img
                            className="login-logo"
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
                            className="auth-break-wrapper">
                            <div
                                className="auth-break"></div>
                            <div
                                className="auth-break-or">또는</div>
                            <div
                                className="auth-break"></div>
                        </div>
                        <div
                            className="login--facebook">
                            <IoLogoFacebook
                                className="login--facebook-logo" />
                            <button
                                className="login--facebook-btn"
                                onClick={facebookLogin}>
                                Facebook으로 로그인
                            </button>
                        </div>
                        <p
                            className="login--error">
                            {state.error && handleError(state.error)}
                        </p>
                        <p
                            className="login--password">비밀번호를 잊으셨나요?</p>
                    </div>
                    <div
                        className="login--signup">
                        <p>계정이 없으신가요?</p>
                        <Link
                            to='/signup'
                            className="login--signup-link"><b>가입하기</b></Link>
                    </div>
                    <div
                        className="login--app">
                        <p>앱을 다운로드하세요.</p>
                        <div
                            className="login--app-btn">
                            <img
                                src="/apple.png" />
                            <img
                                src="/google.png" />
                        </div>
                    </div>
                </div>
            </div>
            <footer
                className="footer">
                © 2022 Instagram from Meta
            </footer>
        </AuthWrapper>
    )
}

export default AuthLogin

const AuthWrapper = styled.div`
    margin: 120px auto 0;
    width: 750px;
    padding-bottom: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .login--img {
        display: flex;
        flex-direction: row;
    }

    .login--img-inner {
        width: 350px;
        height: 550px;
        margin-right: 32px;
        background-image: url(iphone.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: center;
        position: relative;
    }

    .login--img-background {
        height:100%;
        width: 100%;
    }
    

    .login--img-inner img{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -260px;
        margin-left: -119.5px;
        width:69%
    }

    .img-1 {
        animation: fadeInOut 10s infinite;
    }

    .img-2 {
        animation: fadeOutIn 10s infinite;
    }

    @keyframes fadeInOut{
        0%, 100% {
            opacity: 0;
       }
        50% {
            opacity: 1;
       }
    }

    @keyframes fadeOutIn{
        0%, 100% {
            opacity: 1;
       }
        50% {
            opacity: 0;
       }
    }

    .login {
        display:flex;
        flex-direction: column;
        align-items: center;
        width: 350px;
        height: 550px;
    }

    .login-inner {
        background-color: var(--color-background-white);
        padding-bottom: 22px;
        margin-bottom: 10px;
        border: 1px solid var(--color-border);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .login-logo {
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
        border: 1px solid var(--color-border);
        background-color: #fafafa;
    }

    .form__input--submit {
        width: 70%;
        height: 30px;
        border: none;
        background-color: var(--color-primary);
        color: var(--color-background-white);
        font-weight: 600;
        border-radius: 5px;
        margin: 5px 0;
        cursor: pointer;
    }

    .login--facebook {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .login--facebook-logo {
        width: 25px;
        height: 25px;
        color: var(--color-facebook);
        margin-right: 1px;
    }

    .login--facebook-btn {
        width: 100%;
        height: 35px;
        cursor: pointer;
        background-color: var(--color-background-white);
        border: none;
        font-weight: var(--fontWeight-semibold);
        color: var(--color-facebook);
    }

    .login--error {
        color: red;
        margin-bottom: 10px;
    }

    .login--signup {
        background-color: var(--color-background-white);
        border: 1px solid var(--color-border);
        width: 100%;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 16px 0;
        margin-bottom: 15px;
    }

    .login--signup-link {
        color: var(--color-primary);
        margin-left: 3px;
    }

    .footer {
        text-align: center;
        color: gray;
        width: 100%;
        margin-top: 120px;
        height: 80px;
    }
`
