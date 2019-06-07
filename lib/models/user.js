"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs = require("fs");
var https = require("https");
var events_1 = require("events");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.saveImageToDisk = function (url, localPath) {
        var file = fs.createWriteStream(localPath);
        https.get(url, function (response) {
            response.pipe(file);
        });
    };
    User.prototype.getAvatar = function (userId) {
        var _this = this;
        fs.exists('./images/' + userId + '.png', function (exists) {
            if (exists) {
                console.log('test3');
                var file = fs.readFileSync('./images/' + userId + '.png', 'base64');
                _this.emit("fileavatar", file);
            }
            else {
                axios_1.default.get('https://reqres.in/api/users/' + userId).then(function (responseAvatar) {
                    //base64Data = responseAvatar.data.replace( /^data:image\/png;base64,/, "" );
                    console.log(responseAvatar.data.data);
                    _this.saveImageToDisk(responseAvatar.data.data.avatar, "./images/" + userId + ".png");
                    console.log('test4');
                    var file = fs.readFileSync('./images/' + userId + '.png', 'base64');
                    _this.emit("fileavatar", file);
                }).catch(function (error) {
                    console.log(error);
                    _this.emit("fileavatar", false);
                });
            }
        });
    };
    User.prototype.deleteAvatar = function (userId) {
        var _this = this;
        fs.unlink('./images/' + userId + '.png', function (err) {
            if (err) {
                _this.emit("avatardeleted", false);
                return false;
            }
            else {
                _this.emit("avatardeleted", true);
                return true;
            }
        });
    };
    User.prototype.getUsers = function (nextPage) {
        axios_1.default.get('https://reqres.in/api/users?page=' + nextPage)
            .then(function (users) {
            //fs.readFile()
            fs.readFile('./users.json', 'utf8', function (err, data) {
                var json = JSON.parse(data);
                console.log(users.data.data);
                json = json.concat(users.data.data);
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
            .catch(function (error) {
            return false;
        });
    };
    return User;
}(events_1.EventEmitter));
exports.default = User;
