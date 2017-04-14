import { Component, Input } from '@angular/core';

@Component({
    selector: 'cascade-sprite-loader',
    templateUrl: 'sprite-loader.html',
    styleUrls: ['./sprite-loader.css']
})
export class SpriteLoaderComponent {
    @Input() sprite;
}
