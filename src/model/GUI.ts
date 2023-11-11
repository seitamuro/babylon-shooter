import * as BABYLON from "@babylonjs/core";
import * as BABYLONGUI from "@babylonjs/gui";
import { Global } from "./global";

export class GUI {
  advancedTexture: BABYLONGUI.AdvancedDynamicTexture;
  scoreBoard: BABYLONGUI.Rectangle = new BABYLONGUI.Rectangle("scoreBoard");
  scoreText: BABYLONGUI.TextBlock = new BABYLONGUI.TextBlock("scoreText");

  constructor(scene: BABYLON.Scene, engine: BABYLON.Engine) {
    this.advancedTexture =
      BABYLONGUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    this.scoreBoard.horizontalAlignment =
      BABYLONGUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.scoreBoard.verticalAlignment =
      BABYLONGUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.scoreText.text = `Score: ${Global.score}`;
    this.scoreText.color = "white";
    this.scoreText.fontSize = 24;
    this.scoreText.textHorizontalAlignment =
      BABYLONGUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.scoreBoard.addControl(this.scoreText);
    this.scoreBoard.width = "50%";
    this.scoreBoard.height = "30px";
    this.scoreBoard.color = "transparent";
    this.advancedTexture.addControl(this.scoreBoard);
  }

  private _update_score_board() {
    this.scoreText.text = `Score: ${Global.score}`;
  }

  update() {
    this._update_score_board();
  }
}
