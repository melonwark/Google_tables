import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar';
    toHTML() {
        return '<span>Tol</span>';
    }
}