import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

const initialState ={
  todos:[],
  errorMessage:'',
  successMessage:'',
  form:'',
  displayCompleted: true,
}

export default class App extends React.Component {
  state = initialState
  
  getTodo =()=>{
    axios.get(URL)
    .then(res=>{
      // debugger
      this.setState({
        ...this.state,
        todos:res.data.data,
        successMessage:res.data.message
      })
    })
    .catch(this.setResponseError)
  }

  resetForm =()=>{
    this.setState({
      ...this.state,
      form:''
    })
  }
  setResponseError =err =>{
    this.setState({
      ...this.state,
      errorMessage:err.response.data.message
    })
  }

  newTodo=()=>{
    const newTask = {
      name:this.state.form
    }

    axios.post(URL,newTask)
    .then(res=>{
      // debugger
      this.setState({
        ...this.state,
        todos:this.state.todos.concat(res.data.data)
      })
      this.resetForm()
    })
    .catch(this.setResponseError)
  }

  onSubmit =evt=>{
    evt.preventDefault()
    this.newTodo()
  }

  onChange = evt=>{
    const {value} = evt.target
    // debugger
    this.setState({
      ...this.state,
      form:value,
    })
    
  }

  toggleComplete =(id)=>{
    axios.patch(`${URL}/${id}`)
    .then(res=>{
    // debugger
      this.setState({
      
      ...this.state,
      todos:this.state.todos.map(todo=>todo.id === id? res.data.data : todo)
    })
    })
    .catch(this.setResponseError)
  }
  toggleDisplay = ()=>{
    this.setState({
      ...this.state,
      displayCompleted:!this.state.displayCompleted
    })
  }

  componentDidMount(){
    this.getTodo()
  }

  render() {
    return <div>
      <h1>ToDo:</h1>
      {this.state.errorMessage}
      {this.state.successMessage}
      <TodoList
      todos ={this.state.todos}
      displayCompleted={this.state.displayCompleted}
      toggleComplete = {this.toggleComplete}
      
      />
      <Form 
      onChange={this.onChange} 
      onSubmit={this.onSubmit}
      toggleDisplay = {this.toggleDisplay}
      Form = {this.state.form}
      displayCompleted = {this.state.displayCompleted}
      />
    
    </div>
  }
}
