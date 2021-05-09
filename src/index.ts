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
