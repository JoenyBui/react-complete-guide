import React, { Component } from 'react';

import PropTypes from 'prop-types'

import Aux from '../../../hoc/Aux'
import withClass from '../../../hoc/withClass'
import classes from './Person.css'
import AuthContext from '../../../context/auth-context'

class Person extends Component {
  constructor(props) {
    super(props)
    this.inputElementRefs = React.createRef()
  }

  // has to be called contextType behind the scene
  static contextType = AuthContext

  componentDidMount() {
    // this.inputElement.focus()
    this.inputElementRefs.current.focus()
    console.log(this.context.authenticated)
  }
  
  render() {
    return (
      <Aux>
        {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
        <p onClick={this.props.click}> I'm a {this.props.name} and I am {this.props.age} years old!</p>
        <p key="i2">{this.props.children}</p>
        <input key="i3" 
                ref={this.inputElementRefs}
                // ref={(inputEl) => {this.inputElement = inputEl}} 
                type="text" onChange={this.props.changed} value={this.props.name}/>
      </Aux>
    )
  }
} 

// add props type constraints
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default withClass(Person, classes.Person)