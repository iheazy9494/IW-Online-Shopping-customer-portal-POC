import { environment } from './../../../../environments/environment';
import { Character } from './../../../modals/character.model';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../account/auth.service';


@Injectable({
    providedIn: 'root'
})
export class CharacterService {


    characterUrlFile = new Subject<string>();
    characterUrlType = new Subject<string>();
    characterSkinColor = new Subject<string>();
    characterHairColor = new Subject<string>();
    characterEyeColor = new Subject<string>();


    charType = {

        'Male': [{ name: 'Adult Male' }, { name: 'Children Boy' }],
        'Female': [{ name: 'Adult Female' }, { name: 'Children Girl' }]
    }


    private apiUrl = environment.apiUrl + ':5055/characters/';
    token;

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    ngOnInit() {

    }
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
    characterFilter(): Observable<Character[]> {

        // return this.http.get<Character[]>(this.apiUrl + 'all', this.getToken()).pipe(
        //     catchError(this.handleError)
        // );
        return this.http.get<Character[]>(this.apiUrl + 'all', this.getToken())
    }

    characterDelete(id: number) {
        return this.http.delete(this.apiUrl + 'character/' + id, this.getToken())
    }

    getOneCharacter(id: number): Observable<Character> {
        return this.http.get<Character>(this.apiUrl + 'character/' + id, this.getToken()).pipe(
            catchError(this.handleError)
        );
    }

    addCharacte(Character: Character): Observable<Character> {
        return this.http.post<Character>(this.apiUrl + 'add', Character, this.getToken())
    }

    updateOneCharacte(id: number, Character: Character): Observable<Character> {
        return this.http.put<Character>(this.apiUrl + 'character/' + id, Character, this.getToken()).pipe(
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
