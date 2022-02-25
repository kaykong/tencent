export const setUserInfoToLocalStorage = (loginInfo, userInfo) => {
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
    localStorage.setItem('userInfo', JSON.stringify({
        username: userInfo.username,
        phone: userInfo.phone,
        _id:　userInfo._id
    }))
}

export const getUserInfoFromLocalStorage = () => {
    let result = localStorage.getItem('userInfo')
    if (result) {
        try {
            result = JSON.parse(result)
        } catch (e) {
            result = null
        }
    }
    return result
}

export const loginOutFromLocalStorage = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('loginInfo')
}

export const getUserIdFromLocalStorage = () => {
    let result = localStorage.getItem('userInfo')
    if (result) {
        try {
            result = JSON.parse(result)
            result = result._id
        } catch (e) {
            result = null
        }
    }
    return result
}