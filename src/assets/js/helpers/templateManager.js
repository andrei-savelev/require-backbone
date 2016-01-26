define(['jquery', 'underscore'], function ($, _) {
    return {
        templates: {},

        get: function(name, callback) {
            var _tpl = null;
            $.get("/assets/js/templates/" + name + ".tpl", function(template) {
                _tpl = _.template(template);
            })
        }

    };
});