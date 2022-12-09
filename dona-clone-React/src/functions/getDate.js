const time = new Date();

export const getGreeting = () => {
    const hour = time.getHours();
    if (hour > 4 && hour < 12) return "morning"
    else if (hour >= 12 && hour < 18) return "afternoon"
    else return "evening"
}

// export const getGreeting = () => {
//     const hour = time.getHours();
//     if (hour < 12) {
//         return "morning";
//     } else if (hour < 18) {
//         return "afternoon";
//     } else {
//         return "evening";
//     }
// }

export const getDay = () => time.toDateString().split(" ")[0];
export const getMonth = () => time.toDateString().split(" ")[1];
export const getDate = () => time.toDateString().split(" ")[2];
