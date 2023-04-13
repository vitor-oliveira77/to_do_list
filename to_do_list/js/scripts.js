// Seleção de elementos 

const todoForm = document.querySelector("#todo-form"); 
const todoInput = document.querySelector("#todo-input"); 
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const filterBtn = document.querySelector("#filter-select"); 
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");


let oldInputValue;
// Funções  

const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo") 

    const todoTitle = document.createElement("h3") 
    todoTitle.innerText = text 
    todo.appendChild(todoTitle) 

    const doneBtn = document.createElement("button") 
    doneBtn.classList.add("finish-todo") 
    doneBtn.innerHTML ='<i class="fa-solid fa-check"></i>' 
    todo.appendChild(doneBtn) 

    const editBtn = document.createElement("button") 
    editBtn.classList.add("edit-todo") 
    editBtn.innerHTML ='<i class="fa-solid fa-pen"></i>' 
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button") 
    deleteBtn.classList.add("remove-todo") 
    deleteBtn.innerHTML ='<i class="fa-solid fa-xmark"></i>' 
    todo.appendChild(deleteBtn) 

    todoList.appendChild(todo); 

    todoInput.value = ""; 
    todoInput.focus();  

};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
} 

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => { 

        let todoTitle = todo.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
} 

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");
  
    switch (filterValue) {
      case "all":
        todos.forEach((todo) => (todo.style.display = "flex"));
  
        break;
  
      case "done":
        todos.forEach((todo) =>
          todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );
  
        break;
  
      case "todo":
        todos.forEach((todo) =>
          !todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );
  
        break;
  
      default:
        break;
    }
};  

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
  
      todo.style.display = "flex";
  
      console.log(todoTitle);
  
      if (!todoTitle.includes(search)) {
        todo.style.display = "none";
      }
    });
};
// Eventos 

todoForm.addEventListener("submit", (e) => { // função anõnima
    e.preventDefault();
    
    const inputValue = todoInput.value;

    if (inputValue) {
        console.log(inputValue); 
        saveTodo(inputValue)
    }
}); 

document.addEventListener("click", (e) => { // ao clicar no elemento
    const targetEl = e.target  // elemento acessado 
    const parentEl = targetEl.closest("div"); 
    let todoTitle; 

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        console.log("Clicou para finalizar"); 
        parentEl.classList.toggle("done"); // efeito liga e desliga
    } 

    if (targetEl.classList.contains("remove-todo")) { 
        parentEl.remove();
    } 

    if (targetEl.classList.contains("edit-todo")) { 
        toggleForms();

        editInput.value = todoTitle 
        oldInputValue = todoTitle
    } 
}); 

cancelEditBtn.addEventListener("click", (e) => { 
    e.preventDefault(); 

    toggleForms();
});

editForm.addEventListener("submit", (e) => { 
    e.preventDefault(); 

    const editInputValue = editInput.value 

    if (editInputValue) {
        updateTodo(editInputValue);
    } 

    toggleForms();
}); 

  filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;
  
    filterTodos(filterValue);
}); 

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
  
    getSearchedTodos(search);
});
  
eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    searchInput.value = "";
  
    searchInput.dispatchEvent(new Event("keyup"));
});
  