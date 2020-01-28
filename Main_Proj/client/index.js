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


// NEXT 2 FUNCTIONS NEED TO BE REFACTORED INTO A CLASS OF SOME SORT
document.getElementById('upload2Input').addEventListener('change', async function(){
  let data = new FormData();
  data.append('idToken', googleUser.currentUser.getAuthResponse().id_token);
  data.append('sculptureID', 1);
  data.append('picture', document.getElementById('upload2Input').files[0]);
  let api = true;
  let success = await fetch("/user/addPhoto", {
    method: 'POST',
    body: data
  }).catch(() => {
    alert("Failed to upload image to server");
    api = false;
  });
  if (!api) return;
  let successMessage = await success.json();
  alert(successMessage.data);
});


document.getElementById('upload2').addEventListener('click', async function(){
  document.getElementById('upload2Input').click();
  
});

// ***********************************************************************************************
