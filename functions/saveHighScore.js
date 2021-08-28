const {table, getHighScores} = require("./utils/airtable")

exports.handler = async (event) => {
    if(event.httpMethod !== "POST"){
        return {
            statusCode: 405,
            body: JSON.stringify({error:"Method not allowed"})
        }
    }
    const {score,name} = JSON.parse(event.body)
    if(typeof score == "undefined" || typeof name == "undefined"){
        return {
            statusCode:400,
            body: JSON.stringify({error:"Bad request"})
        }
    }
    try{
        const records = await getHighScores(false)

        const lowestRecord = records[9]
        //console.log(lowestRecord)
        if(typeof lowestRecord.fields.score === "undefined" || score > lowestRecord.fields.score){
            const updateRecord = {
                id: lowestRecord.id,
                fields: {name,score},
            }
            await table.update([updateRecord])
            return {
                statusCode: 200,
                body: JSON.stringify(updateRecord)
            }
        }else{
            return {
                statusCode: 200,
                body: JSON.stringify({})
            }
        }

        
    }catch(error){
        return {
            statusCode: 500,
            body: JSON.stringify({
                err: "Failed to query record in Airtable"
            })
        }
    }
}