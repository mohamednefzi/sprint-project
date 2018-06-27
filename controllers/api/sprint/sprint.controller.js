const sprintRepository = require('../../../lib/sprintRepository');

class SprintController {

  constructor(router){
    router.get('/',this.getAllSprints.bind(this));
    router.post('/',this.insertSprint.bind(this));
  }

  getAllSprints(req,res){
    console.log('Sprint Controller.getAllSprints');
    sprintRepository.getAllSprints((err, data)=>{
      if(err){
        console.log('Sprint Controller.getAllSprints error: ', err);
        res.json(null);
      }else {
        console.log('Sprint Controller.getAllSprints ok:', data);
        res.json(data);
      }
    });
  }
  insertSprint(req,res){

    console.log('Sprint Controller.insertSprint');
    sprintRepository.insertNewSprint(req.body, (err, sprintData)=>{
      if(err){
        console.log('sprintRepository error : '+ err);
        res.json({status : false, error: 'Insert failed', sprint: null});
      }else{
        console.log('insert ok');
        res.json({status: true, error, sprint: sprintData})
      }
    });
  }

}

module.exports = SprintController;
