import * as axios from 'axios';
import * as fs from 'fs';

interface UserInterface {
    getAvatar(userId: string): any;
    deleteAvatar(userId: string): boolean;
    getUsers(nextPage: number): void;
}

export class User implements UserInterface {

    getAvatar(userId: string) {
        fs.exists('./images/' + userId + '.png', (exists) => {
            if (exists) {
                fs.readFile('./images/' + userId + '.png', (err, data) => {
                    if (err)
                        return false;
                    else {
                        return data.replace(/^data:image\/png;base64,/, "");
                    }

                });
            }
            else {
                axios.request('https://reqres.in/api/users/' + userId + '/avatar').then((response) => {
                    return response.replace(/^data:image\/png;base64,/, "");
                }).catch((error) => {
                    return false;
                });
            }
        })
    }
    deleteAvatar(userId: string) {
        fs.unlink('./images/' + userId + '.png', (err) => {
            if (err)
                return false;
            else
                return true;
        });
        return false;
    }
    getUsers(nextPage: number) {
        axios.get('https://reqres.in/api/users?page=' + nextPage)
            .then((users) => {
                fs.readFile('./users.json', function (err, data) {
                    var json = JSON.parse(data);
                    json.push(users);
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


