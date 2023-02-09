
# SnapnetDev 
## Task
to developa web application platform for record storage of citizens acrosswards in the country, and  for retrievalof  these  records  via  web  browsers,  REST  APIs  for  systems integration. 
## How To Install And Run The App

clone the repo 

* install all dependencies by typing the below command
    ```bash
        yarn 
    ```
* compile all typescript in src folder to javascript into dist folder by running the command
    ```bash
    yarn compile
    ```
* start the server in the development mode by running
    ```bash
    yarn dev
  ```

## Folder structure
```
SnapnetDev-Npc-project
│
├── bin
│   └── www
├── dist
├── public
├── src
│   ├── app.ts
│   ├── controller
│   │   ├── userController.ts
│   │   
│   ├── model
│   │   ├── citizens
│   │   │    
│   │   ├── lgas
│   │   └── states
│   │   
│   ├── middleware
│   │   └── auth.ts
│   │
│   ├── routes
│   │   ├── users.ts
│   │   
│   │
│   └── utils
│       ├── utile.ts
│       
│
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
├── jest.config.js
└── yarn.lock
```
## Routes
1. Users
```
create user : POST  localhost:4000/users/create
login a user: POST  localhost:4000/users/login


## API Examples
* create a User
    * Method and Headers
    ```
    POST /users/create
    Host: localhost:4000
    Content-Type: application/json
    ```
    * Request Body

    ```json
    {
       "name": "felix",
      "email": "felix@gmail.com",
      "password": "1234",
      "confirm_password":"1234"
    }
    ```
    * Response Body: 200

    ```json
    {
        "record": {
            "id": "a3555746-07b0-46a4-bfcd-22125f58093e",
            "name": "felix",
            "email": "felix@gmail.com",
            "password": "$2a$08$mrtjfUQS8fu4R8UrAwm54.EKIjowkwqM/1dxMYMDTpiLgpS.u86mW",
            "updatedAt": "2023-02-09T14:15:36.375Z",
            "createdAt": "2023-02-09T14:15:36.375Z"
        }
    }
    ```
* Login User
    * Method and Headers
    ```
    POST /users/login
    Host: localhost:4000
    Content-Type: application/json
    ```
    * Request Body

    ```json
    {
        
        "email": "felix@gmail.com",
        "password": "1234"
        
    }
    ```
    * Response Body: 200

    ```json
   {
     "message": "Successfully logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzNTU1NzQ2LTA3YjAtNDZhNC1iZmNkLTIyMTI1ZjU4MDkzZSIsImlhdCI6MTY3NTk1MjE2MSwiZXhwIjoxNjc2NTU2OTYxfQ.0YcCKqmp6eS0HgEfWNBRueHqKZThfk7Nq-nkbi_Wy9A",
    "record": {
        "id": "a3555746-07b0-46a4-bfcd-22125f58093e",
        "name": "felix",
        "email": "felix@gmail.com",
        "password": "$2a$08$mrtjfUQS8fu4R8UrAwm54.EKIjowkwqM/1dxMYMDTpiLgpS.u86mW",
        "createdAt": "2023-02-09T14:15:36.375Z",
        "updatedAt": "2023-02-09T14:15:36.375Z"
    }
    }

* Creat State
    * Method and Headers
    ```
    POST /users/create-state
    Host: localhost:4000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "name": "Rivers" 
    }
    ```
    * Respond Body : 201
    ```json
    {
     "record": {
        "id": "d5efe8d5-2af8-4caf-9f0a-9b15353467fe",
        "name": "Rivers",
        "updatedAt": "2023-02-09T14:16:51.346Z",
        "createdAt": "2023-02-09T14:16:51.346Z"
    }
   }
    ```

* Creat Local government
    * Method and Headers
    ```
    POST users/create-lga
    Host: localhost:4000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "name": "obi-akpor",
        "stateId":"d5efe8d5-2af8-4caf-9f0a-9b15353467fe"
    }
    ```
    * Respond Body : 201
    ```json
    {
     "record": {
        "id": "25aa3d98-ff2f-4a54-9055-10f621d76dcf",
        "name": "obi-akpor",
        "stateId": "d5efe8d5-2af8-4caf-9f0a-9b15353467fe",
        "updatedAt": "2023-02-09T14:20:16.395Z",
        "createdAt": "2023-02-09T14:20:16.395Z"
    }
   }
    ```

* Creat Ward
    * Method and Headers
    ```
    POST /users/create-ward
    Host: localhost:4000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "name": "choba ward",
        "lgaId":"25aa3d98-ff2f-4a54-9055-10f621d76dcf"
    }
    ```
    * Respond Body : 201
    ```json
    {
      "record": {
        "id": "c51e0ff7-be69-4127-9e5d-c1008f4aaa36",
        "name": "choba ward",
        "lgaId": "25aa3d98-ff2f-4a54-9055-10f621d76dcf",
        "updatedAt": "2023-02-09T14:22:31.259Z",
        "createdAt": "2023-02-09T14:22:31.259Z"
    }
   }
    ```


* Creat Citizen
    * Method and Headers
    ```
    POST /users/create-citizen
    Host: localhost:4000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "fullname": "felix temitokin",
        "gender": "male",
        "address": "ondo",
        "phonenumber": "08067402417",
        "wardId":"c51e0ff7-be69-4127-9e5d-c1008f4aaa36"
    }
    ```
    * Respond Body : 201
    ```json
    {
      "record": {
        "id": "22582b94-633a-40b5-bd83-5618a74f81ca",
        "fullname": "felix temitokin",
        "gender": "male",
        "address": "ondo",
        "phonenumber": "08067402417",
        "wardId": "c51e0ff7-be69-4127-9e5d-c1008f4aaa36",
        "updatedAt": "2023-02-09T14:24:46.667Z",
        "createdAt": "2023-02-09T14:24:46.667Z"
    }
   }
    ```



>Note: The application is  authenticated to enable easy testing of the app. you will need to include the login token generated in the postman Authorization header.


