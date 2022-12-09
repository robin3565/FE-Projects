const motivations = [
    {
        id: 1,
        quote: "간단함이 훌륭함의 열쇠다.",
        author: "이소룡",
    },    
    {
        id: 2,
        quote: "승리하면 조금 배울 수 있고, 패배하면 모든 것을 배울 수 있다.",
        author: "크리스티 메튜슨",
    },
    {
        id: 3,
        quote: "산을 움직이려 하는 이는 작은 돌을 들어내는 일로 시작한다.",
        author: "공자",
    },
    {
        id: 4,
        quote: "들은 것은 잊어버리고, 본 것은 기억하고, 직접 해본 것은 이해한다.",
        author: "공자",
    },
    {
        id: 5,
        quote: "인생은 원래 공평하지 못하다. 그런 현실에 대하여 불평할 생각하지 말고 받아들여라.",
        author: "빌 게이츠",
    },
    {
        id: 6,
        quote: "휴식은 게으름도, 멈춤도 아니다.",
        author: "헨리 포드",
    },
    {
        id: 7,
        quote: "위대한 정신을 가진 사람들은 생각을 논한다. 평범한 사람들은 사건을 논한다. 마음이 좁은 사람들은 사람들을 논한다.",
        author: "엘리너 루즈벨트",
    },
    {
        id: 8,
        quote: "나는 내가 더 노력할 수록 운이 좋아진다는 걸 발견했다.",
        author: "토마스 제퍼슨",
    },
    {
        id: 9,
        quote: "미래는 현재 우리가 무엇을 하는가에 달려 있다.",
        author: "마하트마 간디",
    },
    {
        id: 10,
        quote: "기운과 끈기는 모든 것을 이겨낸다.",
        author: "벤자민 프랭클린",
    },
    {
        id: 11,
        quote: "해야할 일은 과감히 하라, 결심한 일은 반드시 실행하라",
        author: "벤자민 프랭클린",
    },
    {
        id: 12,
        quote: "20년 후, 당신은 했던 일보다 하지 않았던 일로 인해 더 실망을 할 것이다.",
        author: "마크 트웨인",
    }


]

const quote = document.querySelector("#motivations p:first-child");
const author = document.querySelector("#motivations p:last-child");


const todayMotivation = motivations[Math.floor(Math.random() * motivations.length)]

quote.innerHTML = todayMotivation.quote;
author.innerHTML = todayMotivation.author;