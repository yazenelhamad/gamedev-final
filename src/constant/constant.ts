export const TEXTURES = {
  PLATFORM: "assets/platform/Tileset.json",
  PLAYER: "assets/characters/npc.json"
} as const;

export const SCENE = {
  Width: 1280,
  Height: 578
};

export const KeyCodes = {
  Space: "Space",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight"
};

export const WORLD = {
  Character: {
    Speed: 2,
    JumpSpeed: 3,
    JumpThreshold: 50
  },
  Gravity: 3
};

export const CharacterDirections = {
  Left: -1,
  Right: 1
};

export enum CharacterMode {
  Jumping,
  Running,
  Falling,
  Idle
}
