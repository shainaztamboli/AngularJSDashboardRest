/**
 * Created by shainazt on 2/4/2015.
 */
module.exports = function(app){

    require('../routes/organization.route.js')(app);
    require('../routes/project.route.js')(app);
    require('../routes/employee.route.js')(app);

    app.use('/api/*', function(req, res, next){
        res.json({'error':'No Such Service Present'}, 404);
    })

    app.use('*', function(req, res, next){
        res.send('<html><body><h1>404 Page Not Found</h1></body></html>');
    })


}