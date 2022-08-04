import { useContext, useEffect, useState } from 'react'
import axios from "../../api/axios";
import './Background.css'
import { verContext } from '../../EngVerBtn/utils/verContext';

const Background = () => {
    const [backImgUrl, setBackImgUrl] = useState("");
    const {query} = useContext(verContext);

    useEffect(() => {
        fetchData();
    }, [query]);

    const callback = (imgData) => {
        let index = 0;
        while(true) {
            if(imgData[index].width / imgData[index].height > 1) {
                setBackImgUrl(imgData[index].urls['full']);
                break;
            }
            index ++;
        }
    }

    const fetchData = async () => {
        const imgData = await axios.get('', {
            params: {
                query : {query}
            }
        });
        callback(imgData.data);
    };

    return (
        <>
            <div className='backgroundImg'
                style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) )`,
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${backImgUrl})`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                }} />
        </>
    )
}

export default Background
