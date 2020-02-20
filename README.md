# _Camping Trip Planner_

#### _Team Week Project for Epicodus_, _Feb. 17-20, 2020_

#### By _**Michelle Morin, Patrick Kille, Matt Taylor, Joseph Wangemann, Alex Skreen**_

## Description

_This application allows a user to organize a camping trip. The webpage allows a user to input their name, start and end dates for the trip, and a destination (Town, State) and, once submitted, displays a trip planning interface. Users can add other cmapers to the attending list, add items to-be-packed to a collective packing list, and assign to-be-packed items to individual attendees by dragging the items from the collective packing list and dropping the items into an individual's packing list area. The webpage also displays current weather information (temperature, humidity, sunrise and sunset times) as well as local trail information for the user's input location._

## Specifications:

| Specification | Example Input | Example Output |
| ------------- |:-------------:| -------------------:|
| Webpage allows trip organizer to input start date, end date, location, and their name | "Patrick", "Feb. 20, 2020", "Feb. 22, 2020", "Government Camp, OR" | starts new trip page with trip organizer's name in a card, and date and location in jumbotron |
| Webpage prevents user from submitting form on splash screen when the input end date is before the input start date | Start date: "Feb. 20, 2020", End date: "Feb. 18, 2020" | Modal pops up for 2 seconds instructing user to choose different dates |
| Webpage allows a user to add other users to a camping trip attendee list by inputting camper's name and clicking "Add camper" button | user types "Matt" into camper's name field and clicks "add camper" | Webpage forms separate card with header text "Matt" |
| Webpage allows users to add known items to packing list from drop-down menu | user selects "firewood" then clicks "Add" button | firewood icon is shown in the collective packing list area |
| Webpage allows users to add custom items to collective packing list area by entering item name in a text box | user enters "harpoon gun" and clicks "Add" | icon with text "harpoon gun" appears in collective packing list area |
| Webpage allows users to drag items from the collective packing list area and drop the items into the user's own personal card | Patrick moves "harpoon gun" to card named "Patrick" | "Harpoon gun" icon displayed on Patrick's card |
| Webpage allows users to continuously move items between users' cards | Patrick moves "tent" icon from Matt's card to Patrick's card | "tent" icon is removed from Matt's card and appears in Patrick's card |
| Webpage displays current temperature for input location in jumbotron of main page after user submits splash screen form | "Bend, OR" | 37 degrees F |
| Webpage determines list of trails nearby user's input location | "Portland, OR" | wildwood trail, etc. displayed in trail info box on right side of main page |
| Webpage displays error message if API call for locating nearby trails fails | 400-level response status | "There was an error retrieving nearby trails." |
| Webpage displays error message if API call for locating nearby trails does not return any results within 160 miles | Mongolia | "There were no trails found within 160 miles of your search location." |
| Webpage increases search radius for locating nearby trails if there are no results within 10mi of initial input location | "John Day, OR" | displays list of trails ~ 100mi away from John Day, OR in trail info box |
| Webpage displays list of trails in order of most popular to least popular | user enters location for trip and submits form | most popular to least popular nearby trails are displayed in trail info box |
| Webpage allows user to click on any listed trail to display more details about the clicked trail | user clicks "wildwood trail" | webpage displays difficulty, ascent, descent, etc. on right side column of trail info box |
| Webpage displays more detailed weather information in weather info box below trail info box | user inputs "Bend OR" and submits form on splash screen | "Current weather in Bend, OR: Current temperature: 29.91°F ( feels like 21.63°F), Humidity: 47%, Conditions are clear. Sunrise: 06:59:00, Sunset: 17:39:00" |
| Webpage allows user to move an item with a box class over a trash icon, and remove the item from display ondrop | user moves tent icon to trash icon | tent icon removed from display |

## Project Concept:

_We defined the minimum viable product (MVP) for this application as a webpage that allows a user to enter their name, a start and end date for a trip, and a trip location (e.g., Town, State) into a form and then receive a visually pleasing drag-and-drop interface to coordinate a packing list for the trip. The interface would allow the trip organizer to add campers to the trip and add items to be packed to a collective packing list. The interface would also, at a minimum, include designated areas for collective shared items to be packed, individual list areas for each camper, and the ability to drag items from the collective shared items area to an individual list area. The MVP also included incorporating trail information for trails nearby the user's input trip location, using the Hiking Project Data API._

_We defined various stretch goals for our project, including:_
* using the Open Weather Map API to display weather information (temperature, sunrise/sunset times, etc.) for the user's input trip location. We accomplished this stretch goal, but the API currently retrieves _current_ weather rather than weather for the user's input dates. Retrieving weather for a specified date range is a paid service of the Open Weather Maps API that we did not invest in for this project, but could be easily integrated.
* figuring out a local storage option, so that a user could save a trip's information and return to it later (e.g., anytime before cache is cleared) rather than planning a whole trip in one sitting. A stretch strech goal of this concept would be to allow users to contribute to the list from separate computers (e.g., each camper can sign into a trip once added, then contribute to trip planning simultaneously). Current status: when a user starts a trip (upon splash screen form submission) and when a user clicks the "finalize trip" button, all camper names and items within the campers' respective cards is stored in local storage.
* sending an email to each camper confirming their packing list once the trip packing is finalized (e.g., after a user clicks a "finalize trip" button on the main page)
* incorporating the ability to delete campers and items once added. Current status: we added functionality to delete items from the page. Current goal is now to add functionality to be able to delete a camper once all items in that camper's card are removed, otherwise display a modal instructing the user to remove the items.

## Setup/Installation Requirements

### Node install

#### For macOS:
_If Homebrew is not installed on your computer already, then install Homebrew by entering the following two commands in Terminal:_
* ``$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"``
* ``$ echo 'export PATH=/usr/local/bin:$PATH' >> ~/.bash_profile``

_Install Git with the following command:_
* ``$ brew install git``

_Next, install Node.js by entering the following command in Terminal:_
* ``$ brew install node``

#### For Windows:
_Please visit the [Node.js website](https://nodejs.org/en/download/) for installation instructions._

### Setup/install this application

_Clone this repository via Terminal using the following commands:_
* ``$ cd desktop``
* ``$ git clone https://github.com/michelle-morin/camping``
* ``$ cd camping``

_Confirm that you have navigated to the camping directory (e.g., by entering the command_ ``pwd`` _in Terminal). Next, add a file named .env to project root directory (e.g., by entering the command_ ``touch .env`` _in Terminal)._
* _Make an API key for the [Hiking Project Data API](https://www.hikingproject.com/data) by navigating to the linked website and clicking "sign up of login to get an API Key"_
* _Store your API key for the Hiking Project API in first line of the .env file in the following format: API_KEY = {replace curly braces and this text with your API key}_
* _Make an API key for the [OpenCage Geocoding API](https://opencagedata.com/api) by navigating to the linked website and selecting "sign up for your free API key" under QuickStart._
* _Store your API key for the OpenCage Geocoding API in second line of the .env file in the following format: GEO_API_KEY = {replace curly braces and this text with your API key}_
* _Make an API key for the [Open Weather Maps API](https://openweathermap.org/api) by navigating to the linked website and selecting "sign up."_
* _Store your API key for the Open Weather Maps API in third line of the .env file in the following format: OPNW_API_KEY = {replace curly braces and this text with your API key}_

_Next, install node package manager (npm) at the project's root directory via the following command:_
* ``$ npm install``

_Open this application via live server using the following command:_
* ``$ npm run start``

_To view/edit the source code of this application, open the contents of the camping directory in a text editor or IDE of your choice (e.g., to open all contents of the directory in Visual Studio Code on macOS, enter the command_ ``code .`` _in Terminal)._

## Technologies Used
* _Git_
* _HTML_
* _CSS_
* _JavaScript_ 
* _jQuery_ 
* _npm_ 
* _Webpack_ 
* _[Hiking Project Data API](https://www.hikingproject.com/data)_
* _[OpenCage Geocoding API](https://opencagedata.com/api)_
* _[Open Weather Maps API](https://openweathermap.org/api)_

## Known Bugs/Contact

_If you have any requests for features or find a bug, please submit a pull request._

### License

*This webpage is licensed under the MIT license.*

Copyright (c) 2020 **_Michelle Morin, Patrick Kille, Matt Taylor, Joseph Wangemann, Alex Skreen_**