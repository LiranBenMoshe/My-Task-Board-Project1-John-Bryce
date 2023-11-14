displayTasks();

// Saving new task:
function save() {

    // Take DOM elements:
    const descriptionBox = document.getElementById("descriptionBox");
    const timeBox = document.getElementById("timeBox");

    // Create task object:
    const description = descriptionBox.value;
    const time = timeBox.value;
    const task = { description, time };

    // Take data from storage: 
    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];

    // Add new task:
    tasks.push(task);

    // Save back: 
    json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);

    // Display the tasks:
    displayTasks();

    // Prevent the form from auto refresh after submit:
    event.preventDefault();

    descriptionBox.value = ""
    timeBox.value = ""
}

function displayTasks() {

    // Take data from storage: 
    let json = localStorage.getItem("tasks");
    const tasks = json ? JSON.parse(json) : [];

    // Aesthetic display of date and time inside the note:
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
        const selectedTime = new Date(tasks[i].time);
        const formattedDate = selectedTime.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        const formattedTime = selectedTime.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,

        });

        // Getting task information into the note:
        html += `           
        <div class="task fade-in">
            <div class="task-description-container">
            <div class="task-description">${tasks[i].description}</div>
            </div>
            <div class="task-time">${formattedDate}<br> ${formattedTime}</div>
            <button class="remove" onclick="remove(${i})">❌</button>
        </div>
        `;
    }

    // Section to put the notes inside:
    const sectionTasks = document.getElementById("sectionTasks");
    sectionTasks.innerHTML = html;
}

// Removing the index the user wanted to delete ("X" button):
function remove(index) {
    let json = localStorage.getItem("tasks");
    const tasks = JSON.parse(json);

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Making past dates turn off (user can't click the past):
let currentDate = new Date();
let currentDateTime = currentDate.toISOString().slice(0, 16);
document.getElementById('timeBox').min = currentDateTime;
