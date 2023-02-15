class QueryMaker {
    createSetClause(jsonObject) {
        let setClause = [];
    
        for(let key of Object.keys(jsonObject)) {
            let value = jsonObject[key];
            if(value && value != '') setClause.push(`${key} = '${value}'`);
        }
    
        return setClause;
    }
}

module.exports = new QueryMaker;
