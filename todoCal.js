today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
var datedetails
var todoList
var todosCount

var counter = 0

function currentTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("currenttime").textContent = "Time : " + hour + " : " + min + " : " + sec;
    var t = setTimeout(function() {
        currentTime()
    }, 1000);
}

function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    } else {
        return k;
    }
}

currentTime();

document.getElementById("calendar-body").addEventListener("click", function(event) {
    if (event.target.id !== "") {
        document.getElementById("ondate").textContent = "DATE : " + event.target.id + "/" + (currentMonth + 1) + "/" + currentYear
    }
    let todoItemsContainer = document.getElementById("todoItemsContainer");
    todoItemsContainer.textContent = ""
    window.datedetails = event.target.id + currentMonth + currentYear
    var Date = window.datedetails
    console.log(typeof(window.datedetails))

    window.todoList = getfromlocalstorage()
    window.todosCount = todoList.length;

    let addTodoButton = document.getElementById("addTodoButton");
    let saveTodoButton = document.getElementById("saveTodoButton");



    function getfromlocalstorage() {
        console.log(window.datedetails)
        let stringifiedTodoList = localStorage.getItem(datedetails);
        console.log(stringifiedTodoList)
        let parsedTodoList = JSON.parse(stringifiedTodoList);
        if (parsedTodoList === null) {
            return [];
        } else {
            return parsedTodoList;
        }
    }

    saveTodoButton.onclick = function() {
        localStorage.setItem(datedetails, JSON.stringify(todoList));
    };







    function onAddTodo() {
        let userInputElement = document.getElementById("todoUserInput");
        let userInputValue = userInputElement.value;

        if (userInputValue === "") {
            alert("Enter Valid Text");
            return;
        }

        todosCount = todosCount + 1;

        let newTodo = {
            text: userInputValue,
            uniqueNo: todosCount,
            ischecked: false
        };
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
        userInputElement.value = "";
    }

    addTodoButton.onclick = function() {
        onAddTodo();
    };

    function onTodoStatusChange(checkboxId, labelId, todoId) {
        let checkboxElement = document.getElementById(checkboxId);
        let labelElement = document.getElementById(labelId);
        labelElement.classList.toggle("checked");
        let todoobjectIndex = todoList.findIndex(function(eachtodo) {
            let eachTodoId = "todo" + eachtodo.uniqueNo
            if (todoId === eachTodoId) {
                return true
            } else {
                return false
            }
        })
        let todoObject = todoList[todoobjectIndex]
        if (todoObject.ischecked === true) {
            todoObject.ischecked = false
        } else {
            todoObject.ischecked = true
        }

    }

    function onDeleteTodo(todoId) {
        let todoElement = document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement);

        let deleteElementIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        todoList.splice(deleteElementIndex, 1);
    }

    function createAndAppendTodo(todo) {
        let todoId = "todo" + todo.uniqueNo;
        let checkboxId = "checkbox" + todo.uniqueNo;
        let labelId = "label" + todo.uniqueNo;

        let todoElement = document.createElement("li");
        todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
        todoElement.id = todoId;
        todoItemsContainer.appendChild(todoElement);

        let inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.id = checkboxId;
        inputElement.checked = todo.ischecked;

        inputElement.onclick = function() {
            onTodoStatusChange(checkboxId, labelId, todoId);
        };

        inputElement.classList.add("checkbox-input");
        todoElement.appendChild(inputElement);

        let labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container", "d-flex", "flex-row");
        todoElement.appendChild(labelContainer);

        let labelElement = document.createElement("label");
        labelElement.setAttribute("for", checkboxId);
        labelElement.id = labelId;
        labelElement.classList.add("checkbox-label");
        labelElement.textContent = todo.text;
        if (todo.ischecked === true) {
            labelElement.classList.add("checked")
        }

        labelContainer.appendChild(labelElement);

        let deleteIconContainer = document.createElement("div");
        deleteIconContainer.classList.add("delete-icon-container");
        labelContainer.appendChild(deleteIconContainer);

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

        deleteIcon.onclick = function() {
            onDeleteTodo(todoId);
        };

        deleteIconContainer.appendChild(deleteIcon);
    }

    for (let todo of todoList) {
        createAndAppendTodo(todo);
    }



})


months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body"); 

   
    tbl.innerHTML = "";

   
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    
    let date = 1;
    for (let i = 0; i < 6; i++) {
     
        let row = document.createElement("tr");

       
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");

                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } 
                cell.setAttribute("id", date)
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); 
    }

}



function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}