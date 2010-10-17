var ourUsername;
var subscription = null;
$(document).ready(function() {
    var conn = hookbox.connect('http://km.hosted.hookbox.org:80');
    conn.onOpen = function() { console.log("connection established!"); }
    conn.onError = function(err) { alert("connection failed: " + err.msg); }

    conn.onSubscribed = function(channelName, _subscription) {
        ourUsername = conn.username;
        console.log("onsubscribed with username " + ourUsername);
        subscription = _subscription;
        subscription.onPublish = function(frame) {
            if (frame.user != ourUsername) {
                console.log(frame.user + " said: " + frame.payload);
                html5team4.webdb.addBlogpost(JSON.parse(frame.payload));
            }
        }
    }


    conn.subscribe("my_events");


});


publishBlogPost = function(blog) {
    subscription.publish(JSON.stringify(blog));
}