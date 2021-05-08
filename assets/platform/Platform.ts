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

export const initializePlatform = (tiles: TTileMap, platform: ILoaderResource): PIXI.Sprite[] => {
  return Array.from({ length: tiles.height })
    .map((_, idx) => {
      return tiles.layers[0].data.slice(idx * tiles.width, (idx + 1) * tiles.width);
    })
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
      const tileId = tile.col - 1;
      const assetUrl = `Tileset${tileId}.png`;
      const spriteAssets = platform?.textures ?? null;
      if (spriteAssets) {
        const sprite = new PIXI.Sprite(spriteAssets[assetUrl]);
        sprite.x = tile.x;
        sprite.y = tile.y;
        return sprite;
      }
      return new PIXI.Sprite();
    });
};

/**
 * Create and return the platform as a Sprite array.
 */
const Platform = (tiles: TTileMap): PIXI.Sprite[] => {
  const platformResource = PIXI.Loader.shared.resources[TEXTURES.PLATFORM];
  return initializePlatform(tiles, platformResource);
};

export default Platform;
