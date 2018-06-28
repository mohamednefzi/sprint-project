const sprintRepository = require('../../../lib/sprintRepository');

class SprintController {

  constructor(router){
    router.get('/',this.getAllSprints.bind(this));
    router.post('/',this.insertSprint.bind(this));
    router.delete('/',this.deleteSprints.bind(this));
  }

  getAllSprints(req,res){
    console.log('Sprint Controller.getAllSprints');
    sprintRepository.getAllSprints((err, data)=>{
      if(err){
        console.log('Sprint Controller.getAllSprints error: ', err);
        res.json(null);
      }else {
        console.log('Sprint Controller.getAllSprints ok:', data);
        res.json(data.sprintList);
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
        res.json({status: true, error: null, sprint: sprintData})
      }
    });
  }

  deleteSprints(req,res){
    console.log('sprint controller delete start');

    sprintRepository.deleteData((err) => {
      if(err){
        console.log('delete data sprint error',err);
        res.json({status: false});
      }
      console.log('delete data sprint ok');
      res.json({status: true});
    });
  }

}

module.exports = SprintController;
