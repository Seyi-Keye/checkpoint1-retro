## Inverted-Index-Retro
```This is my inverted index application with pure Javascript for both frontend and backend. No external frame work was used. enjoy.```

## Introduction
Inverted index takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.
## About the Application
To use this application, upload any JSON file of your choice that has the format below:
```
[
  {
    'title': 'Hello Seyi',
    'text': 'My name is Seyi Aromokeye'
  },
  {
    'title': 'I am a Programmer',
    'text': 'do you have an Idea of what Programming entails?'
  }
]
```
This application creates an Inverted Index from each text property of the JSON file. After creating the index, you can search for a word (or multiple words) in a single file or all files.


## getting Started
#### Local installation
To install locally
- Clone this repo
```
git clone https://github.com/andela-oaromokeye/checkpoint1-retro.git
```
- Install dependencies (Ensure you have [Node.js] (nodejs.org) installed first) then do:
```
npm install
```
- To start the application, run the following command
```
npm start
```
This launches the app on your default browser on http://localhost:5000

- Upload file to be indexed using the upload button
- Select file to be indexed using the dropdown box
- Full text search can be made at the top right corner of the page.

## External dependencies for the app
 - Node.js
 - EcmaScript 6 (JavaScript 2015)

## Limitation
- This application can only create index for one file at a time and not multiply files at once.

## Contributing
 1. Fork this repository to your account.
 2. Clone to your repository: `git clone https://github.com/andela-oaromokeye/checkpoint1-retro.git`
 3. Create your feature branch: `git checkout -b new-feature`
 4. Commit your changes: `git commit -m "new feature"`
 5. Push to the remote branch: `git push origin new-feature`

 ##Thank you

