var myFirebaseRef = new Firebase("https://crackling-fire-6610.firebaseio.com/");
var aboutRef = new Firebase('https://crackling-fire-6610.firebaseio.com/SiteText/About');


$(document).on('click', '#submitAbout', function(e){saveAbout()});
$(document).on('click', '#submitEvents', function(e){e.preventDefault(); saveEvents()});
$(document).on('click', '#addEvent', function(e){addEvent()});
$(document).on('click', '.delete-event', function(e){var event = $(this).attr('id'); deleteEvent(event)})

var saveAbout = function(){

  var title = $('#aboutTitle').val();
  var text = $('#aboutText').val();
  aboutRef.update({Title: title, Text: text});
}

var saveEvents = function(){
  console.log(($('.event-form-group')));
  $('.event-form-group').each(function(i){
    var id = $(this).find('#eventDate').val();
    console.log(id)
    if(id){
      var eventRef = new Firebase('https://crackling-fire-6610.firebaseio.com/SiteText/Events/' + id);
      var title = $(this).find('#eventTitle').val();
      var text = $(this).find('#eventText').val();
      var date = $(this).find('#eventDate').val();
      var url = $(this).find('#eventMapsUrl').val();
      var checked = $(this).find('#inMainPage').prop('checked') ? true : false;
      console.log(checked)
      eventRef.update({date: date, shortDesc: text, title: title, url: url, inMainPage: checked})
    }else{
      alert('Updated or added event date was invalid')
    }
  })

}


var deleteEvent= function(event){
  var eventRef = new Firebase('https://crackling-fire-6610.firebaseio.com/SiteText/Events/'+event);
  if (confirm("Are you sure you want to delete this event?")){
    if (event==="new"){
      $('.event-form-group#new').remove();
    }else{
      eventRef.remove()
    }
  }
  return false;
}
var addEvent = function(){
  if($('.event-form-group').last().attr('id') !=="new"){
  $('.event-form-group').last().append(
    "<div class='event-form-group' id='new'>\
      <div class='form-group'>\
        <label for='eventTitle' class='col-sm-2 control-label'>Event Title </label>\
        <div class='input-group'>\
          <div class='col-sm-8'>\
            <input type='text' id='eventTitle' class='form-control' value=''>\
          </div>\
          <span class='input-group-btn'>\
            <button type='button' class='btn btn-danger delete-event' id='new'>Delete Event</button>\
          </span>\
        </div>\
      </div>\
      <div class='form-group'>\
        <div class='col-sm-offset-2 col-sm-10'>\
          <div class='checkbox'>\
            <label>\
              <input id='inMainPage' type='checkbox' value='true'> This is a featured event & should be listed on the main page dropdown\
            </label>\
          </div>\
        </div>\
      </div>\
      <div class='form-group'>\
        <label for='eventDate' class='col-sm-2 control-label'>Event Date </label>\
        <div class='col-sm-6'>\
          <input type='date' id='eventDate' class='form-control'>\
        </div>\
      </div>\
      <div class='form-group'>\
        <label for='eventMapsUrl' class='col-sm-2 control-label'>Google Maps Url </label>\
        <div class='col-sm-6'>\
          <input type='text' id='eventMapsUrl' class='form-control'>\
        </div>\
      </div>\
      <div class='form-group'>\
        <label for='eventText' class='col-sm-2 control-label'> Event Description </label>\
        <div class='col-md-8'>\
          <textarea class='form-control' id='eventText' rows='4'></textarea>\
        </div>\
      </div>\
    </div>")}else{
      alert("You already created a new event! Save your changes or hit the refresh button to reset before creating another new event")
    }
}

myFirebaseRef.on("value", function(snapshot) {
  var eventPanels = "<form class='form-horizontal edit-events'>";
  var siteText = snapshot.val().SiteText;
  $("form.edit-about").replaceWith(
    "<form class='form-horizontal edit-about'>\
      <div class='form-group'>\
        <label for='aboutTitle' class='col-sm-2 control-label'> About Section Title</label>\
        <div class='col-sm-6'>\
          <input type='text' id='aboutTitle' class='form-control' value='" + siteText.About.Title + "'>\
        </div>\
      </div>\
      <div class='form-group'>\
        <label for='aboutText' class='col-sm-2 control-label'> About Section Text</label>\
        <div class='col-md-8'>\
          <textarea class='form-control col-sm-6' id='aboutText' rows='6'>" + siteText.About.Text + "</textarea>\
        </div>\
      </div>\
      <div class='form-group'>\
        <div class='col-sm-offset-2 col-sm-10'>\
          <button type='submit' class='btn btn-primary' id='submitAbout'>Save About Section Changes</button>\
        </div>\
      </div>\
    </form>");


  for(prop in (siteText.Events)){
    var url = (siteText.Events[prop].url) ? siteText.Events[prop].url : '';
    var checked = siteText.Events[prop].inMainPage ? "checked" : '';

   eventPanels = eventPanels +
    "<div class='event-form-group' id='" + prop+"'>\
      <div class='form-group'>\
        <label for='eventTitle' class='col-sm-2 control-label'>Event Title </label>\
        <div class='input-group'>\
          <div class='col-sm-8'>\
            <input type='text' id='eventTitle' class='form-control' value='" + siteText.Events[prop].title + "'>\
          </div>\
          <span class='input-group-btn'>\
            <button type='button' class='btn btn-danger delete-event' id='"+prop+"'>Delete Event</button>\
          </span>\
        </div>\
      </div>\
      <div class='form-group'>\
        <div class='col-sm-offset-2 col-sm-10'>\
          <div class='checkbox'>\
            <label>\
              <input id='inMainPage' type='checkbox' "+checked+"> This is a featured event & should be listed on the main page dropdown\
            </label>\
          </div>\
        </div>\
      </div>\
      <div class='form-group'>\
        <label for='eventDate' class='col-sm-2 control-label'>Event Date </label>\
        <div class='col-sm-6'>\
          <input type='date' id='eventDate' class='form-control' value='" + siteText.Events[prop].date + "'>\
        </div>\
      </div>\
      <div class='form-group'>\
        <label for='eventMapsUrl' class='col-sm-2 control-label'>Google Maps URL </label>\
        <div class='col-sm-6'>\
          <input type='text' id='eventMapsUrl' class='form-control' value='" + url + "' placeholder='http://www.google.com'>\
        </div>\
      </div>\
      <div class='form-group'>\
        <label for='eventText' class='col-sm-2 control-label'> Event Description </label>\
        <div class='col-md-8'>\
          <textarea class='form-control' id='eventText' rows='4'>" + siteText.Events[prop].shortDesc+"</textarea>\
        </div>\
      </div>\
    </div>"
  }
  eventPanels += "<div class='form-group' style='padding-top: 20px'><div class='col-sm-offset-2 col-sm-10'><button type='submit' class='btn btn-primary' id='submitEvents'>Save Events Section Changes</button>\
      <button type='button' class='btn btn-default' id='addEvent'>Add Event</button>\
    </div>\
  </div>\
</form>";
  $('.edit-events').replaceWith(eventPanels);

})

//   for(prop in (siteText.FAQs)){
//     $(".faqs-panels").append("<div class='panel panel-default'>\
//       <div class='panel-heading' role='tab' id='heading" + prop + "'>\
//        <h4 class='panel-title'>\
//         <a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#"+ prop + "' aria-expanded='false' aria-controls=" + prop + ">" + siteText.FAQs[prop].question + "</a>\
//        </h4>\
//       </div>\
//       <div id=" + prop +" class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" +prop +"'>\
//        <div class='panel-body'>" + siteText.FAQs[prop].answer + "\
//        </div>\
//       </div>\
//     </div>");
//   }
// })
