class TodoList {
    constructor() {
        this.editingIndex = -1;
        this.addButton = document.getElementById('addButton');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.activityLog = document.getElementById('activityLog'); 

        this.addButton.addEventListener('click', () => this.addOrUpdateTask());
        this.todoList.addEventListener('click', (e) => {
            const action = e.target.classList.contains('removeButton') ? 'remove' :
                           e.target.classList.contains('editButton') ? 'edit' :
                           e.target.classList.contains('doneButton') ? 'done' : null;
            if (action) this[action + 'Task'](e);
        });
    }

   
    logActivity(message) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        this.activityLog.appendChild(li);
    }

    addOrUpdateTask() {
        const taskText = this.todoInput.value.trim();
        if (taskText) {
            if (this.editingIndex === -1) {
                this.addTask(taskText);
                this.logActivity(`Added task: "${taskText}"`); 
            } else {
                this.updateTask(taskText);
                this.logActivity(`Updated task to: "${taskText}"`); 
            }
            this.todoInput.value = '';
        }
    }

    addTask(taskText) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item todo-item';
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="timestamp" style="display: block; margin-top: 0.5rem; color: gray;">
                Date Added: ${new Date().toLocaleString()}
            </span>
            <div style="margin-top: 0.5rem;">
                <button class="btn btn-success btn-sm doneButton">Done</button>
                <button class="btn btn-warning btn-sm editButton">Edit</button>
                <button class="btn btn-danger btn-sm removeButton">Remove</button>
            </div>
        `;
        this.todoList.appendChild(listItem);
    }

    doneTask(event) {
        const taskItem = event.target.closest('.todo-item');
        const taskText = taskItem.querySelector('.task-text');
        taskText.classList.toggle('completed');

        const buttons = taskItem.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);

        this.logActivity(`Marked task as done: "${taskText.textContent}"`); 
    }

    updateTask(taskText) {
        this.todoList.children[this.editingIndex]
            .querySelector('.task-text').textContent = taskText;
        this.resetEditing();
    }

    removeTask(event) {
        const taskItem = event.target.closest('.todo-item');
        const taskText = taskItem.querySelector('.task-text').textContent;

        this.todoList.removeChild(taskItem);
        this.logActivity(`Removed task: "${taskText}"`); 
    }

    editTask(event) {
        const taskItem = event.target.closest('.todo-item');
        this.todoInput.value = taskItem.querySelector('.task-text').textContent;
        this.editingIndex = Array.from(this.todoList.children).indexOf(taskItem);
        this.addButton.textContent = 'Update';

        this.logActivity(`Editing task: "${this.todoInput.value}"`); G
    }

    resetEditing() {
        this.editingIndex = -1;
        this.addButton.textContent = 'Add';
    }
}

document.addEventListener('DOMContentLoaded', () => new TodoList());