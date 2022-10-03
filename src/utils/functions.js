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

const getEngVer = (motivations, ver, num) => {
    let todayMotivation_kr = motivations[num].quotes_kr;
    let todayName_kr = motivations[num].name_kr;
    let todayMotivation_en = motivations[num].quotes_en;
    let todayName_en = motivations[num].name_en;

    let todayMotivation_ = ver ? todayMotivation_en : todayMotivation_kr;
    let todayName_ = ver ? todayName_en : todayName_kr;


    return [todayMotivation_, todayName_]
}

const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log('데이터 저장에 실패했습니다.');
    }
}

const getItem = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key)
        if (!value) {
            return defaultValue;
        }

        return JSON.parse(value);
    } catch (e) {
        console.log('저장된 데이터 호출에 실패했습니다. 기본 값으로 구동됩니다.');
        return defaultValue;
    }
}

const getData = () => {
    const value = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        value.push(JSON.parse(getItem(key)));
    }
    return value;
}

const removeData = (name) => {
    localStorage.removeItem(name);
}

export { getCurrentTime, getEngVer, setItem, getItem, getData, removeData };