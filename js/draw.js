
// constants
const PRE = "DRAW15DATA";

// globals

// origin is based on zoom
// stroke info: {winIndex, type: "line", color, width, zoompower: n(2^n)}
// windows: [x0, y0, x1, y1, ...],
// points array has the stroke info, followed by the stroke offsets.

let ;
let DrawingName = "mydrawing";
let Points = [];
let Windows = []; // x0, y0, x1, y1....
let LastPointTime = 0;
let LastDrawTime = 0;
let StrokeInfo = {width: 3, color: black,};
let FocusX = 1; // focus multiplier
let MouseDownPos = null;
let Canvas = null;
let Buffer = null;
let Colors = ['orange', 'red', 'yellow', 'green', 'blue', 'purple', 'black'];


window.addEventListener("load", Init);

// functions which access global variables
function Init(){
  Canvas = document.getElementById("canvas0");
  Buffer = document.createElement("canvas");
  window.addEventListener("mousedown", MouseDown);
  window.addEventListener("mousemove", MouseMove);
}

function Resize(){
}

function DrawLastStroke(){
}

function DrawAll(){
}

function Animate(){
}



function Save(){
  let prefix = PRE + "-" + DrawingName;
  localStorage[prefix + "-Windows"] = JSON
}

function Load(){
  let prefix = PRE + DrawingName;
  set
}

function MouseDown(ev){
}

function MouseMove(ev){
  
}



// 
function parse(s){
  return JSON.parse(s):
}
function stringify(){
  return JSON.stringify
}
