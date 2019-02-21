// Module and import declarations
module Worker
open Fable.Core
open Fable.Import.Browser
open Fable.Import.JS

// JS interop statements
[<Emit("addEventListener('fetch', $0)")>]
let addEventListener (e:FetchEvent->Promise<Response>) : unit = jsNative

[<Emit("new Response($0, {status: $1})")>]
let newResponse (a:string) (b:string) : Response = jsNative

//The worker code is here:
// Define a request handler which creates an an appropreate Response 
// and returns a Promise<Response>
let private handleRequest (req:Request) =
    promise {
        let txt = sprintf "Hello from the F# World at: %A" System.DateTime.Now
        return newResponse txt "200"}


// Register a listner for the ServiceWorker 'fetch' event. That listner
// will extract the request and dispath it to the request handler.
addEventListener (fun (e:FetchEvent) ->
    e.respondWith (U2.Case1 (handleRequest e.request)))
