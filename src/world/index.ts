import { Sprite, Texture } from "pixi.js";

const World = (): Sprite => {
  const worldTexture = Texture.from("assets/bg-far.png");
  const world = new Sprite(worldTexture);
  world.position.x = 0;
  world.position.y = 0;
  return world;
};

export default World;
