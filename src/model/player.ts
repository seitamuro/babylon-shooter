import * as BABYLON from "@babylonjs/core";

import { StandardMaterialBox } from "../types/StandardMaterialBox";
import { getRelativeDirection } from "../utils/getRelativeDirection";
import { Bullet } from "./bullet";

enum Key {
  W,
  A,
  S,
  D,
  Q,
  E,
  SPACE,
}

export class Player {
  mesh: StandardMaterialBox;
  pressed_key: Set<Key>;
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
  move_speed: number = 0.5;
  rotate_speed: number = 0.2;
  shoot_timer: number = 0;
  shoot_interval: number = 5;

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
    this.pressed_key = new Set();
    this.scene = scene;
    this.engine = engine;

    // create mesh
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

    // event listener
    scene.onKeyboardObservable.add(this._keyboard_event_callback);
    scene.onBeforeRenderObservable.add(this._before_render_callback);

    // timer
    scene.onBeforeRenderObservable.add(() => {
      this.shoot_timer += engine.getDeltaTime() / 60;
    });
  }

  // Event Callbacks
  private _keyboard_event_callback = (kbInfo: BABYLON.KeyboardInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        switch (kbInfo.event.key) {
          case "w":
            this.pressed_key.add(Key.W);
            break;
          case "a":
            this.pressed_key.add(Key.A);
            break;
          case "s":
            this.pressed_key.add(Key.S);
            break;
          case "d":
            this.pressed_key.add(Key.D);
            break;
          case "q":
            this.pressed_key.add(Key.Q);
            break;
          case "e":
            this.pressed_key.add(Key.E);
            break;
          case " ":
            this.pressed_key.add(Key.SPACE);
            break;
        }
        break;
      case BABYLON.KeyboardEventTypes.KEYUP:
        switch (kbInfo.event.key) {
          case "w":
            this.pressed_key.delete(Key.W);
            break;
          case "a":
            this.pressed_key.delete(Key.A);
            break;
          case "s":
            this.pressed_key.delete(Key.S);
            break;
          case "d":
            this.pressed_key.delete(Key.D);
            break;
          case "q":
            this.pressed_key.delete(Key.Q);
            break;
          case "e":
            this.pressed_key.delete(Key.E);
            break;
          case " ":
            this.pressed_key.delete(Key.SPACE);
            break;
        }
        break;
    }
  };

  private _before_render_callback = () => {
    const delta = this.engine.getDeltaTime() / 60;
    this._player_move(delta);
    this._player_rotate(delta);
    this._player_shoot();
  };

  private _player_move = (delta: number) => {
    const direction = new BABYLON.Vector3(0, 0, 0);
    if (this.pressed_key.has(Key.W)) {
      direction.addInPlace(new BABYLON.Vector3(0, 0, 1));
    }
    if (this.pressed_key.has(Key.A)) {
      direction.addInPlace(new BABYLON.Vector3(-1, 0, 0));
    }
    if (this.pressed_key.has(Key.S)) {
      direction.addInPlace(new BABYLON.Vector3(0, 0, -1));
    }
    if (this.pressed_key.has(Key.D)) {
      direction.addInPlace(new BABYLON.Vector3(1, 0, 0));
    }

    const normalized_direction = direction.normalize();
    this.mesh.position.addInPlace(
      getRelativeDirection(
        normalized_direction,
        this.mesh.rotation
      ).scaleInPlace(delta * this.move_speed)
    );
  };

  private _player_rotate = (delta: number) => {
    if (this.pressed_key.has(Key.Q)) {
      this.mesh.rotation.y -= delta * this.rotate_speed;
    }
    if (this.pressed_key.has(Key.E)) {
      this.mesh.rotation.y += delta * this.rotate_speed;
    }
  };

  private _player_shoot = () => {
    if (!this.pressed_key.has(Key.SPACE)) return;
    if (this.shoot_interval < this.shoot_timer) {
      const bullet = new Bullet(this.scene, this.engine, {
        position: this.mesh.position.clone(),
        rotation: this.mesh.rotation.clone(),
      });
      this.shoot_timer = 0;
    }
  };
}
