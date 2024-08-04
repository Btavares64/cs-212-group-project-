let tasks = [];

// Function for calculating the percentage
function CalculateTaskPercentage() {
    const tasksListItems = document.querySelectorAll('#task-list li');
    const completedTasks = document.querySelectorAll('#task-list li input[type="checkbox"]:checked');

    const totalTasks = tasksListItems.length;
    const completedCount = completedTasks.length;

    const percentage = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
    document.getElementById('task-percentage').textContent = percentage;
}

// Function to create new tasks
function newTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const dueDate = prompt("Enter due date (MM/DD/YYYY):");
        const priority = prompt("Enter priority (1-5):");

        // Validate the priority input
        if (isNaN(priority) || priority < 1 || priority > 5) {
            alert('Priority must be a number between 1 and 5.');
            return;
        }

        // Validate the due date format (simple check)
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
        taskInput.value = '';
        renderTasks();
    }
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.text} - Due: ${task.dueDate} - Priority: ${task.priority}`;
        taskList.appendChild(taskItem);
    });

    updateTaskPercentage();
}

// Function to update task percentage
function updateTaskPercentage() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const percentage = (completedTasks / tasks.length) * 100 || 0;
    document.getElementById('task-percentage').textContent = Math.round(percentage);
}

// Function to sort tasks based on criteria
function sortTasks() {
    const sortCriteria = document.getElementById('sort-criteria').value;

    tasks.sort((a, b) => {
        if (sortCriteria === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortCriteria === 'priority') {
            // Reverse the comparison for priority to sort highest to lowest
            return b.priority - a.priority;
        }
        return 0;
    });

    renderTasks();
}

// Function to delete a task
function deleteTask(taskItem) {
    const taskList = document.getElementById('task-list');
    taskList.removeChild(taskItem);
    CalculateTaskPercentage();
}



