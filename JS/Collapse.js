
function CollToggle(event) {
    console.log(event.target);
    let content = event.target.nextElementSibling;

    if (content.style.display === "block"){
        content.style.display = "none";
    }
    else {
        content.style.display = "block";
    }
    console.log("Collapse Box Pressed");
}



function init() {
    let Coll_Elements = document.getElementsByClassName("Collapsible")

    for (let i = 0; i < Coll_Elements.length; i++) {
        Coll_Elements[i].addEventListener('click', CollToggle)
    }
}