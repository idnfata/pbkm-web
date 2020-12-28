import API from "../../api"


export const createBranch = (token, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_ISLOADING", value: true})
        API.addBranch(token, data).then(result => {
            if(result.status == 200) {
                console.log(result.data);
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: result.data.message})
                resolve(result.data)
            
            }
        }).catch(err => {
            console.log(err.response)
            dispatch({type: "CHANGE_ISLOADING", value: false})
            reject(err.response)
        })
    })
    
}

export const editBranch = (token, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_ISLOADING", value: true})
        API.editBranch(token, data).then(result => {
            if(result.status == 200) {
                console.log(result.data);
                dispatch({type: "CHANGE_ISLOADING", value: false})
                dispatch({type: "CHANGE_MESSAGE", value: result.data.message})
                resolve(result.data)
            
            }
        }).catch(err => {
            console.log(err.response)
            dispatch({type: "CHANGE_ISLOADING", value: false})
            reject(err.response)
        })
    })
    
}