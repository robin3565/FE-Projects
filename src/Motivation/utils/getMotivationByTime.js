const getMotivationByTime = (motivations, time) => {
    const dayOrNight = time.getHours() > 5 && time.getHours() < 18;
    return motivations[dayOrNight? 'day_motivation_kr' : 'night_motivation_kr'];
}

export default getMotivationByTime
