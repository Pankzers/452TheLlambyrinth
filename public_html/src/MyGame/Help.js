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

function Help() {  
    this.kUIButton = "assets/button.png";
    this.kMazeImage= "assets/maze_image.png";
    this.kKeys= "assets/keys.png";
    // The cameras to view the level
    this.mCamera = null;
    this.mBack = false;
    
}
gEngine.Core.inheritPrototype(Help, Scene);


Help.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kMazeImage);
    gEngine.Textures.loadTexture(this.kKeys);

};

Help.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kMazeImage);
    gEngine.Textures.unloadTexture(this.kKeys);

    var nextlevel = null;
    if(this.mBack){
        nextlevel = new Main();
    }
    gEngine.Core.startScene(nextlevel);
};

Help.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.61, 0.35, 0.13, 1.0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    //background
    this.bg = new TextureRenderable(this.kMazeImage);
    this.bg.getXform().setSize(200,160);
    this.bg.getXform().setPosition(50,40);
    
    this.mKeys = new SpriteRenderable(this.kKeys);
    this.mKeys.setColor([1, 1, 1, 0]);
    this.mKeys.getXform().setPosition(14, 35);
    this.mKeys.getXform().setSize(20, 25);
    this.mKeys.setElementPixelPositions(0, 256, 0, 256);


    this.mMessage = new UIText("Help the llama get to his destination",[420,530],3.5,1,0,[1,1,1,1]);
    this.mMessage2 = new UIText("before time runs or he is caught by the Sprite",[400,480],3.5,1,0,[1,1,1,1]);
    //start button
    this.UIButton1 = new UIButton(this.kUIButton,this.main,this,[100,50],[120,70],"BACK",3,[1,1,1,1],[0,0,0,1]);
    
    this.mArrows = new UIText("Move llama with Up/Down/Left/Right keys",[500,300],2.5,1,0,[1,1,1,1]);
    this.mSpace = new UIText("Space bar lifts levers and presses buttons",[500,250],2.5,1,0,[1,1,1,1]);
    
 
};

Help.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera);      //draw floor

};
Help.prototype.drawCamera = function(camera) {
    //Setup the camera
    camera.setupViewProjection();
    this.bg.draw(camera);
    this.mKeys.draw(camera);
    this.UIButton1.draw(camera);
    this.mArrows.draw(camera);
    this.mSpace.draw(camera);
    this.mMessage.draw(camera);
    this.mMessage2.draw(camera);
};

Help.prototype.update = function () {
    this.UIButton1.update();
    if (this.mBack)
        gEngine.GameLoop.stop();

};

Help.prototype.main = function () {
    this.mBack = true;

};

