import * as BABYLON from "@babylonjs/core";

import { StandardMaterialSphere } from "../types";
import { getRelativeDirection } from "../utils/getRelativeDirection";

export class Bullet {
  mesh: StandardMaterialSphere;
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  speed: number = 1;

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
    this.scene = scene;
    this.engine = engine;

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
}
