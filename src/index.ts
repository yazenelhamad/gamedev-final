import * as PIXI from "pixi.js";
import World from "./world";
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
  stage.addChild(World());
};

async function loadGameAssets(): Promise<void> {
  return new Promise((res, rej) => {
    const loader = PIXI.Loader.shared;

    loader.onComplete.once(() => {
      res();
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
    app.stage.scale.x = window.innerWidth / gameWidth;
    app.stage.scale.y = window.innerHeight / gameHeight;
  };

  resize();

  window.addEventListener("resize", resize);
}
