const ELEMENT_SIZE = 40;
const GRID_SIZE = 80;
const INITIAL_ENERGY=255;
var theTime=0;

var actualStates=Array(GRID_SIZE * GRID_SIZE);
var tmpStates = Array(GRID_SIZE * GRID_SIZE);

var getState=function(x,y){
    let idx=x*GRID_SIZE + y;
    if (actualStates[idx] === undefined) return 0;
    return actualStates[idx];
}

var setState=function(x,y,val){
    let idx=x*GRID_SIZE + y;
    actualStates[idx] = val;
}

var setTmpState=function(x,y,val){
    let idx=x*GRID_SIZE + y;
    tmpStates[idx] = val;
}



var paintElement= function (x,y,c){
    let energy = getState(x,y);
    c.fillStyle='rgb('+energy+',0,0)';
    c.fillRect(x*ELEMENT_SIZE,y*ELEMENT_SIZE,ELEMENT_SIZE,ELEMENT_SIZE);
    c.strokeStyle='#ffffff';
    c.strokeRect(x*ELEMENT_SIZE,y*ELEMENT_SIZE,ELEMENT_SIZE,ELEMENT_SIZE);
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
}




var main = function(canvas){    
    setInterval(()=>{theTime++;update();repaint();},1000);
}
