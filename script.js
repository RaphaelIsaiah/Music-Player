// Declaring Variables
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
  },
];

// Song list to test the app quickly
// const allSongs = [
//   {
//     id: 0,
//     title: "Hello World",
//     artist: "Rafael",
//     duration: "0:23",
//     src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/hello-world.mp3",
//   },
//   {
//     id: 1,
//     title: "In the Zone",
//     artist: "Rafael",
//     duration: "0:11",
//     src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/in-the-zone.mp3",
//   },
//   {
//     id: 2,
//     title: "Camper Cat",
//     artist: "Rafael",
//     duration: "0:21",
//     src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/camper-cat.mp3",
//   },
//   {
//     id: 3,
//     title: "Electronic",
//     artist: "Rafael",
//     duration: "0:15",
//     src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/electronic.mp3",
//   },
//   {
//     id: 4,
//     title: "Sailing Away",
//     artist: "Rafael",
//     duration: "0:22",
//     src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/sailing-away.mp3",
//   },
// ];

// This will create a new HTML5 audio element
const audio = new Audio();

// This enables the music player keep track of the songs, the current song playing, and the time of the current song.
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

// Functionality to play displayed songs.
const playSong = (id) => {
  // This will iterate through the userData?.songs array, searching for a song that corresponds to the id passed in the playsong function.
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src; // this tells the audio element where to find the audio data for the selected song.
  audio.title = song.title; // this tells the audio element what to display as the title of the song.

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  // The optional chaining ?. method is not used here because userData.currentSong will not be null or undefined at this point.
  userData.currentSong = song;
  playButton.classList.add("playing");

  // Implementation of the song highlight functionality.
  highlightCurrentSong();

  // Implementation of the Player Display functionality.
  setPlayerDisplay();

  // Implementation of the aria-label attribute functionality.
  setPlayButtonAccessibleText();

  audio.play();
};

// Initialization of Pause Functionality.
const pauseSong = () => {
  // The current time of the song when it is paused is set to the current time of the audio variable.
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");

  audio.pause();
};

// Initialization of the Next functionality.
const playNextSong = () => {
  // This checks if there is no current song playing in the userData object.
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

// Initialization of the Previous functionality.
const playPreviousSong = () => {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
  }
};

// Initialization of the shuffle functionality.
// This function is responsible for shuffling the songs in the playlist and performing necessary state management updates after the shuffling.
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  // When the shuffle button is pressed, you want to set the currentSong to nothing and the songCurrentTime to 0.
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  // optional chaining is not used here because we are explicitly setting the properties of currentSong and songCurrentTime to null and 0 respectively.

  // We also should re-render the songs, pause the currently playing song, set the player display, and set the play button accessible text again.
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

// Initialization for Delete functionality.
const deleteSong = (id) => {
  //This condition checks if a song is currently playing before deleting it.
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  // This deletes the selected song from the playlist.
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  // You need to re-render the songs, highlight it and set the play button's accessible text since the song list will change.
  renderSongs(userData?.songs); // This displays the modified playlist.
  highlightCurrentSong(); // This highlights the current song if there is any.
  setPlayButtonAccessibleText(); // This update's the play button's accessible text.

  // This checks if the playlist is empty, if yes, it resets the userData to its original state --Reset Functionality
  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    // Adding the reset functionality to the reset button.
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
      // This resets the playlist to its original state.
      // optional chaining is not used here because the song will not be null or undefined at this point.

      renderSongs(sortSongs()); // Renders the songs again in alphabetical order.
      setPlayButtonAccessibleText(); // Updates the play button's accesssible text.
      resetButton.remove();
    });
  }
};

// Initialization of Player Display functionality.
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  // Using ternary operator to determine if currentTitle and currentArtist are truthy and then setting specific values to them based on the outcome.
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

// Initialization of highlighting current playing song.
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    // This will remove the attribute for each of the songs.
    songEl.removeAttribute("aria-current");
  });

  // This adds the aria attribute to the currently playing song
  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};

// This will display the songs in the User Interface (UI)
const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      // The deleteSong functionality is implemented here in the onclick attribute of the delete button
      return `
        <li id="song-${song.id}" class="playlist-song">
          <button class="playlist-song-info" onclick="playSong(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
          </button>
          <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="#4d4d62"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
            </svg>
          </button>
        </li>
      `;
    })
    .join("");

  // This will display songsHTML into the <ul> in the index.html
  playlistSongs.innerHTML = songsHTML;
};

// Initialization for aria-label attribute functionality.
const setPlayButtonAccessibleText = () => {
  // This enables us to get the currently playing song or the first song in the playlist.
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

// This will give the index of each song in the songs property of userData.
const getCurrentSongIndex = () =>
  userData?.songs.indexOf(userData?.currentSong);

// Adding the song playing functionality to the play button so it will play the current song when clicked on.
playButton.addEventListener("click", () => {
  // The condition here checks if userData?.currentSong is falsey.
  if (!userData?.currentSong) {
    playSong(userData?.songs[0].id);
    // This will ensure that the first song in the playlist is played first.
  } else {
    playSong(userData?.currentSong.id);
  }
});

// Implementation of Pause Functionality.
pauseButton.addEventListener("click", pauseSong);

// Implementation of the Next functionality.
nextButton.addEventListener("click", playNextSong);

// Implementation of the Previous functionality.
previousButton.addEventListener("click", playPreviousSong);

// Implementation of the Shuffle functionality.
shuffleButton.addEventListener("click", shuffle);

// Initialization and implementation for automatically playing the next song or...
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  // const nextSongExists = currentSongIndex < userData.songs.length - 1;
  // this checks the index directly against the array length minus 1.

  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
  // this uses optional chaining to access the next song and checks if it’s defined.
  // Both approaches achieve the same goal of determining whether a next song exists, but they use slightly different techniques.

  // This will make the next song play automatically when the current song ends else...
  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    // Calling these functions ensures the player is correctly updated.
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

// Functionality to alphabetically sort songs.
const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

// Calling the renderSongs here renders the songs in the playlist on the page.
renderSongs(sortSongs());
setPlayButtonAccessibleText();
