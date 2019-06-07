import { EventEmmiter } from 'events';
interface UserInterface {
    getAvatar(userId: string): any;
    deleteAvatar(userId: string): boolean;
    getUsers(nextPage: number): void;
}
export declare class User extends EventEmmiter implements UserInterface {
    saveImageToDisk(url: any, localPath: any): void;
    getAvatar(userId: string): void;
    deleteAvatar(userId: string): boolean;
    getUsers(nextPage: number): void;
}
export {};
