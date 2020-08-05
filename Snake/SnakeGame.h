#pragma once

enum Direction { DEFAULT = 0, UP = 1, DOWN = 2, LEFT = 3, RIGHT = 4 };

class SnakeGame
{
public:
	SnakeGame();
	SnakeGame(int height, int width);
	SnakeGame(const SnakeGame& other);
	~SnakeGame();

	bool is_free(const int x, const int y) const;
	void spawn_fruit();
	void draw() const;
	int move_snake();
	void single_step();
	void run();

private:
	int _height, _width;

	bool _isOver;
	int _headX, _headY;
	Direction _dir;

	int _tailLen;
	int* _tailX;
	int* _tailY;

	int _fruitX, _fruitY;
	int _score;
};

