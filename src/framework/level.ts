export interface RawTileMap {
  layers: Array<{ data: number[] }>;
  height: number;
  width: number;
  tileheight: number;
  tilewidth: number;
}

export interface ParsedTile {
  id: string;
  tileId: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum TileId {
  Blank = 0
}

export const createLevel = (rawTiles: RawTileMap): ParsedTile[] => {
  const array2d = Array.from({ length: rawTiles.height }).map((_, i) =>
    rawTiles.layers[0].data.slice(i * rawTiles.width, (i + 1) * rawTiles.width)
  );
  return array2d
    .map((row, i) => {
      return row.map((tileId, j) => ({
        id: `${i}_${j}`,
        tileId,
        x: rawTiles.tilewidth * j,
        y: rawTiles.tileheight * i,
        width: rawTiles.tilewidth,
        height: rawTiles.tileheight
      }));
    })
    .reduce((acc, row) => row.concat(acc), [])
    .filter(tile => tile.tileId !== TileId.Blank);
};
