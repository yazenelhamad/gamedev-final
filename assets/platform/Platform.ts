import * as PIXI from "pixi.js";
import { ILoaderResource } from "pixi.js";
import { TEXTURES } from "../../src/constants";

export type TTileMap = {
  layers: { data: number[] }[];
  height: number;
  width: number;
  tileheight: number;
  tilewidth: number;
};

export const initializePlatform = (tiles: TTileMap, platform: ILoaderResource): PIXI.Sprite[] => {
  return Array.from({ length: tiles.height })
    .map((_, idx) => tiles.layers[0].data.slice(idx * tiles.width, (idx + 1) * tiles.width))
    .map((row, i) =>
      row.map((tileId, j) => ({
        id: `${i}_${j}`,
        tileId,
        x: tiles.tilewidth * j,
        y: tiles.tileheight * i,
      })),
    )
    .reduce((accumulator, row) => row.concat(accumulator), [])
    .filter((tile) => tile.tileId !== 0)
    .map((tile) => {
      const assetUrl = `Tileset${tile.tileId - 1}.png`;
      const spriteAssets = platform.textures ?? null;
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
