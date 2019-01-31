var stan = require('node-nats-streaming').connect('test-cluster', 'pub');

stan.on('connect', function () {

    for (var i = 1; i <= 5; i++) {
        stan.publish('foo', 'test ' + i, function (err, guid) {
            if (err) {
                console.log('publish failed: ' + err);
            } else {
                console.log('published message with guid: ' + guid);
            }
        });
    }

    setTimeout(function () {
        stan.close();
    }, 1000);

});
