
const GRID_SIZE = 9;
const ELEMENT_SIZE = 800 / GRID_SIZE;
var process;
var theTime;

var states;

var index = (x,y) => x*GRID_SIZE + y;
var state  = (x,y) => states[index(x,y)];

var incr = function(x,y,delta){
    if(!isDrain(x,y))
        states[index(x,y)] += delta;

    return delta;
}

var decr = function(x,y,delta){
    if(!isGenerator(x,y))
        states[index(x,y)] -= delta;

    return delta;
}


//we have a generator in 3,2
var isGenerator = (x,y) => false; //x == 1 && y == 1;

//we have a drain in 2,4
var isDrain = (x,y) => false; //x == 2 && y == 4;


var energy = ()=> states.reduce((acc, val) => acc + val);




var heatMap = function(val){
    if (val==0)   return   "black";
    if (val<64)    return  "darkblue";


    if (val<256)    return  "darkred";
    if (val<512)    return  "darkgreen";

    if (val<4096)      return  "darkyellow";
    if (val<8192)      return  "yellow";    
    return "white";

}

var paintElement= function (x,y,c){
    
    var val = state(x,y);

    
    c.fillStyle=heatMap(val);
    c.fillRect(x*ELEMENT_SIZE,y*ELEMENT_SIZE,ELEMENT_SIZE,ELEMENT_SIZE);
    c.strokeStyle='#ffffff';
    c.strokeRect(x*ELEMENT_SIZE,y*ELEMENT_SIZE,ELEMENT_SIZE,ELEMENT_SIZE);
    c.fillStyle = "#FFFFFF";
    c.fillText(state(x,y), x*ELEMENT_SIZE+5,y*ELEMENT_SIZE+10);
}


var repaint=function(){
    var c = canvas.getContext('2d');
    for(var x=0;x<GRID_SIZE;x++)
        for(var y=0;y<GRID_SIZE;y++)
            paintElement(x,y,c);
}


/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var update = function(){

    var timeEl = document.getElementById("theTime");
    timeEl.innerHTML=theTime+"";
    var energyEl = document.getElementById("energy");
    energyEl.innerHTML=energy()+"";

    
    for(var x=0;x<GRID_SIZE;x++){
        for(var y=0;y<GRID_SIZE;y++){
            var directions = [[1,0],[-1,0],[0,1],[0,-1]];
            shuffleArray(directions);
            for (i=0;i<directions.length;i++){
                
                let dx = directions[i][0];
                let dy = directions[i][1];
                let delta = state(x,y) - state(x+dx, y+dy);
                delta = delta < 0 ? 0 : delta;

                //if delta <= 0 -> prob = 0
                //if delta ~= state -> prob ~= 1
                let prob = delta / state(x,y);

                let emission =  Math.ceil(delta * 0.1); 
                let totEnergy=energy();

                if(Math.random() <= prob) // we have emission here!! 
                    if(x+dx>=0 && x+dx<GRID_SIZE && y+dy>=0 && y+dy<GRID_SIZE)//be in boundaries
                        if(state(x+dx,y+dy)+emission*2<=state(x,y)){
                            incr(x+dx,y+dy,decr(x,y,emission));                            
                            break;
                        }

            }
            

                    
                        
        }
    }

    
}


var stop=function(){
    clearInterval(process);
}
var resume=function(){
    process = setInterval(()=>{theTime++;update(),repaint()},200);
}

var main = function(canvas){  
    theTime = 0;
    states=Array(GRID_SIZE * GRID_SIZE).fill(0);  
    //contour state init
    center = Math.floor(GRID_SIZE/2);
    states[index(center,center)] = 9000;
    resume(); 
}
