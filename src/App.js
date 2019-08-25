import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium'
import './App.css';
import Person from './Person/Person'


class App extends Component {
  state = {
    persons: [
      { id: 'abcd1', name: 'Max', age: 28 },
      { id: 'abcd2', name: 'Manu', age: 29 },
      { id: 'abcd3', name: 'Stephanie', age: 26}
    ],
    showPersons: false
  }

  switchNameHandler = (name) => {
    this.setState({
      persons: [
        { id: 'abcd1', name: name, age: 28 },
        { id: 'abcd2', name: 'Manu', age: 29 },
        { id: 'abcd3', name: 'Stephanie', age: 27}
      ]
    })
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

    this.setState({
      persons: persons
    })
  }

  togglePersonsHandler = () => {
    const showPersons = this.state.showPersons
    this.setState({
      showPersons: !showPersons})
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: 'px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => 
            <Person key={person.id}
              click={() => this.deleteHandler(index)}
              changed={(event) => this.nameChangeHandler(event, person.id)}
              name={person.name} 
              age={person.age} />)}
        </div>
      )

      style.backgroundColor = 'red'
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }
            
    const classes = []
    if (this.state.persons.length <= 2) classes.push('red')
    if (this.state.persons.length <= 1) classes.push('bold')

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}>Show Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);


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

