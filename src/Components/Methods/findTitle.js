  import React from "react";

  export default function findTitle(points) { 
    var i;
    var answer = "";
    var pointCutoff = [0, 2, 10, 20, 30, 50, 75, 100, 140, 200];
    var titles = [
      "New User",
      "Novice",
      "Warming Up",
      "Journeyman",
      "Specialist",
      "Senior",
      "Master",
      "Grandmaster",
      "Legendary"
    ];

    for (i = 0; i < pointCutoff.length - 1; i++) {
      if (points >= pointCutoff[i] && points < pointCutoff[i + 1]) {
        answer = titles[i];
        break;
      }
    }
    if (answer == "") {
      return "God";
    } else {
      return answer;
    }
  };