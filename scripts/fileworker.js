self.addEventListener('message', function (e) {
    var source = e.data, i;

    for (i = 0; i < source.length; i += 1) {

        var reader = new FileReader();

        reader.addEventListener('load', function (e) {
            postMessage(e.target.result);
        }, false);

        reader.readAsDataURL(source[i]);
    }

}, false);


