// 할 일 추가하기
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoListHtml = document.getElementById('todo-list');

// 입력된 할 일 저장하기
function submitTodo(event) {
    event.preventDefault();
    const todo = todoInput.value;
    todoInput.value = ''
    viewTodo(todo);
}

function viewTodo(todo) {
    const divTodo = document.createElement("div");
    divTodo.id = "todo-lists";
    const inputTodo = document.createElement("input");
    inputTodo.type = "checkbox";
    const pTodo = document.createElement("p");
    pTodo.innerHTML = todo;
    const buttonTodo = document.createElement("button");
    buttonTodo.id = "delBtn";
    buttonTodo.innerHTML = "x";
    divTodo.appendChild(inputTodo);
    divTodo.appendChild(pTodo);
    divTodo.appendChild(buttonTodo);
    todoListHtml.appendChild(divTodo);

    buttonTodo.addEventListener("click", delTodo);
    inputTodo.addEventListener('change', function(event) {
        if(event.target.checked) {
            pTodo.classList.add("checked");
        } else {
            pTodo.classList.remove("checked");
        }
    });
}

// 삭제 버튼 구현
function delTodo(event) {
    const delTodoList = event.target.parentElement;
    delTodoList.remove();
}

// 줄 긋기

todoForm.addEventListener("submit", submitTodo);