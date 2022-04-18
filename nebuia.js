class NebuIA {

    constructor(keys, code, callback) {
        this.width = '100%';
        this.height = '800px';
        this.parent = 'nebuia';
        this.keys = keys
        this.code = code;
        this.callback = callback;

        window.addEventListener('message', event => {
                this.callback(event.data);
        });
    }

    _buildIframe() {
        let iframe = document.createElement('iframe');
        iframe.frameBorder = 0;
        iframe.width = this.width;
        iframe.height = this.height;
        iframe.style["height"] = "800px";
        iframe.style["width"] = "100%";
        return iframe;
    }

    _updateQuery(uri, key, value) {
        let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = uri.indexOf('?') !== -1 ? "&" : "?";
        return uri.match(re) ? uri.replace(re, '$1' + key + "=" + value + '$2') :
            uri + separator + key + "=" + value;
    }

    init() {
        let url = `https://widget.nebuia.com/#/widget/${this.code}`;
        url = this._updateQuery(url, 'api_key', this.keys.public_key);
        url = this._updateQuery(url, 'api_secret', this.keys.private_key);
        let iframe = this._buildIframe();
        iframe.setAttribute('allow', 'camera;');
        iframe.setAttribute("src", url);
        document.getElementById(this.parent).appendChild(iframe);
    }
}
