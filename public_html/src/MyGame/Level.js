/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level() {  
    this.kMaze_sprite = "assets/maze_sprite.png";
    
    // The cameras to view the level
    this.mCamera = null;
    this.mMinimap = null;
    
    // The Player Character
    this.mHero = null;
    // The Objects within the Level.
    this.mLeverSet = null;
    this.mButtonSet = null;
    this.mDoorSet = null;
    this.mSprite = null;
    this.mExit = null;
    
}
gEngine.Core.inheritPrototype(Level, Scene);


Level.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMaze_sprite);
};

Level.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMaze_sprite);
    
};

Level.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mLeverSet = new Lever(this.kMaze_sprite);
    this.mButtonSet = new PushButton(this.kMaze_sprite);
    this.mSprite = new Sprite();
    
};

Level.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera);
    
};
Level.prototype.drawCamera = function(camera) {
    camera.setupViewProjection();
//    this.mLeverSet.draw(this.mCamera);
//    this.mButtonSet.draw(this.mCamera);
//    this.mSprite.draw(this.mCamera);
}

Level.prototype.update = function () {
    this.mLeverSet.update();
    this.mButtonSet.update(this.mCamera);
    this.mSprite.update();
    
};