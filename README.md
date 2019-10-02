

# JBLM Unlimited Website
## VERSION 1.0.0

## Names of the team members:
Biniam Tesfamarian, Elle Young, Karina Chen, Jon Kimball

**NECESSARY PACKAGES:**
Required: express, pg, fs, superagent, methodOverride

_**.env**_ 

PORT:3000 || 3001

DATABASE_URL: postgres://localhost:5432/jblm_unlimited_cf19

**ADMIN_ROUTE: RESERVED FOR DEVELOPER PLEASE CONTACT**


### Project Description:
The JBLM Unlimited website will be used for service members to see a google calendar with events and links. There will be a Resource page that has all the contact information and links for JBLM's partners. An Admin page will also be built for admin users to add and edit information on the website. An admin route will be created and only the admin users who know the route url can access and make changes to the website.

### MEMBER USER STORIES:

As a JBLM member, I want to come to the Home page of this website to see a preview of the 5 upcoming events shown on the Home page, so I can know what events are coming soon without having to go to the Calendar page.

As a JBLM member, I want to be able to contact JBLM's admin on the Home page through social media links or email links, so I can know the contact information once I come to this website. 

As a JBLM member, I want to come to this website to see a calendar with all the upcoming events and all the past events, so I can plan my schedule accordingly to the event schedules.

As a JBLM member, I want to click on the events in the calendar to see more details about the events, so I can know more about the events.

As a JBLM member, I want to see all the contact information of JBLM's partners on Resource page, so I can contact them if I need to.

### ADMIN USER STORIES:

As an admin user, I want to have a calendar that goes into future dates , so I can put events on the calendar early in the time for coordination purposes.

As an admin user, I want the calendar to show all the past events, so the JBLM's members and I can go back and reference something if needed.

As an admin user, I want to be able to mark each event to set its priority, so the event which is set as high priority will be displayed on the Home page, otherwise the event will only be shown in the calendar but not on the Home page.

As an admin user, I want the Resource page to show JBLM's partners' titles, logos, brief descriptions, and url links.

As an admin user, I want to be able to add and change information about events and resources on this website.

As an admin user, I want to have some sort of portal security so only the admin users can change events and resources information on this website.

### Project Scope:

_MVP -_

Calendar Page:
Use Google Calendar API to show all the events. Click on an event then the detail view shows up. The calendar needs to be scrollable or clickable to show previous and furture calendar. Inside the detail view of an event, the link should bring the users to the event page outside of JBLM Unlimited.

Admin Page:
The admin page allows the admin users to add a new resource to the database, which then adds the resource event to the resources page list.

Home Page:
Have a Home page to show image slides, the top 5 upcoming events, and social media links to contact JBLM.

Resource Page:
Have a Resource page that shows all the contact information and basic companies/institudes descriptions of JBLM's partners.

_Stretch Goals -_

Calendar Page:
Inside the view detail page of each event, be able to attach PDF files or fliers.

Admin Page:
Create a basic username/password login security system for admin users. Let the admin users to update/change events on Calendar page and on Resource page.



### Special thanks to all the people of the internet that helped! Here is our resource list:

https://docs.google.com/document/d/1Kf0oJOv7DQVtcTo5k2G7Mlmh3PCyHBKwK9B86Hl5K-s/edit?usp=sharing