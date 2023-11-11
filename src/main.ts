import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { CannonJSPlugin, MeshBuilder } from "@babylonjs/core";

import * as CANNON from "cannon";
import * as BABYLON from "@babylonjs/core";

import "./style.css";
import { Field } from "./model/field";

/**
 * Setup Scene , Camera and etc
 */
const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
scene.enablePhysics(
  new Vector3(0, -9.81, 0),
  new CannonJSPlugin(true, 10, CANNON)
);

const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

/**
 * Create Meshes
 */
const field = new Field(scene, engine);
interface MyBox extends BABYLON.Mesh {
  material: BABYLON.StandardMaterial;
}
const box = MeshBuilder.CreateBox("box", { size: 1 }, scene) as MyBox;
box.position.y = box.getBoundingInfo().maximum.y / 2;
box.material = new BABYLON.StandardMaterial("mat", scene);
box.material.diffuseColor = BABYLON.Color3.Red();

/**
 * Render Loop
 */
engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
