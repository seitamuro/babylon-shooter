import * as BABYLON from "@babylonjs/core";
import { StandardMaterialBox } from "../types";

export class Enemy {
  static enemies: Enemy[] = [];
  mesh: StandardMaterialBox;
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
    Enemy.enemies.push(this);
    this.scene = scene;
    this.engine = engine;

    this.mesh = BABYLON.MeshBuilder.CreateBox(
      "enemy",
      { size: 1 },
      scene
    ) as StandardMaterialBox;
    this.mesh.material = new BABYLON.StandardMaterial("mat", scene);
    this.mesh.material.diffuseColor = BABYLON.Color3.Red();
  }
}
