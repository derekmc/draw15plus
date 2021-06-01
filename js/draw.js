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
  colorIndex: 0,
  colorOpacity: 1.0,
  lineWidth: 3,
  focus: 1.0,  // to allow for "controlled draw".
  focusPos: [50,50] //  percentage position out of 100.
  fillIndex: 0,
  fillOpacity: 1.0
  background: "#fff",
  toolIndex: 0
  colors: [
    [0,0,0], // black
    [255, 0, 0], [255, 128, 0], [255, 255, 0], // red, orange, yellow
    [0, 255, 0], [0, 0, 255], [160, 0, 255], // green blue purple
    [255, 0, 160], // fuscia
    [255,255,255], // white
  ],
  tools: [
    DRAW, LINE, ARC,
    RECTANGLE, ELLIPSE, POLYGON,
    COPY, PASTE,
    REMOVE, ERASE,
  ],
  strokeInfo: {}
}
let settings = copy(SETTINGS);
UpdateStrokeInfo();

// globals: ui, drawing, settings
// origin is based on zoom
// stroke info: {winIndex, type: "line", color, width, zoompower: n(2^n)}
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
  strokes: [], // [info...] {lineWidth, windowIndex, tool, offsetIndex, color, fill}
  windows: [[0,0,0]], // [[zoompower, x0, y0, left, top, bottom, right],...] Note: x0, y0 is the window center point, left, top, bottom, right set the clipping region
  outline: [], // convex outline of drawing.
  layers: [], // [{offsets, strokes, windows, outline}]  layer and top level drawing properties reference the same objects.
  layerIndex: 0,
}

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
let ToolIndex = 0;
let Tools = 

let ColorIndex = 0;
let ColorOpacity = 1.0;
let FillIndex = 0;
let FillOpacity = 1.0;
let Colors = ['orange', 'red', 'yellow', 'green', 'blue', 'purple', 'black'];

let ShowBackLayers = 0.5;
let ShowFrontLayers = 0.25;
let LayerIndex = 0;
let Layers = []; // Points, Windows, Styles


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

function DrawAll(){
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
    let tool = 
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
