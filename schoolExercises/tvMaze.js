"use strict";

const $showsList = $('#showsList');
const $episodesArea = $('#episodesArea');
const $searchForm = $('#searchForm');
const $episodesList = $('#episodesList');

async function getShowsByTerm(term) {
const searchTerm = term;

const show = await axios.get("http://api.tvmaze.com/search/shows", {
  params: {
    q: searchTerm
  }
})
let dataVessel = [];
for (let i = 0; i < show.data.length; i++) { dataVessel.push({
    id: show.data[i].show.id,
    name: show.data[i].show.name,
    summary: show.data[i].show.summary,
    image: show.data[i].show.image.medium
})
}

return(dataVessel);

}

function populateShows(shows) {
  $showsList.empty();
  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt=${show.name}
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);
    $showsList.append($show);
  }
}

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);
  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

async function getEpisodes(showID) {
  const episodes = await axios.get(`http://api.tvmaze.com/shows/${showID}/episodes`);
  let epiHolder = [];
  for (let i = 0; i < episodes.data.length; i++) { epiHolder.push( {
    id: episodes.data[i].id,
    name: episodes.data[i].name,
    season: episodes.data[i].season,
    number: episodes.data[i].number
  })};
  return epiHolder;
}

async function populateEpisodes(e) {
  $episodesList.empty();
  const showId = $(e.target).closest(".Show").data("show-id");
  const epiData = await getEpisodes(showId);
  for (let epi of epiData) {
    const $episode = $(
      `<li> ${epi.name} (Season ${epi.season}, Episode ${epi.number}) </li>`;
    )
    $episodesList.append($episode);
  }
  $episodesArea.show();
}

$showsList.on("click", ".Show-getEpisodes", populateEpisodes);
