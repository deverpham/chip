declare let HANDLER: Handler;
interface Handler {
  ctrl: import("../node_modules/@types/express").Express;
  listen(): Function;
}
