/// <reference types="node" />
import { EventEmitter } from 'events';
interface UserInterface {
    getAvatar(userId: number): any;
    deleteAvatar(userId: number): void;
    getUsers(nextPage: number): void;
}
export default class User extends EventEmitter implements UserInterface {
    saveImageToDisk(url: string, localPath: string): void;
    getAvatar(userId: number): void;
    deleteAvatar(userId: number): void;
    getUsers(nextPage: number): void;
}
export {};
