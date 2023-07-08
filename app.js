
// Get references to the HTML elements
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

let todos = [];

// Function to render the todo list on the web page
function renderTodoList() {
  todoList.innerHTML = '';

  // Create and append list items for each todo item
  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" id="checkbox_${index}" ${todo.completed ? 'checked' : ''}>
      <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <button class="editButton" data-index="${index}">Edit</button>
      <button class="deleteButton" data-index="${index}">Delete</button>
    `;
    todoList.appendChild(listItem);
  });
}
function handleKeyPress(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          addTodo();
        }
      }
      
      // Event listener for key press on the input field
      todoInput.addEventListener('keypress', handleKeyPress);
    

// Function to save the todo list to localStorage
function saveTodoList() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load the todo list from localStorage
function loadTodoList() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodoList();
  }
}

// Function to add a new todo item
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText === '') {
    alert('Please enter a todo item.');
    return;
  }

  const newTodo = {
    text: todoText,
    completed: false
  };

  todos.push(newTodo);

  // Clear the input field
  todoInput.value = '';

  // Render the updated todo list
  renderTodoList();

  // Save the todo list to localStorage
  saveTodoList();
}

// Function to toggle the completed status of a todo item
function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  renderTodoList();
  saveTodoList();
}

// Function to edit the text of a todo item
function editTodoItem(index) {
  const editText = prompt('Edit todo item:', todos[index].text);

  // Validate the input
  if (editText === null || editText.trim() === '') {
    alert('Please enter a valid todo item.');
    return;
  }

  todos[index].text = editText.trim();
  renderTodoList();
  saveTodoList();
}

// Function to delete a todo item
function deleteTodoItem(index) {
  todos.splice(index, 1);
  renderTodoList();
  saveTodoList();
}

// Event listener for the add button
addButton.addEventListener('click', addTodo);

// Event listener for checkbox changes (to toggle completed status)
todoList.addEventListener('change', (event) => {
  const checkboxId = event.target.id;
  const index = checkboxId.split('_')[1];
  toggleCompleted(index);
});

// Event listener for edit button clicks
todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('editButton')) {
    const index = event.target.getAttribute('data-index');
    editTodoItem(index);
  }
});

// Event listener for delete button clicks
todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('deleteButton')) {
    const index = event.target.getAttribute('data-index');
    deleteTodoItem(index);
  }
});

// Load the todo list from localStorage on page load
window.addEventListener('DOMContentLoaded', loadTodoList);
