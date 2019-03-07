
/*
 * File: Level_Lights: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet, Level */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Level.prototype.createLights = function(posHero, posExit)
{  
    this.mGlobalLightSet = new LightSet();
    //overall light 
    var  light = this.createLight(Light.eLightType.eDirectionalLight,
            [60, 40, 4],           // position (not used by directional)
            [-0.2, -0.2, -1],      // Pointing direction upwards
            [0.5, 0.8, 0, 1],    // color
            500, 500,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            -1,                     // intensity
            1.0                    // drop off
            );
    this.mGlobalLightSet.addToSet(light);
    //hero light
    light = this.createLight(Light.eLightType.eSpotLight,
            [posHero[0], posHero[1], 5],            // Center of camera 
            [-0.07,  0, -1],
            [0.5, 0.5, 0.5, 1],      //  color
            19, 7,                   // near and far distances
            2.7, 4.0,                // inner and outer cones
            2,                       // intensity
            1                      // drop off
            );
    this.mGlobalLightSet.addToSet(light);
    //exit light 
    light = this.createLight(Light.eLightType.ePointLight,
            [posExit[0]-3, posExit[1]+3, 5],         // position
            [0, 0, -1],          // Direction 
            [0.0, 1.0, 0.0, 1],  // some color
            14, 6,               // near and far distances
            0.1, -0.05,            // inner and outer cones
            5,                   // intensity
            1.0                  // drop off
            );
    this.mGlobalLightSet.addToSet(light);
};
//used method from example 8.6
Level.prototype.createLight= function(type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    return light;
};
