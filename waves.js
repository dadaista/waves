const ELEMENT_SIZE = 40;
const GRID_SIZE = 4;
var theTime=0;

var states=Array(GRID_SIZE * GRID_SIZE).fill(40);
var tmpStates=Array(GRID_SIZE * GRID_SIZE);


var index = (x,y) => x*GRID_SIZE + y;

 

//contour state init
states[index(1,1)] = 120;

var paintElement= function (x,y,c){
    let energy = states[index(x,y)];

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

    tmpStates[0]=2;
    for(var x=0;x<GRID_SIZE;x++){
        for(var y=0;y<GRID_SIZE;y++){
            tmpStates[index(x,y)] = states[index(x,y-1)]===undefined?0:states[index(x,y-1)];
        }
    }

    console.log(tmpStates);
    states = tmpStates;
    
}




var main = function(canvas){    
    setInterval(()=>{theTime++;update();repaint();},1000);
}
