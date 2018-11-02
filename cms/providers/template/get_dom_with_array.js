function fieldsToDOM(fields) {
    let html = '';
    fields.map(field => {
        const keys = Object.keys(field);
        let keyHtml = '';
        keys.map(key => {
            return keyHtml += `
                ${key} = '${field[key]}'
            `
        })
        const {
            name,
            type
        } = field;
        switch (type) {
            default:
                {
                    return html +=
                        `
                    <input ${keyHtml} />
                     `
                }
        }
    })
    return html;
}
module.exports = fieldsToDOM