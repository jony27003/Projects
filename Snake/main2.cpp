#include <iostream>
#include "SnakeGame.h"

#define H (20)
#define W (20)

void welcome(int& height, int& width)
{
	std::cout << "Height" << std::endl;
	std::cin >> height;
	std::cout << "Width" << std::endl;
	std::cin >> width;
}

int main()
{
	int height, width;
	welcome(height, width);
	SnakeGame game = SnakeGame(height, width);
	game.run();
}