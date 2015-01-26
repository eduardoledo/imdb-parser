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

### parser.getSeasonEpisodes(imdbId)
Retrieves episodes list for the corresponding IMDB id:

````js
parser.getSeasonEpisodes('tt0898266').then(function(info) {
	console.log(info);
});
````

This returns

````js
[ 
{ id: 'tt2176186',
    episodeNumber: 0,
    title: 'Unaired Pilot',
    description: 'Add a Plot' },
  { id: 'tt0775431',
    episodeNumber: 1,
    title: 'Pilot',
    description: 'A pair of socially awkward theoretical physicists meet their new neighbor Penny, who is their polar opposite.' },
  { id: 'tt1091289',
    episodeNumber: 2,
    title: 'The Big Bran Hypothesis',
    description: 'Penny is furious with Leonard and Sheldon when they sneak into her apartment and clean it while she is sleeping.' },
  { id: 'tt1091290',
    episodeNumber: 3,
    title: 'The Fuzzy Boots Corollary',
    description: 'Leonard gets upset when he discovers that Penny is seeing a new guy, so he tries to trick her into going on a date with him.' },
  { id: 'tt1091291',
    episodeNumber: 4,
    title: 'The Luminous Fish Effect',
    description: 'Sheldon\'s mother is called to intervene when he delves into numerous obsessions after being fired for being disrespectful to his new boss.' },
  { id: 'tt1091292',
    episodeNumber: 5,
    title: 'The Hamburger Postulate',
    description: 'Leslie seduces Leonard, but afterwards tells him that she is only interested in a one-night stand.' },
  { id: 'tt1091293',
    episodeNumber: 6,
    title: 'The Middle Earth Paradigm',
    description: 'The guys are invited to Penny\'s Halloween party, where Leonard has yet another run-in with Penny\'s ex-boyfriend Kurt.' },
  { id: 'tt1136041',
    episodeNumber: 7,
    title: 'The Dumpling Paradox',
    description: 'When Howard hooks up with Penny\'s old friend, his absence in the gang causes problems for the rest of the guys.' },
  { id: 'tt1127389',
    episodeNumber: 8,
    title: 'The Grasshopper Experiment',
    description: 'When Raj\'s parents set him up on a blind date, he finds he can talk to women with the aid of alcohol.' },
  { id: 'tt1127390',
    episodeNumber: 9,
    title: 'The Cooper-Hofstadter Polarization',
    description: 'Leonard and Sheldon\'s friendship is put to the test when Leonard wants to present a paper they co-authored at a physics convention, but Sheldon doesn\'t.' },
  { id: 'tt1127384',
    episodeNumber: 10,
    title: 'The Loobenfeld Decay',
    description: 'Leonard lies to Penny so that he and Sheldon can get out of watching her perform. However, Sheldon believes that the lie has too many loose ends, so he comes up with a new, unnecessarily complex one to replace it.' },
  { id: 'tt1127385',
    episodeNumber: 11,
    title: 'The Pancake Batter Anomaly',
    description: 'When Sheldon gets sick, Leonard, Howard and Raj go AWOL, leaving a reluctant Penny to deal with him.' },
  { id: 'tt1127386',
    episodeNumber: 12,
    title: 'The Jerusalem Duality',
    description: 'Sheldon decides to give up his work and focus on other tasks when a 15-year-old prodigy joins the lab, so the other guys come up with a plan to get rid of him.' },
  { id: 'tt1127387',
    episodeNumber: 13,
    title: 'The Bat Jar Conjecture',
    description: 'Sheldon becomes so intent on demonstrating his intellectual superiority over the other guys that they kick him off the Physics Bowl team and replace him with his nemesis, Leslie.' },
  { id: 'tt1127905',
    episodeNumber: 14,
    title: 'The Nerdvana Annihilation',
    description: 'Penny gets mad at the guys when their full scale model of a time machine causes her to miss work, which prompts Leonard to give up all of his nerd memorabilia.' },
  { id: 'tt1127906',
    episodeNumber: 15,
    title: 'The Pork Chop Indeterminacy',
    description: 'Leonard, Howard and Raj fight over Sheldon\'s twin sister when she arrives in town. Raj takes part in a drug trial to suppress his selective mutism.' },
  { id: 'tt1127907',
    episodeNumber: 16,
    title: 'The Peanut Reaction',
    description: 'When Penny learns that Leonard has never had a birthday party, she and the rest of the guys plan a surprise party for him.' },
  { id: 'tt1127908',
    episodeNumber: 17,
    title: 'The Tangerine Factor',
    description: 'After a bad breakup, Penny finally agrees to go out on a date with Leonard, however they both develop doubts and turn to Sheldon for advice.' } ]
````


### parser.getEpisodeDetails(imdbId)
Retrieves episodes list for the corresponding IMDB id:

````js
parser.getEpisodeDetails('tt2176186').then(function(info) {
	console.log(info);
});
````

This returns

````js
{ id: 'tt2176186',
  img: 'http://ia.media-imdb.com/images/M/MV5BMjI1Mzc4MDUwNl5BMl5BanBnXkFtZTgwMDAzOTIxMjE@._V1_SY317_CR20,0,214,317_AL_.jpg',
  title: 'Unaired Pilot',
  date: Mon May 01 2006 00:00:00 GMT-0300 (ART),
  duration: 'PT23M',
  director: { id: 'nm0123273', name: 'James Burrows' },
  writers: [],
  cast: [] }
````
