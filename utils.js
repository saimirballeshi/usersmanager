var axios = require( 'axios' );
var fs = require( 'fs' );
var https = require( 'https' );
var EventEmmiter = require( 'events' );
//Node.js Function to save image from External URL.

class User extends EventEmmiter {
    saveImageToDisk( url, localPath ) {
        var fullUrl = url;
        var file = fs.createWriteStream( localPath );
        var request = https.get( url, function ( response ) {
            response.pipe( file );
        } );
    }
    async getAvatar( userId ) {
        console.log( 'test' );
        try {
            fs.exists( './images/' + userId + '.png', ( exists ) => {
                console.log( 'test2' );
                if ( exists ) {
                    console.log( 'test3' );
                    var file = fs.readFileSync( './images/' + userId + '.png', 'base64' );
                    this.emit( "fileavatar", file );
                }
                else {
                    axios.get( 'https://reqres.in/api/users/' + userId ).then( ( responseAvatar ) => {
                        //base64Data = responseAvatar.data.replace( /^data:image\/png;base64,/, "" );
                        console.log( responseAvatar.data.data );
                        this.saveImageToDisk( responseAvatar.data.data.avatar, "./images/" + userId + ".png" )
                        console.log( 'test4' );
                        var file = fs.readFileSync( './images/' + userId + '.png', 'base64' );
                        this.emit( "fileavatar", file )
                    } )
                        .catch( ( error ) => {
                            console.log( error );
                            this.emit( "fileavatar", false );
                        } );

                }
            } );
        }
        catch ( error ) {
            console.log( error )
            this.emit( "fileavatar", false )
        }
    }
    deleteAvatar( userId ) {
        fs.unlink( './images/' + req.params.userId + '.png', ( err ) => {
            if ( err )
                return false;
            else
                return true;
        } );
    }
    async getUsers( nextPage ) {
        const users = await axios.get( 'https://reqres.in/api/users?page=' + nextPage );
        fs.readFile( './users.json', function ( err, data ) {
            var json = JSON.parse( data );
            console.log( users.data.data );
            json = [ ...json, ...users.data.data ];
            fs.writeFile( "./users.json", JSON.stringify( json ), function ( err ) {
                if ( err ) {
                    return false;
                }
                else {
                    console.log( 'The "data to append" was appended to file!' );
                    return true;
                }

            } );
        } )
    }
}

module.exports = User;