
let Image_SlideShows = [];


class SlideShow {
    constructor(HTMLElement) {
        this.Images = []
        this.HTMLElement = HTMLElement;
        this.SwitchDelay = 8;
        this.SlideTime = 0;
        this.CurrentSlide = 0;

        this.PastTimeDelta = 0;
        this.DeltaTime = 0;

        this.#GetChildImages();

        this.SetSlide(0);
        this.Tick();

    }

    #GetChildImages(){
        for (let i = 0; i < this.HTMLElement.children.length; i++){
            let currentElement = this.HTMLElement.children[i];
            if (this.HTMLElement.children[i].nodeName == "IMG"){
                currentElement.style.width = "100%";
                this.Images.push(currentElement);
            }
        }
    }

    SetSlide(index = 0){
        if (index >= this.Images.length || index < 0){
            return;
        }
        else {
            for (let i = 0; i < this.Images.length; i++) {
                this.Images[i].style.display = "none";
            }
            this.Images[index].style.display = "block";
            this.CurrentSlide = index;
        }
    }

    NextSlide(){
        let nextIndex = this.CurrentSlide += 1;
        if (nextIndex >= this.Images.length){
            nextIndex = 0;
        }
        this.SetSlide(nextIndex)
    }

    Tick(){
        let currentDeltaTime = performance.now()/1000;
        this.DeltaTime = currentDeltaTime - this.PastTimeDelta;
        this.PastTimeDelta = currentDeltaTime;
        this.SlideTime += this.DeltaTime;
        if (this.SlideTime > this.SwitchDelay){
            console.log("Next Slide");
            this.SlideTime = 0;
            this.NextSlide();
        }
        window.requestAnimationFrame(cb => {this.Tick()})
    }
}

function ImageSlide_Init(){
    let containers = document.getElementsByClassName("ImageSlide_Container");
    for (let i = 0; i < containers.length; i++){
        Image_SlideShows.push(new SlideShow(containers[i]));
    }

}

ImageSlide_Init();
