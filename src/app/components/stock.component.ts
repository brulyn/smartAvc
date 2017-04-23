import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Farmer } from '../shared/models/farmer';
import { AuthService } from '../shared/services/auth.service'
//import { FarmerService } from '../shared/services/farmer.service';

declare var firebase: any;

@Component({
    selector: 'stock-component',
    templateUrl: './stock.component.html',
    styles: [
        `
        i {
            cursor: pointer;
            font-size: 20px;
            padding-left: 10px;
        }
        `
    ],
    providers: [AuthService]
})

export class StockComponent implements OnInit {
   
    stocks = []
    stocks_keys = [];
    stocks_dates = [];
    constructor(private auth: AuthService, fb: FormBuilder) { }

    ngOnInit() {
        this.fbGetData();
    }

    fbGetData() {
        this.stocks = [];
        this.stocks_keys = [];
        firebase.database().ref('/stock/').on('child_added', (snapshot, prevChildKey) => {
            this.stocks.push(snapshot.val());
            this.stocks_keys.push(snapshot.key);
            //getting the date format from the timestamp
            var day = new Date(snapshot.val().date).getDate();
            var month = new Date(snapshot.val().date).getMonth();
            var year = new Date(snapshot.val().date).getFullYear();
            var full_date = day+'/'+month+'/'+year

            this.stocks_dates.push(full_date);
            
        })
        //this.stocks = new Farmer();
    }

    trackByIndex(index: number, value: number) {
        return index;
    }

    logout() {
        this.auth.logout();
    }

}