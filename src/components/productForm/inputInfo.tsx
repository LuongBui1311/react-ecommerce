interface InputInfo {
    label?: string,
    name: string,
    hint: string,
    type?: string,
}

export const inputInfo: InputInfo[] = [
    {
        label: 'Product name',
        name: 'name',
        hint: 'Product name'
    },
    {
        label: 'Base price',
        name: 'basePrice',
        hint: 'Base price'
    },
    {
        label: 'Discount',
        name: 'discountPercentage',
        hint: 'Discount'
    },
    {
        label: 'Stock',
        name: 'stock',
        hint: 'Stock'
    },
    {
        label: 'Description',
        name: 'description',
        hint: 'Description'
    },
];