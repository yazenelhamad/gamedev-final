import * as PIXI from "pixi.js";
import World from "./world";
import Platform, { TTileMap } from "../assets/platform/Platform";
import "./style.css";
import { TEXTURES } from "./constants";
import Player from "./characters/player";

export const gameWidth = 800;
export const gameHeight = 600;

type GameState = "START" | "GAME" | "END";
export const gameState: GameState = "START";

const app = new PIXI.Application({
  backgroundColor: 0x000000,
  width: gameWidth,
  height: gameHeight,
});

const stage = app.stage;

window.onload = async (): Promise<void> => {
  loadGameAssets().then(() => {
    document.body.appendChild(app.view);

    resizeCanvas();

    const container = new PIXI.Container();
    const loader = PIXI.Loader.shared;
    const level = loader.resources.level.data as TTileMap;
    const platform = Platform(level);
    const offset = 0 - level.tilewidth * 20;
    container.addChild(World(offset));
    container.addChild(World(offset + gameWidth));
    platform.forEach((sprite) => container.addChild(sprite));
    const player = Player();
    if (player) container.addChild(player);
    stage.addChild(container);
    
    //Load the sounds
sounds.load([
  "sounds/shoot.wav", 
  "sounds/music.wav",
  "sounds/bounce.mp3"
]);

//Assign the callback function that should run
//when the sounds have loaded
sounds.whenLoaded = setup;
  });
};

async function loadGameAssets(): Promise<void> {
  return new Promise((res) => {
    const loader = PIXI.Loader.shared;
    loader.add("level", "../assets/platform/level.json");
    loader.add([TEXTURES.PLATFORM, TEXTURES.PLAYER]);
    loader.load(res);
  });
}

function resizeCanvas(): void {
  const resize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  };

  resize();

  window.addEventListener("resize", resize);
}



function setup() {
  console.log("sounds loaded");

  //Create the sounds
  var shoot = sounds["sounds/shoot.wav"],
      music = sounds["sounds/music.wav"],
      bounce = sounds["sounds/bounce.mp3"];

  //Pan the shoot sound to the right
  shoot.pan = 0.8;

  //Make the music loop
  music.loop = true;

  //Set the pan to the left
  music.pan = -0.8;

  //Set the music volume
  music.volume = 0.7;  

  //Set a reverb effect on the bounce sound
  //arguments: duration, decay, reverse?
  //music.setReverb(2, 2, false);

  //Set the sound's `reverb` property to `false` to turn it off
  //music.reverb = false;

  //Add an echo effect to the bounce sound
  //arguments: delay time, feedback time, optional frequency filtering
  bounce.setEcho(0.2, 0.3, 1000);

  //Set `echo` to false to turn it off
  //bounce.echo = false;
  
  //Optionally set the music playback rate to half speed
  //music.playbackRate = 0.5;

  //Capture the keyboard events
  var a = keyboard(65),
      b = keyboard(66),
      c = keyboard(67),
      d = keyboard(68),
      e = keyboard(69),
      f = keyboard(70);
      g = keyboard(71);
      h = keyboard(72);

  //Control the sounds based on which keys are pressed

  //Play the loaded shoot sound
  a.press = function() { shoot.play() };

  //Play the loaded music sound
  b.press = function() {
    if (!music.playing) {
      music.play();
    }
    console.log("music playing");
  };

  //Pause the music 
  c.press = function() {
    music.pause();
    console.log("music paused");
  };

  //Restart the music 
  d.press = function() {
    music.restart();
    console.log("music restarted");
  };

  //Play the music from the 10 second mark
  e.press = function() {
    music.playFrom(10);
    console.log("music start point changed");
  };
  
  //Play the bounce sound
  f.press = function() { bounce.play() };

  //Fade the music out over 3 seconds
  g.press = function() { 
    music.fadeOut(3);
  };

  //Fade the music in over 3 seconds
  h.press = function() { 
    music.fadeIn(3);
  };
}

var i = keyboard(73),
    j = keyboard(74),
    k = keyboard(75),
    l = keyboard(76);

i.press = function(){ shootSound() };
j.press = function(){ jumpSound() };
k.press = function(){ explosionSound() };
l.press = function(){ bonusSound() };

//The sound effect functions

//The shoot sound
function shootSound() {
  soundEffect(
    1046.5,           //frequency
    0,                //attack
    0.3,              //decay
    "sawtooth",       //waveform
    1,                //Volume
    -0.8,             //pan
    0,                //wait before playing
    1200,             //pitch bend amount
    false,            //reverse bend
    0,                //random pitch range
    25,               //dissonance
    [0.2, 0.2, 2000], //echo: [delay, feedback, filter]
    undefined         //reverb: [duration, decay, reverse?]
  );
}

//The jump sound
function jumpSound() {
  soundEffect(
    523.25,       //frequency
    0.05,         //attack
    0.2,          //decay
    "sine",       //waveform
    3,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    true,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo: [delay, feedback, filter]
    undefined     //reverb: [duration, decay, reverse?]
  );
}

//The explosion sound
function explosionSound() {
  soundEffect(
    16,          //frequency
    0,           //attack
    1,           //decay
    "sawtooth",  //waveform
    1,           //volume
    0,           //pan
    0,           //wait before playing
    0,           //pitch bend amount
    false,       //reverse
    0,           //random pitch range
    50,          //dissonance
    undefined,   //echo: [delay, feedback, filter]
    undefined    //reverb: [duration, decay, reverse?]
  );
}

//The bonus points sound
function bonusSound() {
  //D
  soundEffect(587.33, 0, 0.2, "square", 1, 0, 0);
  //A
  soundEffect(880, 0, 0.2, "square", 1, 0, 0.1);
  //High D
  soundEffect(1174.66, 0, 0.3, "square", 1, 0, 0.2);
}

//Constant Commit
export * from "./constants";

