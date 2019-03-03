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
    this.kWall = "assets/RigidShape/wall.png";
    
    // The camera to view the scene
    this.mCamera = null;

    this.mDoorsContrapsion = null;
    this.mLeverSet = null;
    this.mSprite = null;
    this.mExit = null;
    
}
gEngine.Core.inheritPrototype(Level, Scene);


Level.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMaze_sprite);
    gEngine.Textures.loadTexture(this.kWall);
};

Level.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMaze_sprite);
    gEngine.Textures.unloadTexture(this.kWall);
    
};

Level.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mLeverSet = new LeverSet(this.kMaze_sprite);
    this.mSprite = new Sprite();
    this.mExit = new Exit(this.kMaze_sprite);
    this.mDoorsContrapsion = new DoorsContrapsion(this.kMaze_sprite, this.kWall);
    
};

Level.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mLeverSet.draw(this.mCamera);
    this.mSprite.draw(this.mCamera);
    this.mExit.draw(this.mCamera);
    this.mDoorsContrapsion.draw(this.mCamera);
    
};

Level.prototype.update = function () {
    var keys = [false, false, false, false];    //user moves up, down, left, right comes from hero
    var hero = null;
    this.mLeverSet.update();
    this.mSprite.update(hero, keys);
    this.mExit.update();
    this.mDoorsContrapsion.update(hero);
  
};