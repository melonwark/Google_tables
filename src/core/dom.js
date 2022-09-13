class Dom {
    constructor(selector) {
        // .container
        this.$el = typeof selector === 'string'?
        document.querySelector(selector):
        selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.innerHTML;
    }

    clear() {
        this.html('');
        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tag, Cssclass = '') => {
    const el = document.createElement(tag);
    if (Cssclass) {
        el.classList.add(Cssclass);
    }
    return $(el);
};

