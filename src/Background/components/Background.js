import { useEffect, useState } from 'react'
import axios from "../../api/axios";
import './Background.css'


const Background = () => {
    const [backImgUrl, setBackImgUrl] = useState("");
    const [backImgList, setBackImgList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const callback = (backImgList) => {
        backImgList.map((item, index) => (
            item[index].width / item[index].heigtht > 1 ? setBackImgUrl(item[index].urls['full']) : null
        ))
    };

    const fetchData = async () => {
        const imgData = await axios.get();
        setBackImgList([...backImgList, imgData.data])
        callback(backImgList);
    };

    return (
        <>
            <div className='backgroundImg'
                style={{
                    backgroundImage: `url(${backImgUrl})`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                }} />
        </>
    )
}

export default Background
