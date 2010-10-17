var ourUsername;
var subscription = null;
var conn = null;
$(function() {
    conn = hookbox.connect('http://km.hosted.hookbox.org');
    conn.onOpen = function() { console.log("connection established!"); }
    conn.onError = function(err) { alert("connection failed: " + err.msg); }

    conn.subscribe("my_events");

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




});


function publishBlogPost(blog) {
    console.log("skal publishe %o ", blog);
    console.log(subscription);
    try {
        conn.publish("my_events", JSON.stringify(blog));

    } catch (e) {
        console.log(e);
    }
}