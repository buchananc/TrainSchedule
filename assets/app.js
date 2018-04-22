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

    //Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot.val());

        //Store everything into a variable
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFrequency = childSnapshot.val().frequency;
        var tArrival = childSnapshot.val().arrival; 
        var startTime = moment().fromNow();

        //train info
        console.log(tName);
        console.log(tDestination);
        console.log(tFrequency);
        console.log(tArrival);

        //Prettify the train arrival time
        var trainArrives = moment.unix(tArrival).format("hh:mm");

        var diff = moment.duration(moment(then).diff(moment(now)));

        //calculate minutes away 
        function minutesAway(startTime, trainArrives) {
            var start = moment(startTime, "hh:mm");
            var end = moment(trainArrives, "hh:mm");
            var minutes = end.diff(start, 'minutes');
            var interval = moment().hour(0).minute(minutes);
            // interval.subtract(lunchTime, 'minutes');
            return interval.format("hh:mm");
        }
        console.log("minutes away " + minutesAway());
        console.log("start time " + startTime);


        // Calculate the total billed rate
        // var empBilled = empMonths * empRate;
        // console.log(empBilled);

        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
            tFrequency + "</td><td>" + tArrival + "</td><td>" + minutesAway + "</td></tr>");
    });
});