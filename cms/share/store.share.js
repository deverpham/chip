const proxy = {
    apply: (This, alias, props = {}) => {
        return {
            get: () => {
                return This._get(alias)
            },
            set: (payload) => {
                return This._set(alias, payload)
            },
            ...props
        }
    }
}
class Store {
    _set(name, payload) {
        if (name in this) {
            this[name] = {
                ...this[name],
                payload
            }
        } else {
            this[name] = payload
        }
        return this[name];
    }
    _get(name) {
        return this[name]
    }
    config() {
        const alias = 'configStore';
        return proxy.apply(this, alias);
    }
    /**
     * @return {api_share}
     */
    share() {
        const alias = 'shareStore';
        return proxy.apply(this, alias);
    }
    /**
     * Save the value to global node 
     */
    storage() {
        return {
            set: (name, value) => {
                global[name] = value;
            },
            get: (value) => {
                global[value] = value;
            }
        }
    }

}

const store = new Store();
module.exports = store;