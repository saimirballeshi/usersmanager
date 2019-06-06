"use strict";
exports.__esModule = true;
var axios = require("axios");
var fs = require("fs");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.getAvatar = function (userId) {
        fs.exists('./images/' + userId + '.png', function (exists) {
            if (exists) {
                fs.readFile('./images/' + userId + '.png', function (err, data) {
                    if (err)
                        return false;
                    else {
                        return data.replace(/^data:image\/png;base64,/, "");
                    }
                });
            }
            else {
                axios.get('https://reqres.in/api/users/' + userId + '/avatar').then(function (response) {
                    return response.replace(/^data:image\/png;base64,/, "");
                })["catch"](function (error) {
                    return false;
                });
            }
        });
    };
    User.prototype.deleteAvatar = function (userId) {
        fs.unlink('./images/' + userId + '.png', function (err) {
            if (err)
                return false;
            else
                return true;
        });
        return false;
    };
    User.prototype.getUsers = function (nextPage) {
        axios.get('https://reqres.in/api/users?page=' + nextPage)
            .then(function (users) {
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
        })["catch"](function (error) {
            return false;
        });
    };
    return User;
}());
exports.User = User;
