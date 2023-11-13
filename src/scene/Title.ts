import * as BABYLON from "@babylonjs/core";
import * as BABYLON_GUI from "@babylonjs/gui";

import { Scene } from "./Scene";
import { SceneManager, SceneType } from "./SceneManager";

export class TitleScene implements Scene {
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.FreeCamera;

  advancedTexture: BABYLON_GUI.AdvancedDynamicTexture;
  title: string = "Title";

  constructor(engine: BABYLON.Engine) {
    this._scene = new BABYLON.Scene(engine);
    this._camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(0, 0, 0)
    );

    this.advancedTexture =
      BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // タイトルテキストを作成
    const title = new BABYLON_GUI.TextBlock();
    title.text = this.title;
    title.color = "white";
    title.fontSize = 24;
    title.height = "100px";
    title.top = "-14%";
    title.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.advancedTexture.addControl(title);

    // スタートボタンを作成
    const startButton = BABYLON_GUI.Button.CreateSimpleButton(
      "startButton",
      "スタート"
    );
    startButton.width = "150px";
    startButton.height = "40px";
    startButton.color = "white";
    startButton.cornerRadius = 20;
    startButton.background = "green";
    startButton.onPointerUpObservable.add(function () {
      SceneManager.state = SceneType.MainGame;
    });
    this.advancedTexture.addControl(startButton);
  }

  render() {
    this._scene.render();
  }
}
