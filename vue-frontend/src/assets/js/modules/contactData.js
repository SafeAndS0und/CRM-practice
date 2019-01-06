
export const values = {
    basic: [],
    contact: [],
    address: []
}
export const dictionary = {
    firstname: "Imię",
    surname: "Nazwisko",
    number: "Numer",
    business: "Firma",
    creationTime: "Czas Utworzenia",
    recordOwner: "Właściciel",

    basicPhone: "Telefon podstawowy",
    additionalPhone: "Telefon dodatkowy",
    basicEmail: "Email podstawowy",
    additionalEmail: "Email dodatkowy",
    skype: "Skype",
    canContactViaEmail: "Zgoda na kont. mail.",
    canContactViaPhone: "Zgoda na kont. tel.",

    street: "Ulica",
    buildingNumber: "Nr budynku",
    apartmentNumber: "Nr lokalu",
    postCode: "Kod pocztowy",
    city: "Miasto",
    voivodeship: "Województwo",
    country: "Kraj"
}
export const blackList = ['number', 'creationTime', 'recordOwner', "Numer", "Czas Utworzenia", "Właściciel"]
export default {
    fields: {
        basic: ["Numer", "Imię", "Nazwisko", "Firma", "Czas Utworzenia", "Właściciel"],
        contact: ["Telefon podstawowy", "Telefon dodatkowy", "Email podstawowy", "Email dodatkowy",
            "Skype", "Zgoda na kont. mail.", "Zgoda na kont. tel."],
        address: ["Ulica", "Nr budynku", "Nr lokalu", "Kod pocztowy", "Miasto", "Województwo", "Kraj"]
    },
    controllers: {
        assignBasicValues({firstname, surname, number, business, creationTime, recordOwner}){
            const arr = [
                {f: "Imię", v: firstname},
                {f: "Nazwisko", v: surname},
                {f: "Numer", v: number},
                {f: "Firma", v: business},
                {f: "Czas Utworzenia", v: creationTime},
                {f: "Właściciel", v: recordOwner},
            ]
            values.basic = [].concat(arr)

        },
        assignContactValues({basicEmail, basicPhone, additionalEmail, additionalPhone, skype, canContactViaEmail, canContactViaPhone}){
            const arr = [
                {f: "Telefon podstawowy", v: basicPhone},
                {f: "Telefon dodatkowy", v: additionalPhone},
                {f: "Email podstawowy", v: basicEmail},
                {f: "Email dodatkowy", v: additionalEmail},
                {f: "Skype", v: skype},
                {f: "Zgoda na kont. mail.", v: canContactViaEmail},
                {f: "Zgoda na kont. tel.", v: canContactViaPhone}
            ]
            values.contact = [].concat(arr)
        },
        assignAddressValues({street, postCode, buildingNumber, city, country, voivodeship, apartmentNumber}){
            const arr = [
                {f: "Ulica", v: street},
                {f: "Nr budynku", v: buildingNumber},
                {f: "Nr lokalu", v: apartmentNumber},
                {f: "Kod pocztowy", v: postCode},
                {f: "Miasto", v: city},
                {f: "Województwo", v: voivodeship},
                {f: "Kraj", v: country}
            ]
            values.address = [].concat(arr)
        }
    },
    activateControllers(contactData){
        this.controllers.assignBasicValues(contactData)
        this.controllers.assignContactValues(contactData)
        this.controllers.assignAddressValues(contactData)
    }
}