import React, { Component } from 'react';
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
      backgroundColor: 'white',
      font: 'inherit',
      border: 'px solid blue',
      padding: '8px',
      cursor: 'pointer'
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
    }
            
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Show Persons</button>
          {persons}
      </div>
    );
  }
}

export default App;


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

