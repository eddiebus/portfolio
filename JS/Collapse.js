
function CollToggle(event) {
    let content = event.target.nextElementSibling;
    let currentStyle = content.style.display;
    console.log(currentStyle);
    if (content.style.display == "block"){
        content.style.display = "none";
    }
    else {
        content.style.display = "block";
    }
}



function CollapseInit() {
    let Coll_Elements = document.getElementsByClassName("Collapsible")

    for (let i = 0; i < Coll_Elements.length; i++) {
        Coll_Elements[i].addEventListener('click', CollToggle)
    }
}