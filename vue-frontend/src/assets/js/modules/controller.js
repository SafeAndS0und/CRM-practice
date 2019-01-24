export default {
    assignValues(dictionary, values){
        const dictionaryCopy = dictionary.slice()
        dictionary.forEach((kind, i) =>{
            kind.data.forEach((field, j) =>{
                dictionaryCopy[i].data[j].value =
                    Object.entries(values).find(pair => pair[0] === field.eng)[1]
            })
        })
        return dictionaryCopy
    },

    toSimpleObj(moduleData){
        const simpleObj = {}
        moduleData.forEach(kind => {
            kind.data.forEach(info => {
                simpleObj[info.eng] = info.value
            })
        })
        return JSON.parse(JSON.stringify(simpleObj))
    }
}