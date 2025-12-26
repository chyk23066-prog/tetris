let manager;
let handler;
let canvas;

function setup() {
    manager = new GameManager();
    if (manager.inputHandler) {
        handler = manager.inputHandler;
    } else {
        handler = new InputHandler(manager);
    }
    createDisplay();
}

function draw() {
    background(255);
    manager.update();
    manager.render();
    if (handler) handler.update();
}

function keyPressed(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)){
        e.preventDefault();
    }
    if (handler) handler.onKeyDown(e.key);
}

function keyReleased(e) {
    if (handler) handler.onKeyUp(e.key);
}

// ★追加: マウスがクリックされたらhandlerに伝える
function mousePressed() {
    if (handler) handler.onMousePressed();
    handler.useItem();
}

function createDisplay() {
    const boardWidth = 16;
    const boardHeight = 22;
    let w = windowWidth;
    let h = windowHeight;
    if (!w) w = document.body.clientWidth || 800;
    if (!h) h = document.body.clientHeight || 600;
    let blockSize = floor(min(w / boardWidth, h / boardHeight));
    if (blockSize < 1) blockSize = 20;

    if (canvas) {
        resizeCanvas(blockSize * boardWidth, blockSize * boardHeight);
    } else {
        canvas = createCanvas(blockSize * boardWidth, blockSize * boardHeight);
    }
    if (manager) manager.setBlockSize(blockSize);
}

function windowResized() { createDisplay(); }