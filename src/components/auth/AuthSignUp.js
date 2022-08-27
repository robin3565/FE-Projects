import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthState } from '../context/authContext'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService, dbService } from "../../firebase/config";
import handleError from '../global/error'
import { setDoc, doc } from 'firebase/firestore';

const AuthSignUp = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useAuthState();
    const [userInfo, setUserInfo] = useState([]);

    const handleSignUp = async (e) => {
        e.preventDefault();
    try {
        await createUserWithEmailAndPassword(authService, userInfo.email, userInfo.password)
            .then( async result => {      
                let userResult = result?.user;
                let token = result?.user.accessToken;
                let uid = result?.user.uid;  
                let photoUrl = result?.user.photoURL;
                dispatch({ type: "SIGNUP", payload: userResult, token: token, uid: uid, id: userInfo?.id, photoUrl: photoUrl})   
                let user = {};
                user.id = userInfo.id;
                user.email = userInfo.email;
                user.name = userInfo.name;         
                user.uid = uid;         
                user.photoUrl = photoUrl;
                try {
                        await setDoc(doc(dbService, 'userInfo', `${uid}`), {
                        user: user,
                        post: [],
                    });
                } catch (e) { 
                    console.log("Errrr")
                    console.log(e) 
                };
                navigate("/");
            })
    } catch (error) {
        console.log(error)
        dispatch({ type: "SET_ERROR", payload: error.code });
    }};

    return (
        <AuthSignUpStyle>
            <div
                id="signup-form-top">
                <img
                    id="img-logo"
                    src="logo.png" />
                <p
                    className='explain'>
                    친구들의 사진과 동영상을 보려면 가입하세요.
                </p>
                <button
                    id="facebook-signup">
                    Facebook으로 로그인
                </button>
                <p>또는</p>
                <form
                    onSubmit={handleSignUp}>
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
                        Instagram에 업로드했을 수도 있습니다. 더 알아보기
                    </sub>
                    <input
                        type="submit"
                        value="가입" />
                </form>
                <p
                    id="error-msg">
                    { state.error && handleError(state.error) }
                </p>
            </div>
            <div
                id="signup-form-bottom">
                <p>계정이 있으신가요?</p>
                <Link to='/login'>로그인</Link>

            </div>
            <p>앱을 다운로드하세요.</p>
            <div
                id="button-wrapper">
                <button>Apple Store</button>
                <button>Google Play</button>
            </div>
        </AuthSignUpStyle>
    )
}

export default AuthSignUp

const AuthSignUpStyle = styled.div`
    margin: 40px auto 0;
    width: 320px;
    height: 800px;
    display: flex;
    align-items: center;
    flex-direction: column;

    #error-msg {
        color: red;
        font-size: 0.9em;
    }

    #img-logo {
        margin-top: 36px;
        margin-bottom: 12px;
    }

    #facebook-signup {
        width: 80%;
        height: 35px;
        border-radius: 10px;
        border: none;
    }

    #signup-form-top {
        margin-bottom: 10px;
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #dbdbdb;
        background-color: white;
        padding: 20px;
    }

    #signup-form-top .explain {
        font-weight: bold;
        font-size: 1.05em;
        text-align: center;
        margin: 0 35px 20px 35px ;
    }

    #signup-form-top form {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
    }

    #signup-form-top input {
        width: 75%;
        height: 35px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #dbdbdb;
    }

    #signup-form-top input:last-child {
        border: none;
        margin-top: 6px;
    }

    #signup-form-top form sub {
        margin-bottom: 10px;
    }

    #signup-form-bottom {
        background-color: white;
        border: 1px solid #dbdbdb;
        width: 100%;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
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
        border: 1px solid #dbdbdb;
    }
`