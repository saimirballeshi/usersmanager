import { Request, Response } from "express";
import * as fs from 'fs';
import axios from 'axios';
import { schedule } from 'node-cron';

import User from '../models/user';
/* GET home page. */
export let user = (req: Request, res: Response) => {
    const user = new User();
    user.getAvatar(req.params.userId);

    axios.get('https://reqres.in/api/users/' + req.params.userId)
        .then(function (response) {
            console.log(response.data.data);
            res.json(response.data.data);
        }).catch(function (error) {
            console.log(error);
            res.status(500).send('Error occured!');
        });
};
export let getUserAvatar = (req: Request, res: Response) => {
    const user = new User();
    user.getAvatar(req.params.userId);
    user.on('fileavatar', data => {
        if (!data) {
            res.status(500).send('Error occured!');
        }
        else {
            res.send(data);
        }
    });
};
export let deleteuserAvatar = (req: Request, res: Response) => {
    const user = new User();
    user.deleteAvatar(req.params.userId);
    user.on("avatardeleted", data => {
        if (!data) {
            res.status(500).send('Error occured!');
        }
        else {
            res.send("Avatar deleted");
        }
    });
};

export let cronGetUsers = () => {
    var currentPage = 0;
    schedule('* * * * *', () => {
        console.log('currentPageUsers:', currentPage);
        const user = new User();
        user.getUsers(currentPage);
        currentPage++;
    });
};

