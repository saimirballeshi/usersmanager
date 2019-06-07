import { Request, Response } from "express";
export declare let user: (req: Request, res: Response) => void;
export declare let getUserAvatar: (req: Request, res: Response) => void;
export declare let deleteuserAvatar: (req: Request, res: Response) => void;
export declare let cronGetUsers: () => void;
