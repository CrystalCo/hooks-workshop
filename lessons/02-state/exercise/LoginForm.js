import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal


// we need state to know what type of pw
// state should render as pw field or text field

//2nd part: when form submits, call login w/pw and email

export default function LoginForm() {
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    // all form elements without the divs!
    // form.elements
    const [emailNode, passwordNode] = form.elements
    setIsLoading(true)
    login(emailNode.value, passwordNode.value).catch(() => {
      setIsLoading(false)
      setError("Nope")
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={checked ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={checked}
            onChange={() => {
              setChecked(!checked)
            }}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        {isLoading ? (
          <span>loading...</span>
        ) : (<span>Login</span>)}
        <span>{error}</span>
      </TabsButton>
    </form>
  )
}
