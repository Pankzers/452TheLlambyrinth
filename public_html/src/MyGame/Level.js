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

function Level(levelName, lightPref, gamePref) {  
    this.kMaze_sprite = "assets/maze_sprite.png";
    this.kMaze_sprite_Normal = "assets/maze_sprite_normal.png";
    this.kDoor = "assets/RigidShape/wall.png";
    this.kDoor_Normal = "assets/RigidShape/wall_normal.png";

    this.kWall_Tex = "assets/wall_sprite_sheet.png";
    this.kWall_Tex_Normal = "assets/wall_sprite_sheet_normal.png";
    this.kFloor_Tex = "assets/floor_tex.jpg";
    this.kFloor_Tex_Normal = "assets/floor_tex_normal2.jpg";
    this.kSceneFile = "assets/"+levelName+".json";
    this.hero_Tex = "assets/hero_sprite.png";
    //this.hero_Tex_Moves = "assets/llamas_move.png";
    this.hero_Tex_Normal = "assets/hero_normal.png";

    this.mLevel = levelName;
    this.mLightPref = lightPref;
    this.mGamePref = gamePref;
    
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
    this.mFloorTile = null;
    this.mFloor = null;

    this.GameOver = false;
    this.mNextLoad = null;
    this.mSpriteEnd = false;    //end game when sprite catches 
    
    this.mGlobalLightSet = null;
    
}
gEngine.Core.inheritPrototype(Level, Scene);


Level.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMaze_sprite);

    gEngine.Textures.loadTexture(this.kDoor);
    gEngine.Textures.loadTexture(this.kWall_Tex);
    gEngine.Textures.loadTexture(this.kFloor_Tex);
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eJSONFile);
    gEngine.Textures.loadTexture(this.hero_Tex);
    //Normal Maps
    gEngine.Textures.loadTexture(this.kWall_Tex_Normal);
    gEngine.Textures.loadTexture(this.kFloor_Tex_Normal);
    gEngine.Textures.loadTexture(this.hero_Tex_Normal);
    gEngine.Textures.loadTexture(this.kMaze_sprite_Normal);
    gEngine.Textures.loadTexture(this.kDoor_Normal);
};

Level.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMaze_sprite);

    gEngine.Textures.unloadTexture(this.kDoor);

    gEngine.Textures.unloadTexture(this.kWall_Tex);
    gEngine.Textures.unloadTexture(this.kFloor_Tex);
    gEngine.Textures.unloadTexture(this.hero_Tex);
    //Normal Maps
    gEngine.Textures.unloadTexture(this.kWall_Tex_Normal);
    gEngine.Textures.unloadTexture(this.kFloor_Tex_Normal);
    gEngine.Textures.unloadTexture(this.hero_Tex_Normal);
    gEngine.Textures.unloadTexture(this.kMaze_sprite_Normal);
    gEngine.Textures.loadTexture(this.kDoor_Normal);
    
    //Game Over
    var nextlevel = null;
//    nextlevel = new GameOver(this.mNextLoad, this.mLevel, this.mGameTimer.getTime());
    if(this.mNextLoad === "lose" || this.mNextLoad === "won"){
        nextlevel = new GameOver(this.mNextLoad, this.mLevel, this.mGameTimer.getTime(), this.mLightPref, this.mGamePref);
    } else {
        nextlevel = new Level(this.mNextLoad, this.mLightPref, this.mGamePref);
    }
    gEngine.Core.startScene(nextlevel);
};

Level.prototype.initialize = function () {
    //Get the Scene Info
    var sceneInfo = gEngine.ResourceMap.retrieveAsset(this.kSceneFile);
    //console.log(sceneInfo);
    //console.log(Object.keys(sceneInfo.DoorPair[0]).length)
    //Create the cameras
    this.mCamera = new Camera(
    sceneInfo.Camera.Center,
    sceneInfo.Camera.Width,
    sceneInfo.Camera.Viewport
    );
    this.mCamera.setBackgroundColor(sceneInfo.Camera.BgColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    //Create the UI Elements
    this.mGameTimer = new GameTimer(sceneInfo.GameTimer.time);
    
    
    //Added Floor to reflect light 
    this.mFloorTile = new IllumRenderable(this.kFloor_Tex, this.kFloor_Tex_Normal);
    this.mFloorTile.setElementPixelPositions(0, 512, 0, 512);
    this.mFloorTile.getXform().setSize(20, 20);
    this.mFloorTile.getXform().setPosition(0, 0);
    this.mFloorTile.getMaterial().setSpecular([1, 0, 0, 1]);
    this.mFloor = new TiledGameObject(this.mFloorTile);

    //Create the walls
    this.mWallSet = new WallSet(this.kWall_Tex,this.kWall_Tex_Normal,sceneInfo.MapInfo.wallx,sceneInfo.MapInfo.wally,sceneInfo.MapInfo.wallgrid);
    for(var i = 0; i < sceneInfo.Wall.length; i++) {
        if(Object.keys(sceneInfo.Wall[i]).length !== 0) {
            this.mWallSet.addWall(sceneInfo.Wall[i].Pos[0],sceneInfo.Wall[i].Pos[1],sceneInfo.Wall[i].Orientation);
        } else {
            this.mWallSet.addSpace();
        }
    }
    
    //Setup the GameObjects
    this.mLeverSet = new LeverSet(this.kMaze_sprite, this.kMaze_sprite_Normal);
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
    this.mExit = new Exit(this.kMaze_sprite,this.kMaze_sprite_Normal, sceneInfo.Exit.exitx,sceneInfo.Exit.exity);
    this.mDoorsContrapsion = new DoorsContrapsion(this.kMaze_sprite, this.kMaze_sprite_Normal, this.kDoor, this.kDoor_Normal);
    
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
    this.mHero = new Hero(this.hero_Tex,this.hero_Tex_Normal,
    sceneInfo.MapInfo.width,
    sceneInfo.MapInfo.height,
    sceneInfo.Hero.herox,
    sceneInfo.Hero.heroy
    );
      
    this.mMinimap = new Minimap(sceneInfo.MapInfo.width,sceneInfo.MapInfo.height);
    this.mSmallCam = this.mMinimap.getMinimap();
    
  
    //Lights go to Level_Lights
    this.createLights(this.mHero.getXform().getPosition(), this.mExit.getXform().getPosition()); 
    //light preference
    if (this.mLightPref === "bright")
    {
        gEngine.DefaultResources.setGlobalAmbientIntensity(3);
        for (var i = 0; i < 4; i++)
        {
            this.mGlobalLightSet.getLightAt(i).setLightTo(false);
        }
    }
    else if (this.mLightPref === "dim")
    {
        gEngine.DefaultResources.setGlobalAmbientIntensity(1);
        for (var i = 0; i < 4; i++)
        {
            this.mGlobalLightSet.getLightAt(i).setLightTo(true);
        }
    }
    else if (this.mLightPref === "dark")
    {
        gEngine.DefaultResources.setGlobalAmbientIntensity(0);
        for (var i = 0; i < 4; i++)
        {
            this.mGlobalLightSet.getLightAt(i).setLightTo(true);
        }
    }
    if (this.mGamePref === "time")
        this.mSpriteEnd = false;
    else if (this.mGamePref === "chase")
        this.mSpriteEnd = true;

};

Level.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera, true);      //draw floor
    this.drawMiniMap(this.mSmallCam);                //set up minimap view
};
Level.prototype.drawCamera = function(camera, floor) {
    //Setup the camera
    camera.setupViewProjection();
    if (floor)
        this.mFloor.draw(this.mCamera);
    //Draw the map
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
Level.prototype.drawMiniMap = function(camera) {
    camera.setupViewProjection();
    this.mSprite.draw(camera);
    this.mHero.draw(camera);
    this.mExit.draw(camera);
};
Level.prototype.update = function () {

    //Update the UI
    var time = this.mGameTimer.update();
    if (this.mLightPref === "dark")     //only when dark
        this.updateValue(time);
    //Update the objects
    var heroPos = this.mHero.getXform().getPosition();
    this.mCamera.setWCCenter(heroPos[0],heroPos[1]);
    this.mCamera.update();
    this.mSmallCam.update();
    this.mHero.update(this.mWallSet,this.mDoorsContrapsion, this.mGlobalLightSet);
    this.mLeverSet.update(this.mCamera, this.mHero);
    
    this.mExit.update();
    this.mDoorsContrapsion.update(this.mHero);
    
    if (this.mExit.pixelTouches(this.mHero, [])){
        this.mNextLoad = "won";
        gEngine.GameLoop.stop();
    }
    if (this.mSprite.update(this.mHero,this.mSpriteEnd))    //returns true of pixel pixelTouches with last particle in system
    {
        if(this.mSpriteEnd) {
            this.mNextLoad = "lose";
            gEngine.GameLoop.stop(); 
        }
    }
    if (this.mGameTimer.getTime() <= 0){
        this.mNextLoad = "lose";
        gEngine.GameLoop.stop();
    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
//        this.mSpriteEnd = !this.mSpriteEnd;
//    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mNextLoad = this.mLevel;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        console.log(this.mWallSet);
    }
};
Level.prototype.updateValue = function(time){
    document.getElementById("time").innerHTML = time;
};