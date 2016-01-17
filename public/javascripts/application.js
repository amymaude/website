var getEmbedCode = function(images, index){
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url:"https://api.instagram.com/oembed/?url=" + images[index].link,
    success: function(data){
      mostRecent = data.html;
    }
  })
}
var mostRecent;
var images;
$(document).ready(function(done){
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    jsonp : "callback",
    // jsonpCallback: "jsonpcallback",
    url: "https://api.instagram.com/v1/users/2228535302/media/recent?access_token=" + token + "&count=5&callback=callbackFunction",
    success: function(data) {
      images = data.data;
      getEmbedCode(images, 0);
    }
  })
})

$(document).ajaxComplete(function(){
  $('.insta-feed').append(mostRecent);
})
