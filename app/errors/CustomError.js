
class CustomError extends Error{
    constructor(message, status){
        super(message)      //calls parent Error contructor to set message

        this.status = status;
        this.isCustom = true;   //flag to identify if an error is a custom error
    }
}

module.exports = CustomError;