TimeZone Converter
This project is a React-based application designed to help users compare and manage different time zones. It offers functionalities such as adding new time zones from a dropdown, reordering time zones via drag-and-drop, and integrating directly with Google Calendar for scheduling meetings.

Features
Add Time Zones: Quickly insert new time zones using a searchable dropdown menu.
Drag and Drop: Rearrange the displayed time zones by dragging and dropping them.
Time Adjustment Slider: Modify the time for each time zone with an intuitive slider.
Date Picker: Use the date picker to change the date seamlessly.
Dark Mode: Switch between light and dark themes for better readability.
Reverse Order: Instantly reverse the order of the listed time zones.
Google Calendar Integration: Directly schedule meetings in Google Calendar.

Interface

Installation
Navigate to the timezone-converter directory:

cd timezone-converter
Install the necessary dependencies:

npm install moment-timezone react-beautiful-dnd react-datepicker react-select
Start the development server:

npm start

Usage
Add a new time zone by selecting it from the dropdown menu at the top of the page.
Adjust the time for any time zone using the provided slider.
Utilize the top buttons to toggle dark mode, reverse the order of time zones, generate a shareable link, or schedule a meeting through Google Calendar.

File Structure
src/components/TimeZoneConverter.js: Manages the overall time zone list, controls for adding new time zones, and other functionalities.
src/components/TimeZoneDisplay.js: Displays information for individual time zones.
src/utils/timeZoneUtils.js: Contains utility functions for generating shareable links and scheduling meetings.
src/styles/TimeZoneConverter.css: Handles the application's styling.

Dependencies
React: A JavaScript library for creating user interfaces.
moment-timezone: Provides time zone support for moment.js.
react-beautiful-dnd: Enables drag-and-drop functionality within the app.
react-datepicker: Adds a date picker component to the interface.
react-select: Implements a dropdown for selecting and adding time zones.