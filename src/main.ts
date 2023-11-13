import { Engine } from "@babylonjs/core";
import "./style.css";
import { MainGameScene } from "./scene/MainGame";
import { SceneManager } from "./scene/SceneManager";

/**
 * Setup Scene , Camera and etc
 */
const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const engine = new Engine(canvas, true);

/**
 * load scene
 */
const sceneManager = new SceneManager(engine);

/**
 * Render Loop
 */
engine.runRenderLoop(() => {
  sceneManager.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
