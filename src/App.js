import React from 'react';
import './App.css';
import { observer } from "mobx-react"

class App extends React.Component {
  createNew(e){
    if(e.which === 13){
      this.props.store.createTodo(e.target.value)
      e.target.value = ""
    }
  }
  filter(e){
    this.props.store.filter = e.target.value
  }
  toggleComplete(todo){
    todo.complete = !todo.complete
  }
  render(){
    const {clearComplete, filter, filteredTodos, deleteField}  = this.props.store

    const todoLis = filteredTodos.map(todo => (
      <p key = {todo.id}>
      <input type = "checkbox" value = {todo.complete} checked = {todo.complete} onChange = {this.toggleComplete.bind(this, todo)}/>
      {todo.value}
      {/* <button>Edit</button> */}
      <button onClick = {() => deleteField(todo.id)}>Delete</button>
      </p>
    ))
    return (
      <div className="App">
        <h1>ToDo</h1>
        <div>
          Add: 
          <input className="create" onKeyPress = {this.createNew.bind(this)}></input>
        </div>
        <div>
          Filter:
          <input className = "filter" value = {filter} onChange = {this.filter.bind(this)}></input>
        </div>
        
        <ul>{todoLis}</ul>
        <button onClick = {clearComplete}>Clear Complete</button>
      </div>
  )}
}

export default observer(App)