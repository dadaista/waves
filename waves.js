const ELEMENT_SIZE = 20;
const GRID_SIZE = 30;
var theTime=0;

var states=Array(GRID_SIZE * GRID_SIZE);


var index = (x,y) => x*GRID_SIZE + y;
var state  = (x,y) => states[index(x,y)] === undefined ? Array(0) : states[index(x,y)];
var energy = (x,y) => state(x,y).length;
var pop = function(x,y){
    return state(x,y).pop();
}
var push = function(x,y,val){
    if (energy(x,y) == 0) states[index(x,y)] = Array(0);
    return states[index(x,y)].push(val);
}
//contour state init
states[index(1,1)] = Array(70000).fill(1);
states[index(10,10)] = Array(50000).fill(1);

var paintElement= function (x,y,c){
    
    var val = energy(x,y);
    let R=parseInt(val >= 256*256 ? 128 + (val / (256*256*2)) : 0 );
    let G=parseInt(val< 256*256 && val>=256 ? 128 + (val / 512)  : 0);
    let B=parseInt(val<256 ? 50 + val/2 : 0);
    
    c.fillStyle='rgb('+R+','+G+','+B+')';
    c.fillRect(x*ELEMENT_SIZE,y*ELEMENT_SIZE,ELEMENT_SIZE,ELEMENT_SIZE);
    c.strokeStyle='#ffffff';
    c.strokeRect(x*ELEMENT_SIZE,y*ELEMENT_SIZE,ELEMENT_SIZE,ELEMENT_SIZE);
    c.fillStyle = "#FFFFFF";
    c.fillText(energy(x,y), x*ELEMENT_SIZE+5,y*ELEMENT_SIZE+10);
}


var repaint=function(){
    var c = canvas.getContext('2d');
    for(var x=0;x<GRID_SIZE;x++)
        for(var y=0;y<GRID_SIZE;y++)
            paintElement(x,y,c);
}

var update = function(){
    var el = document.getElementById("theTime");
    el.innerHTML=theTime+"";
    
    for(var x=0;x<GRID_SIZE;x++){
        for(var y=0;y<GRID_SIZE;y++){
            var emit = Math.random()*energy(x,y) > 1;
            var direction = [[1,0],[-1,0],[0,1],[0,-1]][parseInt(Math.random()*4)];
            if(emit) 
                if(x+direction[0]>=0 && x+direction[0]<GRID_SIZE)
                    if(y+direction[1]>=0 && y+direction[1]<GRID_SIZE)
                        push(x+direction[0],y+direction[1],pop(x,y));
        }
    }

    
}




var main = function(canvas){    
    setInterval(()=>{theTime++;update(),repaint()},1000);
}
