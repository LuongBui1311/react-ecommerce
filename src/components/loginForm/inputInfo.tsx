interface InputInfo {
    name: string,
    hint: string,
    type?: string,
}

export const inputInfo : InputInfo[] = [
    {
        name: 'email',
        hint: 'Email',
    },
    {
        name: 'password',
        hint: 'Password',
        type: 'password',
    }
];