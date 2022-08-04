import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.unsplash.com/photos/random',
    params: {
        client_id: 'x1m0eDEJ4cNLpPnO6NKt-jc-LBauxaBRyL9DZWC-PhI',
        count: 30,
    }
});

export default instance;