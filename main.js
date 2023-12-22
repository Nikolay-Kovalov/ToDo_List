const root = document.getElementById('root');
const toDoList = document.getElementById('toDoList');
const addTaskBtn = document.getElementById('addTaskBtn');
const toDoInput = document.getElementById('toDoInput');

addTaskBtn.addEventListener('click', addTask);
toDoList.addEventListener('click', deleteTask);
toDoList.addEventListener('click', openEditWindow);

let i = 0;

function addTask() {
    const text = toDoInput.value;
    if (!text) {
       showWorningWindow()
        return
    }
    const li = document.createElement('li');

    li.innerHTML = `<p data-id = ${++i} class="text">${text}</p>
    <div class="taskBtnWrapper">
    <button class="deleteBtn">Delete</button>
    <button class="editBtn">Edit</button>
    </div>`

    toDoList.appendChild(li)
    toDoInput.value = "";
}

function deleteTask(evt) {
    if (evt.target.classList.contains("deleteBtn")) {
        evt.target.closest('li').remove()
    }
}

let textId = null;

function openEditWindow(evt) {
    const textToEdit = evt.target.closest('li').firstElementChild.textContent
    textId = evt.target.closest('li').firstElementChild.dataset.id

    if (evt.target.classList.contains("editBtn")) {
        const backDrop = document.createElement('div');
        backDrop.classList.add('backdrop');


        const modal = document.createElement('div');
        modal.innerHTML = `
    <button class="modalEditBtn">Edit</button>
`
        const textArea = document.createElement('textarea');
        textArea.cols = "30";
        textArea.rows = "10";
        textArea.classList.add('textarea');
        textArea.textContent = textToEdit;
        modal.prepend(textArea)
        modal.classList.add('modal');

        backDrop.appendChild(modal);
        document.body.appendChild(backDrop);
        document.querySelector(".modalEditBtn").addEventListener('click', editTask)
        document.body.classList.add('open');
        backDrop.addEventListener('click', onBackdropClick)
        document.body.addEventListener('keydown', onEscPress)
    }

}

function editTask() {
    document.querySelector(`[data-id = "${textId}"`).textContent = document.querySelector('.textarea').value
    document.querySelector('.backdrop').remove()
}

function onBackdropClick(evt) {

    if (evt.target.classList.contains('backdrop')) {
        document.querySelector('.backdrop').remove()
    }
}

function onEscPress(evt) {
    if (evt.code === "Escape") {
        document.querySelector('.backdrop').remove()
        document.body.removeEventListener('keydown', onEscPress)
}
}


function showWorningWindow(evt) {
    const backDrop = document.createElement('div');
        backDrop.classList.add('backdrop');


        const modal = document.createElement('div');
    modal.innerHTML = `
        <p class="warningText">
  The input field shouldn't be empty!<br> Please, enter at least one character!
</p>
<button class="okWarningBtn">Ok</button>
` 
        modal.classList.add('modal', 'warning');

        backDrop.appendChild(modal);
        document.body.appendChild(backDrop);
    document.body.classList.add('open');
    document.querySelector('.okWarningBtn').addEventListener('click', closeWarningWindow)
    
         backDrop.addEventListener('click', onBackdropClick)
        document.body.addEventListener('keydown', onEscPress)
}
    
function closeWarningWindow() {
        document.querySelector('.backdrop').remove()
}




