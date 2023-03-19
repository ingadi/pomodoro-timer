# Pomodoro timer

[<img src="public/pomodoro-timer.jpg" width="250"/>](public/pomodoro-timer.jpg)

A pomodoro timer with an auto next feature.

## Project Structure (src)

```

├── components
│   ├── Squares 		<- Handles the square background
│   ├── Fireworks 		<- Handles the fireworks background
│   ├── Background 		<- Picks between the backgrounds (squares, fireworks)
│   ├── Controls			<- Renders the timer and settings controls.
│   ├── TimerControls		<- Controls the timer
│   ├── NumberField 		<- Handles number field
│   ├── ToggleSwitchField 	<- Handles toggle switch field
│   ├── Header			  <- Renders interval name and the day's goals
│   ├── Interval      <- Handles rendering of the timer duration
│   ├── Intervals 		<- Renders both the current interval and details of the interval coming up next
│   ├── Modal         <- Renders the settings
│   ├── Settings 			<- Renders the form
│   └── Form 			    <- Defines and renders the input fields to update default configuration
├── types 			      <- TypeScript types.
├── hooks
│   ├── useLocalStorage.ts 		<- Retrieving and storing values in local storage
│   ├── useTimer.ts 		<- Updating timer every second
│   ├── useTitle.ts 		<- Updating document title
│   └── useWorkInterval.ts 		<- Saves/resets work interval count for the day
└── constants
```

## Component Tree

```mermaid
graph TB
A((App))-->B((Background))
A-->C((Header))
A-->D((Intervals))
A-->E((Modal))
A-->F((Controls))
B-->G((Squares))
B-->H((Fireworks))
D-->I((Interval))
E-->J((Settings))
J-->K((Form))
K-->L((NumberField))
K-->M((ToggleSwitchField))
F-->N((TimerControls))
```
