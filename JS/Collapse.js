
function CollToggle(element) {
    element.classList.toggle("active");
    let content = element.nextElementSibling;

    console.log("Collap Pressed");
}



function init() {
    let Coll_Elements = document.getElementsByClassName("Collapsible")



    for (let i = 0; i < Coll_Elements.length; i++) {
        console.log("!!!!");
        Coll_Elements[i].addEventListener('click', CollToggle(this))
    }
}