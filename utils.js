var axios = require( 'axios' );
var fs = require( 'fs' );
class User {
    async getAvatar( userId ) {
        try {
            let base64Data;
            if ( fs.exists( './images/' + req.params.userId + '.png' ) ) {
                fs.readFile( './images/' + userId + '.png', ( err, data ) => {
                    if ( err )
                        return false;
                    else {
                        base64Data = data.replace( /^data:image\/png;base64,/, "" );
                    }

                } );
            }
            else {
                const responseAvatar = await axios.get( 'https://reqres.in/api/users/' + userId + '/avatar' );
                base64Data = responseAvatar.replace( /^data:image\/png;base64,/, "" );
            }

            return base64Data;
        }
        catch ( error ) {
            return false;
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
            json.push( users );
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