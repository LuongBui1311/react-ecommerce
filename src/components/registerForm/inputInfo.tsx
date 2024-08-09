interface InputInfo {
    name: string,
    hint: string,
    type?: string,
}

export const inputInfo: InputInfo[] = [
    {
        name: 'name',
        hint: 'Name'
    },
    {
        name: 'email',
        hint: 'Email'
    },
    {
        name: 'address',
        hint: 'Address'
    },
    {
        name: 'password',
        hint: 'Password',
        type: 'password'
    },
    {
        name: 'confirmPassword',
        hint: 'Confirm Password',
        type: 'password'
    },
];