# Cloud Computing - API Proffera
- Clone this Project using git Clone
- Start Project With npm Start || npm run dev (nodemon)
- If you want add new feature go to dev branch and clone it after that make a new branch named new feature and marge with dev branch if done.

```
Notes:
Branch MAIN Is Production Branch Be Careful for Merge this Branch
```
## How to add New Router
- Go to app/api
- add folder named entities
- create a Model,Controller,Route on this
- export them and use into app.js

---

# Proffera API Documentation

Welcome to the Proffera API documentation! This document provides an overview of the available endpoints, request/response formats, and example usage for the Proffera API.

## Base URL

The base URL for accessing the Proffera API is:

```
TBA

```

All endpoints described in this documentation should be appended to this base URL.

## Authentication

To access the Proffera API, you need to include your API key in the `Authorization` header of each request. Set the header as follows:

```
Authorization: Bearer YOUR_API_KEY

```

## Endpoints

### 1\. Create Bids

Create a new bids in the Proffera system.

- **Endpoint:** `/bids`
- **Method:** `POST`
- **Request Body:**
    

``` json
{
  "procurementId": "YE2SfX3V34",
  "vendorId": "VF23f23F34",
  "amount": 43523532,
  "status": "On Review"
}
```

- **Success Response:**
    - **Code:** 201 CREATED
    - **Response Body:**
        
        ``` json
          {
            "msg": "Success",
            "data": {
                "id": "0ucSiS07791yICiB4FS5",
                "procurementId": "QSy29wmFC6nHsXZ7F0Dp",
                "vendorId": "QzI29wmVC6nHcUZ7F0Dp",
                "amount": 43523532,
                "status": "On Review"
              }
          }
        ```
        
- **Error Responses:**
    - **Code:** 400 BAD REQUEST
    - **Response Body:**
        
        ``` json
          {
            "msg": "Filed adding data",
          }
        
        ```
        
    - **Code:** 500 INTERNAL SERVER ERROR
    - **Response Body:**
        
        ``` json
          {
            "msg": "INTERNAL SERVER ERROR"
          }
        
        ```
### 2\. Retrieve Bids

Retrieve a Bid's information.

- **Endpoint:** `/bids/{bid_id}`
- **Method:** `GET`
- **Path Parameters:**
    - `{bid_id}` - The ID of the user to retrieve.
- **Success Response:**
    - **Code:** 200 OK
    - **Response Body:**

        ``` json
          {
            "msg": "Data Found",
            "data": {
                "amount": 43523532,
                "vendorId": "qUQ7e1COOzhLVtICBu46",
                "procurementId": "qUQ7e1CSFzhLGtICBu46",
                "status": "On Review"
                }
          }
        
        ```
        
- **Error Responses:**
    - **Code:** 404 NOT FOUND
    - **Response Body:**
        
        ``` json
          {
            "msg": "Bid not found."
          }
        
        ```
        
    - **Code:** 500 INTERNAL SERVER ERROR
    - **Response Body:**
        
        ``` json
          {
            "msg": "INTERNAL SERVER ERROR"
          }
        
        ```
