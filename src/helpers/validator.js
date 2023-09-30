class validator {
    static validateTaskInfo(taskInfo, taskData) {
      if(
        taskInfo.hasOwnProperty("id") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("completed")
         && this.validateUniquetaskId(taskInfo, taskData)) {
          return {
            "status": true,
            "message": "task has been added"
          };
        }
        if(!this.validateUniquetaskId(taskInfo, taskData)){
          return {
            "status": false,
            "message": "task id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "task Info is malformed please provide all the properties"
        }
    }

    static validateTaskUpdateInfo(taskInfo) {
        if(
          taskInfo.hasOwnProperty("title") &&
          taskInfo.hasOwnProperty("description") &&
          taskInfo.hasOwnProperty("completed")) {
            return {
              "status": true,
              "message": "task has been updated"
            };
          }
          return {
            "status": false,
            "message": "task Info is malformed please provide all the properties"
          }
      }
  
    static validateUniquetaskId(taskInfo, taskData) {
      let valueFound = taskData.some(task => task.id === taskInfo.id);
      if(valueFound) return false;
      return true;
    }
  
    static validateTaskCompleted(completed) {
      if(completed.hasOwnProperty("completed")) {
        return true;
      }
      return false;
    }
  }
  
  module.exports = validator;