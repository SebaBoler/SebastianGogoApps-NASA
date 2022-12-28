# <p align="center">GogoApps NASA API Server </p>

## Description

Microservice responsible for gathering image URLs from the open
[NASA's APOD API](https://github.com/nasa/apod-api)

## Installation

GogoApps NASA API Server requires [NodeJS](https://nodejs.org/) v16+ to run

### Building for source repository

```sh
npm install or yarn
npm start or npm start:nodemon ( hotreloader)
```

### Docker

Build image with Docker

```
docker build --tag gogo-apps-nasa .
```

Run Image with Docker

```
docker run --name gogoapssserver -p 8080:8080 -d -e PORT=8080 gogo-apps-nasa
```

## Additional Information

- Optimalisation idea after read task description

In task i have to use date for get url.
Better options is to use range dates supported by NASA API Server

- What if we were to change the NASA API to some other images provider?

To use a different image provider API, the process will be similar to using the NASA APOD API. We'll need to find the API endpoint and any required API keys or authentication credentials, and make an HTTP request to the endpoint to retrieve the image data.

Different image provider APIs may have different requirements for making requests and parsing responses. Need to check the requirements the API documentation for specific details.

- What if, apart from using NASA API, we would want to have another microservice fetching urls from
  European Space Agency. How much code could be reused?

We can reuse much of the code you used to fetch images from the NASA API. The basic process of making an HTTP request to an API endpoint and parsing the response will be the same, regardless of which API you are using. Actually, without checking requiremenets and setting i cant answer if is possible to have universal endpoint. Best practive is to use different implementations.

- What if we wanted to add some more query params to narrow down lists of urls - for example,
  selecting only images taken by a certain person. (field copyright in the API response)

NASA APOD API doesn't support query with copyright.
Response body we hold in the response body ( array) and we easly can use function to filter by any returned fields.
We can send response to cache for get better performance.

Currently supported: [NASA API documentation](https://github.com/nasa/apod-api)

```
URL Search Params | query string parameters
api_key | demo: DEMO_KEY | https://api.nasa.gov/#signUp
date A string in YYYY-MM-DD format indicating the date of the APOD image (example: 2014-11-03). Defaults to today's date. Must be after 1995-06-16, the first day an APOD picture was posted. There are no images for tomorrow available through this API.
concept_tags A boolean True|False indicating whether concept tags should be returned with the rest of the response. The concept tags are not necessarily included in the explanation, but rather derived from common search tags that are associated with the description text. (Better than just pure text search.) Defaults to False.
hd A boolean True|False parameter indicating whether or not high-resolution images should be returned. This is present for legacy purposes, it is always ignored by the service and high-resolution urls are returned regardless.
count A positive integer, no greater than 100. If this is specified then count randomly chosen images will be returned in a JSON array. Cannot be used in conjunction with date or start_date and end_date.
start_date A string in YYYY-MM-DD format indicating the start of a date range. All images in the range from start_date to end_date will be returned in a JSON array. Cannot be used with date.
end_date A string in YYYY-MM-DD format indicating that end of a date range. If start_date is specified without an end_date then end_date defaults to the current date.
thumbs A boolean parameter True|False inidcating whether the API should return a thumbnail image URL for video files. If set to True, the API returns URL of video thumbnail. If an APOD is not a video, this parameter is ignored.
```
