import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from './config'
import {shuffle} from './util'

export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handlePlaylist(this.playList)
  },
  activated () {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playList (newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist () {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  computed: {
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playList',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    changeMode () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        this.setPlayList(list)
      }, 20)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    getFavoriteIcon (song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    toggleFavorite (song) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.isFavorite(song)) {
          this.deleteFavoriteList(song)
        } else {
          this.saveFavoriteList(song)
        }
      }, 20)
    },
    isFavorite (song) {
      const index = this.favoriteList.findIndex((item) => {
        return song.id === item.id
      })
      return index > -1
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}

export const searchMixin = {
  data () {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    saveSearch () {
      this.saveSearchHistory(this.query)
    },
    blurInput () {
      this.$refs.searchBox.blur()
    },
    onQueryChange (query) {
      this.query = query
    },
    addQuery (query) {
      console.log('add query!')
      this.$refs.searchBox.setQuery(query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
