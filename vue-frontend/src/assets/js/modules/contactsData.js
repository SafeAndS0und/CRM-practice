export const dictionary = [
    {
        kind: 'basic',
        data: [
            {eng: 'firstname', pl: "Imię"},
            {eng: 'surname', pl: "Nazwisko"},
            {eng: 'number', pl: "Numer"},
            {eng: 'business', pl: "Firma"},
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
            {eng: 'skype', pl: "Skype"},
            {eng: 'canContactViaEmail', pl: "Zgoda na kont. mail."},
            {eng: 'canContactViaPhone', pl: "Zgoda na kont. tel."},
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
