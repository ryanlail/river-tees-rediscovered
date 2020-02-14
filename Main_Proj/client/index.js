'use strict';

var pageIndex = 1;
showPages(pageIndex);
let currentUser = undefined;

async function onSignIn (googleUser) {
  currentUser = googleUser;
  initUi();
}

// Next/previous controls
function plusPages(n) {
  showPages(pageIndex += n);
}

// For page skip features
function currentPage(n) {
  showPages(pageIndex = n);
}

function openMap() {
  document.getElementById("map").style.display = "block";
}

function closeMap() {
  document.getElementById("map").style.display = "none";
}

function showPages(n) {
  var i;
  var pages = document.getElementsByClassName("page");
  if (n > pages.length) {pageIndex = 1} 
  if (n < 1) {pageIndex = pages.length}
  for (i = 0; i < pages.length; i++) {
      pages[i].style.display = "none"; 
  }
  pages[pageIndex-1].style.display = "block"; 
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
