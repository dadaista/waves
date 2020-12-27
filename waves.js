const ELEMENT_SIZE = 40;
const GRID_SIZE = 80;

var paintElement= function (x,y,c){
    let energy = getEnergy(x,y);
    c.fillStyle='rgb('+energy+',0,0)';
    c.fillRect(x*ELEMENT_SIZE,y*ELEMENT_SIZE,ELEMENT_SIZE,ELEMENT_SIZE);
    c.strokeStyle='#ffffff';
    c.strokeRect(x*ELEMENT_SIZE,y*ELEMENT_SIZE,ELEMENT_SIZE,ELEMENT_SIZE);
}
var main = function(canvas){
    var c = canvas.getContext('2d');
    for(var x=0;x<GRID_SIZE;x++)
        for(var y=0;y<GRID_SIZE;y++)
            paintElement(x,y,c);
}


var getEnergy=function(x,y){
    return 122;
}

