Description:

The program is a simple game of snake. Starts with a single snake cell, unmoving, and a spawned fruit.
The player guides the snake to eat the fruit and loses if either the snake tries to eat itself or it 
hits one of the borders.

Hardships:

- Planning the game independently was incredibly hard, despite the simplicity of the project itself. 
It was in part based on the following video:

                         https://www.youtube.com/watch?v=E_-lMZDi7Uw

I say in part because all I really took from it was the design choice of creating global variables, 
which I changed slightly and instead I store the game state in the struct 'GameParams' which I pass
by reference when needed. 
- From the same video I learned about the '_kbhit()' function, which I reluctantly used despite 
reading that functions from 'conio.h' (Spanish speakers must be having a laugh at this hilariously 
named library) are considered bad pracice. Apparently finding a function that simply checks whether 
or not a key has been pressed is impossible (GetKeyState() REFUSED to cooperate, or rather its parent 
library).
- Recognizing that an arrow had been pressed was also difficult, but here it was more my fault than 
some faulty obsolete library. I read, and willingly ignored, the following StackOverflow post: 

          https://stackoverflow.com/questions/24708700/c-detect-when-user-presses-arrow-key

wherein the second answer explicitly states that if an arrow key is pressed, then the function 
'_getch()' actually pushes to values to the stack, with the first having nothing to do with the
actual arrow being pressed. The second value is actually the relevant one and is one of the macros
described at the top of 'main.cpp'.

Conclusions:
- Plan better.
- Don't ignore StackOverflow.
- Motherfuck VisualStudio and Microsoft for making programming in C/C++ on Windows so goddamn difficult.
