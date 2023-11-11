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
import { Player } from "./model/player";
import { Bullet } from "./model/bullet";
import { StandardMaterialBox } from "./types";
import { Enemy } from "./model/enemy";
import { CollisionController } from "./model/collisionController";
import { PlayerCamera } from "./model/camera";
import { EnemyGenerator } from "./model/EnemyGenerator";
import { GUI } from "./model/GUI";

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
const gui = new GUI(scene, engine);

//const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
//camera.setTarget(Vector3.Zero());
//camera.attachControl(canvas, true);

const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

const collisionController = new CollisionController();

/**
 * Create Meshes
 */
const field = new Field(scene, engine);
const player = new Player(scene, engine);
const camera = new PlayerCamera(scene, engine, player);
const enemyGenerator = new EnemyGenerator(scene, engine);

/**
 * Render Loop
 */
engine.runRenderLoop(() => {
  scene.render();
  collisionController.applyCollision();
  enemyGenerator.update();
  gui.update();
});

window.addEventListener("resize", () => {
  engine.resize();
});
