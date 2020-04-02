const connection = require('../database/connections');

module.exports = {
    async create(request, response){
        const{id} = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first()

        if(!ong){
            return response.status(400).json({error: "no ong found"})
        }

        return response.json(ong);
    }
}