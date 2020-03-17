'use strict';

const url = new URL(document.location);
const sculptID = url.searchParams.get('sculptID');
if(!isNaN(sculptID) && sculptID !== undefined && sculptID != null){
  initDoc().catch();
}

async function initArtist(artistID){
  try{
    let resp = await fetch('/getArtist?artistID='+artistID);
    if (!resp.ok) return;
    let artData = (await resp.json()).data;
    if (artData === undefined) return;
    document.getElementById('artistName').innerHTML = artData[0].Forename + ' ' + artData[0].Surname;
  } catch(err) {
    return;
  }
}


async function initTrailInfo(trailID){
  try{
    let resp = await fetch('/getTrail?trailID='+trailID);
    if (!res.ok) return;
    let trailData = (await resp.json()).data
    if (trailData === undefined) return;
    document.getElementById('trail').innerHTML = 'Located on the ' + trailData[0].Name + ' trail';
  }catch (err){
    return;
  }
}


async function initMapInfo(trailID){
  try{
    let resp = await fetch('/getCoords?trailID='+trailID);
    if (!resp.ok) return;
    let coords = (await resp.json()).data;
    document.getElementById('map').setAttribute('src', 'https://www.google.com/maps/d/u/2/embed?mid=1SNrHTWqSeCuKSpkuN2XsP4Ol4rUonUD1&z=11&ll=' + coords);
  }catch (err){
    return;
  }

}


async function initDoc() {
  try {
    let resp = await fetch('/getSculpture?sculptureID='+sculptID);
    if (!resp.ok) return;
    let data = (await resp.json()).data;
    document.getElementById('sculptTitle').innerHTML = data[0].Title;
    document.getElementById('sculptText').innerHTML = data[0].Description;
    document.getElementById('trailD').setAttribute('href', './trailDocs/Trail'+data[0].TrailID+'SculptureTrail.pdf');
    document.getElementById('heritageD').setAttribute('href', './trailDocs/Trail'+data[0].TrailID+'HeritageTrail.pdf');
    document.getElementById('sculptImg').setAttribute('src', './sculpturePhotos/Sculpture'+ sculptID+'.jpg');
    initArtist(data[0].ArtistID);
    initTrailInfo(data[0].TrailID);
    initMapInfo(data[0].TrailID);
    document.getElementById('passButton').setAttribute('href', '/index.html?sculptureID='+sculptID);
  } catch (err){
    return;
  }

}
