interface UserInterface {
    getAvatar(userId: string): any;
    deleteAvatar(userId: string): boolean;
    getUsers(nextPage: number): void;
}
export declare class User implements UserInterface {
    getAvatar(userId: string): void;
    deleteAvatar(userId: string): boolean;
    getUsers(nextPage: number): void;
}
export {};
