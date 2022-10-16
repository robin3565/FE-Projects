# Motivation 웹 어플리케이션
![02](https://user-images.githubusercontent.com/107474891/193537039-84dde6b9-4588-47a0-ab3a-9c96fac2cfa7.jpg)

**Keywords:** API 호출, localStorage
**Duration:** 2022.08.01 ~ 2022.08.05
**Tool:** React, Styled-components, Axios

자주가는 사이트를 북마크 해놓아 매번 주소를 입력하지 않고 사이트를 방문할 수 있는 기능과 함께, 웹을 방문할 때마다 영감을 줄 수 있는 문장을 제공해주는 웹 사이트가 있으면 어떨까요? 문장을 영어로도 볼 수 있고, 문장과도 잘 어울리는 배경은 랜덤으로 매번 달라져 유저가 매일 방문하더라도 지루하지 않도록 만들어주는 효과가 있는 모티베이션 웹 어플리케이션을 만들어보았습니다.

## 프로젝트 소개

[**Motivation Demo 바로가기 👉**](https://robin3565.github.io/motivation-app/)

매달 하나씩 진행하는 월간 프로젝트! 
8월의 첫 번째 프로젝트로 모티베이션 웹을 만들어 보았습니다.

강의를 보고 따라하는 클론코딩에서 벗어나서 배운 내용을 바탕으로 스스로 코드를 짜고, 수정하고, 배포해보는 경험을 해보고 싶었습니다. 간단하지만 유용한 모티베이션 웹을 만들며, 직접 어플리케이션을 기획하고 구현해보는 과정을 경험해보고, API 호출을 통한 비동기 처리 방법과 CRUD 기능을 학습하고자 했습니다.

### 기획
<img width="380" alt="moti-plan" src="https://user-images.githubusercontent.com/107474891/193537348-43185c73-6eee-43a1-8c40-b0df4d7beb04.PNG">

북마크 기능의 데이터는 화면 창을 끄더라도 남아있도록 localStorage에 저장하였습니다. 그리고 배경화면은 Unsplash API를 활용해 이미지를 랜덤으로 가져와 렌더링합니다. DB는 따로 구현하지 않고, 내부에 더미 데이터를 활용해 사용되는 이미지와 데이터를 렌더링했습니다.

## 구현한 기능
<img width="380" alt="moti-plan" src="https://user-images.githubusercontent.com/107474891/193537385-36190a9c-b2e2-4ea1-80d2-8d9fdcdf6fc3.jpg">

- 자주가는 사이트 북마크 기능
- 버튼을 누름에 따라 바뀌는 랜덤 배경화면
- 랜덤 모티베이션 문장
- 모티베이션 문장을 한글, 영어로 스위치가 가능한 버튼
- 업데이트 되는 시계

### 1. 북마크 기능
![moti-plus](https://user-images.githubusercontent.com/107474891/193537487-6b7f519a-7457-4614-adae-1d029bb82817.gif)
바로가기 추가를 통해 자주 가는 사이트를 북마크 할 수 있습니다. 북마크는 추가와 수정, 삭제가 모두 가능합니다.

저장한 북마크가 없는 경우 기본으로 바로가기 추가 버튼만 있습니다. 버튼을 클릭하면 사이트 이름과 URL을 입력할 수 있는 모달창이 뜹니다.

디자인은 구글 북마크를 참고하여 구현했습니다. 기본 버튼이 동그란 것과, hover시 사각형의 하얀 배경이 보이는 것, 그리고 모달창의 내용이 유사합니다. 모달창은 오픈시 서서히 열리도록 애니메이션을 주었습니다.

### 2. localStorage 저장

localStorage를 사용할 때에는 문제가 생길 수 있다는 것을 염두해둬야 합니다. localStorage, session 등은 string 등 단순한 값을 넣는게 아니면 JSON.parse를 사용해야 하는데, 데이터가 이상할 경우 오류가 발생할 수 있습니다. 따라서 기본값을 지정해 데이터가 오류가 발생할 경우 기본값을 리턴하도록 안전장치를 만들어줘야 합니다. 이러한 에러 발생에 대비해서 getItem, setItem을 맵핑하는 코드를 작성했습니다.

```jsx
export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log('데이터 저장에 실패했습니다.');
    }
}

export const getItem = (key, defaultValue) => {
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
```

### 3. 배경화면 (Unsplash API)
![moti-btn](https://user-images.githubusercontent.com/107474891/193537530-5379dcca-43ec-4318-8c9a-77c1526573b9.gif)
[Unsplash API](https://unsplash.com/developers)를 활용해 랜덤 이미지를 불러 옵니다. 비동기 처리를 위해 Axios 라이브러리를 사용했습니다.

불러온 이미지 중 세로 대비 가로가 긴 이미지인 가로형 이미지만 저장합니다. API 내부적으로만 가로형 이미지만 불러오려고 했으나 API 내에서 해결이 되지 않아, 우선 이미지를 랜덤으로 모두 불러오고, 불러온 이미지 중 가로형 이미지만 다시 저장하도록 구현했습니다.

```jsx
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
```

**배경화면 변경 버튼**

버튼 클릭 시 런던, 파리, 한국의 이미지로 변경이 가능합니다. 버튼을 누를 때마다 query가 바뀌고, query는 바뀔 때마다 fetchData 메소드를 불러옵니다.

```jsx
// Background.js
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
```

### 4. 모티베이션 문장
![moti-toggle](https://user-images.githubusercontent.com/107474891/193537577-ef05897b-f42a-4d84-b99b-991fcf195c97.gif)

하루에 영감을 줄 수 있는 모티베이션 문장을 제공합니다. 웹에 방문할 때마다 랜덤으로 다른 문장을 볼 수 있습니다. Database를 따로 사용하지 않고 더미 데이터를 사용해 문장을 제공했습니다.

**한글/영어 버전 버튼**

버튼 클릭 시 현재 모티베이션 문장의 영어 버전을 제공합니다. 다시 버튼을 누르면 원래의 한글 버전으로 돌아옵니다.

### 5. 시계

Date 객체를 활용해 현재 시간이 업데이트 되는 시계를 만들었습니다. 시간, 날짜의 숫자가 10보다 작은 수일 경우, 앞에 0이 붙도록 구현했습니다. 시간은 setInterval 메소드로 30초마다 한 번씩 업데이트 됩니다.

## 느낀점

웹을 열 때마다 보는 구글 북마크 페이지를 보면서 검색창보다는 도움이 되는 다른 게 있다면 어떨까 고민에서 시작한 프로젝트입니다. 간단한 기능의 어플리케이션이지만 처음 기획한대로 모두 다 구현을 해내 아주 보람찬 프로젝트였습니다.

다만 Unsplash API 이미지를 받아올 때, 이미지 크기가 너무 다양해서 어려웠습니다. params로 조건을 넣었으나 제대로 되지 않았고, 아무리 찾아도 해결 방법이 없어 API 사용 여부를 고민해야했습니다. 이 때, 받아온 이미지 중 조건에 맞는 것만 재사용하는 방법은 가능할 것 같아 원하는 이미지만 저장하여 사용하는 방법으로 변경하였습니다. 이 과정에서 기존에 알고 있던 방법이 잘 되지 않더라도 새로운 방법을 찾아보면 언제든지 해결할 방법은 있다는 점을 알게 되었습니다.
