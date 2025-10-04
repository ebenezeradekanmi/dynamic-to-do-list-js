// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function
    function addTask() {
        const taskText = taskInput.value.trim(); // get and trim input value

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Task Creation and Removal
        const li = document.createElement('li'); // Create new list item
        li.textContent = taskText; // Set textContent to taskText

        const removeButton = document.createElement('button'); // Create remove button
        removeButton.textContent = "Remove"; // Set button text
        removeButton.className = 'remove-btn'; // Add class name

        // Assign onclick event to remove the task
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to li, then li to task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";
    }

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
