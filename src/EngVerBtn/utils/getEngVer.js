const getEngVer = (motivations, ver, num) => {
    let todayMotivation_kr = motivations[num].quotes_kr;
    let todayName_kr = motivations[num].name_kr;
    let todayMotivation_en = motivations[num].quotes_en;
    let todayName_en = motivations[num].name_en;

    let todayMotivation_ = ver ? todayMotivation_en : todayMotivation_kr;
    let todayName_ = ver ? todayName_en : todayName_kr;
    

    return [todayMotivation_, todayName_]
}

export default getEngVer;