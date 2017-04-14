import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'cascade-job-level-display',
    template:
    `{{ jobLevel }}`,
})
export class JobLevelDisplayComponent implements OnInit {
    @Input() partyMember: any;
    jobLevel: number;

    constructor() {}

    ngOnInit(){
        switch(this.partyMember.job){
            case 'Knight':
            this.jobLevel = this.partyMember.knight_lvl;
            break;

            case 'Mage':
            this.jobLevel = this.partyMember.mage_lvl;
            break;

            case 'Priest':
            this.jobLevel = this.partyMember.priest_lvl;
            break;
        }
    }
}

