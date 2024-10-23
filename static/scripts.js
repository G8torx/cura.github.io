// Chosing a random number for id
let num = 1000
let id = 0

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
        let classValue = newValue.class;  // Get class value
        let newText = input.value;
        input.value = text;
        let value = {
            text: newText,
            checked: checked,
            priority: priority,
            class: classValue  // Save class value
        };

        if (input.style.display === 'block'){
            localStorage.setItem(storedId, JSON.stringify(value));
            div.nodeValue = newText;
            input.style.display = 'none';
            input.readOnly = true;
        } else if (input.style.display === 'none'){
            input.style.display = "block";
            input.readOnly = false;
        }
    }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        if (ev.target.className === 'checked'){
            ev.target.classList.remove('checked');
            let storedId = ev.target.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let priorityValue = textValue.priority;
            let classValue = textValue.class;
            let value = {
                text: text,
                checked: 'false',
                priority: priorityValue,
                class: classValue
            };
            localStorage.setItem(storedId, JSON.stringify(value));
        } else {
            ev.target.classList.toggle('checked');
            let storedId = ev.target.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let priorityValue = textValue.priority;
            let classValue = textValue.class;
            let value = {
                text: text,
                checked: 'true',
                priority: priorityValue,
                class: classValue
            };
            localStorage.setItem(storedId, JSON.stringify(value));
        }
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    id = Math.floor(Math.random() * num);
    let inputValue = document.getElementById("myInput").value;
    let classValue = document.getElementById("classOptions").value;  // Get selected class
    let div = document.createElement('div');
    div.setAttribute('id', 'itemText');
    let t = document.createTextNode(inputValue);
    let input = document.createElement('input');
    input.setAttribute('readonly', 'true');
    input.setAttribute('style', 'display: none;');
    input.className = 'editInput';

    if (localStorage.getItem(id) !== null){
        alert('Id has already been used');
    } else {
        let li = document.createElement("li");
        li.setAttribute('id', id);
        let item = {
            text: inputValue,
            checked: 'false',
            priority: 'low',
            class: classValue  // Save the selected class
        };
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            localStorage.setItem(id, JSON.stringify(item));
            document.getElementById("myUL").appendChild(li);
            document.getElementById("myInput").value = "";
            document.getElementById("classOptions").value = "";  // Clear class selection

            let editButton = document.createElement("button");
            let pencil = document.createTextNode("✏️");
            let closeButton = document.createElement("button");
            let cross = document.createTextNode("❌");
            let priorityButton = document.createElement("button");
            let priorityIcon = document.createTextNode('low');
            let classLabel = document.createElement('span');  // Display class
            classLabel.className = "classLabel";
            classLabel.textContent = classValue;

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
            li.appendChild(classLabel);  // Add class label to the note
            li.appendChild(priorityButton);
            li.appendChild(editButton);
            li.appendChild(closeButton);
            li.appendChild(div);
            div.appendChild(t);
            li.appendChild(input);

            for (let j = 0; j < close.length; j++) {
                close[j].onclick = function() {
                    let div = this.parentElement;
                    let item = (div.id);
                    localStorage.removeItem(item);
                    div.remove();
                }
            }

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
                    let classValue = newValue.class;
                    let newText = input.value;
                    input.value = text;
                    let value = {
                        text: newText,
                        checked: checked,
                        priority: priority,
                        class: classValue
                    };

                    input.addEventListener("keypress", function(event) {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            editItem[z].click();
                        }
                    });

                    if (input.style.display === 'block'){
                        localStorage.setItem(storedId, JSON.stringify(value));
                        div.textContent = newText;
                        input.style.display = 'none';
                        div.style.display = 'block';
                        input.readOnly = true;
                    } else if (input.style.display === 'none'){
                        input.style.display = "block";
                        input.readOnly = false;
                        div.style.display = 'none';
                    }
                }
            }
        }
    }
}

// Load the list from localStorage
function loadList() {
    for (let i = 0; i < localStorage.length; i++) {
        let id = localStorage.key(i);
        let storedValue = localStorage.getItem(id);
        if (id === "Title" || id === "Theme" || storedValue === 'Title' || storedValue === 'Theme' || id === "Sort" || storedValue === 'Sort') {
            continue;
        }
        
        let item = JSON.parse(storedValue);
        let text = (item.text);
        let checked = (item.checked);
        let classValue = item.class;  // Get the class for each note

        let li = document.createElement("li");
        let classLabel = document.createElement('span');
        classLabel.className = "classLabel";
        classLabel.textContent = classValue;  // Show class on list item
        li.appendChild(classLabel);

        // Other logic to load the list item and its buttons...
    }
}
