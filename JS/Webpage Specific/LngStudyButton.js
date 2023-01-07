const Languages = ["en", "jp"];
let currentLang = 0;
let targetElement = document.getElementById("LNGStudyAbout")


let allDivs = document.getElementsByClassName("TextBubble")

for (let i in allDivs){
    if (allDivs[i] instanceof  HTMLElement) {
        allDivs[i].classList.add("LangSwap");
        allDivs[i].lang = Languages[0];
    }
}


function changeLang(){
    currentLang += 1;
    if (currentLang >= Languages.length){
        currentLang = 0;
    }
    let targets = document.getElementsByClassName("LangSwap");
    for (let i in targets){
        targets[i].lang = Languages[currentLang];
    }
    targetElement.lang = Languages[currentLang];
}

targetElement.addEventListener("click", (event) => { changeLang(); })