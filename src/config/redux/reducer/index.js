const initialState = {
    popup: false,
    message: '',
    isLogin: false,
    isLoading: false,
    redirect: null,
    user: ''
}

/*
 reducer, kumpulan instruksi untuk merubah store
 memerlukan 2 parameter, state, dan action.type, dipanggil oleh action
*/


const reducer = (state = initialState, action) => {
    switch(action.type){
      case "CHANGE_POPUP":
        return {
          ...state,
          popup: action.value
        }
      case "CHANGE_ISLOGIN":
          return {
              ...state,
              isLogin: action.value,
            //   user: {...action.value}
          }
      case "CHANGE_USER":
          return {
              ...state,
              user: action.value,
          }
      case "CHANGE_ISLOADING":
          return {
              ...state,
              isLoading: action.value,
          }
      case "CHANGE_MESSAGE":
          return {
              ...state,
              message: action.value,
          }
      case "CHANGE_REDIRECT":
          return {
              ...state,
              redirect: action.value,
          }
      default: return state
    }
}

export default reducer;