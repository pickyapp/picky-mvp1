import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UqService {

  private playerName: String;
  private friends: String[];
  private questionList = [
    {
      question: "Do you think USER is a partier or a studier?",
      options: [ "partier", "studier", "both" ]
    },
    {
      question: "Where do you think USER would be on a Friday night?",
      options: [ "With friends", "On a date", "Gaming", "Out partying" ]
    },
    {
      question: "USER is a/an _________ person",
      options: [ "Instagram", "Snapchat", "Whatsapp", "SMS" ]
    },
    {
      question: "What is USER's best quality?",
      answerer: "",
      options: [ "Smart", "Good looking", "Funny", "Trustworthy" ]
    },
    {
      question: "USER would be best as a:",
      options: [ "Singer", "Actor", "Dancer", "Artist" ]
    },
    {
      question: "What is USER’s favourite drink?",
      options: [ "Beer", "Water", "Coffee", "Protein Shake" ]
    },
    {
      question: "What is USER’s best feature?",
      options: [ "Smile", "Eyes", "Hair", "Muscles" ]
    },
    {
      question: "What kind of person is USER?",
      answerer: "",
      options: [ "Android", "iOS" ]
    },


  ]

  constructor() { }

  getFriends(): String[] {
    return this.friends;
  }

  getPlayerName(): String {
    return this.playerName;
  }

  setFriends(friends: String[]) {
    this.friends = friends;
  }

  setPlayerName(playerName: String) {
    this.playerName = playerName;
  }

  getQuestions() {
    return this.questionList;
  }

}
