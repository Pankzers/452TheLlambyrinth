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

function Level(levelName) {  
    this.kMaze_sprite = "assets/maze_sprite.png";

    this.kWall = "assets/RigidShape/wall.png";

    this.kWall_Tex = "assets/wall_sprite_sheet.png";
    this.kFloor_Tex = "assets/floor_tex.jpg";
    this.kSceneFile = "assets/"+levelName+".json";
    this.hero_Tex = "assets/llama.png";

    
    // The cameras to view the level
    this.mCamera = null;
    this.mSmallCam = null; 

    this.mDoorsContrapsion = null;
    this.mCollObjs = new GameObjectSet();
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

    this.GameOver = false;
    
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
    
    //Game Over
    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
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
    this.mWallSet = new WallSet(this.kWall_Tex,this.kWall_Tex,sceneInfo.MapInfo.wallx,sceneInfo.MapInfo.wally,sceneInfo.MapInfo.wallgrid);
    for(var i = 0; i < sceneInfo.Wall.length; i++) {
        this.mWallSet.addWall(sceneInfo.Wall[i].Pos[0],sceneInfo.Wall[i].Pos[1],sceneInfo.Wall[i].Orientation);
    }
    
    //Setup the GameObjects
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mLeverSet = new LeverSet(this.kMaze_sprite);
    //Create the lever
    for(var i =0; i < sceneInfo.Lever.length; i++) {
        this.mLeverSet.createLever(
        sceneInfo.Lever[i].LeverX,
        sceneInfo.Lever[i].LeverY,
        sceneInfo.Lever[i].LeverW,
        sceneInfo.Lever[i].LeverH,
        sceneInfo.Lever[i].LeverRot
        );
    }
    this.mSprite = new Sprite(sceneInfo.Sprite.spritex,sceneInfo.Sprite.spritey);
    this.mExit = new Exit(this.kMaze_sprite,sceneInfo.Exit.exitx,sceneInfo.Exit.exity);
    this.mDoorsContrapsion = new DoorsContrapsion(this.kMaze_sprite, this.kWall);
    
    //Create the Door Pairs
    for(var i =0; i < sceneInfo.DoorPair.length; i++) {
        this.mDoorsContrapsion.addPair(
        sceneInfo.DoorPair[i].DoorX,
        sceneInfo.DoorPair[i].DoorY,
        sceneInfo.DoorPair[i].DoorW,
        sceneInfo.DoorPair[i].DoorH,
        sceneInfo.DoorPair[i].DoorRot,
        sceneInfo.DoorPair[i].ButtonX,
        sceneInfo.DoorPair[i].ButtonY,
        sceneInfo.DoorPair[i].ButtonW,
        sceneInfo.DoorPair[i].ButtonH,
        sceneInfo.DoorPair[i].ButtonRot
        );
    }
    this.mHero = new Hero(this.hero_Tex,
    sceneInfo.MapInfo.width,
    sceneInfo.MapInfo.height,
    sceneInfo.Hero.herox,
    sceneInfo.Hero.heroy
    );
    this.mMinimap = new Minimap();
    this.mSmallCam = this.mMinimap.getMinimap();
    //rigid Objs
    this.addRigidObjs();
    
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
    this.mLeverSet.draw(camera);
    this.mSprite.draw(camera);
    this.mExit.draw(camera);
    this.mDoorsContrapsion.draw(camera);
    
    //Draw the UI
    this.mGameTimer.draw(camera);
    this.mHero.draw(camera);
};

Level.prototype.update = function () {

    //Update the UI
    this.mGameTimer.update();
    //Update the objects
    var heroPos = this.mHero.getXform().getPosition();
    this.mCamera.setWCCenter(heroPos[0],heroPos[1]);
    this.mCamera.update();
    this.mSmallCam.update();
    this.mHero.update(this.mWallSet,this.mDoorsContrapsion);
    this.mLeverSet.update(this.mCamera, this.mHero);
    this.mSprite.update(this.mHero);
    this.GameOver = this.mExit.update();
    this.mDoorsContrapsion.update(this.mHero);
    
    if (this.mExit.pixelTouches(this.mHero, [])) 
        gEngine.GameLoop.stop();
    if (this.mGameTimer.getTime() <= 0)
        gEngine.GameLoop.stop();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        console.log(this.mWallSet);
    } 

    //gEngine.Physics.processCollision(this.mCollObjs, []);
};
//add hero and doors to set to be able to do physics 
Level.prototype.addRigidObjs = function () {
    if (this.mHero.setRigidBody() !== null)
        this.mCollObjs.addToSet(this.mHero);
    for (var i =0; i < this.mDoorsContrapsion.getDoors().size(); i++)
    {
        var door = this.mDoorsContrapsion.getDoors().getObjectAt(i);
        if (door.setRigidBody() !== null)
            this.mCollObjs.addToSet(door);
    }
    
};