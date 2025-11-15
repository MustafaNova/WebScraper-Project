import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo',
  imports: [UpperCasePipe, CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  @Input() todo = {todo: "Default", done: false}
  @Input() index = 0
  @Input() isFirst = false
  @Input() isLast = false

  @Output() todoIndex = new EventEmitter<number>()
  @Output() deleteIndex = new EventEmitter<number>()

  toggleToDo(){ 
    this.todoIndex.emit(this.index)
  }

  deleteToDo(){
    this.deleteIndex.emit(this.index)
  }

}
