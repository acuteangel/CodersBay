// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1FyjmDuEKBbGmkbxMMzpKj-LpSlZiXFk",
    authDomain: "august2018-cohort.firebaseapp.com",
    databaseURL: "https://august2018-cohort.firebaseio.com",
    projectId: "august2018-cohort",
    storageBucket: "august2018-cohort.appspot.com",
    messagingSenderId: "1033666292141"
  };
  
firebase.initializeApp(config);
  
var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

//  At the page load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot){

// If Firebase has a highPrice and highBidder stored (first case)
if (snapshot.val().highPrice != null && snapshot.val().highBidder != null) {

// Set the variables for highBidder/highPrice equal to the stored values in firebase.
highPrice = snapshot.val().highPrice;
highBidder = snapshot.val().highBidder;

}
// Change the HTML to reflect the stored values
$("#highest-bidder").text(highBidder);
$("#highest-price").text(highPrice);
// Print the data to the console.
  console.log(snapshot.val())

// Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.


// Change the HTML to reflect the initial values


// Print the data to the console.
});



// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
// prevent form from submitting with event.preventDefault() or returning false
  event.preventDefault();
// Get the input values
  var newPrice = $("#bidder-price").val();
  var newName = $("#bidder-name").val();
// Log the Bidder and Price (Even if not the highest)
console.log(newPrice + " "+newName);

// If Then statements to compare against previous high bidder
if (newPrice > highPrice) {

// Alert that they are High Bidder
alert("You are the High Bidder");

// Save the new price in Firebase
database.ref().set({
  highPrice: newPrice,
  highBidder: newName
})

// Log the new High Price
console.log(newPrice)

// Store the new high price and bidder name as a local variable (could have also used the firebase variable)
highPrice = newPrice;
highBidder = newName;

// Change the HTML to reflect the new high price and bidder

$("#highest-bidder").text(highBidder);
$("#highest-price").text(highPrice);
}
// Else tell user their bid was too low via alert
else {
  alert("Your bid is too low")
}});