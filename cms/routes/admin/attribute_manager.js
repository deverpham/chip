const {
  RouterAPI,
  CookieAPI,
  ModelAPI,
  pathAPI,
  themeAPI,
  viewAPI
} = require("../../../api");
const attrManagerRoute = new RouterAPI();
attrManagerRoute.get("/", async (req, res) => {
  const PostTypeModel = new ModelAPI("post_type");
  const posts = await PostTypeModel.Model.findAll({
    where: {},
    raw: true
  });
  const hook = res.locals.hook;
  hook.add_filter("ADMIN_PAGE_TITLE", {
    callback: async function() {
      return "Dashboard | Attribute Manager";
    }
  });
  await res.renderStream("admin/template/header.ejs");
  await res.renderStream("admin/attrmanager.ejs", {
    posts
  });
  await res.renderStream("admin/template/footer.ejs");
  res.end();
});
attrManagerRoute.get("/:post_type_id", async (req, res) => {
  const hook = res.locals.hook;
  const attrModel = new ModelAPI("attribute");
  const fields = attrModel.getInputFields();
  const templateFile = themeAPI.getAdminTemplatePath("model/add_form.ejs");
  const attrForm = await attrModel.getFormTemplate(fields, templateFile, {
    actionUrl: `/admin/post_type/${req.params.post_type_id}/add_field`
  });
  const posts = [];
  console.log("go");
  const attrs = await ModelAPI.getAttrPostType(req.params.post_type_id);
  console.log(attrs);
  await res.renderStream("admin/template/header.ejs");
  await res.renderStream("admin/attrmanager-detail.single.ejs", {
    attrForm,
    posts,
    attrs
  });
  await res.renderStream("admin/template/footer.ejs");
  res.end();
});
module.exports = attrManagerRoute;
