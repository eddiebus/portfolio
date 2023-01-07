/*
Gives a filter to only show certain language content at a time.
 */

class LangSwapContainer {
    #Element = null
    #ChildElements = []
    #DisplayIndex = 0
    constructor() {
    }
}

class LangSwap {
    #CurrentLanguage = "en";
    //HTML Elements whose children should be filtered.
    #HolderElements
    constructor() {
        this.#CurrentLanguage = navigator.language;
        this.#CurrentLanguage = this.#CurrentLanguage.substring(0,2);
        this.#HolderElements = document.getElementsByClassName("LangSwap");


        console.log(`
        LangSwap Class Init:
        Default Language : ${this.#CurrentLanguage}
        Elements : ${this.#HolderElements};
        `)

        this.#FilterContent();
    }

    #GetChildElements(targetElement){
        let returnArray = []
        for (let child in targetElement.children){
            let element = targetElement.children[child];
            if (element instanceof HTMLElement){
                let elementLang = element.lang;
                if (elementLang) {
                    returnArray.push(targetElement.children[child]);
                }
            }
        }
        return returnArray;

    }
    #FilterContent(){
        for (let element in this.#HolderElements){
            let container = this.#HolderElements[element];
            let containerLanguage =  container.lang;
            if (containerLanguage) {
                let childElements = this.#GetChildElements(this.#HolderElements[element]);
                for (let i in childElements) {
                    if (childElements[i].lang != containerLanguage) {
                        childElements[i].style.display = "none";
                    } else {
                        childElements[i].style.display = "block";
                    }
                }
            }
        }


        window.requestAnimationFrame(cb => {
            this.#FilterContent();
        })
    }

    SetLang(newLang){
        this.#CurrentLanguage = newLang;
    }
}

const LangSwapper = new LangSwap();