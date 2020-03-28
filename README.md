# Software Engineering Group Project
Passport system produced for River Tees Rediscovered by Group 20

# Usage
This project is not yet publicly hosted as hosting choices have not yet been made by the client, hence it is not yet available on the web. These instructions will guide you on how to lauch the web-server and database server locally.

## Hosting

### Database Server
There is a file in in the `Main_Proj` directory called `Cpvzm85_RTR.sql`. This file can be imported into any mySQL server database program of your choice. Here are the instructions for XAMPP running on linux:

1. Visit <https://www.apachefriends.org/index.html> and download the installer for linux
2. Change the permissions of the .run file that is downloaded to allow execution
3. Run the installer as administrator
4. Once installed run `sudo /opt/lampp/lampp start` from the command line
5. visit `localhost` on the web browser and select php my admin on the top of the page
6. Create a new database called `Cpvzm85_RTR.sql` and select it
7. Click on the import tab with the new database selected
8. upload`Main_Proj/Cpvzm85_RTR.sql`


### Web Server
Note: This web-server is designed to run on a linux system, so it may not run properlly on a windows machine.

To launch the web-server navigate to the `Main_Proj` directory and (if it is the first launch), type `npm install` followed by `npm start`.

## Access
The website is now accesible on `localhost:8080` from your web browser.
