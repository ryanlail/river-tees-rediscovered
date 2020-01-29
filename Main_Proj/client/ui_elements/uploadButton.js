'use strict';

class UploadButton {


    init(visible, hidden, image, sculptureID, endpoint) {
        hidden.addEventListener('change', async function(){
            let data = new FormData();
            data.append('idToken', currentUser.getAuthResponse().id_token);
            data.append('sculptureID', sculptureID);
            data.append('picture', hidden.files[0]);
            let api = true;
            let success = await fetch(endpoint,{
                method: 'POST',
                body: data
            }).catch(() => {
                alert('Failed to upload image to the server');
                api = false;
            });
            if(!api) return;
            let successMessage = await success.json();
            alert(successMessage.data);
            if(success.ok) {
                image.refreshDatabase(currentUser.getAuthResponse().id_token, sculptureID);
            }
        });
        visible.addEventListener('click', async function(){
            hidden.click();
        });

    }

}