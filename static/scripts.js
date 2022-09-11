
//Chosing a random number for id
let num = 1000
let id = 0


var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var editSpan = document.createElement("SPAN");
  var pencil = document.createTextNode("✏️");
  var closeSpan = document.createElement("SPAN");
  var cross = document.createTextNode("❌");
  editSpan.className = "edit";
  editSpan.appendChild(pencil);
  closeSpan.className = "close";
  closeSpan.appendChild(cross);
  li.appendChild(editSpan);
  li.appendChild(closeSpan);

  myNodelist[i].appendChild(editSpan);
  myNodelist[i].appendChild(closeSpan);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    let item = (div.id);
    localStorage.removeItem(item)
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  id = Math.floor(Math.random() * num);
  let inputValue = document.getElementById("myInput").value;

  if (localStorage.getItem(id) !== null){
    alert('Id has already been used');
  }

  else{
    var li = document.createElement("li");
    li.setAttribute('id', id);
    localStorage.setItem(id, inputValue);
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } 
    else {
      document.getElementById("myUL").appendChild(li);
      document.getElementById("myInput").value = "";

      var editSpan = document.createElement("SPAN");
      var pencil = document.createTextNode("✏️");
      var closeSpan = document.createElement("SPAN");
      var cross = document.createTextNode("❌");
      editSpan.className = "edit";
      editSpan.appendChild(pencil);
      closeSpan.className = "close";
      closeSpan.appendChild(cross);
      li.appendChild(editSpan);
      li.appendChild(closeSpan);
  
      for (let j = 0; j < close.length; j++) {
        close[j].onclick = function() {
          var div = this.parentElement;
          let item = (div.id);
          localStorage.removeItem(item)
          div.style.display = "none";
        }
      }
    }
  }
}
  

var input = document.getElementById("myInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addButton").click();
  }
});

function load(){
  for (var i = 0; i < localStorage.length; i++){
    let text = localStorage.getItem(localStorage.key(i));
    let id = localStorage.key(i);
    if (id === "Title"){
      continue;
    }
    var li = document.createElement("li");
    li.setAttribute('id', id);
    var inputValue = text;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);

    document.getElementById("myInput").value = "";

    var editSpan = document.createElement("SPAN");
    var pencil = document.createTextNode("✏️");
    var closeSpan = document.createElement("SPAN");
    var cross = document.createTextNode("❌");
    editSpan.className = "edit";
    editSpan.appendChild(pencil);
    closeSpan.className = "close";
    closeSpan.appendChild(cross);
    li.appendChild(editSpan);
    li.appendChild(closeSpan);

    for (let j = 0; j < close.length; j++) {
      close[j].onclick = function() {
        var div = this.parentElement;
        let item = (div.id);
        localStorage.removeItem(item)
        div.style.display = "none";
      }
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
    icon.textContent = '☀️';
    icon.setAttribute('title', 'Switch to light mode')
  }
  else{
    theme.setAttribute('href', 'static/light.css')
    icon.textContent = '🌓';
    icon.setAttribute('title', 'Switch to dark mode')
  }
}