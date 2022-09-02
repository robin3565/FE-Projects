import React from 'react'
import styled from 'styled-components'

const EditProfile = () => {
    return (
        <EditProfile>
            <div
                className='edit-profile'>
                <div>
                    <ul>
                        <li>프로필 편집</li>
                        <li>비밀번호 변경</li>
                    </ul>
                    <div>
                        <span>
                            스토리 및 게시물 공유, 로그인 등 Instagram, Facebook 앱, Messenger 간에 연결된 환경에 대한 설정을 관리하세요.
                        </span>
                    </div>
                </div>
                <article>
                    <div>
                        <img />
                        <div>
                            <span>id</span>
                            <span>프로필 사진 바꾸기</span>
                        </div>
                    </div>
                    <form>
                        <label for="name">이름</label>
                        <input type="text" id="name" />
                    </form>
                </article>
            </div>
        </EditProfile>
    )
}

export default EditProfile

const EditProfileStyle = styled.div`
    .edit-profile {
        margin: auto;
    }
`
