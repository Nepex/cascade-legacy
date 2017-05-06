import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'cascade-dialogue-scene',
    templateUrl: 'dialogue-scene.html',
    styleUrls: ['./dialogue-scene.css'],
    animations: [
        trigger('visibilityChanged', [
            state('hidden', style({ opacity: 0 })),
            state('shown', style({ opacity: 1 })),

            transition('hidden => shown', animate('1000ms ease-in'))
        ])
    ]
})
export class DialogueSceneComponent {
    @Input() speakerName;
    @Input() portrait;
    @Input() dialogue;
    @Input() backdrop;
    @Input() continuable;

    scene = 0;

    @Output() nextScene = new EventEmitter();

    constructor() {

    }

    progressDialogue() {
        this.scene = this.scene + 1;
        this.nextScene.emit(this.scene);
    }
}
