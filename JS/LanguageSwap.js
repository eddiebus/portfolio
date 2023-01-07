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
    //HTML Elements who's children should be filtered.
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

    #GetChildElements(HTMLElement){
        let returnArray = []
        for (let child in HTMLElement.children){
            if (HTMLElement.children[child].style.lang){
                returnArray.push(HTMLElement.children[child]);
            }
        }

        return returnArray;

    }
    #FilterContent(){
        debugger;

        for (let element in this.#HolderElements){
            let childElements = this.#GetChildElements(this.#HolderElements[element]);
            for (let i in childElements){
                if (childElements[i].style.display != this.#CurrentLanguage) {
                    childElements[i].style.display = "none";
                }
                else{
                    childElements[i].style.display = "block";
                }
            }
        }
    }

    SetLang(newLang){
        this.#CurrentLanguage = newLang;
    }
}


const LangSwapper = new LangSwap();