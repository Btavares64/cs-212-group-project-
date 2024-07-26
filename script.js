//This prompts the user to enter their name
function promptUser() {
    const username = prompt("Please enter your name.");
    if (username) {
        document.getElementById('username').innerText = username;
    }
    
}
//function for calculating the percentage
function CalculateTaskPercentage() {
    const tasks = document.querySelectorAll('#task-list li');
    const completedTasks = document.querySelectorAll('#task-list li input[type="checkbox"]:checked');

    const totalTasks = tasks.length;
    const completedCount = completedTasks.length;

    const percentage = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
    document.getElementById('task-percentage').textContent = percentage;
}



//this function will be used to create new tasks
function NewTask(){
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

if (taskText !== '') {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = CalculateTaskPercentage;

    const label = document.createElement('label');
    label.textContent = taskText;

   
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteTask(listItem);
    };

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
    taskInput.value = '';

    CalculateTaskPercentage();
 }
 else {
    alert('Please enter task')
 
}
}

//Delete a task
function deleteTask(taskItem) {
    const taskList = document.getElementById('task-list');
    taskList.removeChild(taskItem);
    CalculateTaskPercentage();
}

// this is for the login page :()
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const usernameInput = document.getElementById('username-input').value.trim();
    const passwordInput = document.getElementById('password-input').value.trim();

    // this is where the single user and passcode are stored
    const validUsername = "user";
    const validPassword = "password";

    if (usernameInput === validUsername && passwordInput === validPassword) {
         window.location.href = 'index.html'
    } else {
        alert("Invalid username or password.");
    }
});


