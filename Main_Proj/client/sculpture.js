'use strict';

const url = new URL(document.location);
const sculptID = url.searchParams.get('sculptID');
if(!isNaN(sculptID) && sculptID !== undefined && sculptID != null){
  initDoc().catch();
}

async function initArtist(artistID){
  let artData = (await(await fetch('/getArtist?artistID='+artistID)).json().catch(() => {
  return;
})).data;
  document.getElementById('artistName').innerHTML = artData[0].Forename + ' ' + artData[0].Surname;
}


async function initTrailInfo(trailID){
  let trailData = (await(await fetch('/getTrail?trailID='+trailID)).json().catch(() => {
  return;
})).data;
  document.getElementById('trail').innerHTML = 'Located on the ' + trailData[0].Name + ' trail';
}


async function initMapInfo(trailID){

}


async function initDoc() {
  let data = (await(await fetch('/getSculpture?sculptureID='+sculptID)).json().catch(()=>{
      return;
  })).data;
  document.getElementById('sculptTitle').innerHTML = data[0].Title;
  document.getElementById('sculptText').innerHTML = data[0].Description;
  document.getElementById('trailD').setAttribute('href', './trailDocs/Trail'+data[0].TrailID+'SculptureTrail.pdf');
  document.getElementById('heritageD').setAttribute('href', './trailDocs/Trail'+data[0].TrailID+'HeritageTrail.pdf');
  // add phto for sidebar
  initArtist(data[0].ArtistID);
  initTrailInfo(data[0].TrailID);

}
