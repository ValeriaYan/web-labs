import { Handlers } from "./Handlers";
import { Game } from "./Game";
import { View } from "./View";

const view = new View();
const game = new Game(view);
new Handlers(game).start();