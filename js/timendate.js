const todayDate = document.getElementById("date");
const nowTime = document.getElementById("time");
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0")
const day = String(date.getDate()).padStart(2,"0");
const hours = date.getHours();
const minutes = String(date.getMinutes()).padStart(2, "0");

// 시간 가져오기
const getTime = () => {
    // todayDate.innerHTML = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`
    // nowTime.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
    todayDate.innerHTML = `${year}-${month}-${day}`
    nowTime.innerHTML = `${hours}:${minutes}`
}

getTime();
setInterval(getTime, 1000);