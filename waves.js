const ELEMENT_SIZE = 40;
const GRID_SIZE = 5;
var theTime=0;

var states=Array(GRID_SIZE * GRID_SIZE).fill(0);


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
var isGenerator = (x,y) => x == 3 && y == 2;

//we have a drain in 2,4
var isDrain = (x,y) => x == 2 && y == 4;


//contour state init
states[index(3,2)] = 8000;


var heatMap = function(val){
    if (val==0)   return  [0,0,0];
    if (val<4)    return  [16,0,0];
    if (val<8)    return  [32,0,0];
    if (val<16)   return  [64,0,0];

    if (val<64)     return  [0,64,0];
    if (val<128)    return  [0,90,0];
    if (val<256)    return  [0,128,0];
    if (val<512)    return  [0,220,0];

    if (val<1024)      return  
    if (val<2048)      return  [0,64,64];
    if (val<4096)      return  [0,128,128];
    if (val<8192)      return  [0,255,255];    
    return [255,255,255];

}

var paintElement= function (x,y,c){
    
    var val = state(x,y);
    let rgb = heatMap(val);
    let R=rgb[0];
    let G=rgb[1];
    let B=rgb[2];
    
    c.fillStyle='rgb('+R+','+G+','+B+')';
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

var update = function(){
    var el = document.getElementById("theTime");
    el.innerHTML=theTime+"";
    
    for(var x=0;x<GRID_SIZE;x++){
        for(var y=0;y<GRID_SIZE;y++){
            var emit = Math.random()*state(x,y) > 1;
            var direction = [[1,0],[-1,0],[0,1],[0,-1]][parseInt(Math.random()*4)];
            var delta = state(x,y)>=ELEMENT_SIZE*2 ? ELEMENT_SIZE : parseInt(state(x,y)/2);
            if(emit) 
                if(x+direction[0]>=0 && x+direction[0]<GRID_SIZE)
                    if(y+direction[1]>=0 && y+direction[1]<GRID_SIZE)
                        if(state(x+direction[0],y+direction[1])+delta<=state(x,y))
                            incr(x+direction[0],y+direction[1],decr(x,y,delta));
                    
                        
        }
    }

    
}




var main = function(canvas){    
    setInterval(()=>{theTime++;update(),repaint()},1000);
}
