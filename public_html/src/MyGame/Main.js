/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, SpriteAnimateRenderable,Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Main() {  
    this.kUIButton = "assets/button.png";
    this.kLlamaHead = "assets/llama_head.png";
    this.kMazeImage= "assets/maze_image.png";
    this.kTitle = "assets/title.png";
    // The cameras to view the level
    this.mCamera = null;
    this.mTitle = null;
    this.mStart = false;
    this.mLightPref = "bright";
    this.mGamePref = "time";
    
}
gEngine.Core.inheritPrototype(Main, Scene);


Main.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kTitle);
    gEngine.Textures.loadTexture(this.kLlamaHead);
    gEngine.Textures.loadTexture(this.kMazeImage);

};

Main.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kTitle);
    gEngine.Textures.unloadTexture(this.kLlamaHead);
    gEngine.Textures.unloadTexture(this.kMazeImage);

    var nextlevel = null;
    if(this.mStart){
        nextlevel = new Level('playtest_00', this.mLightPref, this.mGamePref);;
    }
    gEngine.Core.startScene(nextlevel);
};

Main.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.32, 0.08, 0.03, 1.0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    //background
    this.bg = new TextureRenderable(this.kMazeImage);
    this.bg.getXform().setSize(200,160);
    this.bg.getXform().setPosition(50,40);
    //title
    this.mTitle = new SpriteRenderable(this.kTitle);
    this.mTitle.setColor([1, 1, 1, 0]);
    this.mTitle.getXform().setPosition(50, 55);
    this.mTitle.getXform().setSize(80, 30);
    this.mTitle.setElementPixelPositions(0, 512, 0, 128);
    //llama
    this.mLlama = new SpriteRenderable(this.kLlamaHead);
    this.mLlama.setColor([1, 1, 1, 0]);
    this.mLlama.getXform().setPosition(20, 25);
    this.mLlama.getXform().setSize(50, 50);
    this.mLlama.setElementPixelPositions(0, 512, 0, 512);

    //start button
    this.UIButton1 = new UIButton(this.kUIButton,this.start,this,[400,270],[200,70],"PLAY",4.5,[1,1,1,1],[0,0,0,1]);
    //game preference 
    this.UIDDButtonGame = new UIDropDown([480,200],"GAME TYPE",3,[0,0,0,1],[1,1,1,1]);
    this.UIDDButtonGame.addToSet("TIME",[0,0,0,1],[1,1,1,1],this.setToTime,this,this.mCamera);
    this.UIDDButtonGame.addToSet("CHASE",[0,0,0,1],[1,1,1,1],this.setToChase,this,this.mCamera);
    //light preference
    this.UIDDButtonLight = new UIDropDown([480,120],"LIGHT TYPE",3,[0,0,0,1],[1,1,1,1]);
    this.UIDDButtonLight.addToSet("BRIGHT",[0,0,0,1],[1,1,1,1],this.setToBright,this,this.mCamera);
    this.UIDDButtonLight.addToSet("DIM",[0,0,0,1],[1,1,1,1],this.setToDim,this,this.mCamera);
    this.UIDDButtonLight.addToSet("DARK",[0,0,0,1],[1,1,1,1],this.setToDark,this,this.mCamera);
};

Main.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera);      //draw floor

};
Main.prototype.drawCamera = function(camera) {
    //Setup the camera
    camera.setupViewProjection();
    this.bg.draw(camera);
    this.mLlama.draw(camera);
    this.UIButton1.draw(camera);
    this.mTitle.draw(camera);
    this.UIDDButtonGame.draw(camera);
    this.UIDDButtonLight.draw(camera);
};

Main.prototype.update = function () {
    this.UIButton1.update();
    this.UIDDButtonGame.update(this.mCamera);
    this.UIDDButtonLight.update(this.mCamera);
    if (this.mStart)
        gEngine.GameLoop.stop();

};
Main.prototype.start = function () {
    this.mStart = true;
};
Main.prototype.setToTime = function () {
    this.mGamePref = "time";
};
Main.prototype.setToChase = function () {
    this.mGamePref = "chase";
};
Main.prototype.setToBright = function () {
    this.mLightPref = "bright";
};
Main.prototype.setToDim = function () {
    this.mLightPref = "dim";
};
Main.prototype.setToDark = function () {
    this.mLightPref = "dark";
};