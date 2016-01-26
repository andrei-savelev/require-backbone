define([
    'jquery',
    'underscore',
    'Backbone',
    'collections/library',
    'views/book'
],
    function($, _, Backbone, LibraryCollection, BookView) {
        return Backbone.View.extend({
            el: '#books',
            initialize: function (initialBook) {
                this.collection = new LibraryCollection(initialBook);
                console.log(this.collection);
                this.render();
            },
            render: function () {
                this.collection.each(function(item) {
                    this.renderBook(item);
                }, this);
            },
            renderBook: function (item) {
                var bookView = new BookView({
                    model: item
                });
                this.$el.append(bookView.render().el);
            }
        });
    });