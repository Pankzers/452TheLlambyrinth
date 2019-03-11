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
    this.kUIButton = "assets/UI/buttonUI.png";
    this.kTitle = "assets/title_sprite.png";
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

};

Main.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kTitle);

    var nextlevel = null;
    if(this.mStart){
        nextlevel = new Level('testlevel', this.mLightPref, this.mGamePref);;
    }
    gEngine.Core.startScene(nextlevel);
};

Main.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.40, 0.26, 0.13, 1.0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mTitle = new SpriteAnimateRenderable(this.kTitle);
    this.mTitle.setColor([1, 1, 1, 0]);
    this.mTitle.getXform().setSize(80, 30); 
    this.mTitle.getXform().setPosition(50, 55);
    this.mTitle.setSpriteSequence(128, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    512, 128,   // widthxheight in pixels
                                    8,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mTitle.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mTitle.setAnimationSpeed(90);
    
    //start button
    this.UIButton1 = new UIButton(this.kUIButton,this.start,this,[400,250],[180,60],"START",3.5,[1,1,1,1],[0,0,0,1]);
    //light preference 
    this.UIRadioLight=new UIRadio(this.setToBright,this,[250,100],"Bright",2.5,[0.0,0.0,0.0,1],this.mCamera);
    this.UIRadioLight.addToSet(this.setToDim,this,"Dim",[0.0,0.0,0.0,1],this.mCamera);
    this.UIRadioLight.addToSet(this.setToDark,this,"Dark",[0.0,0.0,0.0,1],this.mCamera);
   
    this.mLightText = new FontRenderable("Light Type:");
    this.mLightText.setColor([1, 1, 1, 1]);
    this.mLightText.getXform().setPosition(25, 20);
    this.mLightText.setTextHeight(3);
    
    //game type
    this.UIRadioGame=new UIRadio(this.setToTime,this,[470,100],"Time",2.5,[0.0,0.0,0.0,1],this.mCamera);
    this.UIRadioGame.addToSet(this.setToChase,this,"Chase",[0.0,0.0,0.0,1],this.mCamera);
    
    this.mGameText = new FontRenderable("Game Type:");
    this.mGameText.setColor([1, 1, 1, 1]);
    this.mGameText.getXform().setPosition(55, 20);
    this.mGameText.setTextHeight(3);
};

Main.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera);      //draw floor

};
Main.prototype.drawCamera = function(camera) {
    //Setup the camera
    camera.setupViewProjection();
    this.UIButton1.draw(camera);
    this.mTitle.draw(camera);
    this.UIRadioLight.draw(camera);
    this.UIRadioGame.draw(camera);
    this.mGameText.draw(camera);
    this.mLightText.draw(camera);
};

Main.prototype.update = function () {
    this.UIButton1.update();
    this.UIRadioLight.update();
    this.UIRadioGame.update();
    this.mTitle.updateAnimation();
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