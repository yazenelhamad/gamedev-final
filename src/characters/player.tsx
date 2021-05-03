import * as PIXI from "pixi.js";
import { AnimatedSprite } from "pixi.js";
import { TEXTURES } from "../constants";

const Player = (): AnimatedSprite => {
  const resource = PIXI.Loader.shared.resources[TEXTURES.PLAYER];
  const sprite = new PIXI.AnimatedSprite(resource.spritesheet.animations.idle);
  sprite.x = 50;
  sprite.y = 250;
  sprite.scale = new PIXI.ObservablePoint(
    () => {
      console.log("CHANGED");
    },
    0,
    1.5,
    1.5,
  );
  sprite.play();
  sprite.animationSpeed = 0.1;
  return sprite;
};

export default Player;
