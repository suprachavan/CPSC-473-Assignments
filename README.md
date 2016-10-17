# CPSC-473-Assignments
Contains assignments submitted for course CPSC 473

Assignment 3

Completed the following steps:
1. Complete the exercise starting on p. 143 of Chapter 4, “Array Practice.”
2. Expose each of six functions you wrote in Step 1 as a web service API using Node.js and Express.
      Each function should have a URL endpoint, e.g. /average or /arrayContainsNTimes
      Each endpoint should respond to the HTTP POST method
      Arguments should be passed as JSON
3. Create a web page using jQuery and AJAX to allow users to call each endpoint of the service you created in Step 3

Steps to run the code-
1. Copy the entire folder Assignment 3 from this repository.
2. Place the folder in virtual machine
3. Switch to directory Assignment 3 by using command in the VM command prompt- cd Assignment3
4. Use command- npm install in the VM command prompt to install all the dependencies (e.g. bodyparser, express)
5. Use command- node app.js to start the server
6. Go to the browser and enter url localhost://3000, index.html will open.
7. Click on each button to call the corresponding web API for each function.
8. The results will be displayed below the button.
9. The input array of numbers and strings are hard-coded into the client side app.js file.
