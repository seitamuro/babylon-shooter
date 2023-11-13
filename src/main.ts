import { Engine } from "@babylonjs/core";
import "./style.css";
import { MainGameScene } from "./scene/MainGame";

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
const main_game = new MainGameScene(engine);

/**
 * Render Loop
 */
engine.runRenderLoop(() => {
  main_game.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
