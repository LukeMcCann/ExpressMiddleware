# Express Middleware

While it may sound like a complex or ethereal concept, middleware is rather straight forward conceptually. The idea of middleware is to execute some code in between the controller action that sends the respinse and the server which gets the request from the client. 

In this project we first create very basic Node.js routes. This returns a simple Json response stating that we have successfully connected to our server.

Middleware can be thought of as functions which execute after the server receives a request, but befoe the controller action sends the response to the client. There are a few specific concepts which we have skimmed over within this process however. 

In Express middleware has access to the response (res) and the request (req) variables, allowing you to modify or use these parameters as necessary. Middleware functions also have a third parameter (next). Next is a function (next()), this is integral to middleware, it must be called from a middleware in order for the next middleware in the chain to be excuted. If next() is not called, then none of the other middleware, including the controller action itself, will be called. 

To implement middleware we must define a function which has these three parameters.

<pre>
<code>
    function loggingMiddleware(req, res, next) {
        
    }
</code>
</pre>

This gives us the basic shell of a middleware function, however, the application is not currently invoking this middleware. 

Express allows for a few different method when it comes to defining middleware to be used. In this example, we add middleware to the application level, this means that the middleware will execute before every single controller action.  This can be done via the use of the 'use()' method called from express() which we have conveniently stored in our app variable.

Middleware defined in this way is called in the order it is defined throughout the script. For instance, if we wanted to return a 404 when no other route is called, a simple way to do this would be to put call a app.use() at the end of our script which returns the content desired. 

<pre>
<code>
    app.use(loggingMiddleware);
</code>
</pre>

At this point the application is now using the defined middleware function, however, in order to work we must first add our call to next() into the function. 

<pre>
<code>
    function loggingMiddleware() {
        // log stuff
        next();
    }
</code>
</pre>

If we did not provide this call to next() the controller action would never be called, and our application would "hang" as it became stuck "loading" perpetually. 

## Middleware for specific routes

If we want to run middleware only for specific routes, we can define our middleware using a route. This will ensure that the middleware is only applied (and executed) on the specific route of which we have provided the middleware to. 

<pre>
<code>
    app.get('/users', authMiddleware, (req, res) => {
        res.sendFile(__dirname + '/users.html');
    });
</code>
</pre>

If we define the rest of the middleware function:

<pre>
<code>
    function authMiddleware(req, res, next) {
        req.query.admin ? next() : res.status(401).json({ status: 401, message: "You are not authorized to view this page."} );
    };
</code>
</pre>

Now, if we visit the /users route we must provide a query string parameter admin which must hold the value of true to access the page, if you do not have this you will see a 401 status Json response. 

## The power of modification

One of the most powerful aspects of middleware is the ability to send data between middleware. While there is no way to do this with the next function, it is possible to modify the req/res parameters to set customised data. For instance, if we wanted to set the admin variable to true, checking if a user was registered as an admin server side we could do so with:

<pre>
<code>
    function authMiddleware(req, res, next) {
        if (req.query.admin === 'true') {
            req.admin = true;
            next();
        } else {
            // error response
        }
    };
</code>
</pre>

In this we check if the query string provided for admin is equal to true, if it is we set the req value of admin to equal true. 

## Important notes on middleware

1. Controller actions are just like middleware - Controller actions are essentially middleware themselves, but with no other middleware being activated after they are called. They act as the end of the middleware chain, which is why we omit the next calls from the controller actions. 


2. Calling next is not the same as return - The next function does not actually return from the middleware function, this means that when next is called the enxt middleware will execute, this will continue until there is no more middleware left to execute, then after all middleware is done executing, the code will pick up where it left off from the previous functions within each middleware after the next() call. You can avoid the mistake of accidentally always returning an error to the user by returning when you call next();


<pre>
<code>
    function middleware(req, res, next) {
    if (req.valid) {
        return next()
    }
    res.send('Invalid Request')
    }
</code>
</pre>

3. Middleware is called in the order it is used - this means that if we define all of our middleware using app.use() the middleware will essentially execute in the order it is declared, however, if we pass this to a route, we need to take into account the order of which we pass the middleware to the route.

<pre>
<code>
    const express = require('express')
    const app = express()

    app.use(middlewareThree)
    app.use(middlewareOne)

    app.get('/', middlewareTwo, middlewareFour, (req, res) => {
    console.log('Inside Home Page')
    res.send('Home Page')
    })

    function middlewareOne(req, res, next) {
    console.log('Middleware One')
    next()
    }

    function middlewareTwo(req, res, next) {
    console.log('Middleware Two')
    next()
    }

    function middlewareThree(req, res, next) {
    console.log('Middleware Three')
    next()
    }

    function middlewareFour(req, res, next) {
    console.log('Middleware Four')
    next()
    }

    app.listen(3000, () => console.log('Server Started'))
</code>
</pre>

<pre>
    output:
        Middleware Three
        Middleware One
        Middleware Two
        Middleware Four
</pre>