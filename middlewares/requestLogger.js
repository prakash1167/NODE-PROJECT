const requestLogger = (req, res, next) => {
    console.log('\n<==============');
    console.log('inside requestLogger middleware...');
    let url = `${req.headers.host}${req.originalUrl}`;
    console.log(`url: ${url}`);
    console.log(`http method: ${req.method}`);
    if(req.method == "POST") {
        console.log(`payload: ${JSON.stringify(req.body)}`);
    }
    console.log(`cookie: ${JSON.stringify(req.cookies)}`);
    next();
};

module.exports = requestLogger;