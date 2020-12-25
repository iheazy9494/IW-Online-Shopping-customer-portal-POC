import { Character } from './../../../../modals/character.model';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/components/shared/services/character.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.sass']
})
export class CharacterDialogComponent implements OnInit, OnDestroy {


  apiUrl;
  getOneCharSup: Subscription = new Subscription();
  hideScene = true;
  constructor(
    public dialogRef: MatDialogRef<CharacterDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public character: Character, 
    private charactersService: CharacterService,
    private router:Router) { }

  ngOnInit() {
    this.apiUrl = environment.apiUrl
    if (this.character.id) {
      this.getOneCharSup = this.charactersService.getOneCharacter(this.character.id).subscribe((res: Character) => {
        this.charactersService.characterUrlFile.next(res['url']);
        this.charactersService.characterUrlType.next(res['urlType'])

        this.charactersService.characterSkinColor.next(res['skinColor']);
        this.charactersService.characterHairColor.next(res['hairColor']);
        this.charactersService.characterEyeColor.next(res['eyeColor']);
      });
    }

    if(this.router.url.includes("product-allocation")){
      this.hideScene = false;
     }
  }


  public close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.getOneCharSup.unsubscribe();
  }

}
