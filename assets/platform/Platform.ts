import * as PIXI from "pixi.js";
import { ILoaderResource } from "pixi.js";
import { TEXTURES } from "../../src/constants";

export type TTileMap = {
  layers: { data: number[] }[];
  height: number;
  width: number;
  tileHeight: number;
  tileWidth: number;
};

export const initializePlatform = (tiles: TTileMap, resource: ILoaderResource): PIXI.Sprite[] => {
  return Array.from({ length: tiles.width })
    .map((_, idx) => tiles.layers[0].data.slice(idx * tiles.width, (idx + 1) * tiles.height))
    .map((row, i) =>
      row.map((col, j) => ({
        id: `${i}_${j}`,
        col,
        x: tiles.tileWidth * j,
        y: tiles.tileHeight * i,
        width: tiles.tileWidth,
        height: tiles.tileHeight,
      })),
    )
    .reduce((accumulator, row) => row.concat(accumulator), [])
    .filter((tile) => tile.col !== 0)
    .map((tile) => {
      const sprite = new PIXI.Sprite(resource.textures[`Tileset${parseInt(tile.id) - 1}.png`]);
      sprite.x = tile.x;
      sprite.y = tile.y;
      return sprite;
    });
};

/**
 * Create and return the platform as a Sprite array.
 */
const Platform = (tiles: TTileMap): PIXI.Sprite[] => {
  const resource = PIXI.Loader.shared.resources[TEXTURES.PLATFORM];
  return initializePlatform(tiles, resource);
};

export default Platform;
