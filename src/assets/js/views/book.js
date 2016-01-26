define([
    'jquery',
    'underscore',
    'Backbone',
    'helpers/templateManager'
],
    function($, _, Backbone, templateManager) {
        console.log(templateManager.get('bookTemplate'));
        return Backbone.View.extend({
            tagName: 'div',
            className: 'bookContainer',
            template: templateManager.get('bookTemplate', function(t) {
                this.template = t;
            }),
            render: function () {
                this.$el.html( this.template(this.model.toJSON() ));
                return this;
            }
        });
    });