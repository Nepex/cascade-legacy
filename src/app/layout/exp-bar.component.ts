import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'cascade-exp-bar',
    templateUrl: 'exp-bar.html',
    styleUrls: ['./exp-bar.css']
})
export class ExpBarComponent implements OnInit {
    @Input() experience;
    @Input() experienceNeeded;

    decimalPercentTilLvl: number;
    percentTilLvl: number;

    ngOnInit() {
        this.decimalPercentTilLvl = parseFloat(this.experience) / parseFloat(this.experienceNeeded);
        this.percentTilLvl = this.decimalPercentTilLvl * 100;
    }
}
