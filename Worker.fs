// Module and import declarations
module Worker
open Fable.Core
open Fable.Core.JS

open Browser.Types
open Fetch

type [<AllowNullLiteral>] FetchEvent =
  inherit Event
  abstract request: Request with get, set
  abstract respondWith: response: U2<Promise<Response>, Response> -> Promise<Response>

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
        let txt = sprintf "Hello from Fable Conf at: %A" System.DateTime.Now
        return newResponse txt "200"}


// Register a listner for the ServiceWorker 'fetch' event. That listner
// will extract the request and dispath it to the request handler.
addEventListener (fun (e:FetchEvent) ->
    e.respondWith (U2.Case1 (handleRequest e.request)))
