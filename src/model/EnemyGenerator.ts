import * as BABYLON from "@babylonjs/core";
import { Enemy } from "./enemy";
import { Player } from "./player";
import { getRelativeDirection } from "../utils/getRelativeDirection";

export class EnemyGenerator {
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  timer: number = 0;
  generate_interval: number = 100;
  enemy_num: number = 10;
  speed: number = 0.05;

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
    this.scene = scene;
    this.engine = engine;

    scene.onBeforeRenderObservable.add(() => {
      this.timer += engine.getDeltaTime() / 60;
    });
  }

  update(target: Player) {
    if (this.timer > this.generate_interval) {
      this.timer = 0;
      this.generate(target);
    }
  }

  generate(target: Player) {
    for (let i = 0; i < this.enemy_num; i++) {
      const enemy = new Enemy(this.scene, this.engine);
      enemy.mesh.position = new BABYLON.Vector3(
        Math.random() * 60 - 30,
        0,
        Math.random() * 60 - 30
      );
      enemy.move = (delta: number) => {
        enemy.mesh.lookAt(target.mesh.position);
        const direction = getRelativeDirection(
          new BABYLON.Vector3(0, 0, 1),
          enemy.mesh.rotation.clone()
        );
        const normalized_direction = direction.normalize();
        enemy.mesh.position.addInPlace(
          normalized_direction.scale(delta * this.speed)
        );
      };
    }
  }
}
