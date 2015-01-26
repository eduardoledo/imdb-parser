'use strict'

var Q = require('q'),
	request = Q.denodeify(require('request')),
	cheerio = require('cheerio');

Q.longStackSupport = true;

function unique (arr, property) {
	var tmpArr= {};

	for ( var i = 0; i < arr.length; i++ ){
	    tmpArr[arr[i][property]] = arr[i];
	}
	arr = new Array();
	for ( var key in tmpArr ) {
	    arr.push(tmpArr[key]);
	}

	return arr;
}


module.exports = {
	getSeasonEpisodes: function(imdbId, seasonNumber) {
		var url = 'http://www.imdb.com/title/' + imdbId + '/episodes?season=' + seasonNumber;
		var episodes = [];
	    var deferred = Q.defer();
	    
	    return request(url).then(function(resultParams) {
	    	var response = resultParams[0];
	    	var $ = cheerio.load(response.body);

			episodes = $('#episodes_content > div.clear > div.list.detail.eplist > div.list_item > div.info').map(function(idx) {
				var $this = $(this);
				var anchor = $this.find('a[itemprop="name"]');
				return {
					id: anchor.attr('href').substr(0, anchor.attr('href').indexOf('/?')).replace('/title/', ''),
					episodeNumber: idx,
					title: anchor.text(),
					description: $this.find('div[itemprop="description"]').text().replace(/\n/, " ").trim()
				};
			}).toArray();
	    	return episodes;
	    });
	},
	getEpisodeDetails: function(imdbId) {
		var url = 'http://www.imdb.com/title/' + imdbId;

	    return request(url).then(function(resultParams) {
	    	var response = resultParams[0];
	    	var $ = cheerio.load(response.body);

	    	var item = {};

	        item['id'] = imdbId;
	        item['img'] = $('.image img').attr('src');
	        item['title'] = $('#overview-top > h1 > span.itemprop[itemprop="name"]').text();
	        item['date'] = new Date(Date.parse($('#overview-top > h1 > span.itemprop[itemprop="name"]').next().text().replace('(', '').replace(')', '').replace('.', ',')));
	        item['duration'] = $('#overview-top > div.infobar > time[itemprop="duration"]').attr('datetime');
	        var director = $('#overview-top > div[itemprop="director"] > a');
	        item['director'] = {
	        	'id': director.attr('href').substr(0, director.attr('href').indexOf('/?')).replace('/name/', ''),
	        	'name': director.text()
	        };
	        item['writers'] = [];
	        item['cast'] = [];

	    	return item;
	    });
	},
	getFullCredits: function(imdbId) {
		var url = "http://www.imdb.com/title/" + imdbId + "/fullcredits";

	    return request(url).then(function(resultParams) {
	    	var response = resultParams[0];
	    	var $ = cheerio.load(response.body);

	    	var item = {};
	        item['writers'] = unique($('#fullcredits_content > table:nth-child(4) td.name a').map(function() {
	        	        	$this = $(this);
	        	        	return {
	        	        		id: $this.attr('href').substr(0, $this.attr('href').indexOf('/?')).replace('/name/', ''),
	        	        		name: $this.text().trim().replace(/\n/, '')
	        	        	}
	        	        }).toArray(), 'id');

	        item['cast'] = $('#fullcredits_content > table.cast_list tr').map(function() {
	        	$this = $(this);
	        	actor = $this.find('td[itemprop="actor"] a')
	        	if (actor.attr('href') == undefined) {
	        		return null;
	        	}
	        	return {
	        		id: actor.attr('href').substr(0, actor.attr('href').indexOf('/?')).replace('/name/', ''),
	        		name: actor.text().trim().replace(/\n/g, '')
	        	}
	        }).toArray();

	    	return item;
	    });
	},
	getReleaseDates: function(imdbId) {
		var url = "http://www.imdb.com/title/" + imdbId + "/releaseinfo";

	    return request(url).then(function(resultParams) {
	    	var response = resultParams[0];
	    	var $ = cheerio.load(response.body);

	    	var items = $('table#release_dates tr').map(function() {
				var $this = $(this);
				var anchor = $this.find('td:nth-child(1) > a');
				var dateText = $this.find('td:nth-child(2)').text();
				return {
					code: anchor.attr('href').substr(anchor.attr('href').indexOf('?region=') + 8, 2),
					country: anchor.text(),
					date: new Date(Date.parse(dateText))
					
				};
			}).toArray();

	    	return items;
	    });
	},
	get: function(imdbId, callback) {
		var err = null;
	    var url = "http://www.imdb.com/title/" + imdbId;
	    var pending = {};
	    // Obtengo los datos de la página principal
        return request(url).then(function(res) {
        	var response = res[0];
	    	var item = {};

	        var $ = cheerio.load(response.body);

	        item['id'] = $('meta[property="og:url"]').attr('content').replace('http://www.imdb.com/title/', '').replace('/','');
	        item['img'] = $('.image img').attr('src');
	        item['title'] = $('#overview-top > h1 > span.itemprop[itemprop="name"]').text();
	        item['duration'] = $('#overview-top > div.infobar > time[itemprop="duration"]').attr('datetime');
	        
	        var genres = $('#overview-top > div.infobar > a > span.itemprop[itemprop="genre"]').map(function(){
                return this.children[0].data;
            }).toArray();

            var seasons = $('#title-episode-widget > div > div:nth-child(4) > a').map(function() {
                return {
                    number: this.children[0].data,
                    episodes: []
                };
            })
            .toArray()
            .reverse();

			item['country'] = "";
			item['releaseDates'] = [];
			item['AKAs'] = [];

			if (seasons.length > 0) {
				item['seasons'] = seasons;
			} else {
	            item['cast'] = [];
			}

		    return item;
		});
	}
};
