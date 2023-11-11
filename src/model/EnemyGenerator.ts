import * as BABYLON from "@babylonjs/core";
import { Enemy } from "./enemy";

export class EnemyGenerator {
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  timer: number = 0;
  generate_interval: number = 100;
  enemy_num: number = 10;

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
    this.scene = scene;
    this.engine = engine;

    scene.onBeforeRenderObservable.add(() => {
      this.timer += engine.getDeltaTime() / 60;
    });
  }

  update() {
    if (this.timer > this.generate_interval) {
      this.timer = 0;
      this.generate();
    }
  }

  generate() {
    for (let i = 0; i < this.enemy_num; i++) {
      const enemy = new Enemy(this.scene, this.engine);
      enemy.mesh.position = new BABYLON.Vector3(
        Math.random() * 60 - 30,
        0,
        Math.random() * 60 - 30
      );
    }
  }
}
