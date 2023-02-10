# NC-News-FE

:point_right:[Live Demo](https://jimmit.netlify.app/)

## About

The NC-News-fe application provides information on several topics and articles, and allows for various actions such as sorting, ordering, and filtering. It is the front end project created as part of my Northcoders bootcamp, and designed to work with my back end project here: https://github.com/Superjim/nc-news

- ❗ Warning: The backend is hosted with a free provider, which means it takes a few seconds to wake up if it hasn't been used in a while
- ❗ Second Warning: I recommend you navigate the website through the sidebar only, using the default back function sometimes breaks things, I still have some polishing to do

All articles, comments and even topics are added and deleted optimistically. This means default values for things like article/comment ID and time posted are assigned a temporary value and immediately created locally, and then updated upon a succesful response from the API. If an error response is recieved, the new article or comments body is updated to reflect this.

Media queries allow the application to be displayed on a range of devices including mobile, tablets and of course widescreen monitors.

The application uses conditional rendering quite a lot, one example is the create article form, it is a step through form allowing a user to preview their article before submitting. Another example is the add topic form, it takes the user to the add article form upon adding a topic.

## Features

### Topics

- View articles related to a specific topic
- Each topic has a slug and description
- Topics are rendered on the sidebar with a checkbox to allow sorting, and a link to go directly to the topic page

### Articles

- View a list of all articles
- View a specific article
- Upvote / downvote articles
- Each article displays the topic, author, time posted (eg. Posted 2 hours and 43 minutes ago, or Posted 3 years and 1 month ago), its article id, title, image, body and a link to the article page where comments can left and viewed

### Sidebar

- Sort articles, with a checkbox interface to allow sorting from multiple topics
- Sort articles by Article ID, Title, Topic, Author, Body, Created At, Comment Count or Votes
- Order by ascending or descending
- Limit the amount of articles rendered, from 10 to 50 in increments of 10
- View which page of articles is displayed
- Create a new topic or article buttons

### Comments

- Leave comments on an article
- View other comments
- Upvote and downvote comments

### User Profiles

- Hard coded range of users to choose from (in the header)
- You are only able to delete articles and comments authored by the user
- You are only able to upvote / downvote comments left by other users

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Prerequisites

Before you get started, make sure you have the following software installed on your machine:

```
Node.js
npm
```

### To setup and run this project locally:

Clone the repository to your local machine
Navigate to the project folder
Run npm install to install all the required dependencies

```bash
npm install
```

To run the application locally, follow these steps:

In the project folder, run:

```
npm start
```

Open your web browser and go to http://localhost:3000

### Dependencies

| Dependency       | Recommended Version | Description                                                          |
| ---------------- | ------------------- | -------------------------------------------------------------------- |
| React            | 18.2.0              | A JavaScript library for building user interfaces                    |
| axios            | 1.3.2               | A JavaScript library used to make HTTP requests                      |
| react-icons      | 4.7.1               | A library of high-quality, customizable icons for React applications |
| react-router-dom | 6.8.0               | A library for routing in React applications                          |
| react-uploader   | 3.5.0               | A library for handling file uploads in React applications            |

### Created by

Jim Jenkinson [Github @Superjim](https://github.com/Superjim/)
