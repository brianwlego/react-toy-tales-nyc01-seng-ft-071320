import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{

  state = {
    display: false,
    toysArray: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp=>resp.json())
    .then(data => this.setState(()=>({toysArray: data})))
  }

  newToy = (newToyObj) => {
    const newArray = this.state.toysArray
    const toy = newToyObj
    toy.likes = 0
    const configObj = {
      method: 'POST', 
      headers: {"Content-Type": "application/json", "Accepts": "application/json"}, 
      body: JSON.stringify(toy)
    }
    fetch('http://localhost:3000/toys', configObj)
    .then(resp=>resp.json())
    .then(newToy => {
      this.setState(()=>({
        toysArray: [newToy, ...newArray], 
        display: false
      }))
    })
  }

  deleteToy = (toyObj) => {
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {method: "DELETE"})
    .then(resp=>resp.json())
    .then(data => {
      let newArray = this.state.toysArray.filter(toy => toy.id !== toyObj.id)
      console.log("after splice", newArray)
      this.setState(()=>({
        toysArray: newArray
      }))
    })
  }

  likeHandler = (toyObj) => {
    const configObj = {
      method: "PATCH", 
      headers: {"Content-Type": "application/json", "Accepts": "application/json"}, 
      body: JSON.stringify({likes: toyObj.likes + 1})
    }

    fetch(`http://localhost:3000/toys/${toyObj.id}`, configObj)
    .then(resp=>resp.json())
    .then(data => {
      const newArray = this.state.toysArray
      const found = newArray.find(toy => toy.id === data.id)
      found.likes += 1
      this.setState(()=>({
        toysArray: newArray
      }))
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submit={this.newToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer like={this.likeHandler} delete={this.deleteToy} toys={this.state.toysArray} />
      </>
    );
  }

}

export default App;
