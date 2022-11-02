let time = {
    deltaTime: 0,
    pastTime: 0,
}

let BubbleBGElement;
let BubbleBGCanvas;
let BubbleBGCanvasSize = [0,0];

let Bubbles = [];
let SpawnTime = [0,200];

function BubbleBG_Init(CanvasID) {
    BubbleBGElement = document.getElementById(CanvasID);


    if (BubbleBGElement){
        BubbleBGCanvas = BubbleBGElement.getContext('2d');
    }
    window.requestAnimationFrame(BubbleBG_Tick);
}

class Bubble {
    constructor() {
        this.radius = Math.random() * (30) + 20;

        this.x = window.innerWidth * Math.random();
        this.y = window.innerHeight + this.radius;

        this.xDirAngle = Math.random() * 360;
        this.turnSpeed = Math.random() * 20;
        this.riseSpeed = Math.random() * (0.1) + 0.05;

        this.lifeTime = 0;
        this.maxLifeTime = 20;
    }

    Tick(deltaTime){
        this.lifeTime += deltaTime/100;
        this.y -= this.riseSpeed * deltaTime;
    }

    Render(Canvas2D){
        Canvas2D.beginPath();
        Canvas2D.arc(this.x,this.y,this.radius,0,360);
        let maxOpacity = 0.2;
        let opacity = maxOpacity -  (maxOpacity * (this.lifeTime / this.maxLifeTime));
        Canvas2D.fillStyle = `rgba(0,0,255,${opacity})`
        Canvas2D.fill();

    }
}

function BubbleBG_Tick(timeNow){
    time.deltaTime = timeNow - time.pastTime;
    time.pastTime = timeNow;
    console.log(`DeltaTime = ${time.deltaTime}|Bubbles = ${Bubbles.length}| SpawnTime = ${SpawnTime[0]}`)


    BubbleBGCanvas.clearRect(0,0,window.innerWidth,window.innerHeight);
    BubbleBGCanvas.canvas.width = window.innerWidth;
    BubbleBGCanvas.canvas.height = window.innerHeight;


    SpawnTime[0] = SpawnTime[0] - (time.deltaTime);
    if (SpawnTime[0] <= -0 ){
        Bubbles.push(new Bubble())
        SpawnTime[0] = SpawnTime[1];
    }

    for (let i = 0; i < Bubbles.length;i++){

        Bubbles[i].Tick(time.deltaTime);
        Bubbles[i].Render(BubbleBGCanvas);

        if (Bubbles[i].lifeTime > Bubbles[i].maxLifeTime * 2){
            let tempArray = Bubbles;
            tempArray.splice(i,1);
            Bubbles = tempArray;
        }
    }

    window.requestAnimationFrame(BubbleBG_Tick);
}