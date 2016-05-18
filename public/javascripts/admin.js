var myFirebaseRef = new Firebase("https://crackling-fire-6610.firebaseio.com/");
var aboutRef = new Firebase('https://crackling-fire-6610.firebaseio.com/SiteText/About');


$(document).on('click', '#submitAbout', function(e){saveAbout()});
$(document).on('click', '#submitEvents', function(e){e.preventDefault(); saveEvents()});
$(document).on('click', '#addEvent', function(e){addEvent()});
$(document).on('click', '.delete-event', function(e){var event = $(this).attr('id'); deleteEvent(event)})
$(document).on('click', '#addFaq', function(e){addFaq()});
$(document).on('click', '.delete-faq', function(e){var faq = $(this).attr('id'); deleteFaq(faq)})
$(document).on('click', '#submitFaqs', function(e){e.preventDefault(); saveFaqs()});
var saveAbout = function(){

  var title = $('#aboutTitle').val();
  var text = $('#aboutText').val();
  aboutRef.update({Title: title, Text: text});
}

var guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
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

var saveFaqs = function(e){
  $('.faq-form-group').each(function(i){
    console.log('in save faqs!')
    var id = ($(this)).attr('id');
    console.log(id)
    if(id == 'new'){
      console.log('in generating uuid!')
      id = guid();
      console.log(id)
    }
    var faqRef = new Firebase('https://crackling-fire-6610.firebaseio.com/SiteText/FAQs/' + id);
    var question = $(this).find('#faqQuestion').val();
    var answer = $(this).find('#faqAnswer').val();
    faqRef.update({question: question, answer: answer})
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

var deleteFaq= function(faq){
  var faqRef = new Firebase('https://crackling-fire-6610.firebaseio.com/SiteText/FAQs/'+faq);
  if (confirm("Are you sure you want to delete this faq?")){
    if (faq==="new"){
      $('.faq-form-group#new').remove();
    }else{
      faqRef.remove()
    }
  }
  return false;
}
var addFaq = function(){
  if($('.faq-form-group').last().attr('id') !=="new"){
  $('.faq-form-group').last().append(
    "<div class='faq-form-group' id='new'>\
      <div class='form-group'>\
        <label for='faqQuestion' class='col-sm-2 control-label'>Question</label>\
        <div class='input-group'>\
          <div class='col-sm-8'>\
            <input type='text' id='faqQuestion' class='form-control' value=''>\
          </div>\
          <span class='input-group-btn'>\
            <button type='button' class='btn btn-danger delete-faq' id='new'>Delete this FAQ</button>\
          </span>\
        </div>\
      </div>\
      <div class='form-group'>\
        <label for='faqAnswer' class='col-sm-2 control-label'> Answer</label>\
        <div class='col-md-8'>\
          <textarea class='form-control col-sm-6' id='faqAnswer' rows='5'></textarea>\
        </div>\
      </div>\
    </div>")
  }else{
      alert("You already created a new faq! Save your changes, delete the new faq, or hit the refresh button to reset before creating another new event")
    }
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
      alert("You already created a new event! Save your changes, delete the new event, or hit the refresh button to reset before creating another new faq")
    }
}

myFirebaseRef.on("value", function(snapshot) {
  var eventPanels = "<form class='form-horizontal edit-events'>";
  var faqPanels = "<form class='form-horizontal edit-faqs'>";
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
          <textarea class='form-control col-sm-6' id='aboutText' rows='10'>" + siteText.About.Text + "</textarea>\
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
    var title = (siteText.Events[prop].title) ? siteText.Events[prop].title : '';
    var shortDesc = (siteText.Events[prop].shortDesc) ? siteText.Events[prop].shortDesc : ''
   eventPanels = eventPanels +
    "<div class='event-form-group' id='" + prop+"'>\
      <div class='form-group'>\
        <label for='eventTitle' class='col-sm-2 control-label'>Event Title </label>\
        <div class='input-group'>\
          <div class='col-sm-8'>\
            <input type='text' id='eventTitle' class='form-control' value='" + title + "'>\
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
          <textarea class='form-control' id='eventText' rows='4'>" + shortDesc+"</textarea>\
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


  for(prop in (siteText.FAQs)){
    faqPanels = faqPanels +
      "<div class='faq-form-group' id='" + prop+"'>\
        <div class='form-group'>\
          <label for='faqQuestion' class='col-sm-2 control-label'>Question</label>\
          <div class='input-group'>\
            <div class='col-sm-8'>\
              <input type='text' id='faqQuestion' class='form-control' value='" + siteText.FAQs[prop].question + "'>\
            </div>\
            <span class='input-group-btn'>\
              <button type='button' class='btn btn-danger delete-faq' id='"+prop+"'>Delete this FAQ</button>\
            </span>\
          </div>\
        </div>\
        <div class='form-group'>\
          <label for='faqAnswer' class='col-sm-2 control-label'> Answer</label>\
          <div class='col-md-8'>\
            <textarea class='form-control col-sm-6' id='faqAnswer' rows='5'>" + siteText.FAQs[prop].answer + "</textarea>\
          </div>\
        </div>\
      </div>"
  }

  faqPanels += "<div class='form-group' style='padding-top: 20px'><div class='col-sm-offset-2 col-sm-10'><button type='submit' class='btn btn-primary' id='submitFaqs'>Save FAQs Section Changes</button>\
      <button type='button' class='btn btn-default' id='addFaq'>Add Faq</button>\
    </div>\
  </div>\
</form>";
  $('.edit-faqs').replaceWith(faqPanels);

})
