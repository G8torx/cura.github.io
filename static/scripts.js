// Chosing a random number for id
let num = 1000
let id = 0

// Add Enter key functionality for adding notes
let input = document.getElementById("myInput");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        newElement(); // Call the newElement function when Enter is pressed
    }
});

let myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    var editButton = document.createElement("button");
    var pencil = document.createTextNode("✏️");
    var priorityButton = document.createElement('button');
    var priorityIcon = document.createTextNode("🟢")
    var closeButton = document.createElement("button");
    var cross = document.createTextNode("❌");
    priorityButton.setAttribute('title', 'Change priority');
    editButton.setAttribute('title', 'Edit');
    closeButton.setAttribute('title', 'Delete');
    priorityButton.className = 'priority';
    priorityButton.appendChild(priorityIcon);
    editButton.className = "edit";
    editButton.appendChild(pencil);
    closeButton.className = "close";
    closeButton.appendChild(cross);
    li.appendChild(priorityButton);
    li.appendChild(editButton);
    li.appendChild(closeButton);

    myNodelist[i].appendChild(priorityButton);
    myNodelist[i].appendChild(editSpan);
    myNodelist[i].appendChild(closeSpan);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        let item = (div.id);
        localStorage.removeItem(item);
        div.remove();
    }
}

let editItem = document.getElementsByClassName('edit');
for (let z = 0; z < editItem.length; z++) {
    editItem[z].onclick = function() {
        let div = this.parentElement;
        let input = div.lastChild;
        let storedId = div.id;
        let storedValue = localStorage.getItem(storedId);
        let newValue = JSON.parse(storedValue);
        let priority = newValue.priority;
        let checked = newValue.checked;
        let text = newValue.text;
        let newText = input.value;
        input.value = text;
        let value = {
            text: newText,
            checked: checked,
            priority: priority
        }

        if (input.style.display === 'block') {
            localStorage.setItem(storedId, JSON.stringify(value));
            div.nodeValue = newText;
            input.style.display = 'none';
            input.readOnly = true;
        } else if (input.style.display === 'none') {
            input.style.display = "block";
            input.readOnly = false;
        }
    }
}

let icon = document.getElementsByClassName("priority");
for (let j = 0; j < icon.length; j++) {
    icon[j].onclick = function() {
        let li = this.parentElement;
        let button = li.firstChild;
        let storedId = li.id;
        let storedValue = localStorage.getItem(storedId);
        let textValue = JSON.parse(storedValue);
        let text = textValue.text;
        let checked = textValue.checked;

        if (button.textContent === '🟢') {
            button.textContent = '🟡';
            localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: '🟡' }));
        } else if (button.textContent === '🟡') {
            button.textContent = '🔴';
            localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: '🔴' }));
        } else if (button.textContent === '🔴') {
            button.textContent = '🟢';
            localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: '🟢' }));
        }
    }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        let storedId = ev.target.id;
        let storedValue = localStorage.getItem(storedId);
        let textValue = JSON.parse(storedValue);
        let text = textValue.text;
        let priorityValue = textValue.priority;

        if (ev.target.className === 'checked') {
            ev.target.classList.remove('checked');
            localStorage.setItem(storedId, JSON.stringify({ text, checked: 'false', priority: priorityValue }));
        } else {
            ev.target.classList.add('checked');
            localStorage.setItem(storedId, JSON.stringify({ text, checked: 'true', priority: priorityValue }));
        }
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    id = Math.floor(Math.random() * num);
    let inputValue = document.getElementById("myInput").value;
    let div = document.createElement('div');
    div.setAttribute('id', 'itemText');
    let t = document.createTextNode(inputValue);
    let input = document.createElement('input');
    input.setAttribute('readonly', 'true');
    input.setAttribute('style', 'display: none;');
    input.className = 'editInput';

    if (localStorage.getItem(id) !== null) {
        alert('Id has already been used');
    } else {
        let li = document.createElement("li");
        li.setAttribute('id', id);
        let item = {
            text: inputValue,
            checked: 'false',
            priority: 'history'
        };
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            localStorage.setItem(id, JSON.stringify(item));
            document.getElementById("myUL").appendChild(li);
            document.getElementById("myInput").value = "";

            let editButton = document.createElement("button");
            let pencil = document.createTextNode("✏️");
            let closeButton = document.createElement("button");
            let cross = document.createTextNode("❌");
            let priorityButton = document.createElement("button");
            let priorityIcon = document.createTextNode('history');
            priorityButton.setAttribute('title', 'Change priority');
            editButton.setAttribute('title', 'Edit');
            closeButton.setAttribute('title', 'Delete');
            priorityButton.className = "priority";
            priorityButton.classList.add('priorityText');
            priorityButton.appendChild(priorityIcon);
            editButton.className = "edit";
            editButton.appendChild(pencil);
            closeButton.className = "close";
            closeButton.appendChild(cross);
            li.appendChild(priorityButton);
            li.appendChild(editButton);
            li.appendChild(closeButton);
            li.appendChild(div);
            div.appendChild(t);
            li.appendChild(input);

            addCloseEventListeners();
            addEditEventListeners();
            addPriorityListeners();
        }
    }
}

function addCloseEventListeners() {
    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            let div = this.parentElement;
            let item = (div.id);
            localStorage.removeItem(item);
            div.remove();
        }
    }
}

function addEditEventListeners() {
    let editItem = document.getElementsByClassName('edit');
    for (let z = 0; z < editItem.length; z++) {
        editItem[z].onclick = function() {
            let li = this.parentElement;
            let div = li.children[3];
            div.style.display = 'none';
            let input = li.lastChild;
            let storedId = li.id;
            let storedValue = localStorage.getItem(storedId);
            let newValue = JSON.parse(storedValue);
            let priority = newValue.priority;
            let checked = newValue.checked;
            let text = newValue.text;
            let newText = input.value;
            input.value = text;
            let value = {
                text: newText,
                checked: checked,
                priority: priority
            }

            input.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    editItem[z].click();
                }
            });

            if (input.style.display === 'block') {
                localStorage.setItem(storedId, JSON.stringify(value));
                div.textContent = newText;
                input.style.display = 'none';
                div.style.display = 'block';
                input.readOnly = true;
            } else if (input.style.display === 'none') {
                input.style.display = "block";
                input.readOnly = false;
                div.style.display = 'none';
            }
        }
    }
}

function addPriorityListeners() {
    let icon = document.getElementsByClassName("priority");
    for (let c = 0; c < icon.length; c++) {
        icon[c].onclick = function() {
            let li = this.parentElement;
            let button = li.firstChild;
            let storedId = li.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let checked = textValue.checked;

            if (button.textContent === 'history') {
                button.textContent = 'math';
                button.style.backgroundColor = '#FFB81C';
                localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: 'math' }));
            } else if (button.textContent === 'math') {
                button.textContent = 'english';
                button.style.backgroundColor = '#38b6ff';
                localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: 'english' }));
            } else if (button.textContent === 'english') {
                button.textContent = 'environmental';
                button.style.backgroundColor = '#4CAF50';
                localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: 'environmental' }));
            } else if (button.textContent === 'environmental') {
                button.textContent = 'sacraments';
                button.style.backgroundColor = '#800080';
                localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: 'sacraments' }));
            } else if (button.textContent === 'sacraments') {
                button.textContent = 'spanish';
                button.style.backgroundColor = '#F06A6A';
                localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: 'spanish' }));
            } else if (button.textContent === 'spanish') {
                button.textContent = 'history';
                button.style.backgroundColor = '#21b972';
                localStorage.setItem(storedId, JSON.stringify({ text, checked, priority: 'history' }));
            }
        }
    }
}
