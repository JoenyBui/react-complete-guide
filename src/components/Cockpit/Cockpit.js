import React, {useEffect, useRef, useContext } from 'react'
import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context'

const cockpit = (props) => {
  const toggleBtnRef = useRef(null)
  const authContext = useContext(AuthContext)

  let btnClass = ''

  useEffect(() => {
    toggleBtnRef.current.click()
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect')
    }
  }, [])

  const assignedClasses = []
  if (props.persons.length <= 2) assignedClasses.push(classes.red)
  if (props.persons.length <= 1) assignedClasses.push(classes.bold)

  if (props.showPersons) {
    btnClass = classes.Red
  }
  
  return (
    <div className={classes.Cockpit}>
      <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
          ref={toggleBtnRef}
          className={btnClass}
          onClick={props.clicked}>
            Toggle Persons
        </button>
          <button onClick={authContext.login}>Log In</button>
    </div>
  )
}

export default React.memo(cockpit)