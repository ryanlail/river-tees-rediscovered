'use strict';

class SculptureImage{
    constructor(src, element, endpoint){
        this._src = src;
        this._element = element; 
        this._endpoint = endpoint;
        this._element.src = this._src;
    }


    refreshStatic(src){
        this._src = src;
        this._element.src = this._src;
    }

    async refreshDatabase(idToken, sculptureID){
        let api = true;
        let success = await fetch(this._endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'idToken='+idToken+'&sculptureID='+sculptureID
        }).catch(() =>{
            alert('Could not connect to the server');
            api = false;
        });
        if(!api) return;
        if(success.ok) {
            let fileBlob = await success.blob();
            let fileURL = URL.createObjectURL(fileBlob);
            this._src = fileURL;
            this._element.src = this._src;
        }else {
            let successMessage = await success.json();
            alert(successMessage.data);
        }
    }
}