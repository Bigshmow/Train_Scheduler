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

    var database = firebase.database();
    var trainName = "";
    var trainDest = "";
    var firstTrain = 0;
    var trainFreq = 0;

    database.ref().set({
        trainName: trainName,
        trainDest: trainDest,
        firstTrain: firstTrain,
        trainFreq: trainFreq
    })

    $("#add-train").on("click", function () {
        event.preventDefault();
        trainName = $("#train-name").val().trim();
        trainDest = $("#train-dest").val().trim();
        firstTrain = $("#train-time").val().trim();
        trainFreq = $("#train-freq").val().trim();
        
        database.ref().push({
            trainName: trainName,
            trainDest: trainDest,
            firstTrain: firstTrain,
            trainFreq: trainFreq
        })

        $("#train-name").val("");
        $("#train-dest").val("");
        $("#train-time").val("");
        $("#train-freq").val("");
    });

    database.ref().on("value", function (snapshot) {

        $("#trainTable").append("<tr><td>"+ trainName +"</td><td>"+ trainDest + "</td><td>"+ firstTrain + "</td><td>" + trainFreq + "</td><td>"+ "placeholder" + "</td>");
        


        $("#name-display").text(snapshot.val().trainName);
        $("#email-display").text(snapshot.val().trainDest);
        $("#age-display").text(snapshot.val().firstTrain);
        $("#comment-display").text(snapshot.val().trainFreq);

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