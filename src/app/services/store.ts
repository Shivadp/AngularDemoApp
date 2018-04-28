export class Todo {
	completed: Boolean;
    editing: Boolean;
   
	private _title: String;
	get title() {
		return this._title;
	}
	set title(value: String) {
		this._title = value.trim();
    }
    
    private _priority: String;
	get priority() {
		return this._priority;
	}
	set priority(value: String) {
		this._priority = value;
    }
    
    private _dueDate: Date;
	get dueDate() {
		return this._dueDate;
	}
	set dueDate(value: Date) {
		this._dueDate = value;
	}

	constructor(title: String, ipPriority: String, ipDate: Date) {
		this.completed = false;
		this.editing = false;
        this.title = title.trim();
        this.priority = ipPriority;
        this.dueDate = ipDate;
	}
}

export class TodoStore {
    todos: Array<Todo>;
    predicate: string;
    reverse: boolean;

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
		// Normalize back into classes
		this.todos = persistedTodos.map( (todo: {_title: String, _priority:String, _dueDate: Date, completed: Boolean}) => {
			let ret = new Todo(todo._title, todo._priority, todo._dueDate);
			ret.completed = todo.completed;
			return ret;
		});
	}

	updateStore() {
        localStorage.setItem('predicate', this.predicate);
        localStorage['reverse'] = this.reverse;
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

	private getWithCompleted(completed: Boolean) {
		return this.todos.filter((todo: Todo) => todo.completed === completed);
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed: Boolean) {
		this.todos.forEach((t: Todo) => t.completed = completed);
		this.updateStore();
	}

	removeCompleted() {
		this.todos = this.getWithCompleted(false);
		this.updateStore();
	}

	getRemaining() {
		return this.getWithCompleted(false);
	}

	getCompleted() {
		return this.getWithCompleted(true);
	}

	toggleCompletion(todo: Todo) {
		todo.completed = !todo.completed;
		this.updateStore();
	}

	remove(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
		this.updateStore();
	}

	add(title: String, priority: String, inputdate: Date) {
        
        //this.todos.push(new Todo(title));
        this.todos.push(new Todo(title,priority,inputdate));
		this.updateStore();
	}
}
