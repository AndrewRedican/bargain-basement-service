## Quick Description

"Bargain basement service" is a RESTFUL backend web service using Firebase as backend. Project development started on November 28, 2019, and ends on December 5, 2019. This repositiory also relates to https://github.com/AndrewRedican/bargain-basement.

### Requirements

- [x] Assume for this exercise that new products can be added but never removed
- [x] The API must support the following:
  - [x] Create a package
  - [x] Retrieve a package
  - [x] Update a package
  - [x] Delete a package
  - [x] List all packages
- [ ] I should be able to specify the currency (taking into account the current exchange rate)
- [ ] API should default to USD if no currency is specified Free API services such as https://exchangeratesapi.io/ offer the ability to query existing exchange rates
- [ ] A package should have the following attributes:
  - [x] ID
  - [x] Name
  - [x] Description
  - [ ] Products (one or more)
  - [ ] Price (total of product prices)
- [x] The API is protected by basic authentication, user the username user and password pass for access.

Example
Product listings - https://product-service.herokuapp.com/api/v1/products Product details - https://product-service.herokuapp.com/api/v1/products/{id}

### Getting Started

#### Project Setup

1. Install Node https://nodejs.org/en/
2. Run `npm install -g firebase-tools`

#### Deploy Cloud Functions

1. Run `firebase deploy --only functions`

#### Running Locally

1. Run `firebase serve`

### API Overview

#### Security

1. API is protected by Http Basic Authorization (user) and (password).
2. CORS is enabled. Currently set ONLY to allow frontend-web app project. (See https://andrewredican.github.io/bargain-basement/)

#### Packages

**Route:** /packages

| Methods | Params |                   Body                   | Success Code |                     Success                     |   Error Codes   |
| :------ | :----- | :--------------------------------------: | :----------: | :---------------------------------------------: | :-------------: |
| GET     | -      |                    -                     |     200      | Responds with empty array or array of packages. |       500       |
| POST    | -      |     Array of packages (one or more)      |     201      |               Creates package(s).               |    400 / 500    |
| GET     | id     |                    -                     |     200      |          Responds with single package.          |    404 / 500    |
| PATCH   | id     | Any or all valid properties of a package |     204      |                 Updates package                 | 400 / 404 / 500 |
| DELETE  | id     |                    -                     |     204      |                 Deletes package                 | 404 / 410 / 500 |

**Route:** /products

| Methods | Params |                   Body                   | Success Code |                     Success                     |   Error Codes   |
| :------ | :----- | :--------------------------------------: | :----------: | :---------------------------------------------: | :-------------: |
| GET     | -      |                    -                     |     200      | Responds with empty array or array of products. |       500       |
| POST    | -      |     Array of products (one or more)      |     201      |              Creates products(s).               |    400 / 500    |
| GET     | id     |                    -                     |     200      |          Responds with single product.          |    404 / 500    |
| PATCH   | id     | Any or all valid properties of a product |     204      |                Updates products.                | 400 / 404 / 500 |

`Any mismatch in path in requests will receive a 404 response back`

#### Testing

Work In Progress.
