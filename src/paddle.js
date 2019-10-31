class Paddle
{
	constructor(gameWidth, gameHeight)
	{
		this.width = 150;
		this.height = 30;

		this.position = {
			x: gameWidth / 2 - this.width / 2,
			y: gameHeight - this.height - 10
		}
	}

	draw(ctx)
	{
		ctx.fillStyle="#0ff";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(dt)
	{
		//this.position.x += 0.1 * dt;
	}

	moveLeft()
	{
		this.position.x -= 10;
	}
	moveRight()
	{
		this.position.x += 10;
	}
}