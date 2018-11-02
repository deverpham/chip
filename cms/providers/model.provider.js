const ejs = require('ejs')


function getTypeDOM(type) {
    switch (type) {
        case 'password':
            {
                return 'password'
            }
        default:
            {
                return 'text'
            }
    }
}
/**
 * 
 * @param {string} fieldType 
 */
function isInputField(fieldType) {
    switch (fieldType) {
        case 'STRING':
            {
                return true
            }
        default:
            {
                return true;
            }
    }
}

function getDom(field) {

    let type = field.type.toString()
    const fieldName = field.fieldName;
    if (fieldName == 'password') {
        type = 'password'
    }
    const modelName = field.Model.name
    if (field.autoIncrement) {
        return ''
    }
    switch (type) {
        default:
            {
                return `
            <div>
                <label for = ${fieldName}> ${fieldName} :</label>
                <input type = '${getTypeDOM(type)}' name = '${fieldName}' id = '${modelName}_${fieldName}' />
            </div>`
            }
    }

}

function getDomWithType(fields) {
    console.log(fields);
}

/**
 * 
 * @param {Array} fields a list of field
 */
function getDomsHTML(fields) {
    let html = ``
    fields.map(field => html += getDom(field))
    return html;
}
class Model {
    constructor(name) {
        this.Model = eval(` (DB.models['${name}'])`)
    }
    /**
     * render a template with fields
     * @param {Array} fields  - a list of property objects 
     * @param {string} templatePath  - path of template Name
     * @param {object} locals  -  Locals object in template ejs
     */
    getFormTemplate(fields, templatePath, locals = {}) {
        const props = this.Model.rawAttributes;
        const dataFields = fields.map(field => props[field])
        return ejs.renderFile(templatePath, {
            dataFields,
            tableName: this.Model.name,
            getDOM: getDom,
            getDOMS: getDomsHTML,
            ...locals
        }, {
            async: true
        })

    }
    native() {
        return this.Model
    }
    getFieldsName() {
        return Object.keys(this.Model.rawAttributes);
    }
    getInputFields() {
        const props = this.Model.rawAttributes;
        const keys = this.getFieldsName();
        const keyValids = keys.filter(key => {
            if (['createdAt', 'updatedAt'].indexOf(key) != -1) return false;
            const keyData = props[key];
            if (!isInputField(keyData.type)) return false;
            return true;
        })
        return keyValids;
    }
    findOneBy(where) {
        const model = this.Model;
        return model.findOne({
            where,
            raw: true
        })
    }
    findBy(where, opts = {}) {
        return this.Model.findAll({
            where,
            raw: true,
            ...opts
        })
    }
}
Model.getTables = function () {
    const modelsName = Object.keys(DB.models);
    const models = modelsName.map(name => new Model(name))
    return models;
}
Model.getAttrPostType = async function (post_type_id) {
    const queryString = `
    SELECT attribute_id as attr_id, attr.name as attr_name, type as attr_type 
    FROM attributes as attr
    JOIN attribute_post_types as apt ON attr.id = apt.attribute_id 
    JOIN post_types as pt ON apt.post_type_id = pt.id
    WHERE post_type_id  = ${post_type_id}
    `
    const results = await DB
        .query(queryString)
        .spread((data, meta) => (data, meta))
    return results;
}
Model.addAttrPostType = async function (post_type_id, name) {
    return new Promise((resolve, reject) => {
        const AttrModel = new Model('attribute');
        const PostTypeModel = new Model('post_type');
        Promise.all([
            AttrModel.findOneBy({
                name
            }),
            //TODO : Refactor + delete 
            PostTypeModel.findOneBy({
                id: post_type_id
            }, {
                logging: true
            })
        ]).then(async ([attribute, post_type]) => {
            if (post_type == null)
                reject(new Error('Not found post_type'))
            else {
                if (attribute == null)
                    attribute = await AttrModel.native().create({
                        name
                    })
                const AttrPostTypeModel = new Model('attribute_post_type');

                const totals = await AttrPostTypeModel.native().findAll({
                    where: {
                        post_type_id: post_type.id,
                        attribute_id: attribute.id
                    },
                    raw: true
                })

                if (totals.length == 0) {
                    const attrPostType = new AttrPostTypeModel.Model({
                        post_type_id: post_type.id,
                        attribute_id: attribute.id,
                        value: name
                    })
                    const result = await attrPostType.save();
                    resolve(result.dataValues);
                } else {
                    resolve(totals[0])
                }
            }
        })
    })
}
module.exports = Model;