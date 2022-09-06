
//Chosing a random number for id
let num = 10
let id = 0


var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
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
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        let item = (div.id);
        localStorage.removeItem(item)
        div.style.display = "none";
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
    console.log(text)
    var li = document.createElement("li");
    li.setAttribute('id', id);
    var inputValue = text;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);

    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (let j = 0; j < close.length; j++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        let item = (div.id);
        localStorage.removeItem(item)
        div.style.display = "none";
      }
    }
  }
}
