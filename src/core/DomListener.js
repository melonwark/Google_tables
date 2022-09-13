export class DomListener {
    constructor($root) {
        if (!$root) {
            throw new Error('Need a root for DomListener');
        }
        this.$root = $root;
    }
}
