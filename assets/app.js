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

    // var trainRef = database.ref("/TrainData");
    // var trainName = database.ref(".name/train");
    // var trainDestination = database.ref(".destination/train");
    // var trainFrequency = database.ref(".frequency/train");
    // var trainArrival = database.ref(".arrival/train");

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
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.arrival);

        //Clears all text-boxes
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-frequency").val("");
        $("#train-arrival").val("");
    });

    ///////////////// Firebase Event to Add Train Info (Timesheet) /////////////////////

    //Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot.val());

        //Store everything into a variable
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFrequency = childSnapshot.val().frequency;
        var tArrival = childSnapshot.val().arrival;

        //train info
        console.log(tName);
        console.log(tDestination);
        console.log(tFrequency);
        console.log(tArrival);

        //Prettify the train start
        var trainArrives = moment.unix(tArrival).format("MM/DD/YY");

        // Calculate the arrival time using hardcore math
        // To calculate the arrival time
        var arrivalTime = moment().diff(moment(empStart, "X"), "months"); //might need to change var name to minutesAway
        console.log(arrivalTime);

        // Calculate the total billed rate
        // var empBilled = empMonths * empRate;
        // console.log(empBilled);

        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
            tFrequency + "</td><td>" + tArrival + "</td><td>" + minutesAway + "</td></tr>");
    });
});