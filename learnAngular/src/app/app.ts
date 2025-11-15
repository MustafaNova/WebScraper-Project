import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './components/todo/todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Todo, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  todos = [
    {todo: "Lesen", done: false},
    {todo: "Schreiben", done: false},
    {todo: "Einkaufen", done: true}
  ]

  newToDo = ""

  toggleToDo(index: number){
    this.todos[index].done = !this.todos[index].done
  }

  deleteToDo(index: number){
    this.todos.splice(index,1)
  }
  // bei click input leeren, neue todo div erstellen damit und einfügen
  addToDo(){
    if (!this.newToDo) return

    this.todos.push({todo: this.newToDo, done: false})
    this.newToDo = ""


  }

}
