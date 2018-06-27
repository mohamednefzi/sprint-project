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
  insertNewSprint(body, state, callback){
    console.log("SprintRepository.getAllSprints");
    console.log(state);
    let sprint = new Sprint();
    sprint.idUser = '';
    sprint.length= '';
    sprint.status= '';
    sprint.date= '';
    sprint.start= '';
    sprint.finish= '';
    sprint.description= '';
    sprint.save((err, sprint) => {
      if(err){
        console.log('insert sprint error : ', err);
        return callback(err, null);
      }
      callback(null, sprint);
    })
  }
}

module.exports = new SprintRepository();
