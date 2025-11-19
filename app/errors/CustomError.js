
class CustomError extends Error{
    constructor(message, status, type = "custom_error", field = null){
        super(message)      //calls parent Error contructor to set message

        this.status = status;
        this.type = type;
        this.field = field;
        this.isCustom = true;   //flag to identify if an error is a custom error
    }
}

module.exports = CustomError;