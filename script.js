// VARIABLES
let addBtn = document.querySelector('.formTodo');
let toDolist = document.querySelector('.to-do');
let doneList = document.querySelector('.done');
let input = document.querySelector('.inpt');
let contentOfTemplate = document.querySelector('#task-template').content;
let itemLi = contentOfTemplate.querySelector('.todo'); // buttons,lists,input

let bar1 = document.querySelector('.water');
let bar2 = document.querySelector('.acid'); // Progress bars

// Array for storing data
let array = [];

extractFromLocalStorage();
// FUNCTIONS
// Function add to array objects

if (document.querySelectorAll('.done>li')) {
    let liDone = document.querySelectorAll('.done>li>input');

    for (let i = 0; i < liDone.length; i++) {
        liDone[i].setAttribute('checked', 'true');

        console.log(liDone[i]);
    }
}


function addtoArr(obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            return;
        }
    }
    array.push(obj);
    console.log(array);
}
// Deleting from array
function delFromArr(obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].id === obj) {

        }
    }
}

// Saving to LocalStorage
function savingToLocalStorage(arr) {
    let json = JSON.stringify(arr);
    localStorage.setItem('data', json);
}

// Checking Progress Bar
function checkingProgressBar() {
    if (toDolist.children.length === 0) {
        bar1.style.height = '0%';
    }
    if (doneList.children.length === 0) {
        bar2.style.height = '0%';
    }
    bar1.style.height = (toDolist.children.length / (toDolist.children.length + doneList.children.length)) * 100 + '%';
    bar2.style.height = (doneList.children.length / (toDolist.children.length + doneList.children.length)) * 100 + '%';
};
// Extracting from LocalStorage
function extractFromLocalStorage() {
    if (localStorage.length > 0) {
        let json = JSON.parse(localStorage.getItem('data'));
        array = json;
    };
    for (var i = 0; i < array.length; i++) {
        if (array[i].status === false) {
            ///
            ////
            let itemToAdd = itemLi.cloneNode(true);
            let itemToAddDescription = itemToAdd.querySelector('span');
            itemToAddDescription.textContent = array[i].name;
            itemToAdd.id = array[i].id;
            toDolist.appendChild(itemToAdd);
        } else {
            let itemToAdd = itemLi.cloneNode(true);
            let itemToAddDescription = itemToAdd.querySelector('span');
            itemToAddDescription.textContent = array[i].name;
            itemToAdd.id = array[i].id;

            doneList.appendChild(itemToAdd);
        }
    };
}

// IN GLOBAL
if (document.querySelector('li')) {
    // DELETING THE ITEMS
    let deleteBtns = document.querySelectorAll('.delete');

    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function(e) {
            array.forEach(function(item, i) {
                if (+e.target.parentNode.id === item.id) {
                    array.splice(i, 1);
                }
            })

            deleteBtns[i].parentNode.remove();
            savingToLocalStorage(array); // HERE!
            checkingProgressBar();
        })

    }
    // CHANGING THE SIDE
    let changeBtns = document.querySelectorAll('.todo-list-input');
    for (let i = 0; i < changeBtns.length; i++) {
        changeBtns[i].addEventListener('click', function(e) {
            if (changeBtns[i].checked === true) {
                doneList.appendChild(changeBtns[i].parentNode);
                array.forEach(function(item, i) {
                    if (+e.target.parentNode.id === item.id) {

                        item.status = true;
                        savingToLocalStorage(array);
                    }
                })
            } else {
                toDolist.appendChild(changeBtns[i].parentNode);
                array.forEach(function(item, i) {
                    if (+e.target.parentNode.id === item.id) {
                        console.log(111);
                        item.status = false;
                        savingToLocalStorage(array);
                    }
                })
            }
            checkingProgressBar();
        });
    }
    savingToLocalStorage(array); // HERE!
}


if (document.querySelector('li')) {

    let spans = document.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++) {

        spans[i].addEventListener('dblclick', function() {
            spans[i].contentEditable = true;
        });
        spans[i].addEventListener('keypress', function(e) {
            if (e.keyCode === 13) {
                spans[i].contentEditable = false;
                console.log(spans[i].parentNode.id);
                console.log(spans[i].textContent);

                array.forEach(function(item, i) {
                    if (+e.target.parentNode.id === +item.id) {

                        item.name = e.target.textContent;
                        console.log(array);

                        return;
                    }
                });

            }
            savingToLocalStorage(array);
        })


    }



}
//localStorage.clear();

//*/*/*/*/*/**/*/*/*/*/*/*/*/*/*/*/*/*/*/*/* */ EVENTS /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
// Add a new item to list 'to-Do' 
addBtn.addEventListener('submit', function(e) {
    e.preventDefault();
    // Creating object
    let obj = {};
    obj.name = input.value;
    obj.status = false;
    obj.id = new Date().getMilliseconds();
    addtoArr(obj);
    let itemToAdd = itemLi.cloneNode(true);
    let itemToAddDescription = itemToAdd.querySelector('span');
    itemToAddDescription.textContent = obj.name;
    itemToAdd.id = obj.id;
    toDolist.appendChild(itemToAdd);
    input.value = '';

    // Delete the items
    let deleteBtn = itemToAdd.querySelector('.delete');
    deleteBtn.addEventListener('click', function() {
        console.log(e);
        console.log(deleteBtn.parentNode.id);
        array.forEach(function(item, i, arr) {
            if (item.id === obj.id) {

                array.splice(i, 1);

            }
        });

        console.log(array);
        deleteBtn.parentNode.remove();

        checkingProgressBar();
        savingToLocalStorage(array);
    })

    // Edit the items

    let span = itemToAdd.querySelector('span');
    itemToAdd.addEventListener('dblclick', function(e) {
        span.setAttribute('contenteditable', 'true');
        span.addEventListener('keypress', function(e) {
            if (e.keyCode === 13) {

                span.setAttribute('contenteditable', 'false');

                array.forEach((item, i) => {
                    if (item.id === +e.target.parentNode.id) {
                        item.name = span.textContent;
                        savingToLocalStorage(array);
                    }

                });
            }
        })
    });
    // Changing the side
    let changeBtn = itemToAdd.querySelector('.todo-list-input');
    changeBtn.addEventListener('click', function() {
        if (changeBtn.checked === true) {
            doneList.appendChild(itemToAdd);
            obj.status = true;

        } else {
            toDolist.appendChild(itemToAdd);
            obj.status = false;

        }
        addtoArr(obj);
        console.log(array);
        checkingProgressBar();
        savingToLocalStorage(array);
    })
    savingToLocalStorage(array);
    checkingProgressBar();
});