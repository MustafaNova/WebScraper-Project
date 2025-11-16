import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './components/todo/todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Logging } from './logging';



interface todoObj{
  todo: string
  done: boolean
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Todo, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {

  todos: todoObj[] = []

  newToDo: string = ""
  name: string = ""


  constructor(private logging: Logging) {}
 
  toggleToDo(index: number){
    this.todos[index].done = !this.todos[index].done
    localStorage.setItem("todos",JSON.stringify(this.todos))
  }

  logOut(value: any){
    this.logging.logging(value)
  }

  deleteToDo(index: number){
    this.todos.splice(index,1)
    localStorage.setItem("todos",JSON.stringify(this.todos))
  }
  // bei click input leeren, neue todo div erstellen damit und einfügen
  addToDo(){
    if (!this.newToDo) return

    this.todos.push({todo: this.newToDo, done: false})
    localStorage.setItem("todos",JSON.stringify(this.todos))
    this.newToDo = ""

  }

  countOpenToDos(){

    const arr = this.todos.filter(elem => !elem.done)
    return arr
    
  }

  addUsername(username: string){
    if (username == "" ) return
    localStorage.setItem("username", username)
    this.name = username

  }

  ngOnInit(){

    // todos
    const todos = localStorage.getItem("todos")
    if (todos !== null){
      this.todos = JSON.parse(todos)
    }


    // username
    const value = localStorage.getItem("username")
    if (value == null) return
    else this.name = value

  }

}
