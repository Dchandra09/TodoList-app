// manage-tasks.js

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/todo/todolist'); // Updated API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function displayTasks(tasks) {
    const taskTableBody = document.querySelector('#task-table tbody');
    taskTableBody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.todoTitle}</td>
            <td>${task.todoDescription}</td>
            <td>${task.todoDate}</td>
            <td>${task.isComplete ? 'Yes' : 'No'}</td>
            <td>
                <button class="edit-button" data-taskid="${task.id}">Edit</button>
                <button class="delete-button" data-taskid="${task.id}">Delete</button>
            </td>
        `;

        // Add event listeners for edit and delete buttons
        const editButton = row.querySelector('.edit-button');
        const deleteButton = row.querySelector('.delete-button');

        editButton.addEventListener('click', () => {
            // Implement your edit task functionality here, using the task ID
            const taskId = editButton.getAttribute('data-taskid');
            console.log(taskId);
            // Redirect to the edit task page or show a modal, etc.
            // Example: window.location.href = `edit-task.html?id=${taskId}`;
        });

        deleteButton.addEventListener('click', async () => {
            // Get the task ID from the data-taskid attribute
            const taskId = deleteButton.getAttribute('data-taskid');
            console.log(taskId);
            
            // Confirm the deletion with the user (optional)
            const confirmed = confirm('Are you sure you want to delete this task?');
            
            if (confirmed) {
                try {
                    // Send a DELETE request to the API to delete the task
                    const response = await fetch(`http://localhost:8080/api/v1/todo/deleteitem/${taskId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
        
                    if (response.status === 204) {
                        // Task deleted successfully, remove the row from the table
                        row.remove();
                    } else {
                        console.error('Failed to delete task:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error deleting task:', error);
                }
            }
        });
        

        taskTableBody.appendChild(row);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    const homeButton = document.getElementById('home-button');
    homeButton.addEventListener('click', () => {
        // Navigate back to the index page
        window.location.href = 'index.html';
    });
});


