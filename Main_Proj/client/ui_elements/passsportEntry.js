'use strict';



class PassportEntry {

    constructor(sculptureID, textArea) {
        this._sculptureID = sculptureID;
        this._sculptureImage = new SculptureImage("", document.getElementById('image'+sculptureID), '/user/getPhoto');
        this._uploadButton = new UploadButton();
        this._textArea = textArea;
    }


    init(visible, hidden, endpoint) {
        this._uploadButton.init(visible, hidden, this._sculptureImage, this._sculptureID, endpoint);
    }

    async refreshSculptureInfo(){
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

    async refreshArtistInfo() {
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


    async refreshTrailInfo() {
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



    async refresh(idToken) {
        this._sculptureImage.refreshDatabase(idToken, this._sculptureID);
        this.refreshSculptureInfo();
        this.refreshArtistInfo();
        this.refreshTrailInfo();
    }



    updateTextArea() {
        // front end formatting stuff needs to be done pretty basic but not sure how we want it yet
    }


}
