const { app } = require("../../express");
const adminAPI = require("./view/admin");
const express = require("express");
class ViewAPI {
  constructor() {
    app.engine("html", require("ejs").renderFile);
    app.set("view engine", "html");
    this.admin = adminAPI;
  }
  addEngine(name, func) {
    return app.engine(name, func);
  }
  setEngine(name) {
    return app.set("view engine", name);
  }
  setStatic(route, pathFolder) {
    app.use(route, express.static(pathFolder));
  }
  addScript(res, script) {
    const hook = res.locals.hook;
    return hook.add_action("RESPONSE_HEAD", {
      callback: async function(oldScript) {
        oldScript = oldScript || "";
        switch (script.type) {
          case "link": {
            return oldScript + `<script src = ${script.content}></script>`;
          }
          /**
           * case text
           */
          default: {
            return oldScript + `<script>${script.content}</script>`;
          }
        }
      }
    });
  }

  addCss(res, script) {
    const hook = res.locals.hook;
    hook.add_action("RESPONSE_HEAD", {
      callback: async function(oldScript) {
        oldScript = oldScript || "";
        switch (script.type) {
          case "link": {
            return (
              oldScript + `<link rel='stylesheet' href = ${script.content} />`
            );
          }
          /**
           * case text
           */
          default: {
            return oldScript + `<style>${script.content}</style>`;
          }
        }
      }
    });
  }
}
module.exports = new ViewAPI();
