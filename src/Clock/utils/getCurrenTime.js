const addZeroToTime = (currentTime__) => {
    return currentTime__ < 10 ? `0${currentTime__}` : currentTime__;
}

const getCurrentTime = (currentTime) => {
    const month_ = addZeroToTime(currentTime.getMonth() + 1);
    const date_ = addZeroToTime(currentTime.getDate());
    const minutes_ = addZeroToTime(currentTime.getMinutes())   
    const hours_ = addZeroToTime(currentTime.getHours());

    return [month_, date_, minutes_, hours_]
}



export default getCurrentTime;