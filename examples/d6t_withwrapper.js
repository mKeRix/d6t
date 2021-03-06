var d6t     = require('../d6t').d6t;
var ref     = require('ref');

// creating devh pointer used by d6t library
var d6t_devh = new d6t.d6t_devh_t();

// opening d6t device
d6t.d6t_open_js(d6t_devh, d6t.D6T_44L_06, null);

setInterval(function() {

    // performing read, getting pointer to data from d6t device handle
    var data = d6t.d6t_read_js(d6t_devh);

    // first word is temperature of the thermal sensor itself
    console.log("Thermal Sensor Temperature: %d", data[0]);

    // all remaining words are pixel temperatures
    for (var i = 1; i < data.length-1; i++)
    {
        console.log("%d: %d", i, data[i]);
    }

    // last byte is error check code used for crc
    var pec = data[data.length-1];
    console.log("pec: 0x%s", pec.toString(16));

}, 250);

process.on('exit', function() {
    d6t.d6t_close_js(d6t_devh);
});

