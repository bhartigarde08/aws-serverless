const serverless = require("serverless-http");

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//to handle cors error
var cors = require("cors");
app.use(cors());

let userInfoList = [];
userInfoList.push(
	{ Id: 1, Name: "Joe", Mobile: "21321323", Address: "US" },
	{ Id: 2, Name: "Bharti", Mobile: "5345345", Address: "Pune" }
);

app.get("/", (req, res) => {
	res.send("Hello");
});

app.get("/home", (req, res) => {
	res.send({ Welcome: "This is the home page" });
});

app.get("/users", (req, res) => {
	res.send(userInfoList);
});

app.post("/users", (req, res) => {
	userInfoList.push(req.body);
	res.send({ ...req.body });
});

app.get("/users/:id", (request, response) => {
	const userId = parseInt(request.params.id);
	let user = userInfoList.find((data) => data.Id === userId);
	if (user != null) {
		response.send(user);
	} else {
		response.send("User Not Found!");
	}
});

app.listen(2000, () => console.log(`Listening on: 2000`));
module.exports.handler = serverless(app);

/**API Endpoints

    https://lnw4g98w67.execute-api.ap-south-1.amazonaws.com/dev/
    https://lnw4g98w67.execute-api.ap-south-1.amazonaws.com/dev/users
 */
