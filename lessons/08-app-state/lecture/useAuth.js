import { useState, useEffect } from "react"
import { onAuthStateChanged } from "app/utils"
import { useAppState } from "app/app-state"

/******************************************************************************/
// 1. What happens if we useAuth in two different places in the app?
//    We've got it in App.js and NewPost.js.
//
//    - We'll set up two onAuthStateChanged listeners. This might cause
//      flickering, and is just unneccesary.
//    - Every component down the tree has to account for a potential `null`
//      value, which complicates all the code, we should be able to just plan
//      on having it. We should see an error in the app when we run it already.
//    - Also, note we learned about unsubscribing, so we return the unsubscribe
//      now
//

export default function useAuth() {
  const [authAttempted, setAuthAttempted] = useState(false)
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth => {
      setAuthAttempted(true)
      setAuth(auth)
    })
  }, [])

  return { auth, authAttempted }
}

/******************************************************************************/
// 2. A really simple solution is to maintain a little cache, especially since
//    we don't expect this stuff to change once we get it.

// Global cache; share at modular level
const cache = {
  authAttempted: false,
  auth: null
}

export default function useAuth() {
  const [authAttempted, setAuthAttempted] = useState(cache.authAttempted)
  const [auth, setAuth] = useState(cache.auth)

  useEffect(() => {
    if (!authAttempted) {
      return onAuthStateChanged(auth => {
        // first tiem we auth, updates cache
        cache.authAttempted = true
        cache.auth = auth

        // do this to get the updates to happen
        setAuthAttempted(cache.authAttempted)
        setAuth(cache.auth)
      })
    }
  }, [authAttempted])

  return { auth, authAttempted }
}

/******************************************************************************/
// 3. [open SignupForm.js]

/******************************************************************************/
// 5. Let's forgoe our own little cache here, and use our app state reducer.

// look at AppReducer.js to look at overall reducer?
// map state to props:
//  const [state, dispatch] = useAppState()
// TURNS INTO
//  const [{ authAttempted, auth }, dispatch] = useAppState()
// b/c we can deconstruct

export default function useAuth() {
  const [{ authAttempted, auth }, dispatch] = useAppState()

  useEffect(() => {
    // if we don't already have
    // we only need to attempt the auth once
    // if i'm the 1st one to the party, i'll set up the listener.  Then no one after me has to set up listener
    if (!authAttempted) {
      return onAuthStateChanged(auth => {
        dispatch({
          type: "AUTH_CHANGE",
          authAttemped: true,
          auth: auth
        })
      })
    }
  }, [authAttempted, dispatch])

  return { auth, authAttempted }
}

/**
//inside a class, you can use AppStateProvider component
// all you need is a class component that has props to pass down the props...

 * class MyApp extenders Component {
 *  render() {
 *    <AppStateProvider reducre={...} initialValue={...} />
 *  }
 * }
 * 
 * or to get state
 * 
 *  class MyApp extenders Component {
 *  render() {
 *    this.props.auth
 *    this.props.authAttempted
 *  }
 * }
 * 
 * or <Auth>
 *      {(auth, authAttempted) => (
 *      <MyApp auth={auth} />
 *  )}
 * </Auth>
 * 
 * function Auth(children) {
 *    const [{ auth, authAttempred}, dispatch] = useAppState()
 * 
 * useEffect(()=> {
 * })
 * }
 * 
 * 
 */

 // main advantages to a reducer is that it gives you language to setup your app (i.e 'when the sign up fails, use this...)