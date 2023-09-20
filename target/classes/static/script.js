//const baseUrl = 'http://localhost:8080';


// Function to format a date string to "dd-mm-yyyy" format
function formatDateString(dateString) {
    // Try parsing the date with different date formats
    const possibleFormats = ["yyyy-mm-dd", "dd-mm-yyyy", "mm-dd-yyyy"];
    for (const format of possibleFormats) {
        const date = new Date(dateString.replace(/-/g, '/'));
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${day}-${month}-${year}`;
        if (!isNaN(date) && formattedDate !== "NaN-NaN-NaN") {
            return formattedDate;
        }
    }
    // If none of the formats match, return the original string
    console.log("date format:"+ dateString)
    return dateString;
    
}


// Function to send a POST request to add a new todo item
async function addTodo() {

    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const isComplete = document.getElementById("completed").checked;

    // Get the value of the date input field
    const date = document.getElementById("todo-date").value;

    // Format the date using the universal format function
    const formattedDate = formatDateString(date);

    // Log the formatted date to the console
    console.log("Todo Date (Formatted):", formattedDate);

    // Log the values to the console
    console.log("Todo Title:", title);
    console.log("Todo Description:", description);
    console.log("Is Complete:", isComplete);
    console.log("Todo Date:", formattedDate);


    const response = await fetch('http://localhost:8080/api/v1/todo/additem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            todoTitle: title,
            todoDescription: description,
            isComplete: isComplete,
            todoDate: formattedDate,
        }),
    });

    if (response.status === 201) {
        // If the POST request is successful, display a success message
        const todoItem = await response.json();
        const todoList = document.getElementById('todo-list');
        const newTodo = document.createElement('div');
        newTodo.className = 'todo-item';
        newTodo.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Due Date: ${formattedDate}</p>
            <p>Completed: ${todoItem.isComplete ? 'Yes' : 'No'}</p>
        `;
        todoList.appendChild(newTodo);

        // Clear the form inputs
        document.getElementById('todo-title').value = '';
        document.getElementById('todo-description').value = '';
        document.getElementById('completed').checked = false;
        document.getElementById('todo-date').value = '';

        // Scroll to the newly added todo item
        newTodo.scrollIntoView({ behavior: 'smooth' });
    } 
    else 
    {
        // If the POST request fails, display an error message
        alert('Failed to add the todo item. Please try again.');
    }
}

// Attach the addTodo function to the button click event
document.getElementById('add-todo-button').addEventListener('click', addTodo);
