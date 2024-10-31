// Choosing a unique ID using current timestamp
let id = 0;
let inputValue = ""; // Temporary storage for input value

let myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    var closeButton = document.createElement("button");
    var cross = document.createTextNode("❌");
    closeButton.setAttribute('title', 'Delete');
    closeButton.className = "close";
    closeButton.appendChild(cross);
    myNodelist[i].appendChild(closeButton);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        let item = (div.id);
        localStorage.removeItem(item);
        div.remove();
    };
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
if (list) {
    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            let storedId = ev.target.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;

            if (ev.target.classList.contains('checked')) {
                ev.target.classList.remove('checked');
                localStorage.setItem(storedId, JSON.stringify({ ...textValue, checked: 'false' }));
            } else {
                ev.target.classList.add('checked');
                localStorage.setItem(storedId, JSON.stringify({ ...textValue, checked: 'true' }));
            }
        }
    }, false);
}

// Open modal when user tries to add a new note
function newElement() {
    inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
        return;
    }
    document.getElementById("myInput").value = ""; // Clear input field
    document.getElementById("dateModal").style.display = "flex"; // Show modal
}

// Add event listener for the modal confirm button
document.getElementById("confirmDateButton").onclick = function() {
    let dueDateValue = document.getElementById("modalDueDate").value;
    if (!dueDateValue) {
        alert("Please select a due date.");
        return;
    }
    document.getElementById("dateModal").style.display = "none"; // Hide modal

    // Now proceed to add the note to the list
    id = Date.now(); // Unique ID
    let title = document.getElementById("title").value;
    let item = {
        text: inputValue,
        checked: 'false',
        group: title,
        dueDate: dueDateValue
    };

    let li = document.createElement("li");
    li.setAttribute('id', id);
    li.appendChild(document.createTextNode(inputValue));

    // Append due date info with Unicode space around |
    let dueDateText = document.createTextNode(`\u00A0|\u00A0${formatDate(dueDateValue)}`);
    li.appendChild(dueDateText);
    if (isOverdue(dueDateValue)) {
        li.classList.add("overdue");
    }

    // Save to localStorage and add delete button
    localStorage.setItem(id, JSON.stringify(item));
    let closeButton = document.createElement("button");
    closeButton.className = "close";
    closeButton.appendChild(document.createTextNode("❌"));
    closeButton.onclick = function() {
        localStorage.removeItem(id);
        li.remove();
    };
    li.appendChild(closeButton);
    document.getElementById("myUL").appendChild(li);

    // Reset date input in modal
    document.getElementById("modalDueDate").value = "";
};

// Helper function to format the date
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const localDate = new Date(year, month - 1, day); // Month is 0-indexed
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    return localDate.toLocaleDateString('en-US', options);
}

// Adjust the due date check to account for the whole day
function isOverdue(dueDateValue) {
    let dueDate = new Date(dueDateValue);
    dueDate.setHours(23, 59, 59, 999); // Set to the end of the due date day
    return dueDate < new Date();
}

// Event listener for Enter key to add new note
let input = document.getElementById("myInput");
if (input) {
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
}

// Load stored list items on page load
function loadList() {
    for (let i = 0; i < localStorage.length; i++) {
        let id = localStorage.key(i);
        let storedValue = localStorage.getItem(id);
        if (id === "Title" || id === "Theme" || id === "Sort") continue;

        let item = JSON.parse(storedValue);
        let text = item.text;
        let checked = item.checked;
        let dueDate = item.dueDate;

        let li = document.createElement("li");
        let div = document.createElement('div');
        div.setAttribute('id', 'itemText');
        li.setAttribute('id', id);
        if (checked === 'true') {
            li.setAttribute('class', 'checked');
        }
        let t = document.createTextNode(text);
        document.getElementById("myUL").appendChild(li);
        document.getElementById("myInput").value = "";

        let closeButton = document.createElement("button");
        let cross = document.createTextNode("❌");
        closeButton.setAttribute('title', 'Delete');
        closeButton.className = "close";
        closeButton.appendChild(cross);
        li.appendChild(closeButton);
        li.appendChild(div);
        div.appendChild(t);

        // Display formatted due date if set
        if (dueDate) {
            let dueDateText = document.createTextNode(`\u00A0|\u00A0${formatDate(dueDate)}`);
            li.appendChild(dueDateText);
            // Highlight if overdue using the new check
            if (isOverdue(dueDate)) {
                li.classList.add("overdue");
            }
        }

        closeButton.onclick = function() {
            let div = this.parentElement;
            let item = (div.id);
            localStorage.removeItem(item);
            div.remove();
        };
    }
}

// Load theme preference on page load
function loadTheme(){
    let theme = document.getElementById('theme');
    let icon = document.getElementById('toggleButton');
    let value = localStorage.getItem("Theme");

    if (value === "dark") {
        theme.setAttribute('href', 'static/dark.css');
        icon.textContent = 'Light';
        icon.style.color = '#fff';
        icon.setAttribute('title', 'Switch to light mode');
    } else {
        theme.setAttribute('href', 'static/light.css');
        icon.textContent = 'Dark';
        icon.style.color = ''; // Reset to default for "Dark" mode
        icon.setAttribute('title', 'Switch to dark mode');
    }
}

let title = document.getElementById("title");
if (title) {
    title.addEventListener('input', function handleChange(event) {
        localStorage.setItem("Title", event.target.value);
    });
}

// Toggle theme between light and dark
function toggleTheme() {
    let theme = document.getElementById('theme');
    let toggleButton = document.getElementById('toggleButton');

    if (theme.getAttribute('href') === 'static/light.css') {
        theme.setAttribute('href', 'static/dark.css');
        localStorage.setItem('Theme', 'dark');
        toggleButton.textContent = 'Light';
        toggleButton.style.color = '#fff';
        toggleButton.setAttribute('title', 'Switch to light mode');
    } else {
        theme.setAttribute('href', 'static/light.css');
        localStorage.setItem('Theme', 'light');
        toggleButton.textContent = 'Dark';
        toggleButton.style.color = ''; // Resets to default color for "Dark"
        toggleButton.setAttribute('title', 'Switch to dark mode');
    }
}

function sendingMessage() {
    let button = document.getElementById('send-button');
    button.textContent = "Sending";
}

function calculatePercent() {
    let amountChecked = 0;
    let total = 0;
    let percentText = document.getElementById('percent');
    for (let i = 0; i < localStorage.length; i++) {
        let id = localStorage.key(i);
        let storedValue = localStorage.getItem(id);
        if (id === 'Sort' || id === 'Title' || id === 'Theme') {
            continue;
        }
        let newValue = JSON.parse(storedValue);
        total += 1;
        if (newValue.checked === 'true') {
            amountChecked += 1;
        }
    }
    let percent = amountChecked / total * 100;
    if (percentText) {
        percentText.textContent = `%${Math.round(percent)}`;
    }
}

function openCreate() {
    let createButton = document.getElementById('createButton');
    let buttonParent =  document.getElementById('listButtons');
    let toolBar = document.getElementById('toolBar');
    let page = document.getElementById('newTitlePage');
    page.style.display = null;
    createButton.style.display = 'none';
    buttonParent.style.display = 'none';
    toolBar.style.display = 'none';
}

function closeCreate() {
    let page = document.getElementById('newTitlePage');
    let buttonParent =  document.getElementById('listButtons');
    let createButton = document.getElementById('createButton');
    page.style.display = 'none';
    createButton.style.display = null;
    buttonParent.style.display = null;
}

let color_picker = document.getElementById("colorPicker");
let hex_code = document.getElementById("hexCode");
if (color_picker) {
    color_picker.addEventListener("input", function () {
        let code = color_picker.value;
        hex_code.textContent = code;
    }, false);
}

function newList() {
    let textInput = document.getElementById('newTitle');
    let color_picker = document.getElementById("colorPicker");
    let newItem = document.createElement('button');
    let aTag = document.createElement('a');
    let buttonParent =  document.getElementById('listButtons');
    let title = document.getElementById('newTitle').value;
    let text = textInput.value;
    let buttonColor = color_picker.value;
    newItem.textContent = text;
    newItem.className = 'buttonItem';
    newItem.setAttribute('id', 'listButton');
    aTag.setAttribute('href', 'list');
    buttonParent.style.display = 'none';
    buttonParent.appendChild(aTag);
    aTag.appendChild(newItem);
    newItem.style.backgroundColor = buttonColor;
    textInput.value = '';
    let value = {
        group: title,
        buttonColor: buttonColor
    };
    localStorage.setItem(JSON.stringify(value), 'Title');
    localStorage.setItem('Title', title);
}

function loadButtons() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        if (value === 'Title') {
            let storedValue = localStorage.key(i); //Json value
            let textValue = JSON.parse(storedValue);
            let color = textValue.buttonColor;
            let title = textValue.group;
            let div = document.getElementById('listButtons');
            let button = document.createElement('button');
            let aTag = document.createElement('a');
            button.className = 'buttonItem';
            button.setAttribute('id', 'listButton');
            aTag.setAttribute('href', '#');
            button.style.backgroundColor = color;
            button.textContent = title;
            div.appendChild(aTag);
            aTag.appendChild(button);
            let json = {
                group: title,
                buttonColor: color
            };
            localStorage.setItem(JSON.stringify(json), 'Title');
            localStorage.setItem('Title', title);
        }
    }
}

function loadTitle() {
    let titleText = localStorage.getItem("Title");
    document.getElementById("title").value = titleText;
}

const parentButton = document.getElementById('listButtons');
if (parentButton) {
    parentButton.addEventListener('click', (event) => {
        let buttonTitle = event.target.textContent;
        localStorage.setItem('Title', buttonTitle);
        console.log(buttonTitle);
    });
}

function deleteList() {
    let checkButton = document.getElementById('checkButton');
    let listParent = document.getElementById('listButtons');
    let listButton = listParent.getElementsByTagName('button');
    for (let i = 0; i < listButton.length; i++) {
        listButton[i].classList.add('buttonSelect');
        listButton[i].style.backgroundColor = '#34393d';
    }
    checkButton.style.display = null;
}

if (parentButton) {
    parentButton.addEventListener('click', (event) => {
        let button = event.target;
        console.log(button.style.backgroundColor);
        if (button.style.backgroundColor === 'rgb(52, 57, 61)') {
            button.remove();
            console.log(button.textContent);
        }
    });
}

let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2500); // Ensure this waits until fade animation finishes
    }, 500); // Initial delay to start the animation
});
