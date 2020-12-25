import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../account/auth.service';
import { SearchItem } from 'src/app/modals/searchItem.model';


@Injectable({
    providedIn: 'root'
})
export class AllocationService {


    private apiUrl = environment.apiUrl + ':9090/allocation/getcharacteritems';

    characterLoadedSuc = new Subject<{}>();
    itemLoadedSuc = new Subject<{}>();

    itemUrlFile = new Subject<{}>();
    itemIdentity = new Subject<{}>();
    constructor(private http: HttpClient, private authService: AuthService) { }
    token
    getToken() {
        if (localStorage.getItem('user') != null) {
            this.token = JSON.parse(localStorage.getItem('user')).token

        } else {
            this.authService.logout();
        }
        let headers =
            new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization': 'Bearer' + this.token
            });

        let options = {
            headers: headers
        }
        return options;
    }

    getFitItems(SearchItem: SearchItem): Observable<SearchItem[]> {
        return this.http.post<SearchItem[]>(this.apiUrl, SearchItem, this.getToken()).pipe(
            catchError(this.handleError)
        );
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        return throwError('Something bad happened. Please try again later.');
    }
}
