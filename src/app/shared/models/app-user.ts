export interface AppUser {
    $key: string;
    name: string;
    password?: string;
    email: string;
    isAdmin: boolean;
}
