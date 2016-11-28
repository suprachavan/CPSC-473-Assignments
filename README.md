# CPSC-473-Assignments
Contains assignments submitted for course CPSC 473

# Assignment 3

# Steps to run the code-
1. Download/Clone the entire folder Assignment 3 from this repository.
2. Place the folder in virtual machine.
3. Switch to directory Assignment 3 by using command in the VM command prompt- `cd Assignment3`
4. Install all dependencies using command- `npm install`
5. Start the server by using command- `node server.js`
6. Go to the browser and enter url localhost:3000, index.html will open.
7. Click on each button to call the corresponding web API for each function.
8. The results will be displayed below the button.
9. The input array of numbers and strings are hard-coded into the client side app.js file.
10. Note-The array operations are in a file- Assignment3/array_op.js

# Assignment 4

# Steps to run the code-
1. Download/Clone the entire folder Assignment4 from this repository.
2. Place the folder in virtual machine.
3. Switch to directory Assignment 4 by using command in the VM command prompt- `cd Assignment4`
4. Install all dependencies using command- `npm install`
5. Start the server, MongoDB, Redis by using command- `foreman start`
6. Note: Make sure process for MongoDB and Redis is stopped before running step 5, otherwise it will result in an error. In case of an error, either stop these processes before running Step 5 again or you may directly start the server by using command- `node server.js`
7. Go to the browser and enter url localhost:3000, index.html will open.
8. MongoDB database name is Assignment 4

# Assignment 5

# Steps to run the code-
1. Download/Clone the entire folder Assignment5 from this repository.
2. Place the folder in virtual machine.
3. Switch to directory Assignment 5 by using command in the VM command prompt- `cd Assignment5`
4. Install all dependencies using command- `npm install`
5. Start the server, MongoDB, Redis by using command- `foreman start`
6. Note: Make sure process for MongoDB and Redis is stopped before running step 5, otherwise it will result in an error. In case of an error, either stop these processes before running Step 5 again or you may directly start the server by using command- node server.js
7. Go to the browser and enter url localhost:3000, index.html will open.
8. MongoDB database name is Assignment 4

# Main functionalities in Assignment 5
1. First time user can sign up with username by clicking on signup button on home page.
2. Registered user can join competition with his username by clicking login button on home page. When a user joins the competition, the list of current players is updated in real time.
3. Any one player can start new round by clicking "Start new round" button. After new round has started, all players are presented with 1 new random question at a time. Same question is displayed for all online players in real time.
4. Player can enter his answer and submit by clicking submit button. Any player can answer the question.
5. When a user submits an answer, all players should see whether that user’s answer was correct, The result of the question i.e. whether answer by one player was correct or not is displayed to all users in real time.
6. The score i.e. total count of right or wrong answers is updated in real time and dispalyed to all users.
7. Any player can opt to go to next question by clicking "next question" button.
8. Online user can leave the competiton any time by clicking the logout button in the right corner of the home page.

# Assignment 6

# Steps to run the code-
1. Download/Clone the entire folder Assignment6 from this repository.
2. Place the folder in virtual machine.
3. Switch to directory Assignment 6 by using command in the VM command prompt- `cd Assignment6`
4. Install all dependencies using command- `npm install`
5. Start the server, MongoDB, Redis by using command- `foreman start`
6. Note: Make sure process for MongoDB and Redis is stopped before running step 6, otherwise it will result in an error. In case of an error, either stop these processes before running Step 5 again or you may directly start the server by using command- node server.js
7. Go to the browser and enter url localhost:3000, index.html will open.
8. MongoDB database name is Assignment 4

# Main functionalities in Assignment 6
Same as Assignment 5, all the page update functionality code is replaced by knockout.js code.
