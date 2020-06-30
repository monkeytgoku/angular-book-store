export interface Roles {
    customer: boolean;
    admin?: boolean;
}

export class AppUser {
    authUserId: string;
    name: string;
    email: string;
    mobile: string;
    roles: Roles;

    constructor(userId: string, email: string, name: string, mobile: string) {
        this.authUserId = userId;
        this.email = email;
        this.name = name;
        this.mobile = mobile;
        this.roles = { customer: true };
    }
}
