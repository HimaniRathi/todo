import {decorate, autorun, observable, computed} from 'mobx';

class ToDo{
    constructor(value){
        this.value = value
        this.id = Date.now()
        this.complete= false
    }
}

class ToDoStore{
    todos = []
    filter = ""
    get filteredTodos(){
        var matchesFilter = new RegExp(this.filter, "i")
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
    }

    createTodo(value){
        this.todos.push(new ToDo(value))
    }
    clearComplete = () => {
        const incompleteTodo = this.todos.filter(todo => !todo.complete)
        this.todos.replace(incompleteTodo)
    }
    deleteField = (id) => {
        const temp = this.todos.filter(todo => todo.id !== id)
        this.todos.replace(temp)
    }
}

decorate(ToDo, {
    value: observable,
    id: observable,
    complete: observable,
})

decorate(ToDoStore, {
    todos: observable,
    filter: observable,
    filteredTodos: computed
})

var store = window.store = new ToDoStore()

export default store

autorun(() => {
    console.log(store.filter)
    console.log(store.todos)
})