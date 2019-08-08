$(document).ready(function () {


    // Global Variables
    // ----------------

    var firebaseConfig = {
        apiKey: "AIzaSyAIVrFxA-4E_hphy0Y1wh4TxDXn-S1lO1k",
        authDomain: "train-schedule-1e5df.firebaseapp.com",
        databaseURL: "https://train-schedule-1e5df.firebaseio.com",
        projectId: "train-schedule-1e5df",
        storageBucket: "train-schedule-1e5df.appspot.com",
        messagingSenderId: "736090143638",
        appId: "1:736090143638:web:2544c30ece165365"
    };

    firebase.initializeApp(firebaseConfig);

    var currentTime = moment().format("HH:mm");
    console.log(currentTime);

    var database = firebase.database();
    var trainName = "Ralph Wiggum";
    var trainDest = "Springfield";
    var trainFreq = 42;
    var firstTrain = "08:00";
    var nextTrain = currentTime;
    var tMinutesTillTrain = " ";


    database.ref().set({
        trainName: trainName,
        trainDest: trainDest,
        firstTrain: firstTrain,
        nextTrain: nextTrain,
        trainFreq: trainFreq,
        tMinutesTillTrain:tMinutesTillTrain,
    })

    $("#add-train").on("click", function () {
        event.preventDefault();
        trainName = $("#train-name").val().trim();
        trainDest = $("#train-dest").val().trim();
        firstTrain = $("#train-time").val().trim();
        trainFreq = $("#train-freq").val().trim();

        var firstArrival = moment(firstTrain, "HH:mm");
        console.log(firstArrival);
        // Difference between the times
        var diffTime = moment().diff(moment(firstArrival), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime + "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

        database.ref().push({
            trainName: trainName,
            trainDest: trainDest,
            firstTrain: firstTrain,
            nextTrain: moment(nextTrain).format("HH:mm"),
            trainFreq: trainFreq,
            tMinutesTillTrain:tMinutesTillTrain,
        })

        $("#train-name").val("");
        $("#train-dest").val("");
        $("#train-time").val("");
        $("#train-freq").val("");
    });

    database.ref().on("value", function (snapshot) {

        $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + nextTrain + "</td><td>" + trainFreq + "</td><td>" + tMinutesTillTrain + "</td>");



        $("#name-display").text(snapshot.val().trainName);
        $("#email-display").text(snapshot.val().trainDest);
        $("#age-display").text(snapshot.val().firstTrain);
        $("#comment-display").text(snapshot.val().nextTrain);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


    // Functions
    // ---------
    // alert("choochooing");
    // Run
    // ---
});