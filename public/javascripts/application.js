
var activeImage;
var activeEmbeddedInstaIndex=0;

var images;

var getEmbedCode = function(images, index){
  var url = "https://api.instagram.com/oembed/?url=" + images[index].link + "&OMIT_SCRIPT=true";
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: url,
    success: function(data){
      activeImage = data.html;
      appendImage(activeImage)
      instgrm.Embeds.process()
    }
  })
};


var appendImage = function(image){
  var imageId="img"+activeEmbeddedInstaIndex;
  if(activeEmbeddedInstaIndex == 0){
    $(".carousel-inner").append('<div class="item"' + ' id=' + imageId + '>'+ image +'</div>')
    $('.instagram-media').css({"max-width": "500px", "margin-right":"auto", "margin-left": "auto"});

    activeEmbeddedInstaIndex += 1
    console.log("in append Image checking if this is the first item")
    $("#img0").addClass("active");
    getEmbedCode(images, activeEmbeddedInstaIndex)
  }else{
    $(".item").last().before('<div class="item"' + ' id=' + imageId + '>'+ image +'</div>')
    $('.instagram-media').css({"max-width": "500px", "margin-right":"auto", "margin-left": "auto"});
  }
};



$(document).ready(function(){
  $('.carousel').carousel({
    interval: false
  })
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    jsonp : "callback",
    // jsonpCallback: "jsonpcallback",
    url: "https://api.instagram.com/v1/users/2228535302/media/recent?access_token=" + token + "&count=10&callback=callbackFunction",
    success: function(data) {
      console.log('in success after doc ready')
      console.log(data)
      images=data.data
      getEmbedCode(images, activeEmbeddedInstaIndex);
    }
  })
  $(".navbar-toggle").on("click", function(event){
    event.preventDefault();
    $('.navbar-left').css("padding-left", "0");
    $('.navbar-right').css("padding-right", "0");
  })
  $('#carousel-example-generic').on('slide.bs.carousel.right', function () {
    if(activeEmbeddedInstaIndex < 9){
      var activeImgId = "#img" + (activeEmbeddedInstaIndex+1);
      console.log(activeImgId)
      console.log($(activeImgId).length)
      if(!($(activeImgId).length > 0) && activeEmbeddedInstaIndex < 9){
        activeEmbeddedInstaIndex = activeEmbeddedInstaIndex+1;
        getEmbedCode(images, activeEmbeddedInstaIndex)
        setTimeout(function(){}, 500)
      }
    };
  })
})







  var eventArray = [
        { date: '2016-04-15', shortTitle: 'UBC', title: 'Upslope Brewing Company at Flatirons Park', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:'},
        { date: '2016-04-22', shortTitle: 'UBC', title: 'Upslope Brewing Company at Flatirons Park', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:' },
        { date: '2016-04-29', shortTitle: 'UBC', title: 'Upslope Brewing Company at Flatirons Park', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:' },
        { date: '2016-05-06', shortTitle: 'UBC', title: 'Upslope Brewing Company at Flatirons Park', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:' }

    ]



    clndr = $('#full-clndr').clndr({
      ready: function() {
        var self = this;
        $(this.element).on('mouseover', '.day', function(e) {
          var target = self.buildTargetObject(e.currentTarget, true);
          target.events.forEach(function(event){
            var classToHighlight =  '.' + event.date;
            $(classToHighlight).addClass('hovered-date');
          })
        });
        $(this.element).on('mouseleave', '.day', function(e) {
          var target = self.buildTargetObject(e.currentTarget, true);
          target.events.forEach(function(event){
            var classToHighlight =  '.' + event.date;
            $(classToHighlight).removeClass('hovered-date');
          })
        });
      },
      template: $('#full-clndr-template').html(),
      events: eventArray,

      forceSixRows: true
    });
