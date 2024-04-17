var FormViewModel = function () {

    var self = this;
    self.name = ko.observable().extend({ required: true });;
    self.email = ko.observable().extend({ required: true, email:true });;
    self.text = ko.observable().extend({ required: true });;

    self.submitForm = function () {
        self.errors = ko.validation.group(self);

        self.errors.showAllMessages();

        if (self.errors().length == 0) {
            var jsonData = ko.toJSON(self);
            console.log(jsonData);
            $.ajax({
                url: "/api/Form",
                type: 'post',
                data: jsonData,
                contentType: 'application/json',
                success: function (result) {
                    alert('Your message was succesfully send');
                }
            });
            //$.post("/Home/SendEmail", jsonData, function (returnedData) {
            //    alert('Cool');
            //})
        }
    };
};
