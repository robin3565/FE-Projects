const getData = () => {
    const value = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        value.push(JSON.parse(localStorage.getItem(key)));
    }
    return value;
}

export default getData;