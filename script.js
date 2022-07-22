// api 불러오기 - 기본 api 정보
const base_url = "https://api.themoviedb.org/3";
let img_path = "https://image.tmdb.org/t/p/original";

const params = {
    api_key: "07f254918690b891a7fc234d10daef8e",
    language: "ko",
    page: 1
}


// fetch api 함수 만들기
const fetchApi = async (path, callback) => {
    const mvInfoResponse = await fetch(`${base_url}${path}?api_key=${params.api_key}&language=${params.language}&page=${params.page}`)
    const allMvInfo = await mvInfoResponse.json();
    const mvInfo = allMvInfo["results"];
    callback(mvInfo);
}

// 랜덤 함수
const funRandom = (length) => Math.floor(Math.random() * length)

//ad-mv info 함수 (movie/popular)
function getAdMvInfo(mvInfo) {
    // 랜덤 함수
    const random = funRandom(mvInfo.length);
    const randomInfo = mvInfo[random];
    // 랜덤 id, title
    const mvRandomId = randomInfo["id"];
    const mvRandomTitle = randomInfo["title"];
    let overView = randomInfo["overview"];

    // Overview
    function getOverview() {
        if (String(overView).length != 0) {
            overView = `${overView.substring(0, 200)}...`;
        } else {
            overView = overView;
        }
    }
    getOverview();

    // 랜덤으로 이미지 불러오기
    const viewAd = document.getElementById("ad-img");
    const viewAdTitle = document.querySelectorAll("#ad-mv div p")
    const randomImgUrl = `${img_path}${mvInfo[random]["backdrop_path"]}`;
    viewAd.src = randomImgUrl;
    // 영화 안내 바꾸기 - 제목 & 소개
    viewAdTitle[0].innerHTML = mvRandomTitle;
    viewAdTitle[1].innerHTML = overView;
}

const viewCon = [{
    id: 1,
    item: ".contents1 img.item"
},
{
    id: 2,
    item: ".contents2 img.item"
},
{
    id: 3,
    item: ".contents3 img.item"
}]

// img 가져와서 저장하는 함수
function getImgMvInfo(mvInfo) {
    const mvIdArr = [];
    const mvPathArr = [];
    const mvUrlArr = [];
    let allCon = viewCon;

    //map 함수 활용 -> id, path 배열 만들기
    mvInfo.map((item) => mvIdArr.push(item["id"]))
    mvInfo.map((item) => mvPathArr.push(item["backdrop_path"]))
    mvPathArr.map((item) => mvUrlArr.push(`${img_path}${item}`))

    viewMvImg(mvUrlArr, allCon);
}

// img 불러와서 html에 띄우는 함수
function viewMvImg(mvUrlArr, viewCon) {
    let Item = viewCon[0]["item"];
    let Items = document.querySelectorAll(Item);
    for (let i = 0; i < Items.length; i++) {
        Items[i].src = mvUrlArr[i];
    }
    viewCon.shift();
}

fetchApi("/movie/popular", getAdMvInfo);
fetchApi("/movie/now_playing", getImgMvInfo);
fetchApi("/movie/top_rated", getImgMvInfo);
fetchApi("/movie/upcoming", getImgMvInfo);
