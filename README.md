# Columbia University Coding Bootcamp - NoSQL Challenge: Social Network API 

# Description
This project acts as a simple API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. It leverages Express.js for routing, a MongoDB database, and the Mongoose ODM.


# Demo
The following demonstrates how to create a user (post) and then get all users (get):
```/api/users/```


The following demonstrates how to get a user by id (get), update that user by id (put), and delete a user by id (delete):
```/api/users/:id/```


The following demonstrates how to add a friend by user id (post) and delete a friend by user id (delete):
```/api/users/:userId/friends/:friendId/```


The following demonstrates how to create a thought by user id (post) and get all thoughts (get):
```/api/thoughts/:userId```
```/api/thoughts/```


The following demonstrates how to get a thought by id (get), update a thought by id (put), and delete a thought by id (delete):
```/api/thoughts/:id```


The following demonstrates how to add a reaction by thought id (post) and delete a reaction by thought id and reaction id (delete):
```/api/thoughts/:thoughtId/reactions```
```/api/thoughts/:thoughtId/reactions/:reactionId```



## Table of Contents 

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

To install this project, navigate to your comand line console (for simplicity we will assume you are using terminal) and:

Clone this repository.
```md
git clone git@github.com:katebonner/social-network.git
```
ensure you have installed node.js by checking the version.
```md
node -v
```
if it has not been installed please navigate to https://nodejs.org/en/download/. lastly, ensure you have installed the node pkg express and mongoose. If they have not been installed, install them.
```md
npm i
```


## Usage

This project provides an example of of how to leverage Express and Mongoose to interact with unstructured data in a MongoDB database.


## License

MIT License

Copyright (c) 2022 Kate Bonner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
