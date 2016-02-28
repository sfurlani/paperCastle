/**
 * App.js
 *
 * The main entry point, appends PIXI to the DOM
 * and starts a render and animation loop
 *
 */

import './index.html';
import {config} from '../package.json';
import Renderer from './Renderer/Renderer';
import Stage from './displayobjects/Stage';
import AnimationStore from './stores/AnimationStore';
import TWEEN from 'tween.js';

const renderer = new Renderer(config.stageWidth, config.stageHeight);
const stage = new Stage(config.stageWidth, config.stageHeight);

document.body.appendChild(renderer.view);

AnimationStore.addChangeListener(() => TWEEN.update());

renderer.addRenderable(stage);
renderer.start();

stage.bootstrap();
