import React from "react";

export const HeaderHistoryTutorial = () => { return ([
    {
      selector: "#chatHistory",
      content: "Here, you can view the people who had matched with you. Leave a review (out of 5 stars) for the other user."
    },
    {
      selector: "#chatHistory2",
      content: "Only unique users matched with you will be shown here, to avoid cluttering up the page."
    }
  ])
}

export const HeaderLeaderboardTutorial = () => { return ([
    {
      selector: "#leaderboard",
      content: "Here, you can see how you fare compared to other users based on your points!"
    },
    {
      selector: "#table",
      content: "The top 10 users are shown here. You can see other title(s) or special username effects that these users have unlocked as well."
    }
  ])
}

export const HeaderMatchTutorial = () => { return ([
    {
      selector: "#chat",
      content: "Here, you can find people of similar interests to match with! To join the waiting room, follow the instructions given on this page."
    },
    {
      selector: "#chat2",
      content: "You will automatically be placed in the waiting room every time you click on the Match Now! tab. Avoid refreshing the page at this point or you would be removed from the waiting room to prevent bot activity. If you find yourself outside the waiting room, click on another tab above and then return to this page!"    
    },
    {
      selector: "#history",
      content: "If you wish to see your past match history, as well as leave a rating for your previous matches (and see their ratings of you), click here!"
    }
  ])
}

export const HeaderMatchedTutorial = () => { return ([
    {
      selector: "#outcome",
      content: "You can see the outcome of your match here. If you have matched successfully, you can initiate a Telegram message to the other user!"
    }
  ])
}

export const HeaderProfileTutorial = () => { return ([
    {
      selector: "#welcome-message",
      content:
        "Welcome to findabud! You may wish to watch this tutorial if this is your first time here.",
    },
    {
      selector: "#username",
      content: "Key in your username here. This will be shown on the leaderboard and to other users once a successful match is made!",
    },
    {
      selector: "#telegram_handle",
      content: "Key in your telegram handle here with or without the @ symbol in front. You will need to provide your handle before you can be matched with others!",
    },
    {
      selector: "#profile2",
      content: "Click on any of the five main headings below to show the specific subcategories. A filled box indicates that you'll like to include that as one of your matching criteria. Click on the respective boxes to toggle.",
    },
    {
      selector: "#profile3",
      content: "Click on this once you are done to save any changes made to your profile. You will also be recorded to have an ONLINE status for one hour only after clicking on this button.",
    },
    {
      selector: "#share",
      content: "Share this app with your friends and earn some points as you do so!",
    }
  ])
}

export const HeaderEventsTutorial = () => { return ([
    {
      selector: "#events",
      content: "Here, you can create events or join events hosted by other users!",
    },
    {
      selector: "#form",
      content: "Create your own event which other users can view and join!",
    },
    {
      selector: "#all",
      content: "View all events either created by you, or other users! Click on an event to express interest in joining. You can only delete events that are created by you.",
    }
  ])
}

export const HeaderAvatarTutorial = () => { return ([
    {
      selector: "#options",
      content: "Select any of these categories to find an Avatar which you like! Some categories are only unlocked when you have achieved a certain number of points!",
    },
    {
      selector: "#picture",
      content: "If you like this Avatar shown here, confirm your choice by clicking on the confirmation button below!",
    },
  ])
}