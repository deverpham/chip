const path = require('path');
class View {
    load() {
        const template = require('./view/template.s-ctrl');
        this.template = template;
    }
    file(pathFile) {
        return path.join(__dirname, '../views', pathFile)
    }
    script() {
        return {
            add: (res, script, footer = false) => {
                const hook = res.locals.hook;
                if (!footer)
                    return hook.add("RESPONSE_HEAD", {
                        callback: async function (oldScript) {
                            oldScript = oldScript || "";
                            switch (script.type) {
                                case "link":
                                    {
                                        return oldScript + `<script src = ${script.content}></script>`;
                                    }
                                    /**
                                     * case text
                                     */
                                default:
                                    {
                                        return oldScript + `<script>${script.content}</script>`;
                                    }
                            }
                        }
                    });
                else return hook.add_action("RESPONSE_FOOT", {

                    callback: async function (oldScript) {
                        oldScript = oldScript || "";
                        switch (script.type) {
                            case "link":
                                {
                                    return oldScript + `<script src = ${script.content}></script>`;
                                }
                                /**
                                 * case text
                                 */
                            default:
                                {
                                    return oldScript + `<script>${script.content}</script>`;
                                }
                        }
                    }
                })
            }
        }
    }
    style() {
        return {
            add: (res, script) => {
                const hook = res.locals.hook;
                hook.add("RESPONSE_HEAD", {
                    callback: async function (oldScript) {
                        oldScript = oldScript || "";
                        switch (script.type) {
                            case "link":
                                {
                                    return (
                                        oldScript + `<link rel='stylesheet' href = ${script.content} />`
                                    );
                                }
                                /**
                                 * case text
                                 */
                            default:
                                {
                                    return oldScript + `<style>${script.content}</style>`;
                                }
                        }
                    }
                });
            }
        }
    }
}
const view = new View();
module.exports = view;