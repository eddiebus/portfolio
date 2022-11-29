let time = {
    deltaTime: 0,
    pastTime: 0,
}

let BubbleBGElement;
let BubbleBGCanvas;
let BubbleBGCanvasSize = [0,0];

let Bubbles = [];
let SpawnTime = [0,100];

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

        this.xDirRadian = Math.random() * 6;
        this.turnSpeed = Math.random() * 0.002;
        this.turnDir = Math.round(Math.random()) * 2 -1; //Generate random number between -1 and 1
        this.riseSpeed = Math.random() * (0.1) + 0.05;

        this.lifeTime = 0;
        this.maxLifeTime = 20;
    }

    Tick(deltaTime){
        this.lifeTime += deltaTime/100;
        this.y -= this.riseSpeed * deltaTime;

        this.xDirRadian += this.turnSpeed * this.turnDir * deltaTime;

        this.x += Math.cos(this.xDirRadian) * this.riseSpeed * 10;
    }

    Render(Canvas2D){
        Canvas2D.beginPath();
        Canvas2D.arc(this.x,this.y,this.radius,0,360);
        let maxOpacity = 0.8;
        let opacity = maxOpacity -  (maxOpacity * (this.lifeTime / this.maxLifeTime));
        Canvas2D.fillStyle = `rgba(46,72,226,${opacity})`
        Canvas2D.fill();

    }
}

function BubbleBG_Tick(timeNow){
    time.deltaTime = timeNow - time.pastTime;
    time.pastTime = timeNow;


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