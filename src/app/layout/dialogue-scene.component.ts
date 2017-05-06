import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class DialogueSceneComponent implements OnInit {
    @Input() speakerName;
    @Input() portrait;
    @Input() dialogue;
    @Input() backdrop;
    @Input() zoneTitle;    
    @Input() continuable;
    @Input() backAllowed;

    state = 'hidden';
    scene = 0;

    @Output() nextScene = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
        setTimeout(() => {
            this.state = 'shown';
        }, 50);
    }

    progressDialogue(d) {
        if (d === 'nextScene') {
            this.scene = this.scene + 1;
        } else {
            this.scene = this.scene - 1;
        }

        this.nextScene.emit(this.scene);
    }
}
