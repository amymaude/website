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
  console.log("hello", token)
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    jsonp : "callback",
    // jsonpCallback: "jsonpcallback",
    url: "https://api.instagram.com/v1/users/2228535302/media/recent?access_token=" + token + "&count=5&callback=callbackFunction",
    success: function(data) {
      images=data.data
      console.log(data)
      var time = moment(images[0].created_time*1000).local().format("dddd, MMMM Do, YYYY")
      var backgroundImage = images[0].images.standard_resolution.url
      console.log(images[0].caption)
      $(".alert-info").append(time + ": "+ images[0].caption.text)
      $(".item img").first().attr("src", backgroundImage)
      getEmbedCode(images, 0);
    }
  })
  $(".navbar-toggle").on("click", function(event){
    event.preventDefault();
    $('.navbar-left').css("padding-left", "0");
    $('.navbar-right').css("padding-right", "0");
  })
})

$(document).ajaxComplete(function(){
  $('.insta-feed').append(mostRecent);
  setTimeout(function(){$('iframe').css({"max-width": "500", "margin-right":"auto", "margin-left": "auto"})}, 500);
})
