
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
  icon[c].onclick = function(){
    let li = this.parentElement;
    let button = li.firstChild;
    if (button.textContent === 'low'){
      button.textContent = 'medium';
      button.style.backgroundColor = '#FFB81C';
      let storedId = li.id;
      let storedValue = localStorage.getItem(storedId);
      let textValue = JSON.parse(storedValue);
      let text = textValue.text;
      let value = {
        text: text,
        checked: textValue.checked,
        priority: 'medium',
        group: title.value
      }
      localStorage.setItem(storedId, JSON.stringify(value));
    }
    else if (button.textContent === 'medium'){
      button.textContent = 'high';
      button.style.backgroundColor = '#F06A6A';
      let storedId = li.id;
      let storedValue = localStorage.getItem(storedId);
      let textValue = JSON.parse(storedValue);
      let text = textValue.text;
      let value = {
        text: text,
        checked: textValue.checked,
        priority: 'high',
        group: title.value
      }
      localStorage.setItem(storedId, JSON.stringify(value));
    }
    else if (button.textContent === 'high'){
      button.textContent = 'low';
      button.style.backgroundColor = '#21b972';
      let storedId = li.id;
      let storedValue = localStorage.getItem(storedId);
      let textValue = JSON.parse(storedValue);
      let text = textValue.text;
      let value = {
        text: text,
        checked: textValue.checked,
        priority: 'low',
        group: title.value
      }
      localStorage.setItem(storedId, JSON.stringify(value));
    }
  }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
if (list){
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
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  let title = document.getElementById('title');
  id = Math.floor(Math.random() * num);
  let inputValue = document.getElementById("myInput").value;
  let div = document.createElement('div');
  div.setAttribute('id', 'itemText');
  let t = document.createTextNode(inputValue);
  let input = document.createElement('input');
  input.setAttribute('readonly', 'true');
  input.setAttribute('style', 'display: none;');
  input.className = 'editInput';

  if (localStorage.getItem(id) !== null){
    alert('Id has already been used');
  }

  else{
    let li = document.createElement("li");
    li.setAttribute('id', id);
    let item = {
      text: inputValue,
      checked: 'false',
      priority: 'low',
      group: title.value
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
      let priorityIcon = document.createTextNode('low');
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
  
      for (let j = 0; j < close.length; j++) {
        close[j].onclick = function() {
          let div = this.parentElement;
          let item = (div.id);
          localStorage.removeItem(item)
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
          let newText = input.value;
          input.value = text;
          let value = {
            text: newText,
            checked: checked,
            priority: priority,
            group: title.value
          }

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
          }
          else if (input.style.display === 'none'){
            input.style.display = "block";
            input.readOnly = false;
            div.style.display = 'none';
          }
        }
      }

      for (let c = 0; c < icon.length; c++){
        icon[c].onclick = function(){
          let li = this.parentElement;
          let button = li.firstChild;
          if (button.textContent === 'low'){
            button.textContent = 'medium';
            button.style.backgroundColor = '#FFB81C';
            let storedId = li.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let value = {
              text: text,
              checked: textValue.checked,
              priority: 'medium',
              group: title.value
            }
            localStorage.setItem(storedId, JSON.stringify(value));
          }
          else if (button.textContent === 'medium'){
            button.textContent = 'high';
            button.style.backgroundColor = '#F06A6A';
            let storedId = li.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let value = {
              text: text,
              checked: textValue.checked,
              priority: 'high',
              group: title.value
            }
            localStorage.setItem(storedId, JSON.stringify(value));
          }
          else if (button.textContent === 'high'){
            button.textContent = 'low';
            button.style.backgroundColor = '#21b972';
            let storedId = li.id;
            let storedValue = localStorage.getItem(storedId);
            let textValue = JSON.parse(storedValue);
            let text = textValue.text;
            let value = {
              text: text,
              checked: textValue.checked,
              priority: 'low',
              group: title.value
            }
            localStorage.setItem(storedId, JSON.stringify(value));
          }
        }
      }
    }
  }
}
  

let input = document.getElementById("myInput");
if (input){
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("addButton").click();
    }
  });
}

function loadList(){
  let title = document.getElementById('title');
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
    if (id === "Sort"){
      continue;
    }
    if (storedValue === 'Sort'){
      continue;
    }
    let item = JSON.parse(storedValue);
    let text = (item.text);
    let checked = (item.checked);

    let li = document.createElement("li");
    let input = document.createElement('input');
    let div = document.createElement('div');
    div.setAttribute('id', 'itemText')
    input.setAttribute('readonly', 'true');
    input.setAttribute('style', 'display: none;');
    input.setAttribute('id', 'editInput');
    input.className = 'editInput';
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
    priorityButton.classList.add('priorityText');
    if (priorityValue === 'low'){
      priorityButton.style.backgroundColor = '#21b972';
    }
    else if (priorityValue === 'medium'){
      priorityButton.style.backgroundColor = '#FFB81C';
    }
    else if (priorityValue === 'high'){
      priorityButton.style.backgroundColor = '#F06A6A';
    }
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
    li.appendChild(div);
    div.append(t);
    li.appendChild(input);

    for (let j = 0; j < close.length; j++) {
      close[j].onclick = function() {
        let div = this.parentElement;
        let item = (div.id);
        localStorage.removeItem(item)
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
        let newText = input.value;
        input.value = text;
        let value = {
          text: newText,
          checked: checked,
          priority: priority,
          group: title.value
        }

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
        }
        else if (input.style.display === 'none'){
          input.style.display = "block";
          input.readOnly = false;
          div.style.display = 'none';
        }
      }
    }

    for (let c = 0; c < icon.length; c++){
      icon[c].onclick = function(){
        let li = this.parentElement;
        let button = li.firstChild;
        if (button.textContent === 'low'){
          button.textContent = 'medium';
          button.style.backgroundColor = '#FFB81C';
          let storedId = li.id;
          let storedValue = localStorage.getItem(storedId);
          let textValue = JSON.parse(storedValue);
          let text = textValue.text;
          let value = {
            text: text,
            checked: textValue.checked,
            priority: 'medium',
            group: title.value
          }
          localStorage.setItem(storedId, JSON.stringify(value));
        }
        else if (button.textContent === 'medium'){
          button.textContent = 'high';
          button.style.backgroundColor = '#F06A6A';
          let storedId = li.id;
          let storedValue = localStorage.getItem(storedId);
          let textValue = JSON.parse(storedValue);
          let text = textValue.text;
          let value = {
            text: text,
            checked: textValue.checked,
            priority: 'high',
            group: title.value
          }
          localStorage.setItem(storedId, JSON.stringify(value));
        }
        else if (button.textContent === 'high'){
          button.textContent = 'low';
          let storedId = li.id;
          button.style.backgroundColor = '#21b972';
          let storedValue = localStorage.getItem(storedId);
          let textValue = JSON.parse(storedValue);
          let text = textValue.text;
          let value = {
            text: text,
            checked: textValue.checked,
            priority: 'low',
            group: title.value
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
if (title){
  title.addEventListener('input', function handleChange(event) {
    localStorage.setItem("Title", event.target.value);
  });
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

function sortPriority(){
  let optionsList = document.getElementById('options');
  let value = optionsList.options[optionsList.selectedIndex].value;
  let ul = document.getElementById('myUL');
  let li = ul.getElementsByTagName('li');
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
    if (storedValue === 'Sort'){
      continue;
    }
    if (id === 'Sort'){
      continue;
    }

    let newValue = JSON.parse(storedValue);
    if (newValue.priority === 'low' && value === 'low'){
      for (let i = 0; i < li.length; i++){
        let button = li[i].firstChild;
        let parent = button.parentElement;
        if (parent.style.display === 'none'){
          parent.style= null;
        }
        if (button.textContent === 'medium' || button.textContent === 'high'){
          parent.style.display = 'none';
          localStorage.setItem('Sort', 'low');
        }
      }
    }
    else if (newValue.priority === 'medium' && value === 'medium'){
      for (let i = 0; i < li.length; i++){
        let button = li[i].firstChild;
        let parent = button.parentElement;
        if (parent.style.display === 'none'){
          parent.style= null;
        }
        if (button.textContent === 'high' || button.textContent === 'low'){
          parent.style.display = 'none';
          localStorage.setItem('Sort', 'medium');
        }
      }
    }
    else if (newValue.priority === 'high' && value === 'high'){
      for (let i = 0; i < li.length; i++){
        let button = li[i].firstChild;
        let parent = button.parentElement;
        if (parent.style.display === 'none'){
          parent.style= null;
        }
        if (button.textContent === 'low' || button.textContent === 'medium'){
          parent.style.display = 'none';
          localStorage.setItem('Sort', 'high');
        }
      }
    }
    else if (value === 'all'){
      for (let i = 0; i < li.length; i++){
        let button = li[i].firstChild;
        let parent = button.parentElement;
        parent.style = null;
        localStorage.setItem('Sort', 'all');
      }
    }
  }
}

function loadPriority(){
  for (let i = 0; i < localStorage.length; i++){

    let id = localStorage.key(i);
    let storedValue = localStorage.getItem(id);
    if (id === 'Sort'){
      let optionsList = document.getElementById('options');
      optionsList.value = storedValue;
      optionsList.click();
    }
  }
}

function sendingMessage(){
  let button = document.getElementById('send-button');
  button.textContent = "Sending";
}

function calculatePercent(){
  let amountChecked = 0
  let total = 0;
  let percentText = document.getElementById('percent');
  for (let i = 0; i < localStorage.length; i++){
    let id = localStorage.key(i);
    let storedValue = localStorage.getItem(id);
    if (id === 'Sort' || id === 'Title' || id === 'Theme'){
      continue;
    }
    let newValue = JSON.parse(storedValue);
    total += 1;
    if (newValue.checked === 'true'){
      amountChecked += 1;
    }
  }
  let percent = amountChecked / total * 100;
  percentText.textContent = `%${percent}`;
}

function openCreate(){
  let createButton = document.getElementById('createButton');
  let buttonParent =  document.getElementById('listButtons');
  let toolBar = document.getElementById('toolBar');
  let page = document.getElementById('newTitlePage');
  page.style.display = null;
  createButton.style.display = 'none';
  buttonParent.style.display = 'none';
  toolBar.style.display = 'none';
}

function closeCreate(){
  let page = document.getElementById('newTitlePage');
  let buttonParent =  document.getElementById('listButtons');
  let createButton = document.getElementById('createButton');
  page.style.display = 'none';
  createButton.style.display = null;
  buttonParent.style.display = null;
}

let color_picker = document.getElementById("colorPicker");
let hex_code = document.getElementById("hexCode");
if (color_picker){
  color_picker.addEventListener("input", function () {
    let code = color_picker.value;
    hex_code.textContent = code;
  }, false);
}

function newList(){
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
  }
  localStorage.setItem(JSON.stringify(value), 'Title');
  localStorage.setItem('Title', title);
}

function loadButtons(){
  for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    if (value === 'Title'){
      let storedValue = localStorage.key(i); //Json value
      let textValue = JSON.parse(storedValue);
      console.log(textValue);
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
      }
      localStorage.setItem(JSON.stringify(json), 'Title');
      localStorage.setItem('Title', title);
    }
  }
}

function loadTitle(){
  let titleText = localStorage.getItem("Title");
  document.getElementById("title").value = titleText;
}

const parentButton = document.getElementById('listButtons');
if (parentButton){
  parentButton.addEventListener('click', (event) => {
    let buttonTitle = event.target.textContent;
    localStorage.setItem('Title', buttonTitle);
    console.log(buttonTitle);
  });
}

function deleteList(){
  let checkButton = document.getElementById('checkButton');
  let listParent = document.getElementById('listButtons');
  let listButton = listParent.getElementsByTagName('button');
  for (let i = 0; i < listButton.length; i++){
    listButton[i].classList.add('buttonSelect');
    listButton[i].style.backgroundColor = '#34393d';
  }
  checkButton.style.display = null;
}

if (parentButton){
  parentButton.addEventListener('click', (event) => {
    let button = event.target;
    console.log(button.style.backgroundColor);
    if (button.style.backgroundColor === 'rgb(52, 57, 61)'){
      button.remove();
      console.log(button.textContent);
    }
  });
}
