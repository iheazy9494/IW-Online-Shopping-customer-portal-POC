import { CharacterService } from './../../shared/services/character.service';
import { Character } from './../../../modals/character.model';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterDialogComponent } from './character-dialog/character-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass']
})
export class CharactersComponent implements OnInit, OnDestroy, AfterViewInit {
  Characters: Character[];

  getAllCharSup: Subscription = new Subscription();
  deleteCharSup: Subscription = new Subscription();

  error: string;
  viewCol = 25;
  constructor(private CharacterService: CharacterService) { }

  ngOnInit(): void {
    this.getAllCharSup = this.CharacterService.characterFilter().subscribe(
      (data: Character[]) => {

        this.Characters = data
      },
      error => this.error = error
    )
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }
  ngOnDestroy() {
    this.getAllCharSup.unsubscribe();
    this.deleteCharSup.unsubscribe();
  }


}
