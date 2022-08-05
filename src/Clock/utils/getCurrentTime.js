const addZeroToTime = (currentTime__) => {
    return currentTime__ < 10 ? `0${currentTime__}` : currentTime__;
}

const getCurrentTime = (currentTime) => {
    const month = addZeroToTime(currentTime.getMonth() + 1);
    const date = addZeroToTime(currentTime.getDate());
    const minutes = addZeroToTime(currentTime.getMinutes())   
    const hours = addZeroToTime(currentTime.getHours());

    return [month, date, minutes, hours];
}



export default getCurrentTime;