import styled from 'styled-components'
import { usePostState } from '../../../context/postContext';
import FirstModal from './FirstModal';
import SecondModal from './SecondModal';
import ThirdModal from './ThirdModal';

const PlusModal = () => {
    const { postState } = usePostState();

    return (
        <ModalStyle>
            {postState.isModal && postState.uploadPage === 1 ? (
                <FirstModal />
            ) : postState.uploadPage === 2 ? (
                <SecondModal />
            ) : (
                <ThirdModal />
            )}
        </ModalStyle>
    )
}

export default PlusModal

const ModalStyle = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    
    .plus-modal-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;        
    }

    .plus-modal__nav {
        border-bottom: 1px solid gray;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
    .plus-modal__nav p {
        flex-grow: 1;
        padding: 15px;
        font-size: 1.1em;
        font-weight: 600;
    }

    .plus-modal__btn {
        color: #262626;
        width: 26px;
        height: 26px;
        cursor: pointer;
    }

    .plus-modal__btn-left {
        margin-left: 10px;
    }

    .plus-modal__btn-right {
        margin-right: 10px;
    }
    
    .plus-modal__btn-submit {
        margin-right: 10px;
        padding: 6px 10px;
        color:#0095f6;
        background-color: transparent;
        border: none;
        font-weight: 600;
        font-size: 0.9em;
        cursor: pointer;
    }
`

