// constants
const PRE = "DRAW15DATA";
const DRAW = "draw",
      LINE = "line",
      ARC = "arc",
      RECTANGLE = "rectangle",
      ELLIPSE = "ellipse",
      POLYGON = "polygon",
      COPY = "copy",
      PASTE = "paste",
      REMOVE = "remove",
      ERASE = "erase";


const SETTINGS = { // default settings
  lineWidth: 3,
  focus: 1.0,  // to allow for "controlled draw".
  focusPos: [50,50], //  percentage position out of 100.
  fillIndex: 0,
  fillOpacity: 1.0,
  colorIndex: 0,
  colorOpacity: 1.0,
  background: "#fff",
  colors: [
    [0,0,0], // black
    [255, 0, 0], [255, 128, 0], [255, 255, 0], // red, orange, yellow
    [0, 255, 0], [0, 0, 255], [160, 0, 255], // green blue purple
    [255, 0, 160], // fuscia
    [255,255,255], // white
  ],

  toolIndex: 0,
  tools: [
    DRAW, LINE, ARC,
    RECTANGLE, ELLIPSE, POLYGON,
    COPY, PASTE,
    REMOVE, ERASE,
  ],

  strokeInfo: {}

  //constants
  DrawDelay: 1000/20,

}
let settings = copy(SETTINGS);
let StrokeRequiredProperties = {windowIndex: "number", tool: "string", offsetStart: "number", offsetEnd: "number"};
let StrokeOptionalProperties = {color: "string", fill: "string", lineWidth: "number"}; 
UpdateStrokeInfo();

// globals: ui, drawing, settings
// origin is based on zoom
// stroke info: {winIndex, tool: "line", color, width, zoompower: n(2^n)}
// windows: [x0, y0, x1, y1, ...],
// points array has the stroke info, followed by the stroke offsets.

// TODO foreground and backgrounds
let ui = {
  canvas: null,
  buffer: null,
  foreground: null, // foreground layers
  background: null, // background layers
  grid: null, // TODO make a fractal
  mouseDownPos: null,
  lastMouse: null,
  lastDraw: null,
}

let drawing = {
  name: "mydrawing",
  offsets: [], // [dx, dy, dx, dy...]
  strokes: [], // [info...] {lineWidth, windowIndex, tool, offsetStart, offsetEnd, color, fill}
  windows: [[0,0,0]], // [[zoompower, x0, y0, left, top, right, bottom],...] Note: x0, y0 is the window center point, left, top, bottom, right set the clipping region
  outline: [], // convex outline of drawing.
  layers: [], // [{offsets, strokes, windows, outline}]  layer and top level drawing properties reference the same objects.
  layerIndex: 0,
}

/*
let Points = []; //"0", 2, 3, 
let Windows = []; // x0, y0, x1, y1....
let Styles = [];
let LastPointTime = 0;
let LastDrawTime = 0;
let StrokeInfo = {width: 3, color: 'black', fill: "rgba(255,255,255,0.5)", tool: "draw"};
let FocusX = 1; // focus multiplier
let FocusPos = [];
let MouseDownPos = null;

// settings

let ColorIndex = 0;
let ColorOpacity = 1.0;
let FillIndex = 0;
let FillOpacity = 1.0;
let Colors = ['orange', 'red', 'yellow', 'green', 'blue', 'purple', 'black'];

let ShowBackLayers = 0.5;
let ShowFrontLayers = 0.25;
let LayerIndex = 0;
let Layers = []; // Points, Windows, Styles
*/


window.addEventListener("load", Init);

// functions which access global variables
function Init(){
  Canvas = document.getElementById("canvas0");
  Buffer = document.createElement("canvas");
  Background = document.createElement("canvas");
  Foreground = document.createElement("canvas");
  window.addEventListener("mousedown", MouseDown);
  window.addEventListener("mousemove", MouseMove);
}

function Resize(){
}

function DrawLastStroke(){
}

function checkProperties(obj, required, optional){
  let all = {};
  for(let propname in optional){
    all[propname] = optional[propname];
  }
  for(let propname in required){
    let typename = required[propname];
    if(!obj.hasOwnProperty(propname)){
      throw new Error(`Property '${propname}' missing.`);
    }
  }
  for(let propname in all){
    let value = obj[propname];
    if(!obj.hasOwnProperty(propname)){
      continue;
    }
    let valuetype = typeof value;
    if(typename == "string" || typename == "number"){
      if(typename != valuetype){
        throw new Error(`Property '${propname}' should be '${typename}', got '${valuetype}'`);
      }
    }
    if(typename == "array"){
      if(!Array.isArray(value)){
        throw new Error(`Property '${propname}' should be 'array', got '${valuetype}'`);
      }
    }
    if(typename == "object"){
      if(valuetype != "object"){
        throw new Error(`Property '${propname}' should be 'object', got '${valuetype}'`);
      }
      if(Array.isArray(value)){
        throw new Error(`Property '${propname}' should be 'object', got 'array'`);
      }
    }
  }
}

function DrawAll(){
  let ctx = Canvas.getContext("2d");
  for(let i=0; i<drawing.strokes.length; ++i){
    let stroke = drawing.strokes[i];
    checkProperties(stroke, StrokeRequiredProperties, StrokeOptionalProperties);
    let start = stroke.offsetStart;
    let end = stroke.offsetEnd;
    let win = drawing.windows[stroke.windowIndex];
    let zoom = Math.pow(2, win[0])
    let x = win[1];
    let y = win[2]; 
    let left = win[3];
    let top = win[4];
    let right = win[5];
    let bottom = win[6];
    ctx.lineWidth = stroke.lineWidth? stroke.lineWidth : 2;
    ctx.strokeStyle = stroke.color? stroke.color : "#000";


    ctx.beginPath();
    for(let j=start; j<end; j+=2){
      let dx = drawing.offsets[j];
      let dy = drawing.offsets[j + 1];
      x += dx;
      y += dy;
      if(j == start){
        ctx.moveTo(x, y); }
      else{
        ctx.lineTo(x, y); }
    }
    ctx.stroke();
  }
}

// useful for showing zoom and pan, especially when 
function DrawGrid(){
}

function Animate(){
}



function SaveDrawing(){
}

function SaveSettings(){
}

function LoadDrawing(){
}

function LoadSettings(){
}

function UpdateStrokeInfo(){
  let info = settings.strokeInfo = {};
  info.lineWidth = settings.lineWidth;
  info.tool = settings.tools[settings.toolIndex];
  let colorArray = settings.colors[settings.colorIndex];
  info.color = colorToString(colorArray, settings.colorOpacity);
  if([RECTANGLE, ELLIPSE, POLYGON].includes(info.tool)){
    colorArray = settings.colors[settings.fillIndex];
    info.fill = colorToString(colorArray, settings.fillOpacity);
  }
  info.windowIndex = drawing.windows.length - 1;
}

/*
function Save(){
  let prefix = PRE + "-" + DrawingName;
  localStorage[prefix + "-Windows"] = JSON
}

function Load(){
  let prefix = PRE + DrawingName;
  set
}
*/

function MouseDown(ev){
  
  
}

function MouseMove(ev){
  if(ui.mouseDownPos){
    let tool = settings.tools[settings.toolIndex];
    let now = Date.now();
    let dt = now - ui.lastDraw;
    if(dt < settings.DrawDelay){
      return;
    }
 
    if(tool == DRAW){


    }
    //} else if (tool == LINE){
    //} else if (tool == ARC){

  }
}



// utility functions
function colorToString(arr, opacity){
  if(opacity == undefined) opacity = 1.0;
  return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${Math.floor(100*opacity)/100})`;
}
function parse(s){
  return JSON.parse(s):
}
function stringify(){
  return JSON.stringify
}
function copy(x){
  return JSON.parse(JSON.stringify(x));
}
