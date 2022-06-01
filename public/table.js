const button = document.getElementById("btn");
const list = document.getElementById("list");

list.style.display = "none";

button.addEventListener("click", (event) {
    if (list.style.display == "none") {
        list.style.display = "block";
    } else {
        list.style.display == "none";
    }
})

var closebtns = document.getElementsByClassName("close");
var i;

for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function() {
        this.parentElement.style.display = 'none';
    });
}