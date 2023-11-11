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
    const deleted_bullets = this._appliedBullet.filter(
      (elem) => elem.mesh.actionManager == null
    );
    const deleted_enemies = this._appliedEnemy.filter(
      (elem) => elem.mesh.actionManager == null
    );

    this._appliedBullet = this._appliedBullet.filter((elem) =>
      Bullet.bullets.includes(elem)
    );
    this._appliedEnemy = this._appliedEnemy.filter((elem) =>
      Enemy.enemies.includes(elem)
    );

    // 削除されたオブジェクトの当たり判定を削除する
    for (const bullet of this._appliedBullet) {
      for (const enemy of deleted_enemies) {
        const action = bullet.mesh.actionManager.actions.filter(
          (action) => action.getTriggerParameter().mesh == enemy.mesh
        );
        if (action.length > 0) {
          bullet.mesh.actionManager.unregisterAction(action[0]);
        }
      }
    }
    for (const enemy of this._appliedEnemy) {
      for (const bullet of deleted_bullets) {
        const action = enemy.mesh.actionManager.actions.filter(
          (action) => action.getTriggerParameter().mesh == bullet.mesh
        );
        if (action.length > 0) {
          enemy.mesh.actionManager.unregisterAction(action[0]);
        }
      }
    }

    // 新しく追加されたオブジェクトを取得する
    const new_bullets = Bullet.bullets.filter(
      (elem) => !this._appliedBullet.includes(elem)
    );
    const new_enemies = Enemy.enemies.filter(
      (elem) => !this._appliedEnemy.includes(elem)
    );

    // 新しく追加されたオブジェクトに既存のオブジェクトの当たり判定を適用する
    for (const bullet of new_bullets) {
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
    for (const enemy of new_enemies) {
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

    // 既存のオブジェクトに新しく追加されたオブジェクトの当たり判定を適用する
    for (const bullet of this._appliedBullet) {
      for (const enemy of new_enemies) {
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
    for (const enemy of this._appliedEnemy) {
      for (const bullet of new_bullets) {
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

    this._appliedBullet = [...this._appliedBullet, ...new_bullets];
    this._appliedEnemy = [...this._appliedEnemy, ...new_enemies];
  }
}
