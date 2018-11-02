const {
  RouterAPI,
  CookieAPI,
  ModelAPI,
  templateAPI,
  viewAPI
} = require("../../../api");
const postTypeRoute = new RouterAPI();
const joi = require("joi");
postTypeRoute.configValidate({
  "/:post_type_id": {
    GET: {
      params: {
        post_type_id: joi.number().required()
      }
    }
  },
  "/:post_type_id/add_field": {
    POST: {
      params: {
        post_type_id: joi.number().required()
      },
      body: {
        name: joi
          .string()
          .required()
          .min(4)
      }
    }
  }
});
postTypeRoute.get("/:post_type_id", async (req, res) => {
  const hook = res.locals.hook;
  hook.add_filter("ADMIN_PAGE_TITLE", {
    callback: async function() {
      return "Dashboard | Post Type | " + req.params.post;
    }
  });

  const collects = await Promise.all([
    new ModelAPI("post").findBy(
      {
        post_type_id: req.params.post_type_id
      },
      {
        logging: true
      }
    ),
    ModelAPI.getAttrPostType(req.params.post_type_id)
  ]);
  const posts = collects[0],
    attrs = collects[1];
  const dom = attrs.map(attr => ({
    id: attr.attr_id,
    name: attr.attr_name,
    type: attr.attr_type
  }));
  const result = templateAPI.loadTemplate("tableView")({
    items: dom,
    fields: undefined,
    name: "List_attr",
    addons: []
  });
  res.write(result);
  await res.renderStream("admin/template/header.ejs");
  await res.renderStream("admin/post_type.single.ejs");
  await res.renderStream("admin/template/footer.ejs");
  res.end();
});
postTypeRoute.post("/:post_type_id/add_field", async (req, res) => {
  const attrs = await ModelAPI.addAttrPostType(
    req.params.post_type_id,
    req.body.name
  );
  console.log(attrs);
  res.json(attrs);
});
module.exports = postTypeRoute;
