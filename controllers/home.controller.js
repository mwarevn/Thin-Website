class HomeController {
    index(req, res, next) {
        res.render("home/index");
    }
}

module.exports = new HomeController();
