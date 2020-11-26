import API from "../../api";


export const registerAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_ISLOADING", value: true})
        API.userRegister(data).then( result => {
            if(result.status == 200) {
                dispatch({type: "CHANGE_ISLOADING", value: false})
                resolve(true);
        
            }
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data.message);
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: err.response.data.message})
                reject(false);
            }
        })

    })

}

export const userLoginAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_ISLOADING", value: true})
        API.userLogin(data).then( result => {
            if(result.status == 200) {
                localStorage.setItem("token", result.data.token);
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: 'login success'})
                dispatch({type: "CHANGE_ISLOGIN", value: true})
                resolve(true);
        
            }
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data.message);
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: err.response.data.message})
                dispatch({type: "CHANGE_ISLOGIN", value: false})
                reject(false);
            }
        })

    })

}

export const createUserAPI = (token, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_ISLOADING", value: true})
        API.userCreate(token, data).then(result => {
            if(result.status == 200) {
                // console.log(result.data);
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: result.data.message})
                resolve(result.data)
            
            }
        }).catch(err => {
            // console.log(err)
            dispatch({type: "CHANGE_ISLOADING", value: false})
            reject(err.response.data)
        })
    })
}

export const editUserAPI = (token, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_ISLOADING", value: true})
        // console.log(data);
        API.userEdit(token, data).then(result => {
            if(result.status == 200) {
                // console.log(result.data);
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: result.data.message})
                resolve(result.data)
            
            }
        }).catch(err => {
            console.log(err)
            dispatch({type: "CHANGE_ISLOADING", value: false})
            reject(false)
        })
    })
}

export const setUser = (data) => (dispatch) => {
    dispatch({type: "CHANGE_USER", value: data})
    dispatch({type: "CHANGE_ISLOGIN", value: true})        
        
}


export const userLogoutAction = (token) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_ISLOADING", value: true})
        API.userLogout(token).then( result => {
            if(result.status == 'success') {
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_USER", value: {}})
                dispatch({type: "CHANGE_ISLOGIN", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: result.status.message})
                resolve(true);

            }
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data);
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: err.response.data.message})
                // dispatch({type: "CHANGE_ISLOGIN", value: false})
                reject(false);

            }
        })
    })
    
}

export const userDeleteAction = (token, id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_ISLOADING", value:true})
        API.userDelete(token, id).then(result => {
            dispatch({type: "CHANGE_ISLOADING", value:false})
            console.log(result)
            // if(result.status == 'success') {
            //     dispatch({type: "CHANGE_ISLOADING", value: false})
            //     dispatch({type: "CHANGE_USER", value: {}})
            //     dispatch({type: "CHANGE_ISLOGIN", value: false})
            //     dispatch({type: "CHANGE_MESSAGE", value: result.status.message})
            //     resolve(true);

            // }
        }).catch(err => {
            console.log(err.response.data);
            dispatch({type: "CHANGE_ISLOADING", value: false})
            dispatch({type: "CHANGE_MESSAGE", value: err.response.data.message})
            // dispatch({type: "CHANGE_ISLOGIN", value: false})
            reject(false);
        })
    });
}