import * as BABYLON from "@babylonjs/core";
import { CollisionController } from "../model/collisionController";
import { EnemyGenerator } from "../model/EnemyGenerator";
import { Player } from "../model/player";
import { Field } from "../model/field";
import { PlayerCamera } from "../model/camera";
import { GUI } from "../model/GUI";

import { Scene } from "./Scene";

export class MainGameScene implements Scene {
  private _scene: BABYLON.Scene;
  private _engine: BABYLON.Engine;
  private _light: BABYLON.HemisphericLight;
  private _collisionController: CollisionController;
  private _enemyGenerator: EnemyGenerator;
  private _player: Player;
  private _field: Field;
  private _camera: PlayerCamera;
  private _gui: GUI;

  constructor(engine: BABYLON.Engine) {
    this._scene = new BABYLON.Scene(engine);
    this._engine = engine;
    this._light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this._scene
    );
    this._light.intensity = 0.7;
    this._collisionController = new CollisionController();
    this._enemyGenerator = new EnemyGenerator(this._scene, this._engine);
    this._player = new Player(this._scene, this._engine);
    this._field = new Field(this._scene, this._engine);
    this._camera = new PlayerCamera(this._scene, this._engine, this._player);
    this._gui = new GUI(this._scene, this._engine);
  }

  render() {
    this._scene.render();
    this._collisionController.applyCollision();
    this._enemyGenerator.update(this._player);
    this._gui.update();
  }

  public start() {}
}
