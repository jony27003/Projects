#include "SnakeGame.h"
#include <iostream>
#include <time.h> 
#include <conio.h>
#include <vector>
#include <algorithm>
#include <iterator>

#define DEF_H (8)
#define DEF_W (8)

#define KEY_UP    72
#define KEY_LEFT  75
#define KEY_RIGHT 77
#define KEY_DOWN  80

SnakeGame::SnakeGame(int height, int width) : _height(height), _width(width),
_tailX(new int[height * width]), _tailY(new int[height * width]), _tailLen(0), _dir(DEFAULT), _score(0),
_isOver(false)
{
	srand(time(NULL));
	_headX = rand() % width;
	_headY = rand() % height;
	std::fill(_tailX, _tailX + height * width, 0);
	std::fill(_tailY, _tailY + height * width, 0);
	spawn_fruit();
}

SnakeGame::SnakeGame() : SnakeGame(DEF_H, DEF_W) {}

SnakeGame::~SnakeGame()
{
	delete[] _tailX;
	delete[] _tailY;
}

SnakeGame::SnakeGame(const SnakeGame& other) : _height(other._height), _width(other._width),
_tailLen(other._tailLen), _dir(other._dir), _score(other._score), _headX(other._headX), _headY(other._headY),
_fruitX(other._fruitX), _fruitY(other._fruitY), _isOver(other._isOver)
{
	delete[] _tailX;
	delete[] _tailY;

	_tailX = new int[_height * _width];
	_tailY = new int[_height * _width];
	std::copy(other._tailX, other._tailX + _height * _width, _tailX);
	std::copy(other._tailY, other._tailY + _height * _width, _tailY);
}

bool SnakeGame::is_free(const int x, const int y) const
{
	if (x == _headX && y == _headY)
	{
		return false;
	}

	for (int i = 0; i < _tailLen; ++i)
	{
		if (x == _tailX[i] && y == _tailY[i])
		{
			return false;
		}
	}

	return true;
}

void SnakeGame::spawn_fruit()
{
	int newX = rand() % _width;
	int newY = rand() % _height;

	while (!is_free(newX, newY))
	{
		newX = rand() % _width;
		newY = rand() % _height;
	}

	_fruitX = newX;
	_fruitY = newY;
}

void SnakeGame::draw() const
{
	system("cls"); // clear board
	for (int i = 0; i < _height + 2; ++i)
	{
		for (int j = 0; j < _width + 2; ++j)
		{
			// Borders
			if (i == 0 || i == _height + 1 || j == 0 || j == _width + 1)
			{
				std::cout << "#";
			}
			// Snake
			else if (!is_free(j - 1, i - 1))
			{
				std::cout << "O";
			}
			// Fruit
			else if (j - 1 == _fruitX && i - 1 == _fruitY)
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
	std::cout << "Score: " << _score << std::endl;
}

int SnakeGame::move_snake()
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
			if (_dir != DOWN) _dir = UP;
			break;
		case KEY_DOWN:
			if (_dir != UP) _dir = DOWN;
			break;
		case KEY_LEFT:
			if (_dir != RIGHT) _dir = LEFT;
			break;
		case KEY_RIGHT:
			if (_dir != LEFT) _dir = RIGHT;
			break;
		default:
			break;
		}
	}

	newX = _headX;
	newY = _headY;
	if (_dir == UP)
	{
		newY--;
	}
	else if (_dir == DOWN)
	{
		newY++;
	}
	else if (_dir == LEFT)
	{
		newX--;
	}
	else if (_dir == RIGHT)
	{
		newX++;
	}
	else if (_dir == DEFAULT)
	{
		return EXIT_SUCCESS;
	}

	// Check if new coord is not already occupied by snake
	if (newX < 0 || newX >= _width ||
		newY < 0 || newY >= _height ||
		!is_free(newX, newY))
	{
		return EXIT_FAILURE;
	}

	// Eat fruit
	if (newX == _fruitX && newY == _fruitY)
	{
		_tailX[_tailLen] = _headX;
		_tailY[_tailLen] = _headY;
		_tailLen++;
		_score++;
		spawn_fruit();
	}
	// Move tail
	else
	{
		for (int i = 1; i < _tailLen; ++i)
		{
			_tailX[i - 1] = _tailX[i];
			_tailY[i - 1] = _tailY[i];
		}
		if (_tailLen > 0)
		{
			_tailX[_tailLen - 1] = _headX;
			_tailY[_tailLen - 1] = _headY;
		}
	}

	_headX = newX;
	_headY = newY;
	return EXIT_SUCCESS;
}

void SnakeGame::single_step()
{
	// Collided with itself or border
	if (move_snake() == EXIT_FAILURE)
	{
		_isOver = true;
		std::cout << "You lost" << std::endl;
		return;
	}
	if (_tailLen == _height*_width - 1)
	{
		_isOver = true;
		std::cout << "You won" << std::endl;
		return;
	}
}

void SnakeGame::run()
{
	while (!_isOver)
	{
		// Draw board
		draw();

		// One game step
		single_step();
	}
}