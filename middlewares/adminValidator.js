const adminValidator = (req, res, next) => {
    //
    console.log('inside admin validator');
    console.log('session: ' + JSON.stringify(req.session));
    if(req.session.useremail != undefined && req.session.useremail != '') {
        if(req.originalUrl.split('/')[1] === 'admin' && !req.session.isAdmin) {
            console.log('not an admin');
            res.status(401).send('Unauthorized access');
            return;
        }
        if(req.originalUrl.split('/')[1] !== 'admin' && req.session.isAdmin) {
            console.log('req is over written: ' + req.originalUrl);
            res.redirect('/admin/');
            return;
        }
    } else if(req.originalUrl != '/register') {
        res.redirect('/login');
        return;
    }
    next();
};

module.exports = adminValidator;