
$(document).ready(function(done){


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

})
