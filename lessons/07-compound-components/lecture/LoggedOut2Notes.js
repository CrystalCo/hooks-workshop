import React, { useState, useContext, createContext, Children } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"

function Tabs({ data, tabsPosition="top", disabled=[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const tabs = (
    <div data-reach-tab-list>
    {data.map((tab, index) => {
      const isActive = index === activeIndex
      const isDisabled = disabled.includes(index)
      return (
        <div
          data-reach-tab
          key={index}
          className={isDisabled ? "disabled" : isActive ? "active" : ""}
          onClick={ isDisabled ? undefined : () => setActiveIndex(index)}
        >
          {tab.label}
        </div>
      )
    })}
  </div>
  )

  const panels =  <div data-reach-tab-panels>{data[activeIndex].content}</div>


  return (
    <div data-reach-tabs>
      {tabsPosition === "bottom" ? [panels, tabs] : [tabs, panels]}
    </div>
  )
}

function Tabs2({children}) {
  return <div data-reach-tabs>{children}</div>
}

export default function LoggedOut() {
  return (
    <div className="LoggedOut">
        <About />
        <Tabs2>
            <TabList> 
                <Tab>Login</Tab>
                <Tab disabled>Signup</Tab>
            </TabList>
            <TabPanels>
                <TabPanel> <LoginForm /> </TabPanel>
                <TabPanel> <SignupForm /> </TabPanel>
            </TabPanels>
        </Tabs2>
    </div>
  )

  const tabData = [
    {
      label: "Login",
      content: <LoginForm />
    },
    {
      label: "Signup",
      content: <SignupForm />
    }
  ]

  return (
    <div className="LoggedOut">
      <About />
      <Tabs 
        data={tabData} 
        tabsPosition="top" 
        disabled={[1]} 
        tabsClassnames 

      />

    </div>
  )
}
