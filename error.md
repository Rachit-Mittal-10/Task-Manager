**Getting this error when I sent the only password to `/login` route.**
```
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client;
    at ServerResponse.setHeader (node:_http_outgoing:652:11)
    at ServerResponse.header (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/response.js:174:12)
    at ServerResponse.json (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/response.js:278:15)
    at login (file:///home/sedtech/programming/Web-Development/task-manager/backend/src/controllers/authController.js:20:36)
    at Layer.handle [as handle_request] (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/layer.js:95:5)
    at next (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/route.js:149:13)
    at Route.dispatch (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/route.js:119:3)
    at Layer.handle [as handle_request] (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/layer.js:95:5)
    at /home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/index.js:284:15 {
  code: 'ERR_HTTP_HEADERS_SENT'
}
node:_http_outgoing:652
    throw new ERR_HTTP_HEADERS_SENT('set');
          ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (node:_http_outgoing:652:11)
    at ServerResponse.header (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/response.js:174:12)
    at ServerResponse.json (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/response.js:278:15)
    at login (file:///home/sedtech/programming/Web-Development/task-manager/backend/src/controllers/authController.js:32:25)
    at Layer.handle [as handle_request] (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/layer.js:95:5)
    at next (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/route.js:149:13)
    at Route.dispatch (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/route.js:119:3)
    at Layer.handle [as handle_request] (/home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/layer.js:95:5)
    at /home/sedtech/programming/Web-Development/task-manager/node_modules/express/lib/router/index.js:284:15 {
  code: 'ERR_HTTP_HEADERS_SENT'
}
```
