// Context is great for modularity.  Doesn't change behavior.  Users can also still use old API on bottom so they don't have to change their code
import React, { useState, createContext, useContext, Children } from 'react'

import LoginForm from 'app/LoginForm'
import SignupForm from 'app/SignupForm'
import About from 'app/About'

//Tabs is provider for all its children.  so anything under its tree can use its context  for all descendeants to use context info
//Put Provider in parent component, and context in Children
const TabsContext = createContext()

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    // value is like the props/state
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

const TabContext = createContext()
// const TabListContext = createContext()   in workshop example

function TabList({ children }) {
  // maps children to render 
  const wrappedChildren = Children.map(children, (child, index) => (
    <TabContext.Provider value={index}>{child}</TabContext.Provider>
  ))
  return <div data-reach-tab-list>{wrappedChildren}</div>
}

//
function Tab({ children, isDisabled, ...rest }) {
  const index = useContext(TabContext)
  const { activeIndex, setActiveIndex } = useContext(TabsContext)
  const isActive = index === activeIndex
  return (
    <div
      data-reach-tab
      className={isDisabled ? 'disabled' : isActive ? 'active' : ''}
      onClick={isDisabled ? undefined : () => setActiveIndex(index)}
      // onClick={onSelect}
      {...rest}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  // based off activeIndex, needs to display children.
  const { activeIndex } = useContext(TabsContext)
  // children doesn't always come as an array, so need to specify to be safe
  return <div data-reach-tab-panels>{Children.toArray(children[activeIndex])}</div>
}

function TabPanel({ children }) {
  return children
}

function DataTabs({ data }) {
  return (
    // Tabs is Provider for TabList
    <Tabs>
    {/* Consumer of Tabs, provider for Tab */}
      <TabList>
          {/* Consumer of TabList */}
        {data.map(tab => (
          <Tab>{tab.label}</Tab>  
        ))}
      </TabList>
      <TabPanels>
        {data.map(tab => (
          <TabPanel>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default function LoggedOut() {
  const tabData = [
    {
      label: 'Login',
      content: <LoginForm />
    },
    {
      label: 'Signup',
      content: <SignupForm />
    }
  ]

  return (
    <div className="LoggedOut">
      <About />
      <DataTabs data={tabData} />
    </div>
  )
}



/**
 * 
 * 
 // rebuilding open API with new one
 function DataTabs({ data=[], tabsPosition="top", disabled=[] }) {
   const tabs = (
     
    //  Consumer of Tabs, provider for Tab 
     <TabList>
              // Consumer of TabList
            {data.map(tab => (
              <Tab>{tab.label}</Tab>  
            ))}
          </TabList>
          <TabPanels>
            {data.map(tab => (
              <TabPanel>{tab.content}</TabPanel>
            ))}
          </TabPanels>
  )
  return (
    // Tabs is Provider for TabList
    <Tabs>
    // Consumer of Tabs, provider for Tab
      <TabList>
          // Consumer of TabList 
        {data.map(tab => (
          <Tab>{tab.label}</Tab>  
        ))}
      </TabList>
      <TabPanels>
        {data.map(tab => (
          <TabPanel>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default function LoggedOut() {
  const tabData = [
    {
      label: 'Login',
      content: <LoginForm />
    },
    {
      label: 'Signup',
      content: <SignupForm />
    }
  ]
  
  return (
    <div className="LoggedOut">
      <About />
      <DataTabs data={tabData} tabsPosition="top" />
    </div>
  )
}

*/