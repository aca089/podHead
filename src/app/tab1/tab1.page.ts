import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  snippets:any[];
  hearts:any[];
  arrayOfLikedPosts:any[]=[];
  currentUser:any;



  constructor(private firebaseService:FirebaseService) {}


  ngOnInit(){

    this.currentUser = this.firebaseService.afAuth.auth.currentUser

    this.firebaseService.getHearts(this.currentUser.uid).subscribe(hearts => {
      this.hearts =  hearts
    // Create an array of liked posts
      for (var i=0; i<hearts.length;i++){
        this.arrayOfLikedPosts[i]= this.hearts[i].snippet
      }
    });


    // Retrieve all the snippets
    this.firebaseService.getSnippets().subscribe(queriedItems => {
    this.snippets =  queriedItems
    for (var i=0; i<queriedItems.length; i++) {
      this.snippets[i].details = this.snippets[i].details.toString().replace("\\n","\n");
      this.snippets[i].maximize = false
    }
    })
  }

  isLikedByUser(snippet){
      if(this.arrayOfLikedPosts.includes(snippet.snippetId)){
        return true
      } else {return false}
    }


  toggleSection(index){
    this.snippets[index].maximize = !this.snippets[index].maximize
    return this.snippets[index].maximize
  }

  createHeart(snippet,index){
    this.arrayOfLikedPosts.push(snippet.snippetId);
    this.firebaseService.addLike(this.currentUser.uid, snippet);
  }

  removeHeart(snippet, index){
    const indexOfSnippetId = this.arrayOfLikedPosts.indexOf(snippet.snippetId)
    if (indexOfSnippetId !== -1) {
        this.arrayOfLikedPosts.splice(indexOfSnippetId, 1);
    }
    this.firebaseService.removeLike(this.currentUser.uid, snippet)
  }


  decrementCount(snippet){
    return this.firebaseService.updateCount(snippet, -1);
  }

  incrementCount(snippet){
    return this.firebaseService.updateCount(snippet, 1);
  }

}
