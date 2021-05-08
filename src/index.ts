import * as PIXI from "pixi.js";
import World from "./world";
import Platform, { TTileMap } from "../assets/platform/Platform";
import "./style.css";
import { TEXTURES } from "./constants";

export const gameWidth = 800;
export const gameHeight = 600;

const app = new PIXI.Application({
  backgroundColor: 0x000000,
  width: gameWidth,
  height: gameHeight,
});

const stage = app.stage;

window.onload = async (): Promise<void> => {
  await loadGameAssets();
  document.body.appendChild(app.view);

  resizeCanvas();

  const container = new PIXI.Container();
  const loader = PIXI.Loader.shared;
  loader.load((_, resources) => {
    const level = resources.level.data as TTileMap;
    const platform = Platform(level);
    platform.forEach((sprite) => container.addChild(sprite));
  });
  container.addChild(World());
  stage.addChild(container);
};

type PIXILoader = typeof PIXI.Loader.shared;

async function loadGameAssets(): Promise<PIXILoader> {
  return new Promise((res, rej) => {
    const loader = PIXI.Loader.shared;
    loader.add("level", "../assets/platform/level.json");
    loader.add(TEXTURES.PLATFORM, "../assets/platform/Tileset.json");

    loader.onComplete.once(() => {
      res(loader);
    });

    loader.onError.once(() => {
      rej();
    });

    loader.load();
  });
}

function resizeCanvas(): void {
  const resize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  };

  resize();

  window.addEventListener("resize", resize);
}
