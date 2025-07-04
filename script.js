let currentFilter = 'all'; 

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    createTaskElement(taskText, false);
    saveTasks();
    taskInput.value = "";
}

function createTaskElement(taskText, isCompleted) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = isCompleted;

    const span = document.createElement('span');
    span.textContent = taskText;

    if (isCompleted) {
        span.classList.add('completed');
        li.classList.add('completed-task');
    }

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            span.classList.add('completed');
            li.classList.add('completed-task');
        } else {
            span.classList.remove('completed');
            li.classList.remove('completed-task');
        }
        saveTasks();
        filterTasks(currentFilter);
    });

    li.appendChild(checkbox);
    li.appendChild(span);

    document.getElementById('taskList').appendChild(li);
}

function filterTasks(filter) {
    currentFilter = filter;
    const tasks = document.querySelectorAll('#taskList li');

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed-task');

        if (filter === 'all') {
            task.style.display = 'flex';
        } else if (filter === 'active' && isCompleted) {
            task.style.display = 'none';
        } else if (filter === 'completed' && !isCompleted) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });
}

function clearCompleted() {
    const tasks = document.querySelectorAll('#taskList li.completed-task');
    tasks.forEach(task => task.remove());
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const span = li.querySelector('span').textContent;
        const isCompleted = li.classList.contains('completed-task');
        tasks.push({ text: span, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => createTaskElement(task.text, task.completed));
}
