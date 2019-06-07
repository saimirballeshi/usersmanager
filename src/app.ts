import * as express from 'express';
import * as userController from "./controllers/user";
const app = express();

app.get('/api/user/:userId', userController.user);
app.get('/api/user/:userId/avatar', userController.getUserAvatar);
app.delete('/api/user/:userId/avatar', userController.deleteuserAvatar);

userController.cronGetUsers();
app.listen(3000);