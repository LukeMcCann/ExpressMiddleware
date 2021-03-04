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