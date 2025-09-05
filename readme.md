## Two player Shiritori Games 

## Features:

-  Two-player turn-based gameplay  
-  Word validation using [Dictionary API](https://dictionaryapi.dev/)  
-  No duplicate words allowed  
-  Minimum word length check (4 letters)  
-  Countdown timer (20 seconds per turn)  
-  Scoring system (point decreases based on remaining time)  
-  Game Over modal when a player runs out of point & thus wins
-  Responsive


## How to play:

1. Player 1 starts by typing a valid English word and pressing "Enter".  
2. Player 2 must type a word that starts with the last letter of Player 1’s word.  
3. Each valid word reduces the player’s point by the time left on the timer.If the timer goes in negative that will be added with the point. 
4. If a player reaches a point of 0 then the game ends with a Game Over modal and that player wins. 

## Tech Stack

- HTML5
- TailwindCSS & Vanilla CSS
- Vanilla JavaScript
- Dictionary API for word validation
