/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver() {
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.unloadScene = function () {
    gEngine.Core.cleanUp(); // release gl resources
};

GameOver.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.40, 0.26, 0.13, 1.0]);

    // this.mText = new FontRenderable("This is green text");
    this.mMsg = new FontRenderable("Game Over!");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(40, 40);
    this.mMsg.setTextHeight(4.5);
};

GameOver.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    gEngine.GameLoop.stop();
};