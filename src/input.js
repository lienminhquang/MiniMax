class InputHandler
{
	constructor(game)
	{
		document.addEventListener('keydown', event =>
		{
			//alert(event.keyCode);
			switch(event.keyCode)
			{

				case 37:
				game.move({x:-1, y:0});
				break;

				case 39:
				game.move({x:1, y:0});
				break;

				case 38:
				game.move({x:0, y:1});
				break;

				case 40:
				game.move({x:0, y:-1});
				break;

				//Space
				case 32:
					game.tick();
				break;
			}
		});
	}
}