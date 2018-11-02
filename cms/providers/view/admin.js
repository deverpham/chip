/**
 * @typedef {Object} ItemOptions
 * @property {string} link
 * @property {string} name
 */
class AdminAPI {
  /**
   *
   * @param {ItemOptions} opts
   * @param {Object} hook
   */
  addMenuItem(hook, opts) {
    const html = `
        <li>
            <a href = '${opts.link}'>
            ${opts.name}
            </a>
        </li>
        `;
    hook.add_action("MENU_DASHBOARD", {
      callback: function(oldData) {
        oldData = oldData || "";
        return oldData + html;
      }
    });
  }
}
module.exports = new AdminAPI();
