# Birdnest

## Full-stack app retrieving and displaying latest violating drone pilots using Reaktor endpoints.

This app was built according to the requirements set by Reaktor summer trainee –assignment. It is dependant on the Reaktor endpoints https://assignments.reaktor.com/birdnest/drones and https://assignments.reaktor.com/birdnest/pilots/:serialnum. This project is not deployed.

## Prerequisites

You need to have npm installed on your system. You also need a [mongoDB Atlas](https://www.mongodb.com/atlas/database) –database.

## How to use

Clone the project `git clone https://github.com/ollitoivanen/birdnest`
  
Create your [MongoDB Atlas database](https://www.mongodb.com/atlas/database) and create a Cluster according to https://www.mongodb.com/basics/create-database. 

[Find the connection URL](https://www.mongodb.com/docs/guides/atlas/connection-string/). Replace the MongoURL-variable in api/app.js with your own URL.

Change to api-folder `cd api`,  Run `npm install` to install required packages and start the server with `npm run dev`. The server is now running on http://localhost:8000/.

Change to client-folder. Run `npm install` to install required packages. Run `npm run start` to start the project.

## Structure
 
This project consists of a backend (api-folder) and a frontend (client-folder). The backend fetches data from the Reaktor endpoints and manipulates it to find the violating pilots. The data is then saved to MongoDB and sent to the client through the /violators -endpoint.
