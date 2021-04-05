var filelist = ["new-file", "open-file"];
var editlist = ["undo", "redo", "cut", "copy"];
var viewlist = ["small-icons", "medium-icons", "large-icons", "copy", "paste"];
document.getElementById("tab-Name").value = "$_UNTITLED-WINDOW";
dragElement(document.getElementById("mydiv"));
var zi = 1;

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    elmnt.style.zIndex = zi;
    zi++;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function LIST(id) {
  x = document.getElementById(id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function kill(x) {
  if (x === 0) {
    document.getElementById("mydiv").remove();
  } else {
    document.getElementById("mydiv" + x).remove();
  }
}

function hide(x) {
  if (x == 0) {
    document.getElementById("mydiv").style.display = "none";
  } else document.getElementById("mydiv" + x).style.display = "none";

  btn = document.createElement("BUTTON");
  var WindowName;
  if (x == 0) {
    btn.setAttribute("id", "show-tab");
    WindowName = "$DEFAULT_TAB";
    btn.innerHTML = WindowName;
    btn.setAttribute("onclick", "show(0)");
  } else {
    btn.setAttribute("id", "show-tab-" + x);
    WindowName = document.getElementById("windowTitle" + x).textContent;
    btn.innerHTML = WindowName;
    btn.setAttribute("onclick", "show(" + x + ")");
  }

  //document.body.appendChild(btn);
  var taskbar = document.getElementById("task-bar");
  taskbar.appendChild(btn);
}

function show(x) {
  if (x == 0) {
    document.getElementById("mydiv").style.display = "block";
    document.getElementById("show-tab").remove();
  } else {
    document.getElementById("mydiv" + x).style.display = "block";
    document.getElementById("show-tab-" + x).remove();
  }
}

function full(x) {
  if (x === 0) {
    x = document.getElementById("mydiv").style;
  } else {
    x = document.getElementById("mydiv" + x).style;
  }
  if (x.height == 98 + "%") {
    x.height = 50 + "%";
    x.width = 60 + "%";
  } else {
    x.height = 98 + "%";
    x.width = 98 + "%";
    x.top = 0;
    x.left = 0;
  }
}
var count = 1; //nr de ferestre

function createWindow() {
  var tabName = document.getElementById("tab-Name").value.toUpperCase();
  var Window = document.createElement("DIV");
  Window.classList.add("main");
  Window.setAttribute("id", "mydiv" + count);
  //creez fereastra
  var topBar = document.createElement("DIV");
  topBar.classList.add("top-bar");
  topBar.setAttribute("id", "mydiv" + count + "header");
  //creez bara de sus

  var title = document.createElement("P");
  title.classList.add("tab-name");
  title.setAttribute("id", "windowTitle" + count);
  title.innerHTML = tabName;

  var closeB = document.createElement("BUTTON");
  closeB.classList.add("close");
  closeB.setAttribute("onclick", "kill(" + count + ")");
  closeB.innerHTML = "x";

  var maxB = document.createElement("BUTTON");
  maxB.classList.add("other-f");
  maxB.setAttribute("onclick", "full(" + count + ")");
  maxB.innerHTML = "□";

  var minB = document.createElement("BUTTON");
  minB.classList.add("other-f");
  minB.setAttribute("onclick", "hide(" + count + ")");
  minB.innerHTML = "-";

  options = document.createElement("div");
  options.classList.add("options");

  var files = document.createElement("div");
  files.classList.add("window-files");

  createDropdown("_FILE", filelist);
  createDropdown("_EDIT", editlist);
  createDropdown("_VIEW", viewlist);

  textArea = document.createElement("textarea");
  textArea.setAttribute("rows", 15);
  textArea.setAttribute(
    "placeholder",
    "You cand type here.\n(NOTE)This text will go away on page refresh"
  );
  //cand adaug elemnte merg din child spre exterior
  topBar.appendChild(closeB);
  topBar.appendChild(maxB);
  topBar.appendChild(minB);
  topBar.appendChild(title);
  Window.appendChild(topBar);
  files.appendChild(options);
  Window.appendChild(files);
  Window.appendChild(textArea);
  document.body.appendChild(Window);
  dragElement(document.getElementById("mydiv" + count));
  count++;
}

function createDropdown(title, array) {
  var dropDown = document.createElement("DIV");
  dropDown.classList.add("dropdown");

  var button = document.createElement("BUTTON");
  button.classList.add("option");
  button.innerHTML = title;

  var content = document.createElement("DIV");
  content.classList.add("drop-content");

  var link = document.createElement("A");
  dropDown.appendChild(button);
  dropDown.appendChild(content);

  array.forEach((element) => {
    link = document.createElement("A");
    link.innerHTML = "_" + element.toUpperCase();
    content.appendChild(link);
  });
  options.appendChild(dropDown);
}
var countR = 1;
function createIcons(rows, iconsPerRow) {
  var icons = document.createElement("DIV");
  icons.classList.add("icons");

  var row = document.createElement("DIV");
  row.classList.add("row");

  var icon_cont = document.createElement("DIV");
  icon_cont.classList.add("icon-cont");

  for (var i = 1; i <= rows; i++) {
    for (var j = 1; j <= iconsPerRow; j++) {
      var icon = document.createElement("DIV");
      icon.classList.add("icon");

      var title = document.createElement("P");
      title.classList.add("icon-title");

      title.innerHTML = "$_ICON_" + countR;
      icon.setAttribute("id", "icon" + countR);
      countR++;

      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      icon.style.backgroundColor = "#" + randomColor;

      icon_cont.appendChild(icon.cloneNode(true));
      icon_cont.appendChild(title.cloneNode(true));
      row.appendChild(icon_cont.cloneNode(true));
      icon_cont.innerHTML = "";
    }
    icons.appendChild(row.cloneNode(true));
    row.innerHTML = "";
  }
  document.body.appendChild(icons);
}
createIcons(5, 10);
