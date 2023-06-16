<<<<<<< HEAD
# Mohamad Frananda
=======
# **Peter AI - Cloud Computing**

## 1. Install Express JS

```bash
npm install express
```

## 2. Run app

```bash
node app.js
```

>>>>>>> db92a82a7f3ea1077004a3a6fcf39df2a5718083

# Tasks Performed
1. Consider and choose the appropriate Google service, such as choosing between Google Cloud SQL or Firestore Firebase NoSQL as the database. Prefer Firebase Firestore because it is more economical in terms of cost. Next, configure the billing account so that the credit provided by the Bangkit team is sufficient until the completion of the capstone project.

2. As an admin, monitoring the use of Firebase services and granting access rights to my team. Each learning path is granted editor access so they can access and use Firebase services.

3. In addition, activate the Alert Billing Account feature provided by Google Cloud. This feature provides notifications to users regarding activity and changes regarding invoices and expenses in the capstone team account. With this feature, users can monitor resource usage and costs associated with services used on Google Cloud.

4. Next, create an API using Express.js for the product search feature. Furthermore, when trying to deploy using App Engine and Cloud Run, it encountered a tricky problem. Finally, opted for Firebase Functions because it's easier, faster, and proven to work. In addition, when deploying, it also chooses the server that is closest to the user's location, namely asia-southeast 2 Jakarta.

This can provide several advantages, including:

Lower latency: The physical distance between the server and the user will result in a faster response time. By choosing a server that is close by, it takes less time to send a request and receive a response, reducing latency.

Higher data access rates: Servers that are closer to users also tend to have faster access to data and other resources needed by applications. This means apps can process requests more efficiently and provide a more responsive experience for users.

Cost savings: Some cloud service providers charge based on the server location used. By choosing a server that is close by, you may be able to reduce data transfer costs or high network access costs

5. After the deployment is complete, we will get an endpoint url that can be accessed or checked on the firebase functions and google cloud functions pages, then do a test on postman, after that we will integrate the API with the mobile application

6. Enter vegetable image data with a png extension to firebase storage

7. implement Firebase Functions on the Express.js API Update! Following are the API features that have been used and successfully deployed

➡ Search (Search): Function to search data.
➡ User (User): Function to get user information.
➡ User Registration (Register User): Function to register a new user.
➡ Login User (Login User): Function for the process of user login.
➡ Add Vegetables (Add Vegetables): Function to add vegetable data.
➡ Get All Vegetables (Get All Vegetables): Function to get all vegetable data.
➡ Get Vegetables (Get Vegetables): Function to get vegetable data based on ID or certain criteria.
➡ The "Get All Vegetables" API feature is a feature used in applications or systems related to information or data about various types of vegetables.
➡ Get Profile: Function to get user profile.
➡ Updating Profile (Update Profile): Function to update the user profile.
➡ Logout User : The user logout feature is used to give users control over the security and privacy of their account

After a successful deploy, you can inspect endpoints in Google Cloud Functions and Firebase Functions
