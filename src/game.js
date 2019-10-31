
function abs(a)
{
	if(a < 0) a = -a;
	return a;
}

class TicTecToe
{
	constructor()
	{
		this.currentPlayer = 1;
		this.selectedPos = {
			x: 0,
			y: 0
		};
		this.titleWith = 50;
		this.padding = 5;
		this.position = {
			x: 100,
			y: 100
		};
		this.ended;

		this.state = new Int16Array([	 -1, 0, 0,
										 0, 0, 0,
										 0, 0, 0]);
		//for (let index = 0; index < this.state.length; index++) {
		//	this.state[index] = 0;
		//}
	}

	draw(ctx)
	{
		ctx.beginPath();
		ctx.lineWidth = '5';
		ctx.strokeStyle = "gray";

		for(let row = 0; row < 3; row++)
		{
			for(let col = 0; col < 3; col++)
			{
				ctx.rect(
					this.position.x + col * this.titleWith + col * this.padding,
					this.position.y + 100 - row * this.titleWith - row * this.padding, 
					this.titleWith, this.titleWith);

				if(this.state[row * 3 + col] == 1)
				{
					ctx.fillStyle = "green";
					ctx.fillRect(
						this.position.x + col * this.titleWith + col * this.padding,
						this.position.y + 100 - row * this.titleWith - row * this.padding, 
						this.titleWith, this.titleWith);
				}
				else if(this.state[row * 3 + col] == -1)
				{
					ctx.fillStyle = "blue";
					ctx.fillRect(
						this.position.x + col * this.titleWith + col * this.padding,
						this.position.y + 100 - row * this.titleWith - row * this.padding, 
						this.titleWith, this.titleWith);
				}
			}
		}


		

		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "yellow";
		//selected index
		ctx.rect(
			this.position.x + this.selectedPos.x * this.titleWith + this.selectedPos.x * this.padding,
			this.position.y + 100 - this.selectedPos.y * this.titleWith - this.selectedPos.y * this.padding, 
			this.titleWith, this.titleWith);

		ctx.stroke();

	}

	select(pos)
	{
		this.selectedPos = pos;
	}
	move(dir)
	{
		this.selectedPos.x += dir.x;
		if(this.selectedPos.x < 0) this.selectedPos.x = 0;
		else if(this.selectedPos.x >= 3) this.selectedPos.x = 2;

		this.selectedPos.y += dir.y;
		if(this.selectedPos.y < 0) this.selectedPos.y = 0;
		else if(this.selectedPos.y >= 3) this.selectedPos.y = 2;
	}

	tick()
	{
		if(this.ended == true) return;

		if((this.currentPlayer == -1) && (this.state[this.selectedPos.x + this.selectedPos.y * 3] == 0))
		{
			//console.log("Player " + this.currentPlayer + " tick at position : (" + this.selectedPos.x + "," + this.selectedPos.y +")");
			this.state[this.selectedPos.x + this.selectedPos.y * 3] = this.currentPlayer;
			this.ended = this._checkEndGame(this.state, this.selectedPos);

			this.currentPlayer = -this.currentPlayer;
		}
		else if(this.currentPlayer == 1)
		{
			this.computer_turn();
			if(this.state[this.selectedPos.x + this.selectedPos.y * 3] == 0)
			{	
				//console.log("Player " + this.currentPlayer + " tick at position : (" + this.selectedPos.x + "," + this.selectedPos.y +")");
				this.state[this.selectedPos.x + this.selectedPos.y * 3] = this.currentPlayer;
				this.ended = this._checkEndGame(this.state, this.selectedPos);
			}

			this.currentPlayer = -this.currentPlayer;
		}

		if(this.ended == 0)
		{
			alert("Hoa");
		}
		else if(this.ended != 999)
		{
			alert("Player " + (-this.currentPlayer) + " win!!!");
		}
	}

	computer_turn()
	{
		let pos = {x: 0, y: 0};
		let score = -Infinity;
		for(let y = 0; y < 3; y++)
		{
			for(let x = 0; x < 3; x++)
			{
				if(this.state[x + y * 3] == 0)
				{	
					let _node = this.state.slice();
					_node[x + y * 3] = this.currentPlayer;
					//console.log(_node);
					//alert("a");
					let nodeScore = this.evaluate_node(_node, true, {x: x, y: y}, 10, this.currentPlayer);
					
					if(score < nodeScore)
					{	
						score = nodeScore;
						pos = {x: x, y: y};
					}
					
				}
			}
		}

		//console.log("Max score: " + score);
		this.selectedPos = pos;
	}

	

	//mac dinh minh la max
	//tim gia tri cua node o turn
	evaluate_node(node, max , pos, depth, prePlayer)
	{

		let nodeScore = this._checkEndGame(node, pos);
		if(nodeScore != 999)
		{
			return nodeScore;
		}

		if(depth == 0)
			return 0;

		max = !max;
		//console.log(max);

		let score = Infinity;
		if(max == true)
		{
			score = -Infinity;
		}

		for(let y = 0; y < 3; y++)
		{
			for(let x = 0; x < 3; x++)
			{
				if(node[x + y * 3] == 0)
				{	
					let _node = node.slice();
					_node[x + y * 3] = -prePlayer;
					//console.log(_node);
					let nodeScore = this.evaluate_node(_node, max, {x: x, y: y}, depth-1, -prePlayer);
					
					if(max == true)
					{
						score = score < nodeScore ? nodeScore : score;
					}
					else
					{
						score = score > nodeScore ? nodeScore : score;
					}
				}
			}
		}

		return score;
	}


	//return:
	//-1: player 2 win
	//0 : hoa
	//1 : player 1 win
	//999: chua xac dinh
	_checkEndGame(node, pos)
	{
		//console.log("Check pos: " + pos.x + ", " + pos.y);
		let player = node[pos.x + pos.y * 3];
		if(player != 0)
		{
			

			// Doc - len
			let point = 1;
			for(let y = pos.y + 1; y < 3; y++)
			{
				if(node[pos.x + y * 3] == player)
				{
					point++;
					if(point == 3)
					{
						//console.log("Player " + player + " win!");
						return player;
					} 	
				}
				else
				{
					break;
				}
			}
			// Xuong
			for(let y = pos.y - 1; y >= 0; y--)
			{
				if(node[pos.x + y * 3] == player)
				{
					point++;
					if(point == 3)
					{
						//console.log("Player " + player + " win!");
						return player;
					} 	
				}
				else
				{
					break;
				}
			}

			// Ngang - Phai
			point = 1;
			for(let x = pos.x + 1; x < 3; x++)
			{
				if(node[x + pos.y * 3] == player)
				{
					point++;
					if(point == 3)
					{
						//console.log("Player " + player + " win!");
						return player;
					} 	
				}
				else
				{
					break;
				}
			}
			//Trai
			for(let x = pos.x - 1; x >= 0; x--)
			{
				if(node[x + pos.y * 3] == player)
				{
					point++;
					if(point == 3)
					{
						//console.log("Player " + player + " win!");
						return player;
					} 	
				}
				else
				{
					break;
				}
			}

			// Cheo xuong-phai
			point = 1;
			for(let x = pos.x + 1, y = pos.y - 1; x < 3 && y >= 0; x++, y--)
			{
				if(node[x + y * 3] == player)
				{
					point++;
					if(point == 3)
					{
						//console.log("Player " + player + " win!");
						return player;
					} 	
				}
				else
				{
					break;
				}
			}
			//Cheo len trai -> \
			for(let x = pos.x - 1, y = pos.y + 1; x >= 0 && y <= 2; x--, y++)
			{
				if(node[x + y * 3] == player)
				{
					point++;
					if(point == 3)
					{
						//console.log("Player " + player + " win!");
						return player;
					} 	
				}
				else
				{
					break;
				}
			}


			// Cheo len - phai
			point = 1;
			for(let x = pos.x + 1, y = pos.y + 1; x < 3 && y < 3; x++, y++)
			{
				if(node[x + y * 3] == player)
				{
					point++;
					if(point == 3)
					{
						//console.log("Player " + player + " win!");
						return player;
					} 	
				}
				else
				{
					break;
				}
			}
			//xuong - trai /
			for(let x = pos.x - 1, y = pos.y - 1; x >= 0 && y >= 0; x--, y--)
			{
				if(node[x + y * 3] == player)
				{
					point++;
					if(point == 3)
					{
						//console.log("Player " + player + " win!");
						return player;
					} 	
				}
				else
				{
					break;
				}
			}
		}
		
		for(let i = 0; i < 9; i++)
			if(node[i] == 0) return 999;
		return 0;
	}
}