
let activeScreen = null;

let showFrames = false;
let frameText;


let width = 1920;
let height = 1080;
let deltaTime = 0;
let lastTime = 0;

//Aliases
let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = loader.resources,
    Sprite = PIXI.Sprite;

let app = new PIXI.Application({ 
    width: width, 
    height: height,                       
    antialias: true, 
    resolution: 1,
    backgroundColor: 0x2C3539
  }
);

document.body.appendChild(app.view);
let scale = scaleToWindow(app.renderer.view, '#2C3539');

window.addEventListener("resize", function(event){ 
  scale = scaleToWindow(app.renderer.view, '#2C3539');
});

setup();

function setup() {


  setActiveScreen(new MapScreen());

  requestAnimationFrame(update);

}

function showFPS() {
  showFrames = true;
  frameText = new PIXI.Text('', {fontFamily: 'Arial', fontSize: 32, fill: 'white', align: 'center', stroke: 'black', strokeThickness: 2});
  frameText.x = width - 10;
  frameText.y = 10;
  frameText.anchor.set(1, 0);
  app.stage.addChild(frameText);
}

function setActiveScreen(screen) {
  if (activeScreen != null) {
    app.stage.removeChild(activeScreen.container);
  }
  activeScreen = screen;
  app.stage.addChild(activeScreen.container);
}

function update(time) {

  deltaTime = (time - lastTime) % 100;
  lastTime = time;

  activeScreen.update();

  if (showFrames) {
    frameText.text = "FPS: " + Math.floor(1000 / deltaTime);
  }

  requestAnimationFrame(update);
}



function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}
function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }

