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

    this.kWall_Tex = "assets/wall_sprite_sheet.png";
    this.kFloor_Tex = "assets/floor_tex.jpg";
    this.kSceneFile = "assets/scene.json";
    this.hero_Tex = "assets/llama.png";

    
    // The cameras to view the level
    this.mCamera = null;
    this.mSmallCam = null; 

    this.mDoorsContrapsion = null;
    this.mLeverSet = null;
    this.mSprite = null;
    this.mExit = null;

    this.mMinimap = null;
    this.mGameTimer = null;
    
    // The Player Character
    this.mHero = null;
    // The Objects within the Level.
    this.mButtonSet = null;
    this.mExit = null;
    this.mWallSet = null;
    this.mFloor = null;

    
}
gEngine.Core.inheritPrototype(Level, Scene);


Level.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMaze_sprite);

    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWall_Tex);
    gEngine.Textures.loadTexture(this.kFloor_Tex);
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eJSONFile);
    gEngine.Textures.loadTexture(this.hero_Tex);
};

Level.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMaze_sprite);

    gEngine.Textures.unloadTexture(this.kWall);

    gEngine.Textures.unloadTexture(this.kWall_Tex);
    gEngine.Textures.unloadTexture(this.kFloor_Tex);
    gEngine.Textures.unloadTexture(this.hero_Tex);
};

Level.prototype.initialize = function () {
    //Get the Scene Info
    var sceneInfo = gEngine.ResourceMap.retrieveAsset(this.kSceneFile);
    //Create the cameras
    this.mCamera = new Camera(
    sceneInfo.Camera.Center,
    sceneInfo.Camera.Width,
    sceneInfo.Camera.Viewport
    );
    this.mCamera.setBackgroundColor(sceneInfo.Camera.BgColor);
    
    //Create the UI Elements
    this.mGameTimer = new GameTimer(sceneInfo.GameTimer.time);
    
    //Create the walls
    this.mWallSet = new WallSet(this.kWall_Tex,this.kWall_Tex);
    for(var i = 0; i < sceneInfo.Wall.length; i++) {
        this.mWallSet.addWall(sceneInfo.Wall[i].Pos[0],sceneInfo.Wall[i].Pos[1],sceneInfo.Wall[i].Orientation)
    }
    
    //Setup the GameObjects
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mLeverSet = new LeverSet(this.kMaze_sprite);
    this.mSprite = new Sprite();
    this.mExit = new Exit(this.kMaze_sprite);
    this.mDoorsContrapsion = new DoorsContrapsion(this.kMaze_sprite, this.kWall);
    

    this.mHero = new Hero(this.hero_Tex);
    this.mMinimap = new Minimap();
    this.mSmallCam = this.mMinimap.getMinimap();
};

Level.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera);
    this.drawCamera(this.mSmallCam);                //set up minimap view
    
};
Level.prototype.drawCamera = function(camera) {
    //Setup the camera
    camera.setupViewProjection();
    
    //Draw the map
    //this.mFloor.draw(camera);
    this.mWallSet.draw(camera);
    
    //Draw the objects
    this.mLeverSet.draw(this.mCamera);
    this.mSprite.draw(this.mCamera);
    this.mExit.draw(this.mCamera);
    this.mDoorsContrapsion.draw(this.mCamera);
    
    //Draw the UI
    this.mGameTimer.draw(camera);
    this.mHero.draw(camera);
};

Level.prototype.update = function () {

    //Update the UI
    this.mGameTimer.update();
    //Update the objects
    var keys = [false, false, false, false];    //user moves up, down, left, right comes from hero
    var hero = null;
    this.mLeverSet.update();
    this.mSprite.update(this.mHero, keys);
    this.mExit.update();
    this.mDoorsContrapsion.update(hero);
    this.mHero.update();
};