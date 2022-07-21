// fetch("https://api.themoviedb.org/3/movie/550?api_key=07f254918690b891a7fc234d10daef8e")
// .then(function(res){
//   return res.json();
// })
// .then(function(json){
//   console.log(json);
// });


// api 불러오기 - 기본 api 정보
const base_url = "https://api.themoviedb.org/3";
let path = "/movie/popular";
let img_path = "https://image.tmdb.org/t/p/original";

const params = {
    api_key: "07f254918690b891a7fc234d10daef8e",
    language: "ko",
    page: 1
}

//ad-mv info 함수 (movie/popular)
const viewAd = document.getElementById("ad-img");
const viewAdTitle = document.querySelectorAll("#ad-mv div p");

const getAdMvInfo = async () => {
    const mvInfoResponse = await fetch(`${base_url}${path}?api_key=${params.api_key}&language=${params.language}&page=${params.page}`)
    const allMvInfo = await mvInfoResponse.json();
    const mvInfo = allMvInfo["results"];

    // 랜덤 함수
    const random = Math.floor(Math.random() * mvInfo.length);
    // 랜덤 id, title
    const mvRandomId = mvInfo[random]["id"];
    const mvRandomTitle = mvInfo[random]["title"];
    let overView = mvInfo[random]["overview"];

    // Overview
    function getOverview() {
        if (String(overView).length != 0) {
            overView = `${overView.substring(0, 280)}...`;
        } else {
            overView = overView;
        }
    }
    getOverview();

    // 랜덤으로 이미지 불러오기
    const randomImgUrl = `${img_path}${mvInfo[random]["backdrop_path"]}`;
    viewAd.src = randomImgUrl;

    // 영화 안내 바꾸기 - 제목 & 소개
    viewAdTitle[0].innerHTML = mvRandomTitle;
    viewAdTitle[1].innerHTML = overView;

}

// top_rated - contents1
const getTopMvInfo = async () => {
    const viewCon = document.querySelectorAll(".contents1 img.item")
    path = "/movie/top_rated";
    const mvInfoResponse = await fetch(`${base_url}${path}?api_key=${params.api_key}&language=${params.language}&page=${params.page}`)
    const allMvInfo = await mvInfoResponse.json();
    const mvInfo = allMvInfo["results"];
    const mvIdArr = [];
    const mvPathArr = [];


    //map 함수 활용 -> id, path 배열 만들기
    mvInfo.map((item) => mvIdArr.push(item["id"]))
    mvInfo.map((item) => mvPathArr.push(item["backdrop_path"]))

    const mvUrlArr = [];
    mvPathArr.map((item) => mvUrlArr.push(`${img_path}${item}`))
    viewCon[0].src = mvUrlArr[0];
    viewCon[1].src = mvUrlArr[1];
    viewCon[2].src = mvUrlArr[2];
    viewCon[3].src = mvUrlArr[3];
    viewCon[4].src = mvUrlArr[4];
    viewCon[5].src = mvUrlArr[5];
}

// upcoming - contents2
const getUpMvInfo= async () => {
    const viewCon = document.querySelectorAll(".contents2 img.item")
    path = "/movie/upcoming";
    const mvInfoResponse = await fetch(`${base_url}${path}?api_key=${params.api_key}&language=${params.language}&page=${params.page}`)
    const allMvInfo = await mvInfoResponse.json();
    const mvInfo = allMvInfo["results"];
    const mvIdArr = [];
    const mvPathArr = [];


    //map 함수 활용 -> id, path 배열 만들기
    mvInfo.map((item) => mvIdArr.push(item["id"]))
    mvInfo.map((item) => mvPathArr.push(item["backdrop_path"]))

    const mvUrlArr = [];
    mvPathArr.map((item) => mvUrlArr.push(`${img_path}${item}`))
    viewCon[0].src = mvUrlArr[0];
    viewCon[1].src = mvUrlArr[1];
    viewCon[2].src = mvUrlArr[2];
    viewCon[3].src = mvUrlArr[3];
    viewCon[4].src = mvUrlArr[4];
    viewCon[5].src = mvUrlArr[5];
}

// now_playing - contents3
const getNowMvInfo= async () => {
    const viewCon = document.querySelectorAll(".contents3 img.item")
    path = "/movie/now_playing";
    const mvInfoResponse = await fetch(`${base_url}${path}?api_key=${params.api_key}&language=${params.language}&page=${params.page}`)
    const allMvInfo = await mvInfoResponse.json();
    const mvInfo = allMvInfo["results"];
    const mvIdArr = [];
    const mvPathArr = [];


    //map 함수 활용 -> id, path 배열 만들기
    mvInfo.map((item) => mvIdArr.push(item["id"]))
    mvInfo.map((item) => mvPathArr.push(item["backdrop_path"]))

    const mvUrlArr = [];
    mvPathArr.map((item) => mvUrlArr.push(`${img_path}${item}`))
    viewCon[0].src = mvUrlArr[0];
    viewCon[1].src = mvUrlArr[1];
    viewCon[2].src = mvUrlArr[2];
    viewCon[3].src = mvUrlArr[3];
    viewCon[4].src = mvUrlArr[4];
    viewCon[5].src = mvUrlArr[5];
}

getAdMvInfo();
getTopMvInfo();
getUpMvInfo();
getNowMvInfo();