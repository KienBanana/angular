const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
console.log("check router", router);
const userdb = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  let indexUser = userdb.login.findIndex(
    (user) => user.email === email && user.password === password
  );
  return indexUser != -1 ? userdb.login[indexUser] : false;
}

// Register New User
// server.post("/auth/register", (req, res) => {
//   console.log("register endpoint called; request body:");
//   console.log(req.body);
//   const { email, password } = req.body;

//   if (isAuthenticated({ email, password }) === true) {
//     const status = 401;
//     const message = "Email and Password already exist";
//     res.status(status).json({ status, message });
//     return;
//   }

//   // Create token for new user
//   const access_token = createToken({ email, password });
//   console.log("Access Token:" + access_token);
//   res.status(200).json({ access_token });
// });

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;
  let userResult = isAuthenticated({ email, password });

  if (userResult === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({
    email: userResult.email,
    role: userResult.role,
    fullName: userResult.fullName
  });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
