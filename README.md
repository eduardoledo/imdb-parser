# imdb-parser
Parse IMDB HTML into JSON

## Installation

```shell
  npm install imdb-parser --save
```

## Usage

First we require the module:

````js
	var parser = require('imdb');
````
### parser.get(imdbId)
Retrieves basic info for the corresponding IMDB id:

````js
	parser.get('tt0898266').then(function(info) {
		console.log(info);
	}); // Get basic data for 'The Big Bang Theory'
````

This returns a js object with the following structure:

````js
{ 
	id: 'tt0898266',
	img: 'http://ia.media-imdb.com/images/M/MV5BMjI1Mzc4MDUwNl5BMl5BanBnXkFtZTgwMDAzOTIxMjE@._V1_SY317_CR20,0,214,317_AL_.jpg',
	title: 'The Big Bang Theory',
	duration: 'PT22M',
	country: '',
	releaseDates: [],
	AKAs: [],
	seasons: 
	[ 
		{ number: '1', episodes: [] },
     	{ number: '2', episodes: [] },
		{ number: '3', episodes: [] },
		{ number: '4', episodes: [] },
		{ number: '5', episodes: [] },
		{ number: '6', episodes: [] },
		{ number: '7', episodes: [] },
		{ number: '8', episodes: [] },
		{ number: '9', episodes: [] },
		{ number: '10', episodes: [] } 
	] 
}
````