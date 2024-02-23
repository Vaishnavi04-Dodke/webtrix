let FeedbackModel = Backbone.Model.extend({
    defaults: {
        name: '',
        email: '',
        message: ''
    },

    validate: function (attrs) {
        let errors = {};

        if (!attrs.name.trim()) {
            errors.name = "Name is required";
        }

        if (!attrs.email.trim()) {
            errors.email = "Email is required";
        } else {
            // Basic email format validation
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(attrs.email)) {
                errors.email = "Invalid email format";
            }
        }

        if (!attrs.message.trim()) {
            errors.message = "Feedback message is required";
        }

        return Object.keys(errors).length > 0 ? errors : undefined;
    }
});

