import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass'
import Aux from '../hoc/Aux'
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
      { id: 'abcd1', name: 'Max', age: 28 },
      { id: 'abcd2', name: 'Manu', age: 29 },
      { id: 'abcd3', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other values',
    showPersons: false,
    showCockpit: true,
    authenticated: false
  }

  deleteHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState((prevState, props) => {
        return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }}
    )
  }

  togglePersonsHandler = () => {
    const showPersons = this.state.showPersons
    this.setState({
      showPersons: !showPersons})
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  render() {
    let persons = null
    
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons persons={this.state.persons}
            changed={this.nameChangeHandler}
            clicked={this.deleteHandler} 
            isAuthenticated={this.state.authenticated}
          />
        </div>
      )
    }
            
    return (
      <Aux>
        <button onClick={() => {this.setState({ showCockpit: false })}}>Show Cockpit</button>
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }} >
          {this.state.showCockpit ? (
          <Cockpit 
            showPersons={this.state.showPersons}
            persons = {this.state.persons}
            clicked = {this.togglePersonsHandler} 
          />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);


// Functional Component w/ Hooks
// const App = props => {
//   const [ personsState, setPersonsState ] = useState({
//     persons: [
//       { name: 'Max', age: 28 },
//       { name: 'Manu', age: 29 },
//       { name: 'Stephanie', age: 26}
//     ]
//   });

//   const [otherState, setOtherState] = useState({otherState: 'some other value'})
//   console.log(personsState, otherState)

//   const switchNameHandler = () => {
//     setPersonsState({
//       persons: [
//         { name: 'Maximilian', age: 28 },
//         { name: 'Manu', age: 29 },
//         { name: 'Stephanie', age: 27}
//       ]
//     })
//   }

//   return (
//     <div className="App">
//       <h1>Hi, I'm a React App</h1>
//       <p>This is really working!</p>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age} />
//       <Person name={personsState.persons[2].name} age={personsState.persons[2].age}>
//         My Hobbies: Racing
//       </Person>
//     </div>
//   );
// }
// export default App

