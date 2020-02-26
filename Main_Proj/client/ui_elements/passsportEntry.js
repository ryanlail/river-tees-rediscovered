'use strict';



class PassportEntry {

    constructor(sculptureID, sculptureImage, uploadButton, textArea) {
        this._sculptureID = sculptureID;
        this._sculptureImage = sculptureImage;
        this._uploadButton = uploadButton;
        this._textArea = textArea;
    }


    init(visible, hidden, image, sculptureID, endpoint) {
        this._uploadButton.init(visible, hidden, image, sculptureID, endpoint);
    }

    refreshSculptureInfo(idToken){
        let api = true;
        let success = await fetch('/getSculpture?sculptureID='+this._sculptureID).catch(() => {
            api = false;
        });      
        if(!api)return;
        if(success.ok) {
            let body = await success.json();
            this._title = body[0];
            // getting sculpture info needs be discussed with team as to whether
            // we use static txt file and pull from that, or have DB entry
            this._artistID = body[1];
            this._trailID = body[2];
        }
    }

    refreshArtistInfo(idToken) {
        let api = true;
        let success = await fetch('/getArtist?artistID='+this._artistID).catch(() => {
            api = false;
        });      
        if(!api)return;
        if(success.ok) {
            let body = await success.json();
            this._artistName = body[0] + body[1];
        }
    }


    refreshTrailInfo(idToken) {
        let api = true;
        let success = await fetch('/getTrail?trailID='+this._trailID).catch(() => {
            api = false;
        });      
        if(!api)return;
        if(success.ok) {
            let body = await success.json();
            this._trailName = body[0];
        }
    }



    refresh(idToken) {
        sculptureImage.refreshDatabase(idToken, this._sculptureID);
        this.refreshSculptureInfo(idToken);
        this.refreshArtistInfo(idToken);
        this.refreshTrailInfo(idToken);
    }



    updateTextArea() {
        // front end formatting stuff needs to be done pretty basic but not sure how we want it yet
    }


}