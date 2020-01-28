var pageIndex = 1;
showPages(pageIndex);

// Next/previous controls
function plusPages(n) {
  showPages(pageIndex += n);
}

// For page skip features
function currentPage(n) {
  showPages(pageIndex = n);
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

function postImage() {
    alert("flag")
}


let upload2 = new UploadButton();
upload2.init(document.getElementById('upload2'), document.getElementById('upload2Input'), 1, '/user/addPhoto');
