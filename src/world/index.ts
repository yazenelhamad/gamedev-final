import { Sprite, Texture } from "pixi.js";
import { gameHeight, gameWidth } from "..";

const World = (): Sprite => {
  const worldTexture = Texture.from("assets/bg.png");
  const world = new Sprite(worldTexture);
  world.position.x = 0;
  world.position.y = 0;
  world.scale.x = gameWidth / worldTexture.width;
  world.scale.y = gameWidth / worldTexture.height;
  world.width = gameWidth;
  world.height = gameHeight;
  return world;
};

export default World;
