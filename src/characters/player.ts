import * as PIXI from "pixi.js";
import { AnimatedSprite } from "pixi.js";
import { TEXTURES } from "../constants";

const Player = (): AnimatedSprite | null => {
  const resource = PIXI.Loader.shared.resources[TEXTURES.PLAYER];
  const spritesheet = resource?.spritesheet ?? null;
  if (spritesheet) {
    const sprite = new PIXI.AnimatedSprite(spritesheet.animations.idle);
    sprite.x = 50;
    sprite.y = 250;
    sprite.scale = new PIXI.ObservablePoint(
      () => {
        console.log("CHANGED");
      },
      0,
      1,
      1,
    );
    sprite.play();
    sprite.animationSpeed = 0.1;
    return sprite;
  }
  return null;
};

export default Player;
