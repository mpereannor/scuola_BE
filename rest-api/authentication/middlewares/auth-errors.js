
//custom Errors
class BadRequest extends Error {
    constructor (message = "Bad Request") { 
        super(message)

        this.status = 400
    }
}

class Unauthorized extends Error { 
    constructor(message = "Unauthorized") { 
        super(message)

        this.status = 401
    }
}


//handlers 
const catchAsync = (handler ) => (...args) => handler(...args).catch(args[2]);