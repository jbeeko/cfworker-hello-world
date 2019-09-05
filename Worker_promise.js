// JavaScript implementation of a CloudFlare Worker. These always start by calling addEventListener
// for the 'fetch' event passing in a function that takes a FetchEvent and returns a Promise<Response>.
// Most CloudFlare examples use the 'async function ... ' syntax which is not supported by Fable.
// The promise based JavaScipt code that works in the local cloudworker runtime invoked with:
//     yarn cloudworker Worker.js
// is the following:



// Define a request handler which creates an an appropreate Response 
// and returns a Promise<Response>
function handleRequest (request) {
    return new Promise(function(resolve, reject) {
        resolve(new Response('Hello from the JS World!', {status: 200}))
    })
}

// Register a listner for the ServiceWorker 'fetch' event. That listner
// will extract the request and dispath it to the request handler.
addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})
