"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var node_cron_1 = require("node-cron");
var user_1 = require("../models/user");
/* GET home page. */
exports.user = function (req, res) {
    var user = new user_1.default();
    user.getAvatar(req.params.userId);
    axios_1.default.get('https://reqres.in/api/users/' + req.params.userId)
        .then(function (response) {
        console.log(response.data.data);
        res.json(response.data.data);
    }).catch(function (error) {
        console.log(error);
        res.status(500).send('Error occured!');
    });
};
exports.getUserAvatar = function (req, res) {
    var user = new user_1.default();
    user.getAvatar(req.params.userId);
    user.on('fileavatar', function (data) {
        if (!data) {
            res.status(500).send('Error occured!');
        }
        else {
            res.send(data);
        }
    });
};
exports.deleteuserAvatar = function (req, res) {
    var user = new user_1.default();
    user.deleteAvatar(req.params.userId);
    user.on("avatardeleted", function (data) {
        if (!data) {
            res.status(500).send('Error occured!');
        }
        else {
            res.send("Avatar deleted");
        }
    });
};
exports.cronGetUsers = function () {
    var currentPage = 0;
    node_cron_1.schedule('* * * * *', function () {
        console.log('currentPageUsers:', currentPage);
        var user = new user_1.default();
        user.getUsers(currentPage);
        currentPage++;
    });
};
