import React, { useEffect, Fragment } from "react"
import { Router, Route, DefaultRoute } from "app/packages/react-router-next"
import { fetchUser, isValidDate } from "app/utils"
import { useAppState } from "app/app-state"
import UserDatePosts from "app/UserDatePosts"
import Feed from "app/Feed"
import Dashboard from "app/Dashboard"
import TopBar from "app/TopBar"
import User from "app/User"
import NotFound from "app/NotFound"

export default function LoggedIn() {
  const [{ auth, user }, dispatch] = useAppState()

  // use fetchuser to fetch user data. we'll get a user back
  // instead of: setUser(user)  locally
  // do a: dispatch({ type: ..., user})   // and now shares action globally
  // when you do, add that to appReducer
  
  useEffect(() => {
    if(!user) {
      // what if switching pafges really fast in inflight request? want to cleanup anything asynchronous:
      let isCurrent = true
      fetchUser(auth.uid).then(user => {
        // do this locally so it doesn't fetch user every time component loads
        if(isCurrent) dispatch({ type: "USER_CHANGE", user: user })
      })
      return(() => isCurrent = false) // tear down
    }
  }, [user, dispatch, auth.uid])

  return user ? (
    <Fragment>
      <TopBar />
      <div className="Main">
        <Router>
          <Route path=".">
            <Dashboard />
          </Route>
          <Route
            path=":uid/:date"
            matchState={state => state && state.fromCalendar}
            validate={hasValidDateParam}
          >
            <Dashboard />
          </Route>
          <Route path=":uid/:date" validate={hasValidDateParam}>
            <UserDatePosts />
          </Route>
          <Route path=":uid">
            <User />
          </Route>
          <Route path="feed">
            <Feed />
          </Route>
          <DefaultRoute>
            <NotFound />
          </DefaultRoute>
        </Router>
      </div>
    </Fragment>
  ) : <div>No user! Go fix it :D</div>
}

const hasValidDateParam = ({ params }) => {
  const [year, month, day] = params.date.split("-")
  const isValid = isValidDate(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  )
  return isValid
}
