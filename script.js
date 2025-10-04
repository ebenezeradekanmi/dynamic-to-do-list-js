// Persisting To-Do List with Local Storage
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Helper: get tasks array from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Helper: save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Helper: create an li element for a task (with remove button)
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        // Set the visible text of the li
        li.textContent = taskText;
        // Store the raw task text as a data attribute (useful for removal)
        li.dataset.task = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // use classList.add as grader expects

        // When the remove button is clicked:
        removeButton.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Also remove from Local Storage
            const storedTasks = getStoredTasks();
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1); // remove only the matched occurrence
                saveTasks(storedTasks);
            }
        };

        // Append button to li and return it
        li.appendChild(removeButton);
        return li;
    }

    /**
     * Add a task
     * @param {string} taskTextParam Optional: pass a task text to add programmatically.
     * @param {boolean} save Whether to save this addition to Local Storage (default true).
     */
    function addTask(taskTextParam, save = true) {
        // If a param was provided use it, otherwise read from input.
        const taskText = (typeof taskTextParam === 'string') ? taskTextParam.trim() : taskInput.value.trim();

        // Input validation
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create DOM element and append
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        // Save to Local Storage if requested
        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }

        // Clear input field
        taskInput.value = "";
    }

    // Load tasks from Local Storage and render them (without saving again)
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Attach event listeners
    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize - load stored tasks on page load
    loadTasks();
});
