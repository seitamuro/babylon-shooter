import * as BABYLON from "@babylonjs/core";
import { Player } from "./player";
import { getRelativeDirection } from "../utils/getRelativeDirection";

export class PlayerCamera {
  engine: BABYLON.Engine;
  camera: BABYLON.FreeCamera;

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine, target: Player) {
    this.camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );
    const offset = new BABYLON.Vector3(0, 5, -10);
    this.engine = engine;
    this.camera.rotation = target.mesh.rotation.clone();

    console.log(offset.length());
    scene.onBeforeRenderObservable.add(() => {
      this.camera.position = getRelativeDirection(
        offset.clone(),
        target.mesh.rotation.clone()
      )
        .normalize()
        .scale(offset.length())
        .add(target.mesh.position);
      this.camera.setTarget(target.mesh.position.clone());
    });
  }
}
