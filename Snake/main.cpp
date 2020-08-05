#include <iostream>
#include <time.h> 
#include <conio.h>
#include <vector>

#define HEIGHT 20
#define WIDTH 20
#define MAX_TAIL (HEIGHT*WIDTH)

#define KEY_UP    72
#define KEY_LEFT  75
#define KEY_RIGHT 77
#define KEY_DOWN  80

enum Direction {DEFAULT = 0, UP = 1, DOWN = 2, LEFT = 3, RIGHT = 4};

/*
Struct that contains relevant game data:
- _isOver: is the game over
- _headX, _headY: position of snake head
- _tailX, _tailY: arrays of cells occupied by snake except head
- _fruitX, _fruitY: position of fruit
- _tailLen: length of snake except head
- _dir: direction snake is facing
*/
typedef struct 
{
	bool _isOver = false;

	int _headX, _headY;
	Direction _dir = DEFAULT;

	int _tailLen = 0;
	int _tailX[MAX_TAIL] = { 0 };
	int _tailY[MAX_TAIL] = { 0 };

	int _fruitX, _fruitY;
} GameParams;

/*
Returns true if cell is not occupied by snake, otherwise false
*/
bool is_free(const int x, const int y, const GameParams& gp)
{
	if (x == gp._headX && y == gp._headY)
	{
		return false;
	}

	for (int i = 0; i < gp._tailLen; ++i)
	{
		if (x == gp._tailX[i] && y == gp._tailY[i])
		{
			return false;
		}
	}

	return true;
}

/*
Spawns new fruit on map in a cell not occupied by the snake
*/
void spawn_fruit(GameParams& gp)
{
	int newX = rand() % WIDTH;
	int newY = rand() % HEIGHT;

	while (!is_free(newX, newY, gp))
	{
		newX = rand() % HEIGHT;
		newY = rand() % WIDTH;
	}

	gp._fruitX = newX;
	gp._fruitY = newY;
}

/*
Sets up initial game state
*/
void setup(GameParams& gp)
{
	srand(time(NULL));
	gp._headX = rand() % WIDTH;
	gp._headY = rand() % HEIGHT;
	/*gp._headX = 0;
	gp._headY = HEIGHT-1;*/
	spawn_fruit(gp);
}

/*
Draw entire board: deletes previous board, then draws borders, snake and fruit
*/
void draw(const GameParams& gp)
{
	system("cls"); // clear board
	for (int i = 0; i < HEIGHT + 2; ++i)
	{
		for (int j = 0; j < WIDTH + 2; ++j)
		{
			// Borders
			if (i == 0 || i == HEIGHT + 1 || j == 0 || j == WIDTH + 1)
			{
				std::cout << "#";
			}
			// Snake
			else if (!is_free(j - 1, i - 1, gp))
			{
				std::cout << "O";
			}
			// Fruit
			else if (j - 1 == gp._fruitX && i - 1 == gp._fruitY)
			{
				std::cout << "F";
			}
			// Empty space
			else
			{
				std::cout << ' ';
			}
		}
		std::cout << std::endl;
	}
}

/*
Move snake in direction of pressed key, return EXIT_FAILURE or EXIT_SUCCESS accordingly
*/
int move_snake(GameParams& gp)
{
	int newX = -1;
	int newY = -1;

	// Receive arrow input
	if (_kbhit())
	{
		int c = _getch();
		switch (_getch())
		{
		case KEY_UP:
			gp._dir = UP;
			break;
		case KEY_DOWN:
			gp._dir = DOWN;
			break;
		case KEY_LEFT:
			gp._dir = LEFT;
			break;
		case KEY_RIGHT:
			gp._dir = RIGHT;
			break;
		default:
			break;
		}
	}

	newX = gp._headX;
	newY = gp._headY;
	if (gp._dir == UP)
	{
		newY--;
	}
	else if (gp._dir == DOWN)
	{
		newY++;
	}
	else if (gp._dir == LEFT)
	{
		newX--;
	}
	else if (gp._dir == RIGHT)
	{
		newX++;
	}
	else if (gp._dir == DEFAULT)
	{
		return EXIT_SUCCESS;
	}

	// Check if new coord is not already occupied by snake
	if (newX < 0 || newX >= WIDTH ||
		newY < 0 || newY >= HEIGHT ||
		!is_free(newX, newY, gp))
	{
		return EXIT_FAILURE;
	}

	// Eat fruit
	if (newX == gp._fruitX && newY == gp._fruitY)
	{
		gp._tailX[gp._tailLen] = gp._headX;
		gp._tailY[gp._tailLen] = gp._headY;
		gp._tailLen++;
		spawn_fruit(gp);
	}
	// Move tail
	else
	{
		for (int i = 1; i < gp._tailLen; ++i)
		{
			gp._tailX[i - 1] = gp._tailX[i];
			gp._tailY[i - 1] = gp._tailY[i];
		}
		if (gp._tailLen > 0)
		{
			gp._tailX[gp._tailLen - 1] = gp._headX;
			gp._tailY[gp._tailLen - 1] = gp._headY;
		}
	}

	gp._headX = newX;
	gp._headY = newY;
	return EXIT_SUCCESS;
}

/*
Single step of game: move snake, check for collision
*/
void single_step(GameParams& gp)
{
	if (move_snake(gp) == EXIT_FAILURE)
	{
		gp._isOver = true;
		std::cout << "You lost" << std::endl;
		return;
	}
	if (gp._tailLen == MAX_TAIL - 1)
	{
		gp._isOver = true;
		std::cout << "You won" << std::endl;
		return;
	}
}

/*
Runs entire snake game, i.e. sets up game and contains game loop
*/
void run()
{
	GameParams gp;
	setup(gp);
	while (!gp._isOver)
	{
		// Draw board
		draw(gp);

		// One game step
		single_step(gp);
	}
}

/*
Main function
*/
int main()
{
	run();
	return EXIT_SUCCESS;
}