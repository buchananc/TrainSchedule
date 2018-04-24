$(document).ready(function () {   
    
   /////////////// Initialize Firebase ////////////////////
    var config = {
        apiKey: "AIzaSyAtotlA8Gb_AWUgw-ThzNwbHX4pDz6ji-I",
        authDomain: "train-schedule-521a1.firebaseapp.com",
        databaseURL: "https://train-schedule-521a1.firebaseio.com",
        projectId: "train-schedule-521a1",
        storageBucket: "",
        messagingSenderId: "411172529292"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    /////////////// Button to add Train (Timesheet)////////////////////
    $("#submit").on("click", function (event) {
        event.preventDefault();

        //Grab user input
        var tName = $("#train-name").val().trim();
        var tDestination = $("#train-destination").val().trim();
        var tFrequency = $("#train-frequency").val().trim();
        var tArrival = $("#train-arrival").val().trim();

        //Creates local "temporary" object for holding train data
        var newTrain = {
            name: tName,
            destination: tDestination,
            frequency: tFrequency,
            arrival: tArrival
        };

        //Uploads train data to the database
        database.ref().push(newTrain);

        //Logs everything to console
        // console.log(newTrain.name);
        // console.log(newTrain.destination);
        // console.log(newTrain.frequency);
        // console.log(newTrain.arrival);

        //Clears all text-boxes
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-frequency").val("");
        $("#train-arrival").val("");
    });

    ///////////////// Firebase Event to Add Train Info (Timesheet) /////////////////////

    //input first arrival and freq
    //current time
    //while current time > last arrival then add freq
    //subtract minutes current time from arrival time

    //Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot.val());

        //Store everything into a variable
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFrequency = childSnapshot.val().frequency;
        var tArrival = childSnapshot.val().arrival; 
        //var startTime = moment().fromNow();

        //train info
        console.log(tName);
        console.log(tDestination);
        console.log(tFrequency);
        console.log(tArrival);

        //Prettify the train arrival time
        var trainArrives = moment.unix(tArrival).format("hh:mm");

        // var diff = moment.duration(moment(then).diff(moment(now)));
        //calculate minutes away 
        var timeDiff = moment().diff(moment(tArrival, "hh:mm A"), 'm');
        var minutesAway = timeDiff % tFrequency;
        var timeLeft = tFrequency - minutesAway;

        console.log ("Time Difference " + timeDiff); //works
        console.log ("Minutes away " + minutesAway); //works
        console.log ("Time left " + timeLeft); //works

        //calculate next arrival
        var nextTime = moment().add(timeLeft, 'm');

        //set variables
        var newTrain = moment(nextTime).format("hh:mm A");
        console.log(newTrain);
        var timeAway = timeLeft;
        console.log("Minutes away: " + timeAway);

        // Add each train's data into the table
        $("#train-table").append(
            "<tr><td>" + tName + 
            "</td><td>" + tDestination + 
            "</td><td>" + tFrequency + 
            "</td><td>" + tArrival + 
            "</td><td>" + timeLeft + 
            "</td></tr>");
    });
});