const { jwtDecode } = require("jwt-decode");

module.exports = function (app, controllers) {
  let uniquePath = [];
  controllers.forEach((controller) => {
    checkCondition(controller, uniquePath);
    if (controller.protected) {
      app.use(controller.path, (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (authHeader) {
          const user = jwtDecode(authHeader);
          // check expiration of token exp
          req.user = user;
          if (user.exp < Date.now() / 1000) {
            return res.status(401).send("Unauthorized: Token expired");
          }

          return next();
        } else if(controller.path.startsWith('/picture')) {
          return next();
        } else {
            return res.status(401).send("Unauthorized");
        }
      });
    }

    switch (controller.method) {
      case "get":
        app.get(controller.path, controller.handler);
        break;
      case "post":
        app.post(controller.path, controller.handler);
        break;
      case "put":
        app.put(controller.path, controller.handler);
        break;
      case "patch":
        app.patch(controller.path, controller.handler);
        break;
      case "delete":
        app.delete(controller.path, controller.handler);
        break;
      default:
        break;
    }
  });
  console.log("Routes have been successfully loaded, ready to serve.");
};

function checkCondition(controller, uniquePath) {
  if (uniquePath.includes(`${controller.path}|${controller.method}`)) {
    throw new Error(`Duplicate path: ${controller.path}`);
  } else {
    uniquePath.push(`${controller.path}|${controller.method}`);
  }

  if (!controller.path || controller.path === "") {
    throw new Error(`Path is required in controller: ${controller}`);
  }

  if (!controller.method || controller.method === "") {
    throw new Error(`Method is required in controller: ${controller}`);
  }

  if (!controller.handler || controller.handler === "") {
    throw new Error(
      `Handler Function(req, res) is required in controller: ${controller}`
    );
  }
}
