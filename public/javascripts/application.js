var getEmbedCode = function(images, index){
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url:"https://api.instagram.com/oembed/?url=" + images[index].link,
    success: function(data){
      var embedCodes = data.html;
    }
  })
}

$(document).ready(function(){
  var images;
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    jsonp : "callback",
    // jsonpCallback: "jsonpcallback",
    url: "https://api.instagram.com/v1/users/2228535302/media/recent?access_token=" + token + "&count=5&callback=callbackFunction",
    success: function(data) {
      console.log(data.data[0].link)
      images = data.data
      images.forEach(getEmbedCode(images, 0)
    }
  });


})
