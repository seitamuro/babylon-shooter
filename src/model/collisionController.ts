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

    this._appliedBullet = this._appliedBullet.filter((elem) =>
      Bullet.bullets.includes(elem)
    );
    this._appliedEnemy = this._appliedEnemy.filter((elem) =>
      Enemy.enemies.includes(elem)
    );

    for (const bullet of bullets) {
      for (const enemy of this._appliedEnemy) {
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

    for (const bullet of this._appliedBullet) {
      for (const enemy of enemies) {
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

    for (const enemy of enemies) {
      for (const bullet of this._appliedBullet) {
        enemy.mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            {
              trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
              parameter: {
                mesh: bullet.mesh,
              },
            },
            () => enemy.collisionHandler(bullet)
          )
        );
      }
    }

    for (const enemy of this._appliedEnemy) {
      for (const bullet of bullets) {
        enemy.mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            {
              trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
              parameter: {
                mesh: bullet.mesh,
              },
            },
            () => enemy.collisionHandler(bullet)
          )
        );
      }
    }

    this._appliedBullet = [...this._appliedBullet, ...bullets];
    this._appliedEnemy = [...this._appliedEnemy, ...enemies];
  }
}
