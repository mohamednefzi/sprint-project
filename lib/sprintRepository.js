const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Sprint = require("../models/sprint");

class SprintRepository {


  //method 1 get all sprints
  getAllSprints(callback) {
    console.log("SprintRepository.getAllSprints");
    Sprint.count((err, sprintCount) => {
      let count = sprintCount;
      console.log(`sprint count ${count}`);
      Sprint.find({}, (error, sprintList) => {
        if (error) {
          console.log(`SprintRepository.getAllSprints : error ${error}`);
          return callback(error);
        }
        callback(null, { count: count, sprintList: sprintList });
      });
    });
  }

  // insert new sprint
  insertNewSprint(body, callback){
    console.log("SprintRepository.insertNewSprint");
    console.log(body);
    let sprint = new Sprint();
    sprint.idUser = body.idUser;
    sprint.length= body.length;
    sprint.status= body.status;
    sprint.date= body.date;
    sprint.start= body.start;
    sprint.finish= body.finish;
    sprint.description= body.description;
    sprint.save((err, sprint) => {
      if(err){
        console.log('insert sprint error : ', err);
        return callback(err, null);
      }
      callback(null, sprint);
    })
  }

  deleteData(callback){
    console.log('sprint repo delete start method');
    Sprint.remove({}, (err, sprint) =>{
      if(err){
        console.log('sprints delete error',err);
        return callback(err,null)
      }
      return callback(null,true);
    })

  }
}

module.exports = new SprintRepository();
