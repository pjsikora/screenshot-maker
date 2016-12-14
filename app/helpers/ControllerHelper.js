var ControllerHelper = {
    // Method variables to variable
    m2v: function(req) {
        var v;

        if (req.method === "GET") {
            v = req.query;
        } else {
            v = req.body;
        }

        return v;
    }
}

module.exports = ControllerHelper;