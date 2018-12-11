# battleShips
This is implementation of the battleship game : https://en.wikipedia.org/wiki/Battleship_(game)

The program creates 10X10 grid and places ships on the field randomly.
The ships are 1 destroyer - 5x length and 2 battleships - 4x length.They can touch but are not allowed to overlap.
The player plays against the computer.There is show command for debbuging that shows the placement of the ships.
The entering of coordinates a.k.a. shots is : a5...a6..etc
The program notifies if any ship is hit missed or sunk, on invalid input it says there is something wrong.
In the end of game the program counts how many shots were needed for sinking all the ships and offers  the player to play again.
The REST service I used is Kinvey.
