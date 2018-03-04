import {Widget} from './view';
import {Model} from "./model";
import {Controller} from "./controller";
import './style.scss';

const model = new Model();
const controller = new Controller(model);
const widget = new Widget(model, controller);

const widgetView = widget.render({});

const container = document.getElementById('app');
container.appendChild(widgetView);