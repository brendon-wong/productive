# Productive.gq

Productive.gq is a web application with the purpose of helping users overcome procrastination and work productively despite challenges to their attention. The application is centered around tracking user productivity with a Likert scale containing productivity levels from 1–7. Based on the user's response, or non-response, an adaptive notification system harnesses a combination of push notifications, audio alerts, and prominent computer-wide alerts to ensure users continue to be cognizant of their productivity and submit their productivity scores to the website.

## Features/User Stories

- When the user loads the website, they immediately see a countdown timer that has already started labeled "Time Until Next Update."
- Below the countdown timer is an input area called "Current Productivity" with seven large buttons labeled 1–7.
- Whenever the countdown timer reaches zero, the user is alerted to submit a productivity update to the website.
- If the user does not submit an update, the website continues to prompt the user for updates indefinitely every 2 minutes.
- At the bottom of the page, there is a settings area which contains:
    - Notification settings labeled: Visual, Audio, and Disruptive
        - Visual: Push notifications for check-ins
        - Audio: Audible alerts
        - Disruptive: Browser alert boxes that interrupt internet browsing and other software the user is viewing to display an alert
                
## Future releases

- In the future, the service will also support a pomodoro like system similar to Vitamin-R in which the user can enter a task and a timeblock, and alerts will occur throughout the time block to ensure the user remains on track. After timeblocks are completed, users will be able to extend their current timeblock or take a break.
- Clicking audio button transitions between tone and spoken english notifications?
- Include button to reset notifications (have the reset trigger notifications for demo purposes?)
- Allow users to adjust minutes until next alert?
- Consider having a task that is displayed so the user remembers what they are doing
- Force users to update with repeated chimes, perhaps set default to one whenever a reminder is triggered, thus forcing users to check back in
- Add selected/disabled buttons
- Focus noise/music? 
- Customize or automatically vary notification sounds?
- Display timing intervals with each productivity level or allow for user customization?
- Need to create static pages like how to use
- Read out an audio message at a given interval
- Add pause feature
- Add dashboard view with background image (user can input URL/based on location), news, and weather. Also, play looping audio (white noise, uptempo focus music, etc).

## Style guide

The application uses Roboto for all text elements because of its modern appearance and high readability.

#### Colors

- Modern grey: #f9f9f9
- Moderate grey hover color: #cecece
- Lighter hover color: #e6e6e6
