import axios from 'axios';
import * as fs from 'fs';
import * as https from 'https';
import { EventEmitter } from 'events';

interface UserInterface {
    getAvatar(userId: number): any;
    deleteAvatar(userId: number): void;
    getUsers(nextPage: number): void;
}

export default class User extends EventEmitter implements UserInterface {

    saveImageToDisk(url: string, localPath: string) {

        var file = fs.createWriteStream(localPath);
        https.get(url, function (response) {
            response.pipe(file);
        });
    }
    getAvatar(userId: number) {

        fs.exists('./images/' + userId + '.png', (exists) => {

            if (exists) {
                console.log('test3');
                var file = fs.readFileSync('./images/' + userId + '.png', 'base64');
                this.emit("fileavatar", file);
            }
            else {
                axios.get('https://reqres.in/api/users/' + userId).then((responseAvatar) => {
                    //base64Data = responseAvatar.data.replace( /^data:image\/png;base64,/, "" );
                    console.log(responseAvatar.data.data);
                    this.saveImageToDisk(responseAvatar.data.data.avatar, "./images/" + userId + ".png")
                    console.log('test4');
                    var file = fs.readFileSync('./images/' + userId + '.png', 'base64');
                    this.emit("fileavatar", file)
                }).catch((error) => {
                    console.log(error);
                    this.emit("fileavatar", false);
                });

            }
        });
    }

    deleteAvatar(userId: number) {
        fs.unlink('./images/' + userId + '.png', (err) => {
            if (err) {
                this.emit("avatardeleted", false);
                return false;
            }
            else {
                this.emit("avatardeleted", true)
                return true;
            }
        });
    }
    getUsers(nextPage: number) {
        axios.get('https://reqres.in/api/users?page=' + nextPage)
            .then((users) => {
                //fs.readFile()
                fs.readFile('./users.json', 'utf8', function (err, data) {
                    var json = JSON.parse(data);
                    console.log(users.data.data);
                    json = [...json, ...users.data.data];
                    fs.writeFile("./users.json", JSON.stringify(json), function (err) {
                        if (err) {
                            return false;
                        }
                        else {
                            console.log('The "data to append" was appended to file!');
                            return true;
                        }

                    });
                });
            })
            .catch((error) => {
                return false;
            });
    }
}


