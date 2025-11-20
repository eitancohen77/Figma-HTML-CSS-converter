## Figma to HTML/CSS Converter
This project converts Figma Designs into its corresponding HTML/CSS visually accurate counterpart. This is done by taking any given Figma design by using Figma's REST API, and using that data to translate to HTML/CSS.

## Tech Stack
* Node.js
* Express.js
* EJS
* Javascript
* Figma REST API

## Setup
### 1. Install Dependencies
`npm install`

### 2. Configure Environment Variables
Create a .env file in the root of the project and add the variable with its token value:

`TOKEN_KEY=<your_figma_token>`

### 3. Run the Server
In your terminal, run:

`node server.js`

This will run on localhost:3000

## Limitations
