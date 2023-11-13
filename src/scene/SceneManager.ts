import * as BABYLON from "@babylonjs/core";

import { TitleScene } from "./Title";
import { MainGameScene } from "./MainGame";

import { Scene } from "./Scene";

type SceneClasses = {
  [key in SceneType]: Scene;
};

export enum SceneType {
  Title,
  MainGame,
}

export class SceneManager {
  static state: SceneType = SceneType.Title;
  private scenes: SceneClasses;

  constructor(engine: BABYLON.Engine) {
    this.scenes = {
      [SceneType.Title]: new TitleScene(engine),
      [SceneType.MainGame]: new MainGameScene(engine),
    };
  }

  render() {
    this.scenes[SceneManager.state].render();
  }
}
