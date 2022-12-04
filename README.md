# Overview

This is a React app for the GifStore REST API (built in .NET Core): [Access the GifStore repo](https://github.com/salisuwy/GifStore)

## Features include
- Authentication (Login/Register)
- Profile update (change name and password)
- Drag and drop multi image upload with progress tracking and cancellation
- Item renaming, tagging, deletion and access restriction
- Dashboard with search feature
- Unrestricted access to items marked as public

## Demo - complete app 
![Sequence_01_AdobeExpress](https://user-images.githubusercontent.com/8425466/205522826-72ac3235-d1f4-4a16-a3cf-674c509bfea3.gif)

## Libraries/Frameworks
- React
- React Router (v6)
- Tailwind CSS
- Axios

## Running the app

** This app requires the REST endpoint to be accessible **

- Ensure that the [GifStore app](https://github.com/salisuwy/GifStore) is running
- Clone this repo
- Modify the BASE_URL in src/services/url.js to match the URL of the GifStore REST API
- Run **npm start** on the terminal
- CORS: If this app is on PORT 3000, you should not have any issue. If you are running on the different port, you must register the app in the appsettings.json file in the [GifStore app](https://github.com/salisuwy/GifStore)

