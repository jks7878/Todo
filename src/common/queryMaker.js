class QueryMaker {
    createSetClause(jsonObject) {
        let setClause = [];
    
        for(let key of Object.keys(jsonObject)) {
            let value = jsonObject[key];
            if(value && value != '') setClause.push(`${key} = '${value}'`);
        }
    
        return setClause.join(',');
    }

    createWhereClause(jsonObject) {
        let whereClause = [];
    
        for(let key of Object.keys(jsonObject)) {
            let value = jsonObject[key];
            if(value && value != '') whereClause.push(`${key} = '${value}'`);
        }
    
        return whereClause.join(' && ');
    }
}

module.exports = QueryMaker;
