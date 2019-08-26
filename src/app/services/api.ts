import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    private static GRILL_MENU_URL  = 'http://isol-grillassessment.azurewebsites.net/api/GrillMenu';

    constructor(private http: HttpClient) { }

    public getGrillMenus() {
        return this.http.get(ApiService.GRILL_MENU_URL);
    }
}