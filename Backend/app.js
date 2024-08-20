'use strict'; //no silly javascript errors

//require dependencies
const express = require('express'); //express library performs server functionality for us
const cors = require('cors'); //cors control our app's security
const { MongoClient } = require('mongodb'); //import the client from the mongodb library
require('dotenv').config(); //configure .env usage
require('mongoose');

//create express app
const app = express(); //express app
app.use(cors()); //default cors security enabled - local app calls are allowed, aka Our local frontend can call our local backend
app.use(express.json()); //allows ability to parse incoming JSON 

//define variables
const URI = process.env.ConnectionString; //connection string to local mongodb server
const client = new MongoClient(URI); //handles db connection
const Team = require('./Schema.js')

// this is the entire GET route, for retrieving Teams

//wrap db calls within a function. 
//This helps keeps the process nice and neat and makes it easier to avoid ongoing/lingering connections
async function getTeams() {
    try {
        await client.connect(); //connect to db
        const database = client.db('NBAPlayers'); //checks for Database named TeamDB
        const collection = database.collection("Teams"); //checks for collection within TeamDB with a name equal to userID
        const result = await collection.find().toArray(); //await your async db query and store the result in a variable for use later
        console.log(result); //log to the console if you want
        return result; //this returns a value when the function is called
    } catch(e) {
        console.error(e);
    } finally {
        await client.close(); //using try, catch, finally is BEST practice.
        //Always close your collection after you've used it. OR ELSE
    }
}

//configure a route to the base url
app.get('/GET', async (req, res) => {
    res.send(await getTeams());
    //userID here has to check data given from frontend, check for userID and throw it into the function as a variable
});

async function saveTeam(newTeam) {
    try {
        console.log(URI + '')
        await mongoose.connect(URI + '/PublicKip');
        const person = new Team({ name: newTeam.name, role: newTeam.role, losses: newTeam.losses, logo: newTeam.logo });
        await person.save().then(() => console.log('new Team saved'));
    } catch(e) {
        console.log(e);
    } finally {
        await mongoose.disconnect();
    }
}

app.post('/POST', async (req, res) => {
  try {
    await saveTeam(req.body) // figure out how to go through a whole array and fit it into a proper schema
    // await getTeams(req.body) // this will return a proper array with the Teams, might not need to be a whole function
    // worst case: every Team is parsed (fit into Mongo/Mongoose Schema) individually, then added to a new array (yet to be created), this array is then sent to mongo?
    // ideally: Schema syntax will already go through full array, or there is a seperate function for it, OR we can create a for loop/map every part of the array
    res.send('Teams Saved To Local Host');
  } catch (e) {
    console.log(e);
    res.send('Error Saving Teams'); 
  }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//start the server
app.listen(3000, ()=> {
    console.log('App running on: '+'http://localhost:3000/GET');
})