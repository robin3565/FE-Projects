const bg = [
    {
        id:1,
        url: "german.jpg",
        country: "German"
    },
    {
        id:2,
        url: "german1.jpg",
        country: "German"
    },
    {
        id:3,
        url: "italy.jpg",
        country: "Italy"
    },
    {
        id:4,
        url: "london.jpg",
        country: "London"
    },
    {
        id:5,
        url: "london1.jpg",
        country: "London"
    },
    {
        id:6,
        url: "london2.jpg",
        country: "London"
    },
    {
        id:7,
        url: "paris.jpg",
        country: "Paris"
    },
    {
        id:8,
        url: "paris1.jpg",
        country: "Paris"
    },
    {
        id:9,
        url: "paris2.jpg",
        country: "Paris"
    },
    {
        id:10,
        url: "rome.jpg",
        country: "Rome"
    },
    {
        id:11,
        url: "rome1.jpg",
        country: "Rome"
    },
    {
        id:12,
        url: "rome2.jpg",
        country: "Rome"
    }
]

const todayBg = bg[Math.floor(Math.random() * bg.length)].url;

const bgImage = document.createElement("img");
bgImage.src = `./bg/${todayBg}`;

document.body.prepend(bgImage);

