define(['Backbone', 'views/book'], function(Backbone, Book) {
    return Backbone.Collection.extend({
        model: Book
    })
});