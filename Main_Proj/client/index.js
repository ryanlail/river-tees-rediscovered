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

  // let image2 = new SculptureImage("", document.getElementById('image2'), '/user/getPhoto');
  // image2.refreshDatabase(currentUser.getAuthResponse().id_token, 2);
  // let upload2 = new UploadButton();
  // upload2.init(document.getElementById('upload2'), document.getElementById('upload2Input'), image2, 2, '/user/addPhoto');
  getCoords();
}

async function generatePassport(){
  let noTrailsResponse = await fetch('/getTrailCount');
  let noTrailsJson = await noTrailsResponse.json();
  let noTrails = noTrailsJson.data[0].Count;

  let parentElement = document.getElementById('flipbook');

  for(let trail=1; trail<=noTrails; trail++){

    let count = 0;
    let noSculptures = 10;
    let trailsPerPage = 2;

    let leftPage1 = document.createElement("div");
    leftPage1.setAttribute("id", "trail" + trail + "name");
    leftPage1.setAttribute("class", "page fade left");
    let appendLeftPage1 = parentElement.appendChild(leftPage1);

    appendLeftPage1.innerHTML += '<h1>Trail ' + trail + '</h1> <div id="iframe-map"' + trail + '></div>';

    while(count<noSculptures){
      if(count%4 == 0 || count%4 == 1){
        let className = "page fade right";
      } else {
        let className = "page fade left";
      }

      let newPage = document.createElement("div");
      newPage.setAttribute("id", "trail" + trail + "name");
      newPage.setAttribute("class", className);
      let appendNewPage = parentElement.appendChild(newPage);

      if(count == noSculptures - 1){
        appendNewPage.innerHTML += '';
      }

    }

                <div class = "page fade right" id = "trail1name">
                    <h1>Trail 1 <a class="trailnext" onclick="currentPage(6)">&#10095;</a></h1>
                    <div class = "section1">
                        <div class = "sculpture" style = "float: left">
                            <img class = "photo" id="image1" src = "" style = "width: 100%; height: auto;">
                            <input type="file" id="upload1Input" name="upload1File" style="display:none"/>
                            <button class = "upload" id="upload1"> Upload </button>
                        </div>

                        <div class = "sculptureText1" id="info1" style = "float: right;">
                            <h2>Sculpture 1</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                          </div>
                      </div>

                    <div class = "section2">
                        <div class = "sculpture" style = "float: right;">
                            <img class = "photo" id="image2" src = "" style = "width: 100%; height: auto;">
                            <input type="file" id="upload2Input" name="upload2File" style="display:none"/>
                            <button class = "upload" id="upload2"> Upload </button>
                        </div>
                        <div class = "sculptureText2" id="info2" style = "float: left;">
                            <h2>Sculpture 2</h2>
                            <p>Risus nec feugiat in fermentum posuere. Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod. Massa tincidunt dui ut ornare lectus. Vitae auctor eu augue ut lectus. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Sed adipiscing diam donec adipiscing tristique. </p>
                        </div>
                    </div>
                </div>

                <div class = "page fade left" id = "trail1name">
                    
                    <h1>Trail 1 <a class="trailnext" onclick="currentPage(6)">&#10095;</a></h1>
                    <div class = "section1">
                        <div class = "sculpture" style = "float: left">
                             <img class = "photo" id="image3" src = "" style = "width: 100%; height: auto;">
                             <input type="file" id="upload3Input" name="upload3File" style="display:none"/>
                             <button class = "upload" id="upload3"> Upload </button>
                        </div>

                        <div class = "sculptureText1" id="info3" style = "float: right;">
                                <h2>Sculpture 3</h2>
                                <p></p>
                        </div>
                    </div>

                    <div class = "section2">
                        <div class = "sculpture" style = "float: right;">
                            <img class = "photo" id="image4" src = "" style = "width: 100%; height: auto;">
                            <input type="file" id="upload4Input" name="upload4File" style="display:none"/>
                            <button class = "upload" id="upload4"> Upload </button>
                        </div>
                        <div class = "sculptureText2" id="info4" style = "float: left;">
                            <h2>Sculpture 4</h2>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class = "page fade right" id = "trail1name">

                    <h1>Trail 1 <a class="trailnext" onclick="currentPage(6)">&#10095;</a></h1>
                    <div class = "section1">
                        <div class = "sculpture" style = "float: left">
                             <img class = "photo" id="image5" src = "" style = "width: 100%; height: auto;">
                             <input type="file" id="upload5Input" name="upload5File" style="display:none"/>
                             <button class = "upload" id="upload5"> Upload </button>
                        </div>

                        <div class = "sculptureText1" id="info5" style = "float: right;">
                            <h2>Sculpture 5</h2>
                            <p></p>
                        </div>
                    </div>

                    <div class = "section2">
                        <div class = "sculpture" style = "float: right; display: none;">
                            <img class = "photo" id="" src = "" style = "width: 100%; height: auto;">
                            <input type="file" id="" name="" style="display:none"/>
                            <button class = "upload" id=""> Upload </button>
                        </div>
                        <div class = "sculptureText2"  style = "float: left;">
                            <h2></h2>
                            <p></p>
                        </div>
                    </div>
                </div>
  }
}

async function getCoords(){
  
  let noTrailsResponse = await fetch('/getTrailCount');
  let noTrailsJson = await noTrailsResponse.json();
  let noTrails = noTrailsJson.data[0].Count;
  for(let i=1; i<=noTrails; i++){
  


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
