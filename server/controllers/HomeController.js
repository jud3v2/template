module.exports = function HomeController(app) {
    return [
        {
            path: "/",
            protected: false,
            method: "get",
            handler: (req, res) => {
                return res.send("Hello World!");
            }
        }
    ]
};