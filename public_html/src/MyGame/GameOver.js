/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver(mNextLoad, prevLevel, time, lightType, gameType) {
    this.kUIButton = "assets/UI/buttonUI.png";
    this.mCamera = null;
    this.mMsg = null;
    
    this.mNextLoad = mNextLoad;
    this.mPrev = prevLevel;
    this.time = time;
    this.mLightType = lightType;
    this.mGameType = gameType;
    
    this.mRetry = false;
    this.mMain = false;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    
};
GameOver.prototype.unloadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    var nextlevel = null;
    if (this.mRetry)
    {
        nextlevel = new Level(this.mPrev, this.mLightType, this.mGameType);
    }
    else if (this.mMain)
    {
        nextlevel = new Main();
    }
    gEngine.Core.startScene(nextlevel); 
  //  gEngine.Core.cleanUp(); // release gl resources
};

GameOver.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.40, 0.26, 0.13, 1.0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    var sec = Math.floor(this.time/1000-Math.floor(this.time/60000)*60);
    var min = Math.floor(this.time/60000);
    var text = "Finished in: " + min + ":" + sec;
    console.log(text);
    this.mWon = new FontRenderable(this.mNextLoad);
    this.mWon.setColor([1, 1, 1, 1]);
    this.mWon.getXform().setPosition(50, 50);
    this.mWon.setTextHeight(4.5);
    
    this.mMsg = new FontRenderable(text);
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(30, 40);
    this.mMsg.setTextHeight(4);
    
    this.UIButton1 = new UIButton(this.kUIButton,this.retry,this,[250,200],[180,60],"RETRY",3,[1,1,1,1],[0,0,0,1]);
    this.UIButton2 = new UIButton(this.kUIButton,this.main,this,[550,200],[180,60],"Main Menu",3,[1,1,1,1],[0,0,0,1]);
};

GameOver.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mWon.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.UIButton1.draw(this.mCamera);
    this.UIButton2.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    this.UIButton1.update();
    this.UIButton2.update();
    if (this.mRetry || this.mMain)
        gEngine.GameLoop.stop();
};

GameOver.prototype.retry = function () {
    this.mRetry = true; 
};
GameOver.prototype.main = function () {
    this.mMain = true; 
};