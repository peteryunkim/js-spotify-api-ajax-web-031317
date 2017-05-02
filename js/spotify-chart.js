var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0,10)
}

function extractPopularity(tracks) {
  return tracks.map(function(track){
    return track.popularity
  })
}

function extractNames(tracks) {
  return tracks.map(function(track){
    return track.name
  })
}

function chartData(labels, inputData) {
  // your code here
  console.log(labels)
  console.log(inputData)
  // use the dataSetProperties variable defined above if it helps
  var ctx = document.getElementById("spotify-chart").getContext("2d");
  var data = {
  	labels: labels,
  	datasets: [
  		{
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
  			data: inputData
  		}
  	]
  };
  var myBarChart = new Chart(ctx).Bar(data);
}

function getSpotifyTracks(callback){
  $.ajax({
    method: 'GET',
    url: url,
    dataType: 'json',
    success: success
  })
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  let tracks = extractTop10Tracks(parsedJSON.tracks)
  let names = extractNames(tracks)
  let popularity = extractPopularity(tracks)
  let chart = chartData(names, popularity)
  // console.log(tracks)
  // console.log(names)
  // console.log(popularity)
}
