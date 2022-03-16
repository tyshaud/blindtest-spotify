/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

import {useState, useEffect} from 'react';


const apiToken = 'BQAjhAjZ7hfa1o8dirYXVKbgVMowKKTS-PMYwGFsrJ0uocIcQUxHjbJ1FxvIUoW-CZwZ-qElv-7RG5A8cpiDYPplYzgsJJF-c6Afe3V2FOWAuEq6lssQLbo1MQPULk5b7xP8Kl5AQ8MjpQfV96BTT4fnTRdL4Q';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const AlbumCover = (props) =>  {
  const src = props.currentTrack?.album?.images[0].url; // A changer ;)
  console.log(props.currentTrack);
  return (
      <img src={src} style={{ width: 400, height: 400 }} />
  );
}


const App = () => {
  const [text, setText] = useState('');
  const [tracks, setTracks] = useState(undefined);
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({undefined});
  const [previewUrl, setPreviewUrl] = useState('');
  
  useEffect(() => {
    setText('Bonjour');
    fetch('https://api.spotify.com/v1/me/tracks', {
  method: 'GET',
  headers: {
   Authorization: 'Bearer ' + apiToken,
  },
})
  .then(response => response.json())
  .then((data) => {
    setSongsLoaded(true);
    setTracks(data);
    let number = Math.floor(Math.random() * data.items.length);
    setCurrentTrack(data.items[number].track);
    setPreviewUrl(data.items[number].track.preview_url);
    console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
  })
  }, [])

  const nextTrack = function () {
    console.log(tracks);
    let number = Math.floor(Math.random() * tracks);
    setCurrentTrack(tracks?.items[number]?.track);
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        
        <p>{(!songsLoaded && <img src={loading} className="Loading-logo" alt="loading"/>)}</p>
        
      </header>
      <div className="App-images">

        <h5>{tracks?.items.length} chansons dans la bibliothèque</h5>
        <AlbumCover currentTrack={songsLoaded&&currentTrack}></AlbumCover>
        <Sound url={previewUrl} playStatus={Sound.status.PLAYING}/>

        {tracks?.items.map((element) => (
            <button id={element.track.id} onClick={() => {if (element.track.id==currentTrack.id) {swal('Bravo', 'Trop fort','success').then(nextTrack())} else {swal('Erreur', "C'est pas grave",'error')}}}>{element.track.name}</button>
          ))}
        <p>Il va falloir modifier le code pour faire un vrai Blindtest !!!</p>
      </div>
      <div className="App-buttons">
      </div>
    </div>
  );
}

export default App;
