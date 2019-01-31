var stan = require('node-nats-streaming').connect('test-cluster', 'sub');

stan.on('connect', function () {

    var opts = stan.subscriptionOptions();
    // opts.setStartWithLastReceived();
    opts.setManualAckMode(true);
    opts.setAckWait(5000);
    opts.setMaxInFlight(1);

    var subscription = stan.subscribe('foo', opts);
    subscription.on('message', function (msg) {
        console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData());
        setTimeout(function () {
            msg.ack('WORKS!');
        }, 2000);
    });
});
