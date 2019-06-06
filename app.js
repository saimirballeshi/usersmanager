var express = require( 'express' );
var app = express();
var fs = require( 'fs' );
var axios = require( 'axios' );
var User = require( './utils' );
var cron = require( 'node-cron' );

// respond with "hello world" when a GET request is made to the homepage
app.get( '/api/user/:userId', function ( req, res ) {
    if ( !fs.exists( './images/' + req.params.userId + '.png' ) ) {
        const user = new User();
        user.getAvatar( req.params.userId );
    }
    axios.get( 'https://reqres.in/api/users/' + req.params.userId )
        .then( function ( response ) {
            res.send( JSON.stringify( response ) );
        } )
        .catch( function ( error ) {
            console.log( error );
            res.status( 500 ).send( 'Error occured!' );
        } );
} );

app.get( '/api/user/:userId/avatar', function ( req, res ) {
    const user = new User();
    let responseAvatar = user.getAvatar( req.params.userId );
    if ( !responseAvatar ) {
        res.status( 500 ).send( 'Error occured!' );
    }
    else {
        res.send( responseAvatar );
    }

} );

app.delete( '/api/user/:userId/avatar', ( req, res ) => {
    const user = new User();
    const reponseDelete = user.deleteAvatar( userId );
    if ( reponseDelete ) {
        res.send( "Avatar deleted" );
    }
    else {
        res.status( 500 ).send( 'Error occured!' );
    }
} );
var currentPage = 0;
cron.schedule( '* * * * *', () => {
    console.log( 'currentPageUsers:', currentPage );
    const user = new User();
    user.getUsers( currentPage );
    currentPage++;
} );
app.listen( 3000 );