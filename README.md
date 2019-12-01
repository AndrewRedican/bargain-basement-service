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

### Project Setup

1. Install Node https://nodejs.org/en/
2. Run `npm install -g firebase-tools`

### Deploy Cloud Functions

1. Run `firebase deploy --only functions`

### Running Locally

1. Run `firebase serve`

### Testing

Work in progress.

### Project Standards

Work in progress.

### Development Stategy / Design Decisions

Work in progress.
