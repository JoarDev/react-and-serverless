const {table, getHighScores} = require("./utils/airtable")
const {getAccessTokensFromHeaders, validateAccessToken} = require("./utils/auth")

exports.handler = async (event) => {

    const token = getAccessTokensFromHeaders(event.headers)
    const user = await validateAccessToken(token)
    if(!user){
        return {
            statusCode: 401,
            body: JSON.stringify({error:"Unauthorized"})
        }
    }

    if(event.httpMethod !== "POST"){
        return {
            statusCode: 405,
            body: JSON.stringify({error:"Method not allowed"})
        }
    }
    const {score} = JSON.parse(event.body)
    const name = user["https://randomprefix/username"]
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