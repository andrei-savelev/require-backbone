define(['jquery', 'underscore', 'Backbone'], function($, _, Backbone) {
    return Backbone.Model.extend({
        defaults: {
            title: 'No title',
            author: 'Unknown',
            releaseDate: 'Unknown',
            keywords: 'None'
        }
    })
});