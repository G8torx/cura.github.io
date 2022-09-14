
//Chosing a random number for id
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
    localStorage.removeItem(item)
    div.style.display = "none";
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

    if (input.style.display === 'block'){
      localStorage.setItem(storedId, JSON.stringify(value));
      div.nodeValue = newText;
      input.style.display = 'none';
      input.readOnly = true;
    }
    else if (input.style.display === 'none'){
      input.style.display = "block";
      input.readOnly = false;
    }
  }
}

let icon = document.getElementsByClassName("priority");
for (let j = 0; j < icon.length; j++){
  icon[j].onclick = function(){
    let li = this.parentElement;
    let button = li.firstChild;
    if (button.textContent === '🟢'){
      button.textContent = '🟡';
      let storedId = li.id;
      let storedValue = localStorage.getItem(storedId);
      let textValue = JSON.parse(storedValue);
      let text = textValue.text;
      let value = {
        text: text,
        checked: 'false',
        priority: '🟡'
      }
      localStorage.setItem(storedId, JSON.stringify(value));
    }
    else if (button.textContent === '🟡'){
      button.textContent = '🔴';
      let storedId = li.id;
      let storedValue = localStorage.getItem(storedId);
      let textValue = JSON.parse(storedValue);
      let text = textValue.text;
      let value = {
        text: text,
        checked: 'false',
        priority: '🔴'
      }
      localStorage.setItem(storedId, JSON.stringify(value));
    }
    else if (button.textContent === '🔴'){
      button.textContent = '🟢';
      let storedId = li.id;
      let storedValue = localStorage.getItem(storedId);
      let textValue = JSON.parse(storedValue);
      let text = textValue.text;
      let value = {
        text: text,
        checked: 'false',
        priority: '🟢'
      }
      localStorage.setItem(storedId, JSON.stringify(value));
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
      let value = {
        text: text,
        checked: 'false',
        priority: priorityValue
      }
      localStorage.setItem(storedId, JSON.stringify(value));
    }
    else{
      ev.target.classList.toggle('checked');
      let storedId = ev.target.id;
      let storedValue = localStorage.getItem(storedId);
      let textValue = JSON.parse(storedValue);
      let text = textValue.text;
      let priorityValue = textValue.priority;
      let value = {
        text: text,
        checked: 'true',
        priority: priorityValue
      }
      localStorage.setItem(storedId, JSON.stringify(value));
    }
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  id = Math.floor(Math.random() * num);
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  let li = document.createElement("li");
  let input = document.createElement('input');
  input.setAttribute('readonly', 'true');
  input.setAttribute('style', 'display: none;');
  li.setAttribute('id', id);

  if (localStorage.getItem(id) !== null){
    alert('Id has already been used');
  }

  else{
    let li = document.createElement("li");
    li.setAttribute('id', id);
    let item = {
      text: inputValue,
      checked: 'false',
      priority: '🟢'
    };
    if (inputValue === '') {
      alert("You must write something!");
    } 
    else {
      localStorage.setItem(id, JSON.stringify(item));
      document.getElementById("myUL").appendChild(li);
      document.getElementById("myInput").value = "";

      let editButton = document.createElement("button");
      let pencil = document.createTextNode("✏️");
      let closeButton = document.createElement("button");
      let cross = document.createTextNode("❌");
      let priorityButton = document.createElement("button");
      let priorityIcon = document.createTextNode('🟢');
      priorityButton.setAttribute('title', 'Change priority');
      editButton.setAttribute('title', 'Edit');
      closeButton.setAttribute('title', 'Delete');
      priorityButton.className = "priority";
      priorityButton.appendChild(priorityIcon);
      editButton.className = "edit";
      editButton.appendChild(pencil);
      closeButton.className = "close";
      closeButton.appendChild(cross);
      li.appendChild(priorityButton);
      li.appendChild(editButton);
      li.appendChild(closeButton);
      li.appendChild(t);
      li.appendChild(input);
  
      for (let j = 0; j < close.length; j++) {
        close[j].onclick = function() {
          let div = this.parentElement;
          let item = (div.id);
          localStorage.removeItem(item)
          div.style.display = "none";
        }
      }

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

          input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              editItem[z].click();
            }
          });
  
          if (input.style.display === 'block'){
            localStorage.setItem(storedId, JSON.stringify(value));
            div.nodeValue = newText;
            input.style.display = 'none';
            input.readOnly = true;
            location.reload();
          }
          else if (input.style.display === 'none'){
            input.style.display = "block";
            input.readOnly = false;
          }
        }
      }

      for (let c = 0; c < icon.length; c++){
        icon[c].onclick = function(){
          let li = this.parentElement;
          let button = li.firstChild;
          if (button.textContent === '🟢'){
            button.textContent = '🟡';
            let storedId = li.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let value = {
              text: text,
              checked: 'false',
              priority: '🟡'
            }
            localStorage.setItem(storedId, JSON.stringify(value));
          }
          else if (button.textContent === '🟡'){
            button.textContent = '🔴';
            let storedId = li.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let value = {
              text: text,
              checked: 'false',
              priority: '🔴'
            }
            localStorage.setItem(storedId, JSON.stringify(value));
          }
          else if (button.textContent === '🔴'){
            button.textContent = '🟢';
            let storedId = li.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let value = {
              text: text,
              checked: 'false',
              priority: '🟢'
            }
            localStorage.setItem(storedId, JSON.stringify(value));
          }
        }
      }
    }
  }
}
  

let input = document.getElementById("myInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addButton").click();
  }
});

function loadList(){
  for (let i = 0; i < localStorage.length; i++){
    let id = localStorage.key(i);
    let storedValue = localStorage.getItem(id);
    if (id === "Title"){
      continue;
    }
    if (id === "Theme"){
      continue;
    }
    if (storedValue === 'Title'){
      continue;
    }
    if (storedValue === 'Theme'){
      continue;
    }
    let item = JSON.parse(storedValue);
    let text = (item.text);
    let checked = (item.checked);

    let li = document.createElement("li");
    let input = document.createElement('input');
    input.setAttribute('readonly', 'true');
    input.setAttribute('style', 'display: none;');
    input.setAttribute('id', 'editInput');
    li.setAttribute('id', id);
    if (checked === 'true'){
      li.setAttribute('class', 'checked');
    }
    let inputValue = text;
    let t = document.createTextNode(inputValue);
    document.getElementById("myUL").appendChild(li);

    document.getElementById("myInput").value = "";

    let textValue = JSON.parse(storedValue);
    let priorityValue = textValue.priority;

    let editButton = document.createElement("button");
    let pencil = document.createTextNode("✏️");
    let closeButton = document.createElement("button");
    let cross = document.createTextNode("❌");
    let priorityButton = document.createElement("button");
    let priorityIcon = document.createTextNode(priorityValue);
    priorityButton.className = "priority";
    priorityButton.appendChild(priorityIcon);
    priorityButton.setAttribute('title', 'Change priority');
    editButton.setAttribute('title', 'Edit');
    closeButton.setAttribute('title', 'Delete');
    editButton.className = "edit";
    editButton.appendChild(pencil);
    closeButton.className = "close";
    closeButton.appendChild(cross);
    li.appendChild(priorityButton);
    li.appendChild(editButton);
    li.appendChild(closeButton);
    li.appendChild(t);
    li.appendChild(input);

    for (let j = 0; j < close.length; j++) {
      close[j].onclick = function() {
        let div = this.parentElement;
        let item = (div.id);
        localStorage.removeItem(item)
        div.style.display = "none";
      }
    }

    for (let z = 0; z < editItem.length; z++) {
      editItem[z].onclick = function vroom() {
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

        input.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            event.preventDefault();
            editItem[z].click();
          }
        });

        if (input.style.display === 'block'){
          localStorage.setItem(storedId, JSON.stringify(value));
          div.nodeValue = newText;
          input.style.display = 'none';
          input.readOnly = true;
          location.reload();
        }
        else if (input.style.display === 'none'){
          input.style.display = "block";
          input.readOnly = false;
        }
      }
    }

    for (let c = 0; c < icon.length; c++){
      icon[c].onclick = function(){
        let li = this.parentElement;
        let button = li.firstChild;
        if (button.textContent === '🟢'){
          button.textContent = '🟡';
          let storedId = li.id;
          let storedValue = localStorage.getItem(storedId);
          let textValue = JSON.parse(storedValue);
          let text = textValue.text;
          let value = {
            text: text,
            checked: 'false',
            priority: '🟡'
          }
          localStorage.setItem(storedId, JSON.stringify(value));
        }
        else if (button.textContent === '🟡'){
          button.textContent = '🔴';
          let storedId = li.id;
          let storedValue = localStorage.getItem(storedId);
          let textValue = JSON.parse(storedValue);
          let text = textValue.text;
          let value = {
            text: text,
            checked: 'false',
            priority: '🔴'
          }
          localStorage.setItem(storedId, JSON.stringify(value));
        }
        else if (button.textContent === '🔴'){
          button.textContent = '🟢';
          let storedId = li.id;
          let storedValue = localStorage.getItem(storedId);
          let textValue = JSON.parse(storedValue);
          let text = textValue.text;
          let value = {
            text: text,
            checked: 'false',
            priority: '🟢'
          }
          localStorage.setItem(storedId, JSON.stringify(value));
        }
      }
    }
  }
}

function loadTheme(){
  for (let i = 0; i < localStorage.length; i++){
    let value = localStorage.getItem(localStorage.key(i));
    let theme = document.getElementById('theme');
    let icon = document.getElementById('toggleButton');
    if (value === "dark"){
      theme.setAttribute('href', 'static/dark.css');
      localStorage.setItem('Theme', 'dark');
      icon.textContent = '☀️';
      icon.setAttribute('title', 'Switch to light mode');
    }
    else if (value === 'light'){
      theme.setAttribute('href', 'static/light.css');
      localStorage.setItem('Theme', 'light');
      icon.textContent = '🌓';
      icon.setAttribute('title', 'Switch to dark mode');
    }
  }
}

let title = document.getElementById("title");

title.addEventListener('input', function handleChange(event) {
  localStorage.setItem("Title", event.target.value);
});

function loadTitle(){
  let titleText = localStorage.getItem("Title");
  document.getElementById("title").value = titleText;
}

function toggleTheme(){
  let theme = document.getElementById('theme');
  let icon = document.getElementById('toggleButton');

  if (theme.getAttribute('href') == 'static/light.css'){
    theme.setAttribute('href', 'static/dark.css');
    localStorage.setItem('Theme', 'dark');
    icon.textContent = '☀️';
    icon.setAttribute('title', 'Switch to light mode');
  }
  else{
    theme.setAttribute('href', 'static/light.css');
    localStorage.setItem('Theme', 'light');
    icon.textContent = '🌓';
    icon.setAttribute('title', 'Switch to dark mode');
  }
}
