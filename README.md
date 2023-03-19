# Pomodoro timer

[<img src="public/wordle.png" width="250"/>](public/wordle.png)

A pomodoro timer with an auto next feature.


## Project Structure

```

├── components
│   ├── Background 		<- Renders the 'wordle' title
│   ├── Controls			<- Renders a single letter input.
│   ├── Form 			    <- Renders every cell and shows game states (loose, win, errors) for a single row
│   ├── Header			  <- Renders every row
│   ├── Intervals 		<- Renders the qwerty keyboard
│   ├── Modal         <- Renders a tooltip to show game states (loose, win, errors) textually
│   ├── TimerControls <- Renders a tooltip to show game states (loose, win, errors) textually
│   ├── Interval      <- Renders a tooltip to show game states (loose, win, errors) textually
│   └── Settings 			<- Renders the Grid and Keyboard
├── types 			      <- TypeScript types.
├── hooks
│   ├── useGuesses.ts 		<- Logic for tracking guesses
│   └── useKeyPress.ts 		<- Capture all key presses, returns key values
└── constants
```

## Component Tree

```mermaid
graph TB
A((App))-->B((Wordle))
A-->C((Notification))
A-->D((Navigation))
B-->E((Notification))
B-->F((Grid))
B-->G((Keyboard))
F-->H((Row))
H-->I((Cell))
```
