// What the Fable REPL will generate from the Worker.fs file
import { now } from "fable-library/Date.js";
import { toText, printf } from "fable-library/String.js";
import { PromiseBuilder$$Run$$212F1D4B as PromiseBuilder$0024$0024Run$0024$0024212F1D4B, PromiseBuilder$$Delay$$62FBFDE1 as PromiseBuilder$0024$0024Delay$0024$002462FBFDE1 } from "fable-repl-lib/src/Promise";
import { promise } from "fable-repl-lib/src/PromiseImpl";

function handleRequest(req) {
  return PromiseBuilder$0024$0024Run$0024$0024212F1D4B(promise, PromiseBuilder$0024$0024Delay$0024$002462FBFDE1(promise, function () {
    const txt = toText(printf("Hello from Fable Conf at: %A"))(now());
    return Promise.resolve(new Response(txt, {
      status: "200"
    }));
  }));
}

addEventListener("fetch", function (e) {
  return e.respondWith(handleRequest(e.request));
});