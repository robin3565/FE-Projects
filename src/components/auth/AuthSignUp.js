import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthState } from "../../context/authContext"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService, dbService } from "../../firebase/config";
import handleError from '../global/error'
import { setDoc, doc } from 'firebase/firestore';
import { IoLogoFacebook } from "react-icons/io";


const AuthSignUp = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useAuthState();
    const [userInfo, setUserInfo] = useState([]);
    const [isValid, setValid] = useState(false);


    useEffect(() => {
        // 정규표현식 유효성 검사
        const PWD_REGEX = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
        if (!userInfo.email === false && !userInfo.id === false &&
            !userInfo.password === false && PWD_REGEX.test(userInfo.password)) {
            setValid(true);
        } else {
            setValid(false)
        }
    }, [userInfo]);

    console.log({ ...userInfo })

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(authService, userInfo.email, userInfo.password)
                .then(async result => {
                    let userResult = result?.user;
                    let token = result?.user.accessToken;
                    let uid = result?.user.uid;
                    let photoUrl = null;
                    dispatch({ type: "SIGNUP", payload: userResult, token: token, uid: uid, id: userInfo?.id, photoUrl: photoUrl });
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    setUserInfo([null]);
                    try {
                        await setDoc(doc(dbService, 'userInfo', `${uid}`), {
                            id: userInfo.id,
                            email: userInfo.email,
                            name: userInfo.name,
                            uid: uid,
                            photoUrl: photoUrl
                        });
                    } catch (e) {
                        console.log(e)
                    };
                    navigate("/");
                })
        } catch (error) {
            console.log(error)
            dispatch({ type: "SET_ERROR", payload: error.code });
        }
    };

    return (
        <AuthSignUpStyle>
            <div
                className="signup--wrapper">
                <div
                    className='signup--inner'>
                    <img
                        className="signup--logo"
                        src="logo.png" />
                    <p className='signup--title'>
                        친구들의 사진과 동영상을 보려면 가입하세요.
                    </p>
                    <button
                        className="signup--facebook">
                        <span>
                            <IoLogoFacebook /> Facebook으로 로그인
                        </span>
                    </button>
                    <div
                        className="auth-break-wrapper">
                        <div
                            className="auth-break"></div>
                        <div
                            className="auth-break-or">또는</div>
                        <div
                            className="auth-break"></div>
                    </div>
                    <form
                        onSubmit={handleSignUp}
                        className="form__signup">
                        <input
                            type="text"
                            name="email"
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, "email": e.target.value })}
                            required
                            placeholder="휴대폰 번호 또는 이메일 주소" />
                        <input
                            type="text"
                            name="userName"
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, "name": e.target.value })}
                            required
                            placeholder="성명"
                        />
                        <input
                            type="text"
                            name="id"
                            onChange={(e) => setUserInfo({ ...userInfo, "id": e.target.value })}
                            required
                            placeholder="사용자 이름"
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setUserInfo({ ...userInfo, "password": e.target.value })}
                            required
                            placeholder="비밀번호"
                        />
                        <sub>
                            서비스를 이용하는 사람이 회원님의 연락처 정보를
                            Instagram에 업로드했을 수도 있습니다.
                        </sub>
                        <input
                            type="submit"
                            disabled={!isValid}
                            className='form__signup--submit'
                            value="가입" />
                    </form>
                    <p
                        className="signup--error">
                        {state.error && handleError(state.error)}
                    </p>
                </div>
            </div>
            <div
                className="signup--login">
                <p>계정이 있으신가요?</p>
                <Link to='/login'>
                    <b>로그인</b>
                </Link>
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
        </AuthSignUpStyle>
    )
}

export default AuthSignUp

const AuthSignUpStyle = styled.div`
    margin: 40px auto 0;
    width: 350px;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--color-auth);

    .signup--wrapper {
        width: 100%;
        padding: 30px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid var(--color-border);
        background-color: white;
        margin-bottom: 10px;
    }

    .signup--inner {
        background-color: var(--color-background-white);
        width: 78%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .signup--error {
        color: red;
        font-size: 0.9em;
    }

    .signup--logo {
        margin: 10px 0;
    }

    .signup--title {
        font-weight: var(--fontWeight-semibold);
        font-size: var(--fontSize-1);
        text-align: center;
        margin-bottom: 12px;
    }

    .signup--facebook {
        width: 100%;
        height: 35px;
        border-radius: 5px;
        border: none;
        font-weight: var(--fontWeight-semibold);
        background-color: var(--color-primary);
        color: var(--color-background-white);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form__signup {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .form__signup input {
        height: 35px;
        width: 100%;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid var(--color-border);
        background-color: #fafafa;
        padding-left: 3px;
    }

    .form__signup input:last-child {
        background-color: var(--color-primary);
        border: 1px solid var(--color-background-white);
        color: var(--color-background-white);
        cursor: pointer;
    }

    .form__signup input:last-child[disabled] {
        background-color: var(--color-disabled);
    }

    .form__signup sub {
        margin: 16px 0;
    }

    .signup--login {
        background-color: var(--color-background-white);
        border: 1px solid #dbdbdb;
        width: 100%;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 20px 10px;
        margin-bottom: 20px;
    }

    .button {
        width: 120px;
        height: 40px;
        margin: 5px;
        border: 1px solid #dbdbdb;
    }
`