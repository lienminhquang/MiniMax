
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");


const GAME_WIDTH = 800;
const GAME_HEGHT = 600;

let paddle = new Paddle(GAME_WIDTH, GAME_HEGHT);

let lastTime = 0;

let game = new TicTecToe();

let input = new InputHandler(game);


function gameLoop(timeStamp)
{
	let dt = timeStamp - lastTime;
	lastTime = timeStamp;

	ctx.clearRect(0, 0, 800, 600);
	//paddle.update(dt);

	//paddle.draw(ctx);

	game.draw(ctx);

	requestAnimationFrame(gameLoop);
}

gameLoop(0);