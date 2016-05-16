
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

function getToken (){

    $.get("/", function(data){
      console.log(data.locals)
  })
};
getToken();

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







var eventArray=[];
  // var eventArray = [
  //       { date: '2016-04-15', shortTitle: 'UBC', title: 'Upslope Brewing Company at Flatirons Park', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:'},
  //       { date: '2016-04-22', shortTitle: 'UBC', title: 'Upslope Brewing Company at Flatirons Park', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:' },
  //       { date: '2016-04-29', shortTitle: 'UBC', title: 'Upslope Brewing Company at Flatirons Park', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:' },
  //       { date: '2016-05-06', shortTitle: 'UBC', title: 'Upslope Brewing Company at Flatirons Park', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:' },
  //       { date: '2016-05-05', shortTitle: 'Cinco de Mayo', title: 'Cinco de Mayo with McDevitt Taco Supply', url: ''},
  //       { date: '2016-05-07', shortTitle: 'UBC', title: 'Special Saturday Appearance at Upslope Brewing Company', url: 'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=upslope%20brewing%20taproom&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:'},
  //       { date: '2016-05-21', shortTitle: 'SHD', title: 'Live Music and BBQ at Spirit Hound Distillery', url: 'https://www.google.com/maps/place/Spirit+Hound+Distillers/@40.2156531,-105.2560815,15z/data=!4m2!3m1!1s0x0:0x9eabfe68dad7c367'}
  //   ]


var getCalendar = function(){
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
  }

var myFirebaseRef = new Firebase("https://crackling-fire-6610.firebaseio.com/");
myFirebaseRef.on("value", function(snapshot) {
  var siteText = snapshot.val().SiteText;
  $(".row.about").append("<h2>" + siteText.About.Title + "</h2> <span class='about-text'>"+ siteText.About.Text + "</span>");
  for(prop in (siteText.Events)){
    if(siteText.Events[prop].inMainPage === true){
      $(".events-panels").append("<div class='panel panel-default'>\
        <div class='panel-heading' role='tab' id='heading" + prop + "'>\
         <h4 class='panel-title'>\
          <a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#"+ prop + "' aria-expanded='false' aria-controls=" + prop + ">" + siteText.Events[prop].title +"</a>\
         </h4>\
        </div>\
        <div id=" + prop +" class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" +prop +"'>\
         <div class='panel-body' contenteditable='true'>" + siteText.Events[prop].shortDesc + "</input>\
         </div>\
        </div>\
      </div>")};

  }

  for(prop in (siteText.FAQs)){
    $(".faqs-panels").append("<div class='panel panel-default'>\
      <div class='panel-heading' role='tab' id='heading" + prop + "'>\
       <h4 class='panel-title'>\
        <a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#"+ prop + "' aria-expanded='false' aria-controls=" + prop + ">" + siteText.FAQs[prop].question + "</a>\
       </h4>\
      </div>\
      <div id=" + prop +" class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" +prop +"'>\
       <div class='panel-body'>" + siteText.FAQs[prop].answer + "\
       </div>\
      </div>\
    </div>");
  }

  for(prop in (siteText.Events)){
    eventArray.push(siteText.Events[prop])
  }
  console.log(eventArray)
  getCalendar();
});
