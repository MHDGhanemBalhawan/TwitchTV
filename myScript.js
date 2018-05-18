$(function() {
  var streams = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
  ];
  $.getJSON(
    "https://api.twitch.tv/kraken/streams/freecodecamp?client_id=ponclsjp99mfwiv7w9jcz077047mnk"
  ).done(function(data) {});
  for (var i = 0; i < streams.length; i++) {
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/channels/" + streams[i],
      headers: {
        "client-ID": "ponclsjp99mfwiv7w9jcz077047mnk"
      },
      success: function(dataF) {
        //console.log(dataF);
        $.getJSON(
          "https://api.twitch.tv/kraken/streams/" +
            dataF.name +
            "?client_id=ponclsjp99mfwiv7w9jcz077047mnk"
        ).done(function(data2) {
          console.log(data2);
          var name = data2._links.self.slice(37);
          if (data2.stream === null) {
            $("#user").append(
              "<li><a target='blank' href='http://www.twitch.tv/" +
                name +
                "'>" +
                name +
                "</a></li>"
            );
            $("#status").append("<li>Offline.</li>");
            $("#game").append("<li>Not Availabe.</li>");
          } else {
            $("#user").append(
              "<li><a class='online' target='blank' href='http://www.twitch.tv/" +
                name +
                "'>" +
                name +
                "</a></li>"
            );
            $("#status").append("<li class='online'>Online !</li>");
            $("#game").append("<li class='online'>" + data2.stream.game + "</li>");
          }
        });
      },
      error: function(err) {
        alert("Error: user not found!");
      }
    });
  }
});
