import ScaledContainer from './ScaledContainer.js';
import TitleScene from './TitleScene.js';

/**
 * Main App Display Object
 *
 * @exports Stage
 * @extends ScaledContainer
 */
export default class Stage extends ScaledContainer {

  constructor(...args) {
    super(...args);
  }

  currentScene;

  /**
   *  Displays a Scene on the stage, removing the prior one
   *  @param scene {Scene} the scene to show
   */
  showScene(scene) {
    let self = this;

    if (self.currentScene) {
      let oldScene = self.currentScene;
      oldScene.willHide && oldScene.willHide();
      self.removeChild(oldScene);
      self.currentScene = null;
      oldScene.stage = null;
      oldScene.didHide && oldScene.didHide();
    }

    scene.willShow && scene.willShow();
    self.addChild(scene);
    scene.stage = self;
    self.currentScene = scene;
    scene.didShow && scene.didShow();
  }

  bootstrap() {
    let title = new TitleScene();
    this.showScene(title);
  }

}
