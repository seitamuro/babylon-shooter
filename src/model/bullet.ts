import * as BABYLON from "@babylonjs/core";

import { StandardMaterialSphere } from "../types";
import { getRelativeDirection } from "../utils/getRelativeDirection";
import { CollisionHandler } from "./collisionController";
import { Enemy } from "./enemy";

export type BulletParameters = {
  position?: BABYLON.Vector3;
  rotation?: BABYLON.Vector3;
  speed?: number;
};

const createBulletParameters = (params: BulletParameters) => {
  return {
    position: params.position ?? BABYLON.Vector3.Zero(),
    rotation: params.rotation ?? BABYLON.Vector3.Zero(),
    speed: params.speed ?? 1,
  };
};

export class Bullet implements CollisionHandler {
  mesh: StandardMaterialSphere;
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  speed: number;
  static bullets: Bullet[] = [];

  constructor(
    scene: BABYLON.Scene,
    engine: BABYLON.Engine,
    params: BulletParameters = {}
  ) {
    Bullet.bullets.push(this);
    this.scene = scene;
    this.engine = engine;
    this.speed = params.speed ?? 1;

    // create mesh
    this.mesh = BABYLON.MeshBuilder.CreateSphere(
      "bullet",
      {
        diameter: 0.5,
        diameterZ: 1.0,
      },
      scene
    ) as StandardMaterialSphere;
    this.mesh.material = new BABYLON.StandardMaterial("bullet", scene);
    this.mesh.material.diffuseColor = BABYLON.Color3.Yellow();
    this.mesh.position = params.position ?? BABYLON.Vector3.Zero();
    this.mesh.rotation = params.rotation ?? BABYLON.Vector3.Zero();
    this.mesh.actionManager = new BABYLON.ActionManager(scene);

    this.scene.onBeforeRenderObservable.add(() => {
      this._move(this.engine.getDeltaTime() / 60);
    });
  }

  private _move = (delta: number) => {
    const normalized_direction = new BABYLON.Vector3(0, 0, 1);
    this.mesh.position.addInPlace(
      getRelativeDirection(
        normalized_direction,
        this.mesh.rotation
      ).scaleInPlace(delta * this.speed)
    );
  };

  collisionHandler = (other: any) => {
    if (other instanceof Enemy) {
      this.mesh.dispose();
      const idx = Bullet.bullets.indexOf(this);
      Bullet.bullets.splice(idx, 1);
      return;
    }
  };
}
