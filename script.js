document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

let tasks = [];  // This will locally store your tasks

// Initially load any saved tasks from localStorage and render them
function fetchTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Render tasks from the tasks array
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';  // Clear existing tasks
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.text} - Due: ${task.dueDate} - Priority: ${task.priority}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        listItem.appendChild(deleteButton);
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            saveTasks();
            updateTaskPercentage();
        };
        listItem.prepend(checkbox);

        taskList.appendChild(listItem);
    });
    updateTaskPercentage();
}

// Create a new task from user input
function NewTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const dueDate = prompt("Enter due date (MM/DD/YYYY):");
        const priority = prompt("Enter priority (1-5):");
        
        if (isNaN(priority) || priority < 1 || priority > 5) {
            alert('Priority must be a number between 1 and 5.');
            return;
        }

        if (!Date.parse(dueDate)) {
            alert('Please enter a valid date in MM/DD/YYYY format.');
            return;
        }

        const newTask = {
            text: taskText,
            dueDate: dueDate,
            priority: parseInt(priority, 10),
            completed: false
        };

        tasks.push(newTask);
        saveTasks();  // Save tasks to localStorage
        renderTasks();  // Re-render tasks
        taskInput.value = '';  // Clear input
    }
}

// Delete a task based on its index
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();  // Update local storage
    renderTasks();  // Re-render tasks
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update and display the task completion percentage
function updateTaskPercentage() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const percentage = (completedTasks / tasks.length) * 100 || 0;
    document.getElementById('task-percentage').textContent = Math.round(percentage) + '%';
}

// Search and filter tasks
function searchTasks() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchText) ||
        (task.description && task.description.toLowerCase().includes(searchText)) // Ensure description exists before checking
    );
    displayTasks(filteredTasks); // Ensure this function accepts a task list and renders it
}

function displayTasks(tasksToDisplay = tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks
    tasksToDisplay.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.text} - Due: ${task.dueDate} - Priority: ${task.priority}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            saveTasks();
            updateTaskPercentage();
        };
        listItem.prepend(checkbox);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
    updateTaskPercentage();
}




