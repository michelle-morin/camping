# _Camping_

#### _Team Week Project for Epicodus_, _Feb. 17-20, 2020_

#### By _**Michelle Morin, Patrick Kille, Matt Taylor, Joseph Wangemann, Alex Skreen**_

## Description

_This application ..._

## Specifications:

| Specification | Example Input | Example Output |
| ------------- |:-------------:| -------------------:|
| Webpage allows trip organizer to input date, location, and their name | "Patrick", "Feb. 20, 2020", "Tom, Dick, and Harry" | starts new trip page with trip organizer's name in a card, and date and location in title bar. |
| Webpage allows a user to add other users to a camping trip attendee list | "Matt", "Michelle", "Patrick", "Alex", "Joe" | Webpage forms separate dropzone areas for each attendee |
| Webpage allows users to add known items to packing list from drop-down menu | user selects "firewood" | firewood item is appended to their packing list area |
| Webpage allows users to add custom items to packing list from a text box | user enters "harpoon gun" in a textbox | "harpoon gun" added to packing list area |
| Webpage allows users to drag and drop items in the packing list area to thier own personal lists | Patrick moves "harpoon gun" to card named "Patrick" | "Harpoon gun" displayed under Patrick's list |
<!-- | Webpage displays weather for input location in title bar | "Bend, OR" | weather for Bend, OR in title bar | -->
| Webpage determines list of trails nearby user's input location | "Portland, OR" | wildwood trail, etc. |
| Webpage displays error message if API call for nearby trails fails | 400-level response status | "There was an error retreiving nearby trails." |
| Webpage alerts user if there are no results for nearby trails | "John Day, OR" | "There are no trails within 50mi of John Day, OR" |
| Webpage displays list of trails in order of most popular to least popular | user enters location for trip | most popular to least popular nearby trails are displayed |
| Webpage allows user to click on any trail and displays more details about the clicked trail | user clicks "wildwood trail" | webpage displays difficulty, ascent, descent, etc. |

Stretch goals:
* figure out local storage option so that the list is available after browser is closed
* send email to each person with their list, or some other close-out task when trip planning is complete
* ability to delete campers and items (e.g., delete camper without losing items that were in camper's card)

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
* ``$ cd doctor``

_Confirm that you have navigated to the camping directory (e.g., by entering the command_ ``pwd`` _in Terminal). Next, add a file named .env to project root directory (e.g., by entering the command_ ``touch .env`` _in Terminal)._
* _Make an API key for the [Hiking Project Data API](https://www.hikingproject.com/data) by navigating to the linked website and clicking "sign up of login to get an API Key"_
* _Store your API key for the Hiking Project API in first line of the .env file in the following format: API_KEY = {replace curly braces and this text with your API key}_
* _Make an API key for the [OpenCage Geocoding API](https://opencagedata.com/api) by navigating to the linked website and selecting "sign up for your free API key" under QuickStart._
* _Store your API key for the OpenCage Geocoding API in second line of the .env file in the following format: GEO_API_KEY = {replace curly braces and this text with your API key}_

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

### License

*This webpage is licensed under the MIT license.*

Copyright (c) 2020 **_Michelle Morin, Patrick Kille, Matt Taylor, Joseph Wangemann, Alex Skreen_**