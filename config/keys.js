const { 
    NODE_ENV = "development",
} = process.env


module.exports = { 
    IN_PROD: NODE_ENV === "production",
    TESTING: NODE_ENV === "testing",
}