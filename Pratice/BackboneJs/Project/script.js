let FeedbackView = Backbone.View.extend({
    el: "#app",

    template: _.template($("#myFormTemplate").html()),

    initialize: function () {
        this.render();
        this.model = new FeedbackModel();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },
   
    
    });

let view = new FeedbackView();

