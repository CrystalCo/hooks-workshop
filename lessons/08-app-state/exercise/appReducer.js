const initialState = { authAttempted: false, auth: null, user: null }

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_CHANGE": {
      return { ...state, auth: action.auth, authAttempted: true }
    }
    // when someone dispacthes this action, new state is what we had before + this new user
    case "USER_CHANGE": {
      return {...state, user: action.user}
    }
    default:
      return state
  }
}

export { initialState }

export default appStateReducer


// in modules, import appREducer and {initialState} 
// check out app-state in modules.