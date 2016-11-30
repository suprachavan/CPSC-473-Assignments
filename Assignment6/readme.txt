readme.txt for CPSC 473 Assignment 6

Main Functionalitites:

1. First time user can sign up with username by clicking on signup button on home page.

2. Registered user can join competition with his username by clicking login button on home page.

   When a user joins the competition, the list of current players is updated in real time.

3. Any one player can start new round by clicking "Start new round" button.

   After new round has started, all players are presented with 1 new random question at a time.
   Same question is displayed for all online players in real time.

4. Player can enter his answer and submit by clicking submit button.
   Any player can answer the question.

5. When a user submits an answer, all players should see whether that user’s answer was correct, 
   The result of the question i.e. whether answer by one player was correct or not is displayed to all users in real time.

6. The score i.e. total count of right or wrong answers is updated in real time and dispalyed to all users.

7. Any player can opt to go to next question by clicking "next question" button.

8. Online user can leave the competiton any time by clicking the logout button in the right corner of the home page.

Steps to run the code-

Download/Clone the entire folder Assignment6 from this repository.
Place the folder in virtual machine.
Switch to directory Assignment6 by using command in the VM command prompt- `cd Assignment6`
Install all dependencies using command- `npm install`
Start the server, MongoDB, Redis by using command- `foreman start`
Note: Make sure process for MongoDB and Redis is topped before running step 5, otherwise it will result in an error. In case of an error, either stop these processes before running Step 5 again or you may directly start the server by using command- node server.js
Go to the browser and enter url localhost:3000, index.html will open.

