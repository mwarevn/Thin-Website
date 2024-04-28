const homeRouter = require("./home.route");
const multer = require("multer");
const pathToSaveStaticIamges = __dirname.split("routes")[0] + "public/i";
function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathToSaveStaticIamges);
    },
    filename: function (req, file, cb) {
        const extname = file.originalname.split(".").reverse()[0];

        cb(null, generateRandomString(6) + "." + extname);
    },
});

const upload = multer({ storage: storage });

function routes(app) {
    app.post("/getshort", upload.single("image"), (req, res) => {
        res.send(process.env.WEBSITE_URL + "/i/" + req.file.filename);
    });

    app.use("/", homeRouter);
}

module.exports = routes;
