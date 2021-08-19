const repository = require('../data/champions.repository');


exports.getChampion = (request, response) => {
    let region = request.query.region;
    let championKey = request.query.key
    if(region && championKey){
        return repository.getChampion(championKey,region).then((champion) => {
            response.status(200).send(champion);
        }, (err) => {
            response.status(200).send({status:"erro",message:err});        });
    }else{
        response.status(200).send({status:"erro",message:"erro parâmetros"});
    }
}

exports.getFreeChampions = (request, response) => {
    // response.status(200).send("Coming soon");
    return repository.getFreeChampionsRotation().then((champion) => {
        response.status(200).send(champion);
    }, (err) => {
        //TODO: champion nao encontrado
    });
    // repository.getFreeChampionsRotation
    // response.status(200).send("chegou bem ");
}