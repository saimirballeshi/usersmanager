var express = require( 'express' );
var app = express();
var fs = require( 'fs' );
var axios = require( 'axios' );
var User = require( './utils' );
var cron = require( 'node-cron' );

// respond with "hello world" when a GET request is made to the homepage
app.get( '/api/user/:userId', function ( req, res ) {
    fs.exists( './images/' + req.params.userId + '.png', ( exists ) => {
        console.log( exists );
        if ( !exists ) {
            const user = new User();
            user.getAvatar( req.params.userId );
        }
        else {
            console.log( 'exists' );
        }
    } );
    console.log( req.params );
    axios.get( 'https://reqres.in/api/users/' + req.params.userId )
        .then( function ( response ) {
            console.log( response.data.data );
            res.json( response.data.data );
        } )
        .catch( function ( error ) {
            console.log( error );
            res.status( 500 ).send( 'Error occured!' );
        } );
} );

app.get( '/api/user/:userId/avatar', function ( req, res ) {
    const user = new User();
    user.getAvatar( req.params.userId );
    user.on( 'fileavatar', data => {
        if ( !data ) {
            res.status( 500 ).send( 'Error occured!' );
        }
        else {
            res.send( data );
        }
    } );

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