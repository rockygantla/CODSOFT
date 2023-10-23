
      document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
        addDeleteListeners();
    }

    function addDeleteListeners() {
        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
        });
    }

    addTaskButton.addEventListener("click", () => {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            saveTasks();
            taskInput.value = "";
            renderTasks();
        }
    });

    renderTasks();
});