import { Component } from '@angular/core';
import {TodoStore, Todo} from './services/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  todoStore: TodoStore;
  todoTask= '';
  todoPriority='';
  todoDueDate;
  predicate= 'title';
  reverse = true;


	constructor(todoStore: TodoStore) {
		this.todoStore = todoStore;
	}

	stopEditing(todo: Todo, editedTitle: string, editedPriority: string, editedDueDate: Date) {
    todo.title = editedTitle;
    todo.priority = editedPriority;
    todo.dueDate = editedDueDate;
    todo.editing = false;
    this.todoStore.updateStore();
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string, editedPriority: string, editedDueDate: Date) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

    todo.title = editedTitle;
    todo.priority = editedPriority;
    todo.dueDate = editedDueDate;
    todo.editing = false;

    this.todoStore.updateStore();
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
   
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo){
		this.todoStore.remove(todo);
  }
  
  order(val: string){
    console.log(val)
    this.reverse = (this.predicate === val) ? !this.reverse : false;
    this.predicate = val;
    this.todoStore.predicate = this.predicate;
    this.todoStore.reverse = this.reverse;
    this.todoStore.updateStore();
  }

	addTodo() {
	console.log(this.todoDueDate);
    if(this.todoTask.trim().length && typeof this.todoDueDate != "undefined"){
      this.todoStore.add(this.todoTask, this.todoPriority, this.todoDueDate);
      this.todoTask = '';
      this.todoPriority='';
      this.todoDueDate='';
    }

	}
}
