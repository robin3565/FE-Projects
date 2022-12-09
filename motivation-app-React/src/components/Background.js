import axios from '../api/axios';
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { stateContext } from '../utils/stateContext'

// background 이미지를 바꾸는 컴포넌트
const Background = () => {
    const [backImgUrl, setBackImgUrl] = useState("");
    const { query } = useContext(stateContext);

    const changeImgSize = (imgData) => {
        let index = 0;
        while (true) {
            if (imgData[index].width / imgData[index].height > 1) {
                setBackImgUrl(imgData[index].urls['full']);
                break;
            }
            index++;
        }
    }

    // API 이미지 가져오기
    const fetchData = async () => {
        const imgData = await axios.get('', {
            params: {
                query: { query }
            }
        });
        changeImgSize(imgData.data);
    };
    
    useEffect(() => {
        fetchData();
    }, [query]);


    return (
        <>
            <BackgroundImg
                style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) )`,
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${backImgUrl})`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                }} />
        </>
    )
}

export default Background;

const BackgroundImg = styled.div`
    width: 100%;
    height: 100%;
    background-size:cover;
    background-repeat: no-repeat;
    position: absolute;
    margin:0;
    padding:0;
    z-index: -1;
    opacity: 0.8;
`