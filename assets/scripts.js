// JavaScript source code

let movies = {
    "Batman": {
        "title": "The Dark Knight",
        "url": "https://www.youtube.com/watch?v=EXeTwQWrcwY"
    },
    "matrix": {
        "title": "The Matrix",
        "url": "https://www.youtube.com/watch?v=vKQi3bBA1y8"
    },
    "ib": {
        "title": "Inglorious Bastards",
        "url": "https://www.youtube.com/watch?v=KnrRy6kSFF0"
    },
    "jp": {
        "title": "Jurassic Park",
        "url": "https://www.youtube.com/watch?v=lc0UehYemQA"
    },
    "samurai": {
        "title": "The Last Samurai",
        "url": "https://www.youtube.com/watch?v=T50_qHEOahQ"
    },
    "ff": {
        "title": "Fast & Furious 6",
        "url": "https://www.youtube.com/watch?v=FUK2kdPsBws"
    },
    "Pirates 1": {
        "title": "Pirates of the Caribbean: The Curse of the Black Pearl",
        "url": "https://www.youtube.com/watch?v=naQr0uTrH_s"
    },
    "Pirates 2": {
        "title": "Pirates of the Caribbean Dead Man's Chest",
        "url": "https://www.youtube.com/watch?v=ozk0-RHXtFw"
    },
    "Pirates 3": {
        "title": "Pirates of the Caribbean: At World's End",
        "url": "https://www.youtube.com/watch?v=HKSZtp_OGHY"
    },
    "Pirates 4": {
        "title": "Pirates of the Caribbean: On Stranger Tides",
        "url": "https://www.youtube.com/watch?v=t5AqJww06bw"
    },
    "Pirates 5": {
        "title": "Pirates of the Caribbean: Dead Men Tell No Tales",
        "url": "https://www.youtube.com/watch?v=IPf4rGw3XHw"
    },
    "Pulp Fiction": {
        "title": "Pulp Fiction",
        "url": "https://www.youtube.com/watch?v=s7EdQ4FqbhY"
    }
};

const aside = document.getElementById('pop-up');
const trailer = document.getElementById('video');
const container = document.getElementById('main');

for (var key in movies) {
    if (movies.hasOwnProperty(key)) {
        let movie = movies[key];
        let url = 'https://www.omdbapi.com/?t=' + movie.title + '&apikey=179f50a5';

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const container = document.getElementById('main');
                const card = document.createElement('article'); 
                card.setAttribute('data-yt', movie.url);
                card.setAttribute('onclick', 'playVideo(this);');
                const heading = document.createElement('figure');
                const title = document.createElement('h3');
                title.textContent = data.Title;
                const year = document.createElement('span');
                year.textContent = ' (' + data.Year + ')';
                const thumbnail = document.createElement('img');
                thumbnail.setAttribute('src', data.Poster);

                title.appendChild(year);
                heading.appendChild(title);
                heading.appendChild(thumbnail);

                

                const content = document.createElement('div');
                content.setAttribute('class', 'movie-content');
                const ratingFig = document.createElement('figure');
                ratingFig.setAttribute('class', 'rating-fig');
                const star = document.createElement('img');
                star.setAttribute('src', 'assets/images/star.png');
                const rating = document.createElement('div');
                rating.setAttribute('class', 'rating');

                const rated = document.createElement('span');
                rated.setAttribute('class', 'rated');
                rated.textContent = data.imdbRating
                const ratespan = document.createElement('span');
                ratespan.textContent = '/10';


                ratingFig.appendChild(star);
                rating.appendChild(rated);
                rating.appendChild(ratespan);

                ratingFig.appendChild(rating);
                content.appendChild(ratingFig)

                const desc = document.createElement('p');
                desc.setAttribute('class', 'plot margins');
                desc.textContent = data.Plot.substring(0 , 200) + '...';
                const p = document.createElement('p');
                p.setAttribute('class', 'age margins');
                p.textContent = 'Age:' + _calculateAge(new Date(data.Released));

                content.appendChild(desc);
                content.appendChild(p);

                card.appendChild(heading);
                card.appendChild(content);
                container.appendChild(card);
            })
            .catch(err => {
                console.log(err);
            })
    }
}


function _calculateAge(released) { 
    var ageDifMs = Date.now() - released.getTime();
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
//yt
function getIdFromUrl(videoIdOrUrl) {
    if (videoIdOrUrl.indexOf('http' === 0) ) {
        return videoIdOrUrl.split('v=')[1];
    } else {
        return videoIdOrUrl;
    }
}
function generateThumbnailUrl(videoIdOrUrl) {
    return 'https://i3.ytimg.com/vi/' + getIdFromUrl(videoIdOrUrl) + '/default.jpg';
}
function generateEmbedUrl(videoIdOrUrl) {
    return 'https://www.youtube.com/embed/' + getIdFromUrl(videoIdOrUrl);
}

function playVideo(e) {

    let videoIdOrUrl = e.getAttribute('data-yt');
    let id = getIdFromUrl(videoIdOrUrl);
    let thumb = generateThumbnailUrl(videoIdOrUrl); 
    let embed = generateEmbedUrl(videoIdOrUrl);
    console.log(embed);

    trailer.innerHTML = '<iframe src="' + embed + '" width="560" height="315"></iframe>';
    aside.setAttribute('class', 'show');

}

function _closeAside() {
    aside.className = '';
    trailer.innerHTML = '';
};

