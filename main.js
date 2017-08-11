/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let search = document.querySelector(".searchResults")
let musicPlayer = document.querySelector(".music-player")

const theForm = document.querySelector(".searchArea")
theForm.addEventListener("submit", function(event) {
  event.preventDefault()

  const resultContainer = document.querySelector(".searchResults")
  resultContainer.textContent = ""

  const search = document.querySelector(".searchBar").value;

  let url = `https://itunes.apple.com/search?term=${search}`

  fetch(url)
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {

      for (let i = 0; i < 20; i++) {

        let loopResults = json.results[i].length

        let searchRlts = `
        <div class="search-results">
          <img src="${json.results[i].artworkUrl100}" value="${json.results[i].previewUrl}">
          <h5>${json.results[i].trackName}</h5>
          <h5>${json.results[i].artistName}</h5>
      `
        resultContainer.insertAdjacentHTML("beforeEnd", searchRlts)

      }
    })
})

document.querySelector(".searchResults").addEventListener("click", function(e) {
  if (e.target && e.target.nodeName == "IMG") {
    musicPlayer.src = e.target.getAttribute("value")
  }
})
