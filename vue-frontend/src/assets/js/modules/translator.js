export default function(dictionary, searchingFor){
    // Search if there is such an item in values of an dictionary
    const searchedValue = Object
        .values(dictionary)
        .find(i => i === searchingFor)

    return searchedValue ?
        //find a key that represents this value
        Object
            .keys(dictionary)
            .find(key => dictionary[key] === searchedValue) :
        //find a value by a key
        Object
            .values(dictionary)
            .find(value => dictionary[searchingFor] === value)
}
