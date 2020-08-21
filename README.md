# Game Night Dev Build

Capstone project developed for the Flatiron Software Engineering BootCamp.

### Motivation: 

My motivation for this project was to allow my friends and I to stay in touch through our common love of video games. Through this app we are able to see an overview of all our planned events, update our game librarys, and add game nights to everyone's calanders. This application helps facilitate planning these events through clearly labeled and animated features, creating a very user friendly experience.

### Frontend 
This project was bootstrapped with React

### Backend
The sever side client was created using Node.js, Express and MongoDB 

### Api's Utilized

For Video Game look up and information [RAWG.io](https://rawg.io/)<br/>
To display events on a calender [Fullcallender.io](https://fullcalendar.io/)<br/> 
To create and reuse custom styled components [Styled-Components](https://styled-components.com/)<br/>

Link to frontend [here](https://github.com/WRHR/game-night-app)

In the project directory, you can run:

### `npm run start`

Runs the api server on port 5000 unless otherwise specified through a PORT located in a .env file.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run dev`

Starts the api server in developement mode, through the use of the nodemon package on port 5000 unless otherwise specified through a PORT located in a .env file.<br />

### Database configuration

MongoDB was used in the developement of this api. 
A mongo database will need to be connected through the DB_CONNECT variable located in a .env file. 

The server will pause and start if you make edits.<br />
You will also see any errors in the console.

