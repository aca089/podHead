import { Component } from '@angular/core';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { FirebaseService } from "../services/firebase.service";
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  profilePictureUrl:string;
  storageRef:string;
  images:any[];


  constructor(
    public imagePicker: ImagePicker,
    public firebaseService: FirebaseService
  ) {}

  ngOnInit(){
    //
    this.currentUser = this.firebaseService.afAuth.auth.currentUser;

    this.firebaseService.getProfileImage(this.currentUser.uid).then(
      imageUrl=> this.profilePictureUrl = imageUrl
    )
  }

  getPictures() {
  this.imagePicker.getPictures({
    maximumImagesCount: 5,
    outputType: 1
  }).then(selectedImg => {
    selectedImg.forEach(i => this.images.push("data:image/jpeg;base64," + i));
  })
}

  // encodeImageUri(imageUri, callback) {
  // var c = document.createElement('canvas');
  // var ctx = c.getContext("2d");
  // var img = new Image();
  // img.onload = function () {
  //   var aux:any = this;
  //   c.width = aux.width;
  //   c.height = aux.height;
  //   ctx.drawImage(img, 0, 0);
  //   var dataURL = c.toDataURL("image/jpeg");
  //   callback(dataURL);
  // };
  // img.src = imageUri;
  // };



}
