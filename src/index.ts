import * as PIXI from "pixi.js";
import World from "./world";
//import Platform from "../assets/platform/Platform";
import "./style.css";

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

  console.log();
  //const platform = Platform(PIXI.Loader.use("level"));
  stage.addChild(World());
};

type PIXILoader = typeof PIXI.Loader.shared;

async function loadGameAssets(): Promise<PIXILoader> {
  return new Promise((res, rej) => {
    const loader = PIXI.Loader.shared;
    loader.add("level", "../assets/platform/level.json");

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
