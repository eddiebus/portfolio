/*
Filters Content on Webpage by language.
Elements that should be filtered need:
> The holding container to have [LangSwap] class and [Lang] set
> Child Elements to have [Lang] set
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
    #HolderElements = [];
    #PageDIVS = [];
    constructor() {
        this.#CurrentLanguage = navigator.language;
        this.#CurrentLanguage = this.#CurrentLanguage.substring(0,2);
        this.#HolderElements = document.getElementsByClassName("LangSwap");
        this.#PageDIVS = document.getElementsByTagName("div");

        console.log(`
        LangSwap Class Init:
        Default Language : ${this.#CurrentLanguage}
        Elements : ${this.#HolderElements};
        `)

        this.#FilterContent();


        for (let i = 0; i < this.#HolderElements.length; i++){
            this.#HolderElements[i].lang = navigator.language;
        }


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