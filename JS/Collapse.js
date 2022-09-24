
function CollToggle(event) {
    let content = event.target.nextElementSibling;
    let currentStyle = content.style.display;
    console.log(currentStyle);

    event.target.classList.toggle("active");
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    }
    else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function CollapseInit() {
    let Coll_Elements = document.getElementsByClassName("Collapsible")

    for (let i = 0; i < Coll_Elements.length; i++) {
        Coll_Elements[i].addEventListener('click', CollToggle)
    }
}