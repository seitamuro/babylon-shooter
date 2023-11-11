import * as BABYLON from "@babylonjs/core";
import { StandardMaterialBox } from "../types";
import { Bullet } from "./bullet";
import { CollisionHandler } from "./collisionController";
import { Global } from "./global";

export class Enemy implements CollisionHandler {
  static enemies: Enemy[] = [];
  mesh: StandardMaterialBox;
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  score: number = 10;

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
    this.mesh.actionManager = new BABYLON.ActionManager(scene);
  }

  collisionHandler(object: any) {
    if (object instanceof Bullet) {
      this.mesh.dispose();
      const idx = Enemy.enemies.indexOf(this);
      Enemy.enemies.splice(idx, 1);
      Global.score += this.score;
    }
  }
}
