export function Attribute ($list = {}, $named = {}) {

    var named = {};
    var list = {};

    this.named = function (name) {

        if(!named.hasOwnProperty(name)) {

            named[name] = {};
        }

        return named[name];
    };

    this.list = function (name) {

        if(!list.hasOwnProperty(name)) {

            list[name] = [];
        }

        return list[name];
    };

    this.toString = function() {

        let object = {};

        for (let key in named) {

            object[key] = Object.values(named[key]);
        }

        for(let key in list) {

            if(!(key in object)) {

                object[key] = [];
            }

            object[key].push(...list[key]);
        }

        var attributes = [];

        for (let key in object) {

            var value = Object.values(object[key]).join(' ');
            value = value.trim();

            if(value.length > 0) {

                attributes.push(`${key}="${value}"`);
            }
        }

        return attributes.join(' ');
    };

    for (let key in $list) {

        this.list(key).push(...$list[key]);
    }

    for (let key in $named) {

        let obj = this.named(key);
        obj = Object.assign(obj, $named[key]);
    }
};


