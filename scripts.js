var latitude;
var longitude;
var timezone_Id;
var key;
var snippet;
var clouds;
var people = [];


function getWeather(){


	var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=e7fa3b2d7714b2c6194e6a5159d73b0e"
	$.ajax({
			url: weatherURL,
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("Oh no!!!! Didn't work...");
			},
			success: function(data){

				console.log("The data object:");
				console.log(data);
				clouds = data.clouds.all

				if (clouds < 30){
					snippet="No clouds beneath you so why don't you take a look through the window and see what the Earthlings are doing for yourself? "
					console.log("Not enough clouds")
					$('#container').append(snippet);
				
				}
				else{

				getArticle()
				
				};
				
}
});


};






function getArticle(){
	
	var nyTimesId = "ded522f18d386bf639de4497a280a979:9:69853645"
	var dataURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+timezone_Id+"&sort=newest&api-key="+nyTimesId
	$.ajax({
			url: dataURL,
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("Oh no!!!! Didn't work...");
			},
			success: function(data){

				console.log("The data object:");
				console.log(data);
				if (data.response.docs.length == 0){
					snippet="Nothing's happening in " + timezone_Id + " apparently. At least according to the New York Times...";
					console.log("Nothing's happening in", timezone_Id, "apparently...")

				}
				else{

				snippet = data.response.docs[0].snippet;
				console.log(snippet);
				
				}
				$('#container').append(snippet);
				
}
});
};


function getCapital(){

	var coordURL = "https://api.wheretheiss.at/v1/coordinates/"+ latitude+","+longitude;
	$.ajax({
			url: coordURL,
			type: 'GET',
			dataType: 'json',
			error: function(data){
				console.log("Oh no!!!! Didn't work...");

				console.log("Nothing happens in the oceans. Or so they say...")
				$('#container').append("Dolphins are squealing and whales are moaning... ");
				// $('#ButtonBox').append("<button id='Button2'>"+
				// "I'm not interested in what's happening down there anymore."+
				// "</button>");
				$('#Place').append("We're over the hydroshpere!")

			},
			success: function(data){

				console.log("The data object:");
				console.log(data);
				console.log(data.timezone_id);
				timezone_Id = data.timezone_id;
				
				timezone_Id = timezone_Id.slice(timezone_Id.lastIndexOf("/")+1);
				if(timezone_Id.indexOf('_') === -1)
				{
				  console.log(timezone_Id);
				}
				else{
					timezone_Id=timezone_Id.replace('_',' ')

					console.log(timezone_Id);
				}
				console.log(timezone_Id);
				$('#Place').append("We're over ", timezone_Id +"!")
				





				getWeather();

			}
		});
};

function getCoordinates() {
	
	var issURL = "https://api.wheretheiss.at/v1/satellites/25544";
	$.ajax({
		url: issURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("Oh no!!!! Didn't work...");
		},
		success: function(data){

			console.log("The data object:");
			console.log(data);
			
			latitude = data.latitude;
			longitude = data.longitude;

			getCapital();

		}
	});
};

$(document).ready(function(){

	console.log("We are ready!");

 $('#Button').click(function(){

		console.log("CLicked the button!");
		$('#container').html("");
		$('#Place').html("");
		getCoordinates();
		

	});

$('#Button2').click(function(){

		console.log("CLicked the button!");
		$('#container').html("");
		$('#Place').html("");
		$('#ButtonBox').html("");
		

	});
// function setInterval(function(){
//       ('#Button').click(function()
//     },5000);
// setInterval()

});

// function setInterval(function(){
//       ('#Button').click(function()
//     },5000);


console.log("Not ready!");