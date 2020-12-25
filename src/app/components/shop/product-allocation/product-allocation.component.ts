import { CharacterDialogComponent } from './../characters/character-dialog/character-dialog.component';
import { AllocationService } from './../../shared/services/allocation.service';
import { ActivatedRoute, Params } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterService } from './../../shared/services/character.service';
import { Character } from 'src/app/modals/character.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-allocation',
  templateUrl: './product-allocation.component.html',
  styleUrls: ['./product-allocation.component.sass']
})
export class ProductAllocationComponent implements OnInit, OnDestroy {

  routSub: Subscription = new Subscription();
  getOneCharSup: Subscription = new Subscription();



  characterId;
  character:Character;

  constructor(private route: ActivatedRoute, private charactersService: CharacterService,private dialog: MatDialog) { }

  ngOnInit() {
    this.routSub = this.route.params
      .subscribe((prams: Params) => {
        this.characterId = +prams['id']; //add + to convert string id to number
      });
    if (this.characterId) {
      this.getOneCharSup = this.charactersService.getOneCharacter(this.characterId).subscribe((res: Character) => {
        this.character = res;
        this.charactersService.characterUrlFile.next(res['url']);
        this.charactersService.characterUrlType.next(res['urlType'])

        this.charactersService.characterSkinColor.next(res['skinColor']);
        this.charactersService.characterHairColor.next(res['hairColor']);
        this.charactersService.characterEyeColor.next(res['eyeColor']);
      });
    }
  }

  public openCharacterDialog() {
    let dialogRef = this.dialog.open(CharacterDialogComponent, {
      data: this.character,
      panelClass: 'product-dialog',
    });

  }

  ngOnDestroy(): void {
    this.routSub.unsubscribe();
    this.getOneCharSup.unsubscribe();
  }

}
