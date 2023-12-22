import { Handlers } from "./Handlers.js";
import { Game } from "./Game.js";
import { View } from "./View.js";

const view = new View();
const game = new Game(view);
new Handlers(game).start();