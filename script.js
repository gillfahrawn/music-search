var resultView = new Vue({
  el: '#app',
  data: {
    loadingGif: './loading.gif',
    artist2: './img/2.jpg',
    itunesDefaultURL: 'https://itunes.apple.com/search?attribute=allArtistTerm&entity=movie&entity=album&entity=allArtist&entity=podcast&entity=musicVideo&entity=mix&entity=audiobook&entity=tvSeason&entity=allTrack&term=',
    search:0, 
    info:null,
    resultCount:0,
    allResultCount:0,
    id:-1,
    artistDescription:[],
    artistAll:[],
    tabStates:[],// 0=tab1 1=tab2
    genres:[],
    genreClick:[],
    genreKey:0,
    renderKey:0,
    all:true,
    sortOptions:[true, false, false],
    sortKey:0,
    originalSortCopy:[],
    loading:false,
  },
  methods: {
    reset() {
      this.id = 0
      this.artistDescription = []
      this.artistAll = []
      this.tabStates = []
      this.genres = []
      this.genreClick = []
      this.originalSortCopy = []
    },
    updateSort() {
      if (this.sortOptions[0]) {
        // if RESET sort
        this.artistDescription = []

        if (this.all) {
          this.artistDescription = [].concat(this.artistAll)
        }
        else {
          this.artistDescription = this.artistAll.filter(artist => this.genreClick[this.genres.indexOf(artist[9])] )
        }
      }
      else if (this.sortOptions[1]) {
        // if COLLECTION sort
        // a and b are artists and index [1] is collection name. 
        // This sorts alphabetically
        this.artistDescription.sort( function(a,b){
          if (a[1] < b[1]) return -1;
          if (a[1] > b[1]) return 1;
          return 0;
        } )
      }
      else if (this.sortOptions[2]) {
        // if PRICE sort
        // index [2] is price. sort in acending order
        this.artistDescription.sort( function(a,b){
          if (a[2] < b[2]) return -1;
          if (a[2] > b[2]) return 1;
          return 0;
        } )
      }
      
    },
    // these sort functions are called if they ON:CLICK
    sortReset() {// 0 is reset, 1 is collection, 2 is price
      this.sortOptions[0] = true
      this.sortOptions[1] = false
      this.sortOptions[2] = false

      this.updateSort()
      
      this.sortKey++
    },
    sortByCollection() {// 0 is reset, 1 is collection, 2 is price
      this.sortOptions[0] = false
      this.sortOptions[1] = true
      this.sortOptions[2] = false
      
      this.updateSort()

      this.sortKey++
    },
    sortByPrice() {// 0 is reset, 1 is collection, 2 is price
      this.sortOptions[0] = false
      this.sortOptions[1] = false
      this.sortOptions[2] = true
      
      this.updateSort()

      this.sortKey++
    },

    //this.artistAll.push([artistName,collectionName,price,kind,preview,image,index,trackId,country,currGenre])
    pressEnter(value) {
      this.reset()
      // '&country=US' + '&origin=*' from itunes api documentation
      this.search = this.itunesDefaultURL + value + '&country=US' + '&origin=*'
      // URL can't have spaces, so add '+'
      this.search = this.search.split(' ').join('+')
      //console.log(this.search)
      this.loading = true
      axios.get(this.search).then(response => { 
        this.loading = false
        this.info = response
        this.allResultCount = this.info.data.resultCount
        this.resultCount = this.allResultCount

        if (this.resultCount == 0) {
          alert("No Artist Found")
        }

        for (let i = 0; i < this.resultCount; i++) {
          artistName = 0 // [0] index in array
          collectionName = 0 // [1] index in array
          price = 0 // [2] index in array
          kind = 0 // [3] index in array
          preview = 0 // [4] index in array
          image = 0 // [5] index in array
          index = 0 // [6] index in array
          trackId = 0 // [7] index in array
          country = 0 // [8] index in array
          currGenre = 0 // [9] index in array
          urlMessage = "Link" // [10] index in array

          if (response.data.results[i].hasOwnProperty("artistName")) {
            artistName = response.data.results[i].artistName
          }
          else {
            artistName = "No Information Provided"
          }
          if (artistName == '') {
            artistName = "No Information Provided"
          }

          if (response.data.results[i].hasOwnProperty("collectionName")) {
            collectionName = response.data.results[i].collectionName
          }
          else {
            collectionName = "No Information Provided"
          }
          if (collectionName == '') {
            collectionName = "No Information Provided"
          }

          if (response.data.results[i].hasOwnProperty("collectionPrice")) {
            price = response.data.results[i].collectionPrice
          }
          else {
            price = 0
          }
          if (price == '') {
            price = 0
          }

          if (response.data.results[i].hasOwnProperty("kind")) {
            kind = response.data.results[i].kind
          }
          else {
            kind = "No Information Provided"
          }
          if (kind == '') {
            kind = "No Information Provided"
          }

          if (response.data.results[i].hasOwnProperty("previewUrl")) {
            preview = response.data.results[i].previewUrl
          }
          else {
            preview = "No Information Provided"
            urlMessage = preview
          }
          if (preview == '') {
            preview = "No Information Provided"
            urlMessage = preview
          }

          if (response.data.results[i].hasOwnProperty("artworkUrl100")) {
            image = response.data.results[i].artworkUrl100
          }
          else {
            image = "No Information Provided"
          }
          if (image == '') {
            image = this.artist1
          }
          
          // every artist block needs an ID so we can swap tabs
          // default tab is "Description" which is 0
          index = this.getID() // [6] in array
          this.tabStates[index] = 0

          trackId = response.data.results[i].trackId // [7] in array

          if (response.data.results[i].hasOwnProperty("country")) {
            country = response.data.results[i].country
          }
          else {
            country = "No Information Provided"
          }
          if (country == '') {
            country = "No Information Provided"
          }// [8] in array

          if (response.data.results[i].hasOwnProperty("primaryGenreName")) {
            currGenre = response.data.results[i].primaryGenreName
            if (currGenre != '') {
              if (this.genres.indexOf(currGenre) == -1) {
                this.genres.push(currGenre)
                this.genreClick.push(false)
              }
            }
          }// [9] in array
          
          this.artistAll.push([artistName,collectionName,price,kind,preview,image,index,trackId,country,currGenre,urlMessage])
          this.artistDescription = [].concat(this.artistAll)

          if (!this.sortOptions[0]) {
            this.updateSort()
          }
        } // end for artist for loop

        console.log(response.data.results)
        //console.log("enter:")
        //console.log(this.artistAll)
        // console.log("")
        // console.log("____________________")
        // console.log(this.artistDescription.length)

      }); 
    },
    
    // toggles the tab of an artist to description
    description(input) {
      this.tabStates[input] = 0 // 0 represents "description" tab
      this.renderKey++
    },

    // toggles the tab of an artist to track
    track(input) {
      this.tabStates[input] = 1 // 1 represents "track" tab
      this.renderKey++
    },
    
    clickGenreButton(genre) {
      index = this.genres.indexOf(genre)
      if (this.genreClick[index] == true) {
        this.genreClick[index] = false
      }
      else {
        this.genreClick[index] = true
        this.all = false
      }
      atLeastOneGenreSelected = false
      for (let i = 0; i < this.genreClick.length; i++) {
        if (this.genreClick[i] == true) {
          atLeastOneGenreSelected = true
        }
      }
      if (!atLeastOneGenreSelected) {
        this.all = true
      }

      this.updateArtists()
      this.genreKey++
    },
    updateArtists() {
      this.artistDescription = []
      this.resultCount = 0

      if (this.all) {
        this.artistDescription = [].concat(this.artistAll)
        this.resultCount = this.allResultCount
      }
      else {
        this.artistDescription = this.artistAll.filter(artist => this.genreClick[this.genres.indexOf(artist[9])] )
        this.resultCount = this.artistDescription.length
      }
      
      if (!this.sortOptions[0]) {
        this.updateSort();
      }
    },
    clickAll() {
      this.all = true
      for (let i = 0; i < this.genreClick.length; i++) {
        this.genreClick[i] = false
      }
      this.updateArtists()
      this.genreKey++
    },
    genreColorUpdate(genre) {
      index = this.genres.indexOf(genre)
      return this.genreClick[index]
    },
    getID() {
      this.id++
      //console.log("gotID")
      return this.id
    }
  },
  // mounted () {
  //   axios
  //     .get(this.search)
  //     .then(response => (this.result = response))
  // }

})
