var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

var events;
Template.HomePublic.rendered = function() {
    Meteor.subscribe('calendar');
    var initDrag = function(el) {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim(el.text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                el.data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                el.draggable({
                    zIndex: 999,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0 //  original position after the drag
                });
            };

            var addEvent = function(title) {
                title = title.length === 0 ? "Untitled Event" : title;
                var html = $('<div class="external-event label label-default">' + title + '</div>');
                jQuery('#event_box').append(html);
                initDrag(html);
            };

            $('#external-events div.external-event').each(function() {
                initDrag($(this));
            });

            $('#event_add').unbind('click').click(function() {
                var title = $('#event_title').val();
                addEvent(title);
            });

            //predefined events
            $('#event_box').html("");
            addEvent("My Event 1");
            addEvent("My Event 2");
            addEvent("My Event 3");


};

Template.HomePublic.events({


    //     //console.log(this.data._id);
    // var _cycleCursor = Cycles.find({ tankId: Session.get('selectedTank'), active: true });
    // Session.set("ActiveProtocolId",this.data.protocolID);
    // var int = 0;
    // var steps=[];
    // var firstStep = true;
    // var firstDate = null;
    // var _liveCycleCursor;
    // _cycleCursor.forEach(function (cycle) {
        
    //     var steps=[];
    //     var colors = App.getLayoutColorCodes();

    //     var activeCycle = { title: cycle.name, start: moment(cycle.startdate).format('YYYY-MM-DD'), end: moment(cycle.enddate).format('YYYY-MM-DD'), allDay: true, backgroundColor: colors[int]}
    //     //console.log(activeCycle);
    //     steps.push(activeCycle);
    //     setTimeout(function () {
    //     $('#calendar').fullCalendar( 'addEventSource', steps );
	
});

Template.HomePublic.helpers({
	calendarOptions: {
          // Standard fullcalendar options
          header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
          },
          height: 650,
          editable: true,
          droppable: true,
          lang: 'nl',
          drop: function(date, allDay) { // this function is called when something is dropped
                    console.log(this);
                    console.log(date.hasTime());
                    console.log(allDay);
                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');

                    console.log(originalEventObject);
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);

                    // assign it the date that was reported
                    copiedEventObject.start = moment(date).format('YYYY-MM-DD HH:mm');
                    //copiedEventObject.end = moment(date).format('YYYY-MM-DD HH:mm');
                    if (date.hasTime()) {
                        copiedEventObject.allDay = false;
                    } else {
                        copiedEventObject.allDay = true;
                    }
                        
                    copiedEventObject.backgroundColor = '#4b8df8';

                    console.log(copiedEventObject);

                    var calevent = {
                        calid : "myCalendarId",
                        events : [ copiedEventObject ]
                    }

                    Calendar.insert(calevent);
                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
            // Function providing events reactive computation for fullcalendar plugin
            events: function(start, end, timezone, callback) {
                //console.log(start);
                //console.log(end);
                //console.log(timezone);
                var events = [];
                // Get only events from one document of the Calendars collection
                // events is a field of the Calendars collection document
                var calendar = Calendar.find(
                    { "calid":"myCalendarId" },
                    { "fields": { 'events': 1 }}
                );


                calendar.forEach(function (event) {
                    //console.log(event.events[0].title);
                    var eventitem = { title: event.events[0].title, start: event.events[0].start, end: event.events[0].end, allDay: event.events[0].allDay, backgroundColor: event.events[0].backgroundColor}
                    //console.log(eventitem);
                    events.push(eventitem); 
                });

                //$('#calendar1').fullCalendar( 'addEventSource', events );
                // events need to be an array of subDocuments:
                // each event field named as fullcalendar Event Object property is automatically used by fullcalendar
                
                callback(events);
                //$('#calendar1').fullCalendar( 'addEventSource', events );
            },
            // Optional: id of the calendar
            id: "calendar1",
            // Optional: Additional classes to apply to the calendar
            //addedClasses: "col-md-8",
            // Optional: Additional functions to apply after each reactive events computation
            autoruns: [
            function () {
                console.log("user defined autorun function executed!");
            }
            ]
        }
    });

Template.HomePublicHomeJumbotron.rendered = function() {
	
};

Template.HomePublicHomeJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("login", {});
	}
	
});

Template.HomePublicHomeJumbotron.helpers({
	
});
