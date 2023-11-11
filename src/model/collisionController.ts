import { Bullet } from "./bullet";
import { Enemy } from "./enemy";

import * as BABYLON from "@babylonjs/core";

export interface CollisionHandler {
  collisionHandler: (Object: any) => void;
}

export class CollisionController {
  private _appliedBullet: Bullet[] = [];
  private _appliedEnemy: Enemy[] = [];

  constructor() {}

  public applyCollision() {
    const bullets = Bullet.bullets.filter(
      (elem) => !this._appliedBullet.includes(elem)
    );
    const enemies = Enemy.enemies.filter(
      (elem) => !this._appliedEnemy.includes(elem)
    );

    for (const bullet of bullets) {
      for (const enemy of this._appliedEnemy) {
        console.log(bullet, enemy);
        bullet.mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            {
              trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
              parameter: {
                mesh: enemy.mesh,
              },
            },
            () => bullet.collisionHandler(enemy)
          )
        );
      }
    }

    this._appliedBullet = [...this._appliedBullet, ...bullets];
    this._appliedEnemy = [...this._appliedEnemy, ...enemies];
  }
}
