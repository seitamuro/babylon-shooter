import * as BABYLON from "@babylonjs/core";

import { StandardMaterialBox } from "../types/StandardMaterialBox";

export class Player {
  mesh: StandardMaterialBox;

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
    this.mesh = BABYLON.MeshBuilder.CreateBox(
      "player",
      {
        width: 1,
        height: 1,
        depth: 1,
      },
      scene
    ) as StandardMaterialBox;
    this.mesh.material = new BABYLON.StandardMaterial("mat");
    this.mesh.material.diffuseColor = BABYLON.Color3.Yellow();
    this.mesh.position = new BABYLON.Vector3(0, 0, -2);
  }
}
