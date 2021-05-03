export type TTileMap = {
  layers: { data: number[] }[];
  height: number;
  width: number;
  tileHeight: number;
  tileWidth: number;
};

const initializePlatform = (tiles: TTileMap) => {
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
    .filter((tile) => tile.col !== 0);
};

const Platform = (tiles: TTileMap) => {
  // const resource = PIXI.Loader.shared.resources[TEXTURES.PLATFORM];
  console.log("Initializing platform", initializePlatform(tiles));
};

export default Platform;
