import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: "", 
    image: ""
  }

  changeHandler = (e) => {
    e.persist()
    this.setState(()=>({
      [e.target.name]: e.target.value
    }))
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.submit(this.state)
    this.setState(()=>({
      name: "", 
      image: ""
    }))
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.submitHandler}>
          <h3>Create a toy!</h3>
          <input type="text" value={this.state.name} onChange={this.changeHandler} name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" value={this.state.image} onChange={this.changeHandler} name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
