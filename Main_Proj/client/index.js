'use strict'; 

let currentUser = undefined;

async function onSignIn (googleUser) {
  currentUser = googleUser;
  initUi();
}

function postImage() {
    alert("flag")
}

function initUi(){
  let image1 = new SculptureImage("", document.getElementById('image1'), '/user/getPhoto');
  let image2 = new SculptureImage("", document.getElementById('image2'), '/user/getPhoto');
  image1.refreshDatabase(currentUser.getAuthResponse().id_token, 1);
  image2.refreshDatabase(currentUser.getAuthResponse().id_token, 2);
  
  let upload1 = new UploadButton();
  upload1.init(document.getElementById('upload1'), document.getElementById('upload1Input'), image1, 1, '/user/addPhoto');
  
  let upload2 = new UploadButton();
  upload2.init(document.getElementById('upload2'), document.getElementById('upload2Input'), image2, 2, '/user/addPhoto');
  
}

/////////////////////////


var pageIndex = 1;
var double = window.matchMedia("(min-width: 1000px)")

showPages(pageIndex, pageIndex);
double.addListener(showPages)

function nextPages() {
  var current = pageIndex;
  disableButtons();
  if (double.matches) {
    showPages(current, pageIndex += 2);
  } else {
    showPages(current, pageIndex += 1)
  }
}

function prevPages() {
  var current = pageIndex;
  disableButtons();
  if (double.matches) {
    showPages(current, pageIndex -= 2);
  } else {
    showPages(current, pageIndex -= 1)
  }
}

function currentPage(n) {
  var current = pageIndex;
  disableButtons();
  showPages(current, pageIndex = n);
}

function disableButtons() {
  document.getElementById("next").classList = "off";
  document.getElementById("prev").classList = "off";
  document.getElementById("next").onclick = "";
  document.getElementById("prev").onclick = "";
}

function enableButtons() {
  document.getElementById("next").classList = "on";
  document.getElementById("prev").classList = "on";
  document.getElementById("next").onclick = nextPages;
  document.getElementById("prev").onclick = prevPages;
}

function showPages(current, n) {
  var i;
  var page_collection = document.getElementsByClassName("page");
  for (var pages=[], i=page_collection.length; i;) pages[--i] = page_collection[i];

  if (n > pages.length) {pageIndex = 1} 
  if (n < 1) {pageIndex = pages.length}
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none"; 
  }

  if (document.getElementById("next").classList == "on") {
    if (pageIndex == 1) {
      pages[0].style.display = "inline-block";
    } else if (double.matches) {
      if (pageIndex % 2 == 0) {pageIndex += 1}
      pages[pageIndex-2].style.display = "inline-block";
      pages[pageIndex-1].style.display = "inline-block";
    } else {
      pages[pageIndex-1].style.display = "inline-block";
    }
    return;
  }
  
  if (double.matches) { // If there's a double page spread
    if (pageIndex % 2 == 0) {pageIndex += 1}
    if (current == pageIndex) { // No change
      pages[pageIndex-2].style.display = "inline-block";
      pages[pageIndex-1].style.display = "inline-block";
      enableButtons();
    } else if (current<pageIndex && current != 1) { // Page forward
      pages[current-2].style.display = "inline-block";
      pages[current-1].style.display = "inline-block";
      pages[current-1].style.transform = "rotateY(-180deg)";
      pages[current-1].style.zIndex = "1";
      pages[pageIndex-1].style.display = "inline-block";
      pages[pageIndex-2].style.display = "inline-block";
      pages[pageIndex-2].style.opacity = "0";
      pages[pageIndex-2].style.transition = "transform 0";
      pages[pageIndex-2].style.transformOrigin = "right";
      pages[pageIndex-2].style.transform = "rotateY(180deg)";
      setTimeout(function() {
        pages[pageIndex-2].style.transition = "transform .4s ease-in";
        pages[pageIndex-2].style.transform = "rotateY(0deg)";
      }, 1);
      setTimeout(function() {
        pages[pageIndex-2].style.opacity = "1";
        pages[current-1].style.display = "none";
        pages[current-1].style.transform = "rotateY(0deg)"
        pages[current-1].style.zIndex = "0";
      }, 250);
      setTimeout(function() {
        pages[pageIndex-2].style.transformOrigin = "left";
        pages[current-2].style.display = "none";
        enableButtons();
      }, 400);
    } else if (current<pageIndex && current==1) { // Book opening
      pages[current-1].style.transition = "left .2s";
      pages[current-1].style.display = "inline-block";
      pages[current-1].style.zIndex = "1";
      pages[current-1].style.left = "500px";
      pages[pageIndex-2].style.display = "inline-block";
      pages[pageIndex-2].style.opacity = "0";
      pages[pageIndex-2].style.transition = "transform 0";
      pages[pageIndex-2].style.transformOrigin = "right";
      pages[pageIndex-2].style.transform = "rotateY(-180deg)";
      setTimeout(function() {
        pages[current-1].style.transition = "transform .4s ease-in";
        pages[pageIndex-2].style.transition = "transform .4s ease-in";
        pages[pageIndex-1].style.display = "inline-block";
        pages[current-1].style.transform = "rotateY(-180deg)";
        pages[pageIndex-2].style.transform = "rotateY(0deg)";
      }, 200);
      setTimeout(function() {
        pages[pageIndex-2].style.opacity = "1";
        pages[current-1].style.display = "none";
        pages[current-1].style.zIndex = "0";
        pages[current-1].style.transform = "rotateY(0deg)";
        pages[current-1].style.left = "0";
      }, 450);
      setTimeout(function() {
        pages[pageIndex-2].style.transformOrigin = "left";
        enableButtons();
      }, 600);
    } else if (pageIndex==1) { // Book closing
      pages[current-1].style.display = "inline-block";
      pages[current-2].style.display = "inline-block";
      pages[0].style.display = "inline-block";
      pages[0].style.opacity = "0";
      pages[0].style.zIndex = "1";
      pages[0].style.left = "500px";
      pages[current-2].style.transformOrigin = "right";
      pages[current-2].style.transform = "rotateY(-180deg)";
      pages[0].style.transform = "rotateY(-180deg)";
      setTimeout(function() {
        pages[0].style.transform = "rotateY(0deg)";
      }, 1);
      setTimeout(function() {
        pages[0].style.opacity = "1";;
        pages[current-2].style.display = "none";
      }, 275);
      setTimeout(function() {
        pages[current-1].style.display = "none";
        pages[current-2].style.transformOrigin = "left";
        pages[current-2].style.transform = "rotateY(0deg)";
        pages[0].style.zIndex = "0";
        pages[0].style.transition = "left .2s";
        pages[0].style.left = "0";
        enableButtons();
      }, 400);
      pages[0].style.transition = "transform .4s ease-in";
    } else { // Page backwards
      pages[current-1].style.display = "inline-block";
      pages[current-2].style.transformOrigin = "right";
      pages[current-2].style.display = "inline-block";
      pages[current-2].style.transform = "rotateY(180deg)";
      pages[pageIndex-2].style.display = "inline-block";
      pages[pageIndex-1].style.display = "inline-block";
      pages[pageIndex-1].style.opacity = "0"
      pages[pageIndex-1].style.transform = "rotateY(-180deg)";
      setTimeout(function() {
        pages[pageIndex-1].style.transform = "rotateY(0deg)";
      }, 1);
      setTimeout(function() {
        pages[current-2].style.display = "none";
        pages[current-2].style.transformOrigin = "left";
        pages[current-2].style.transform = "rotateY(0deg)";
        pages[pageIndex-1].style.opacity = "1"
      }, 250);
      setTimeout(function() {
        pages[current-1].style.display = "none";
        enableButtons();
      }, 400);
    }
  } else { // Single page spread
    if (current == pageIndex) { // No change
      pages[pageIndex-1].style.display = "inline-block";
      enableButtons();
    } else if (current<pageIndex) { // Page forward
      pages[current-1].style.zIndex = "1";
      pages[current-1].style.display = "inline-block";
      pages[current-1].style.transform = "rotateY(-180deg)";
      pages[pageIndex-1].style.display = "inline-block";
      setTimeout(function() {
        pages[current-1].style.display = "none";
        pages[current-1].style.zIndex = "0";
        pages[current-1].style.transform = "rotateY(0deg)"
        enableButtons();
      }, 250);
    } else { // Page backwards
      pages[current-1].style.display = "inline-block";
      pages[pageIndex-1].style.display = "inline-block";
      pages[pageIndex-1].style.zIndex = "1";
      pages[pageIndex-1].style.opacity = "0";
      pages[pageIndex-1].style.transition = "transform 0";
      pages[pageIndex-1].style.transform = "rotateY(-90deg)";
      setTimeout(function() {
        pages[pageIndex-1].style.transition = "transform .2s ease-in";
        pages[pageIndex-1].style.opacity = "1";
        pages[pageIndex-1].style.transform = "rotateY(0deg)";
      }, 1);
      setTimeout(function() {
        pages[current-1].style.display = "none";
        pages[pageIndex-1].style.zIndex = "0";
        pages[pageIndex-1].style.transition = "transform .4s ease-in";
        enableButtons();
      }, 200)
    }
  }
}

function openMap() {
  document.getElementById("map").style.display = "block";
}

function closeMap() {
  document.getElementById("map").style.display = "none";
}


var acc = document.getElementsByClassName("howto");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

