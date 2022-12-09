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
        } else {
            return "잘못된 형식입니다. 확인 후 다시 시도하세요."
        }
    }

}

export default handleError;