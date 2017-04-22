import { Component, Input } from '@angular/core';

@Component({
    selector: 'cascade-icon-with-tooltip',
    templateUrl: 'icon-with-tooltip.html',
    styleUrls: ['./icon-with-tooltip.css']
})
export class IconWithTooltipComponent {
    @Input() item;
    @Input() iconType;

    constructor() {}
}
