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
  let upload1 = new UploadButton();
  let pEntry1 = new PassportEntry(1, image1, upload1, null);
  pEntry1.init(document.getElementById('upload1'), document.getElementById('upload1Input'), '/user/addPhoto');
  pEntry1.refresh(currentUser.getAuthResponse().id_token);
  pEntry1.ref
  let image2 = new SculptureImage("", document.getElementById('image2'), '/user/getPhoto');
  image2.refreshDatabase(currentUser.getAuthResponse().id_token, 2);
  let upload2 = new UploadButton();
  upload2.init(document.getElementById('upload2'), document.getElementById('upload2Input'), image2, 2, '/user/addPhoto');
  getCoords();
}

async function getCoords(){
  
  let noSculpturesResponse = await fetch('/getSculptCount');
  let noSculpturesJson = await noSculpturesResponse.json();
  let noSculptures = noSculpturesJson.data[0].Count;
  for(let i=1; i<=noSculptures; i++){
  


    let response = await fetch('/getCoords?trailID='+i);
    let bodyJson = await response.json();
    let body = bodyJson.data;
    let mapHTML = '<iframe width="450" height="500" src="https://www.google.com/maps/d/u/0/embed?mid=1ls4d0fUqWY7Ux-VMLOftnxx-UTSEcRKx&z=12&ll=' + body[0]["StartCoordinate"] + '"></iframe>';
    document.getElementById("iframe-map" + i).innerHTML = mapHTML; 


  }
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

  // Screen resizing
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
  
  // Page switching
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
      pages[pageIndex-1].style.transform = "rotateY(-180deg)";
      pages[pageIndex-1].style.display = "inline-block";
      pages[pageIndex-1].style.opacity = "0"
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

//http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        distX = 0
        distY = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

window.addEventListener('load', function(){
  var el = document.getElementById('flipbook');
  swipedetect(el, function(swipedir) {
    if (swipedir=='left') {nextPages();}
    else if (swipedir=='right') {prevPages();};
  })
}, false)
