# ****Instagram 클론코딩 (with Firebase)****
![img3](https://user-images.githubusercontent.com/107474891/195801185-55a5612c-d71a-48d0-8f28-4f53736bb009.jpg)
**Keywords:** SPA, localStorage, Firebase

**Duration:** 2022.08.25 ~ 2022.09.20

**Tool:** React, Styled-components, React-Router-Dom, Firebase, throttle

### 인스타그램은 서비스 내에 다양한 기능을 포함하고 있습니다. 각 기능들을 직접 구현해보며 JS, React를 보다 더 잘 사용해보고자 하였고, 실제 서비스되고 있는 기능들의 특징들을 직접 구현을 통해 파악하고자 했습니다.

### 그리고 React Router 라이브러리를 통해 SPA(Single Page Application) 방식으로 웹을 만들어보고, Firebase를 이용해보며 NoSQL에 대해 이해하며 직접 DB를 구현해보았습니다.

## 프로젝트 소개

**사이트 바로가기**
매달 하나씩 진행하는 월간 프로젝트!
9월 프로젝트로 **Firebase를 활용한** **인스타그램**을 클론코딩 해보았습니다. 

인스타그램은 주로 이미지를 다루는 어플리케이션입니다. 따라서 이미지와 관련된 다양한 기능을 구현해볼 수 있습니다. 이미지를 업로드하고, 삭제하고, 수정하는 기능 외에도 이미지 최적화 기능, 이미지 자르기 기능, 이미지 무한 스크롤 기능을 구현했니다.

또한 서비스 어플리케이션에 맞게 로그인, 회원가입 인증 기능을 구현하고 로그인하지 않은 경우 메인 페이지에 접근이 불가능하도록 하는 Private Router 기능 및 유저 간의 소통을 위한 댓글, 좋아요 기능, 유저 검색 기능 및 마이페이지 기능을 만들었습니다. 이 과정에서 React Router를 활용해 SPA 방식을 활용하고, 서버와 DB로는 Firebase를 활용해 서버리스 어플리케이션으로 구현했습니다.

## 구현한 기능

- 사용자 인증 & Private Router 기능 구현
- 이미지 관련 다양한 기능 구현 (CRUD, 사이즈 조정, 자르기)
- 게시물 무한 스크롤 기능 구현
- 댓글 & 좋아요 기능 구현
- React-Router-Dom을 이용한 라우터 관리
- Context API를 이용한 데이터 관리
- Firebase를 활용한 데이터 베이스 연동 및 백엔드 기능 구현

### 사용자 인증 (로그인 & 회원가입)
![insta-login](https://user-images.githubusercontent.com/107474891/195801469-90c249fa-cf3f-493e-8e58-7140fe7dc7bb.gif)

Firebase 인증(Authentication)을 활용해 로그인, 회원가입 기능을 구현했습니다. 인증은 **1) 사용자 아이디, 비밀번호를 직접 입력**하는 방법과 **2) Facebook으로 로그인, 회원가입**, 이 2가지 방법으로 진행됩니다.

사용자가 입력한 아이디, 비밀번호 혹은 Facebook 로그인 시 발급 받는 Token을 Firebase 서버로 전달하면, 이를 확인하여 반환해줍니다. 반환이 정상적으로 이루어진 경우에만 로그인이 되고 Home 화면으로 이동하도록 구현하였습니다.

**정규표현식 유효성 검사**

이메일 아이디와 비밀번호는 정규표현식의 유효성 검사를 통과해야만 가입 버튼이 활성화 됩니다. 로그인, 회원가입시 발생할 수 있는 에러는 handleError 메소드를 통해 사용자가 어떤 에러로 인해 인증이 불가능한지 알려줍니다.

```jsx
// AuthSignUp.js
const validate = () => {
    const ID_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const PWD_REGEX = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!userInfo.email === false && !userInfo.id === false && !userInfo.password === false
        && PWD_REGEX.test(userInfo.password) && ID_REGEX.test(userInfo.email)) {
        setValid(true);
    } else if (!ID_REGEX.test(userInfo.email)) {
        setValid(false)
        handleError('auth/invalid-email')
    } else if (!PWD_REGEX.test(userInfo.password)) {
        setValid(false)
        handleError('auth/invalid-password')
    } else {
        setValid(false)
        handleError('auth/wrong')
    }
}

useEffect(() => {
    validate();
}, [userInfo]);
```

```jsx
// functions
const handleError = (error) => {
    if (error) {
      if (error === "auth/invalid-email") {
          return "이메일 형식을 확인하세요."
      } else if (error === "auth/wrong-password") {
          return "잘못된 비밀번호입니다. 다시 확인하세요."
      } else if (error === "auth/too-many-requests") {
          return "잠시 후 다시 입력하세요."
      } else if (error === "auth/user-not-found") {
          return "입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요."
      } else if (error === "auth/invalid-password") {
          return "비밀번호 형식을 확인해주세요."
      } else {
          return "잘못된 형식입니다. 확인 후 다시 시도하세요."
      }
    }
}
```

**Private Router**

로그인 된 회원이 아닐 경우 Home 화면을 비롯한 다른 페이지로는 이동이 불가능합니다. 로그인하지 않은 유저는 다른 페이지로 이동을 시동할 경우 로그인 페이지로 리다이렉트 됩니다.

```jsx
import { Navigate, useLocation } from 'react-router-dom'
import STATE_KEY from '../components/global/constants';
import { getItem } from '../components/global/functions';

const PrivateRoute = ({ children }) => {
    const localState = getItem(STATE_KEY, []);
    const location = useLocation();

    if (!localState?.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default PrivateRoute
```

### 이미지 모달창 (Portal, 사이즈 조정, 자르기)
![insta-img](https://user-images.githubusercontent.com/107474891/195801645-a34cfdf8-7359-401e-9e63-932053eaa58e.gif)

이미지 업로드 버튼 클릭시 첫 번째 모달창이 나옵니다. 업로드 할 이미지를 선택하면 이미지를 1:1 비율로 자를 수 있는 두 번째 모달창이 나오고, 다음 버튼을 누르면 자른 이미지를 보여주고, 이미지와 함께 남길 글을 입력할 수 있는 세 번째 모달창이 나옵니다. 마지막으로 공유하기를 누르면 이미지는 FireStorage에 저장되고, 저장된 주소값과 글은 FireStore에 저장됩니다. 이미지가 저장되면 Home 화면의 이미지 피드는 재렌더링됩니다.

**React Portals를 활용한 Modal 생성**

부모 컴포넌트에 z-index나 overflow 속성이 있는 경우, 모달이나 팝업은 두 스타일의 우선순위가 충돌하여 방해가 될 수 있습니다. 이를 방지하고자 DOM을 선택하여 부모 컴포넌트의 바깥에 있는 DOM 노드로 자식을 렌더링해주는 Portals를 활용해 App 컴포넌트 바깥에 모달을 렌더링했습니다.

```jsx
// Portals.js
import ReactDOM from 'react-dom'
const el = document.getElementById("modal");

const PlusModalPortal = ({ children }) => {
    return ReactDOM.createPortal(children, el);
};
```

**이미지 사이즈 조정 (react-image-file-resizer)**

너무 큰 사이즈의 이미지를 저장할 경우 처리에 시간이 오래 걸릴 수 있습니다. 그래서 크기를 줄이고, 일정한 크기로 이미지를 저장하기 위해 react-image-file-resizer 라이브러리를 사용해 이미지 크기를 조정했습니다.

**이미지 자르기 (react-easy-crop)**

일정한 비율로 이미지를 자르기 위해 react-easy-crop 라이브러리를 사용했습니다. 1:1 비율로 자를 수 있도록 구현했습니다.

### 무한 스크롤
![insta-scroll](https://user-images.githubusercontent.com/107474891/195801743-b279eab6-8a19-4cfc-a0cd-5fa98beae76e.gif)


많은 이미지를 효과적으로 보여주기 위해서 무한 스크롤을 구현했습니다. 무한스크롤은 스크롤 바가 마지막에 도달하면 추가적인 이미지 데이터를 불러와 렌더링하는 것을 의미합니다. 구현을 위해 스크롤을 감지해 마지막 도달했는지 추적하는데, 이 과정에서 스크롤의 변화가 있을 때마다 함수가 실행되어 성능 문제가 발생합니다. 이 문제를 해결하고자 Throttle 라이브러리를 이용해 스크롤 이벤트가 일정한 시간(1초)에 한 번씩 실행되도록 조정했습니다.

### 댓글 & 좋아요 기능
![insta-like](https://user-images.githubusercontent.com/107474891/195801781-c556a669-041e-4bd9-b4c4-b8fb6093bb01.gif)

인스타그램과 유사하게 각 게시물에 댓글과 좋아요를 남길 수 있도록 했습니다. 댓글은 생성과 삭제가 가능하고, 좋아요는 버튼 클릭 혹은 이미지 더블 클릭 시에 좋아요가 활성화 되고, 다시 클릭하면 없어지게 만들었습니다.

### 검색 기능
![insta-search](https://user-images.githubusercontent.com/107474891/195801832-75073f84-9169-4b1c-b8f8-a8720244a874.gif)

유저 아이디를 검색하면 모든 유저 아이디에 검색한 값이 포함되어 있는지 확인하고, 포함되어 있는 유저 아이디만 필터링하는 메소드를 활용한 검색 기능입니다. 필터된 유저 아이디는 검색창에 렌더링 되고, 찾는 유저 아이디가 있다면 프로필 사진이나 유저 아이디 클릭시 클릭한 유저의 마이 페이지로 이동하도록 구현했습니다.

```jsx
const filterUser = (e) => {
    setSearchedId(e.target.value);
    if (e.target.value == "") setFiltetedId([]);
    else {
        setFiltetedId(userInfo.filter((user) => 
        user.id.toLowerCase().includes(searchedId.toLowerCase())));
    }
}
```

### React-Router-Dom을 이용한 SPA 방식 구현

인스타그램 클론코딩은 SPA 방식으로 구현했습니다. SPA 방식은 웹 애플리케이션 실행 후에 유저와의 상호작용이 있는 부분만 자바스크립트를 사용하여 서버 API를 호출하고, 불러온 데이터를 화면에 업데이트 해주는 방식을 의미합니다.

**유저별 페이지 (마이 페이지)**

유저별 마이 페이지는 유저 각각이 올린 컨텐츠를 모아볼 수 있는 페이지입니다. React Router를 활용해 userId 별로 페이지가 렌더링 되도록 구현했습니다.

로그인한 유저의 페이지의 경우에는 아이디 옆에 프로필 편집 버튼과 로그아웃 버튼이 보이도록 하였고, 각 기능 또한 구현했습니다.

**전체 사진 보는 페이지**

유저들의 전체 사진을 볼 수 있는 페이지를 구현했습니다. 그냥 이미지를 나열할 경우 마지막 줄의 이미지가 3개 미만인 경우 이미지가 왼쪽 정렬이 아닌 가운데 정렬이 되는 css 문제가 있었습니다. 이는 이미지를 3개씩 감싸는 div 태그를 생성하는 메소드를 만들어 css 문제를 해결할 수 있었습니다.

```jsx
// Explore.js
const divideData = (feeds, length) => {
    let output = Math.floor(length % 3);
    const divide = Math.floor(length / 3) + (output > 0 ? 1 : 0);
    if (output > 0) {
        for (let i = 0; i <= output; i++) {
            feeds.push(0);
        }
    }
    const newArray = [];
    for (let i = 0; i < divide; i++) {
        newArray.push(feeds.splice(0, 3));
    }
    return newArray;
}
```
