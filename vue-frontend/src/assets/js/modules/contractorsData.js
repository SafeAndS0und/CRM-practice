export const dictionary = [
    {
        kind: 'basic',
        data: [
            {eng: 'name', pl: "Nazwa"},
            {eng: 'number', pl: "Numer"},
            {eng: 'trade', pl: "Branża"},
            {eng: 'creationTime', pl: "Czas Utworzenia"},
            {eng: 'recordOwner', pl: "Właściciel"},
        ]
    },

    {
        kind: 'contact',
        data: [
            {eng: 'basicPhone', pl: "Telefon podstawowy"},
            {eng: 'additionalPhone', pl: "Telefon dodatkowy"},
            {eng: 'basicEmail', pl: "Email podstawowy"},
            {eng: 'additionalEmail', pl: "Email dodatkowy"},
            {eng: 'webpage', pl: "Strona Internetowa"},
            {eng: 'fax', pl: "Fax"},
            {eng: 'canContactViaEmail', pl: "Zgoda na kont. mail."},
            {eng: 'canContactViaPhone', pl: "Zgoda na kont. tel."},
        ]
    },

    {
        kind: 'registration',
        data: [
            {eng: 'nip', pl: "NIP"},
            {eng: 'krs', pl: "KRS"},
            {eng: 'regon', pl: "Regon"},
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