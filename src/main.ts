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
const bullet = new Bullet(scene, engine);

const cbox1 = MeshBuilder.CreateBox(
  "box1",
  { size: 1 },
  scene
) as StandardMaterialBox;
cbox1.material = new BABYLON.StandardMaterial("mat", scene);
cbox1.actionManager = new BABYLON.ActionManager(scene);

const cbox2 = MeshBuilder.CreateBox(
  "box1",
  { size: 1 },
  scene
) as StandardMaterialBox;
cbox2.material = new BABYLON.StandardMaterial("mat", scene);
cbox2.actionManager = new BABYLON.ActionManager(scene);
cbox2.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
      parameter: {
        mesh: cbox1,
      },
    },
    () => {
      cbox2.material.diffuseColor = BABYLON.Color3.Red();
    }
  )
);
cbox2.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
      parameter: {
        mesh: cbox1,
      },
    },
    () => {
      cbox2.material.diffuseColor = BABYLON.Color3.White();
    }
  )
);
cbox1.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
      parameter: {
        mesh: player.mesh,
      },
    },
    () => {
      cbox1.material.diffuseColor = BABYLON.Color3.Red();
    }
  )
);
cbox1.actionManager.registerAction(
  new BABYLON.ExecuteCodeAction(
    {
      trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
      parameter: {
        mesh: player.mesh,
      },
    },
    () => {
      cbox1.material.diffuseColor = BABYLON.Color3.White();
    }
  )
);
const enemy = new Enemy(scene, engine);

let cnt = 0;
scene.onBeforeRenderObservable.add(() => {
  cnt += engine.getDeltaTime() / 60;
  cbox1.position.x = Math.sin(cnt * 0.1) * 5;
  cbox2.position.x = -Math.sin(cnt * 0.1) * 5;
});

/**
 * Render Loop
 */
engine.runRenderLoop(() => {
  scene.render();
  collisionController.applyCollision();
});

window.addEventListener("resize", () => {
  engine.resize();
});
