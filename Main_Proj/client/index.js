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


let image1 = new SculptureImage("https://images.pexels.com/photos/613431/pexels-photo-613431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", document.getElementById('image1'), '/user/getPhoto');
let image2 = new SculptureImage("https://images.pexels.com/photos/1251720/pexels-photo-1251720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", document.getElementById('image2'), '/user/getPhoto');
image1.refreshDatabase(googleUser.getAuthResponse().id_token, 1);
image2.refreshDatabase(googleUser.getAuthResponse().id_token, 2);

let upload1 = new UploadButton();
upload1.init(document.getElementById('upload1'), document.getElementById('upload1Input'), image1, 1, '/user/addPhoto');

let upload2 = new UploadButton();
upload2.init(document.getElementById('upload2'), document.getElementById('upload2Input'), image2, 2, '/user/addPhoto');
