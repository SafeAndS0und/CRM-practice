export const dictionary = [
    {
        kind: 'invoiceDetails',
        data: [
            {eng: 'contractor', pl: "Kontrahent"},
            {eng: 'status', pl: "Status"},
            {eng: 'postDate', pl: "Data Wystawienia"},
            {eng: 'dateOfImplementation', pl: "Data Realizacji"},
            {eng: 'paymentDeadline', pl: "Termin płatności"},
            {eng: 'paymentMethod', pl: "Forma Płatności"},
            {eng: 'bankAccount', pl: "Konto Bankowe"},
            {eng: 'signingPlace', pl: "Miejsce Wystawienia"},
        ]
    },

    {
        kind: 'details',
        data: [
            {eng: 'recordOwner', pl: "Właściciel"},
            {eng: 'number', pl: "Numer"},
            {eng: 'creationTime', pl: "Czas Utworzenia"},
        ]
    },

    {
        kind: 'describe',
        data: [
            {eng: 'description', pl: "Opis"},
            {eng: 'notes', pl: "Uwagi"},
        ]
    },

    {
        kind: 'address',
        data: [
            {eng: 'street', pl: "Ulica"},
            {eng: 'buildingNumber', pl: "Nr budynku"},
            {eng: 'apartmentNumber', pl: "Nr lokalu"},
            {eng: 'postCode', pl: "Kod pocztowy"},
            {eng: 'city', pl: "Miasto"},
            {eng: 'voivodeship', pl: "Województwo"},
            {eng: 'country', pl: "Kraj"}
        ]
    }
]

export const blackList = ['number', 'creationTime', 'recordOwner', "Numer", "Czas Utworzenia", "Właściciel"]