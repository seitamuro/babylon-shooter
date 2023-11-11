import * as BABYLON from "@babylonjs/core";

interface StandardMaterialBox extends BABYLON.Mesh {
  material: BABYLON.StandardMaterial;
}

export class Field {
  mesh: StandardMaterialBox;

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
    this.mesh = BABYLON.MeshBuilder.CreateBox(
      "box",
      {
        width: 100,
        height: 0.1,
        depth: 100,
      },
      scene
    ) as StandardMaterialBox;
    this.mesh.material = new BABYLON.StandardMaterial("mat", scene);
    this.mesh.material.diffuseColor = BABYLON.Color3.Blue();
    this.mesh.position = new BABYLON.Vector3(0, -10, 0);
  }
}
