import * as BABYLON from "@babylonjs/core";

import { StandardMaterialSphere } from "../types";

export class Bullet {
  mesh: StandardMaterialSphere;
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;

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
  }
}
