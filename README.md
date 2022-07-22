# Vanilla JS로 만드는 미니프로젝트
## 시계 + To-do List
### 프로젝트 이유

해당 프로젝트는 노마드코더에 이미 있는 프로젝트로, 바닐라 JS를 복습하기에 아주 좋은 강의 같았다. JS의 기본적인 문법은 이미 알고 있으니 강의 수강 전에 먼저 제작을 해보고, 그 과정에서 잘 모르는 부분이나 어려운 부분을 체크해놓고 직접 찾아보는 연습을 해보려고 했다.

간단하게 몇 가지 기능만 추가해서 우선 만들어보았다. 일단 만들기!

### 프로젝트 목표

- 간단한 기능 구현을 통해서 필요한 기능을 파악하고, 기능 구현의 로직을 스스로 짜본다.
- 기능 구현시 문제점을 스스로 해결할 수 있다.
- **기술적으로 배울 수 있는 점**
    - 기본 HTML/CSS 문법 복습
    - HTML 구조 스스로 짜보기
    - CSS Layout 간단하게 짜보기 (flex-box 이해하기)
    - 기본 JS 문법 익히기
    - JS 함수 활용하기
    
### 프로젝트 간단 구조 & 기능
![image](https://user-images.githubusercontent.com/107474891/180375472-136df855-7fc6-4b2e-9625-91450cc5dfda.png)
- 날짜(YY-MM-DD)
    - 오늘 날짜를 보여준다.
    - Month, Day가 10보다 작은 경우 앞에 0을 붙여줘야 한다.
- 현재 시간
    - 현재 시간을 보여준다.
    - 시간 단위가 10보다 작을 경우 앞에 0을 붙여준다.
- 인사
    - 이름을 입력하도록 한다.
    - 이름을 입력하면 입력창이 사라지고, 입력창이 인사말과 이름으로 바뀐다.
    - 시간에 따라 인사말이 달라진다. (Morning, Afternoon, Evening)
- To-do List & 입력창
    - 이름 입력시 입력창의 placeholder에 ‘당신’이 이름으로 바뀐다.
    - `+` 을 누르면 입력창에 입력된 할 일이 아래 [ 체크박스 + 할 일 ]로 추가된다.
    - `+` 을 누르면 입력창에 입력된 내용이 지워지고 placeholder이 뜬다.
    - 체크박스를 체크하면 가운데 줄이 생긴다.
    - `x` 버튼을 누르면 할 일이 지워진다.

### 추가 기능
**랜덤으로 바뀌는 명언**
- 명언을 모은 Object 생성
- 해당 Object에서 하나씩 랜덤으로 명언을 호출한다.

**랜덤으로 바뀌는 배경 바꾸기**
- 배경을 모은 Object 생성
- 해당 Object에서 하나씩 랜덤으로 배경을 호출한다.
- img 태그를 배경화면으로 바꾸는 css 코드


**삭제 기능 (**X 버튼 추가해서 버튼 누르면 삭제)**
- 삭제 버튼 구현
- 버튼 누르면 삭제할 부분 가져오기
- remove() 함수 활용해서 삭제하기

** 체크 완료 (이미 완료된 할 일(체크된 일)은 가운데 줄을 긋는다.)**
- 체크 박스를 누르면 체크된 부분 가져오기
- 체크된 부분에 가운데 줄 긋는 css 넣기
- 다시 체크를 해제하면 줄 없애기

**배경 바뀌는 기능**
- 배경 모아서 Object로 저장
- 랜덤으로 배경이 있는 url 가져오기
- img 태그 만들어서, src에 해당 url 넣기
- img + src 태그 html 태그에 넣기
