export declare class UserWithoutPassword {
    id: number;
    username: string;
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
}
export declare class UserM extends UserWithoutPassword {
    password: string;
}
