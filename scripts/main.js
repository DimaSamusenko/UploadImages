var App = App || {};

App.Gallery = function (uploader) {
    'use strict';

    var doc = document;

    this.uploader = doc.querySelector(uploader);
};

App.Gallery.prototype = (function () {
    'use strict';
    var fileWorker = function (array) {
            var self = this,
                worker = new Worker('/scripts/fileworker.js');

            worker.postMessage(array);
            worker.addEventListener('message', function (e) {

                render(e.data);

            }, false);
        },

        bindUploader = function () {
            var uploaderInput = this.uploader;

            uploaderInput.addEventListener('change', function (e) {
                fileWorker(e.target.files);
            }, false);
        },

        render = function (data) {
            var imgData = data,
                doc = document,
                container = doc.querySelector('#gallery'),
                li = doc.createElement('li'),
                a = doc.createElement('a'),
                img = doc.createElement('img');

            li.className = 'span2';
            a.className = 'thumbnail';
            img.setAttribute('src', imgData);

            a.appendChild(img);
            li.appendChild(a);
            container.appendChild(li);
        },

        init = function () {
            bindUploader.apply(this);
        };

    return {
        init: init
    };
}());


document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var gallery = new App.Gallery('#uploader');
    gallery.init();

}, false);