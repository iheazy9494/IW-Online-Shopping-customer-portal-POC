import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/modals/character.model';
import { MatDialog } from '@angular/material';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent implements OnInit {

  @Input() character: Character;
  apiURl = environment.apiUrl
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  public openCharacterDialog(character) {
    let dialogRef = this.dialog.open(CharacterDialogComponent, {
      data: character,
      panelClass: 'product-dialog',
      width: '1000px',
    });

  }
}
