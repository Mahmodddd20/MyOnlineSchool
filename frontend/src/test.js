import Pusher from 'pusher-js';


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('9f9f8bcd4a54b9f80bc9', {
    cluster: 'ap2'
});

const channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
    alert(JSON.stringify(data));
});
