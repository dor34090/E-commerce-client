import { rest } from "msw";
import {setupServer, } from "msw/node";
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";






const server = setupServer(
    rest.get("*", (req, res, context)=>{
        return res(
            context.status(200)
            
        )
    })
)

beforeAll(()=> server.listen());
afterAll(()=> server.close());
afterEach(()=> server.resetHandlers());


it("renders without crashing",  ()=>{
    //creating a div
    const div = document.createElement("div");
    //rendering the entire app in that div
    ReactDOM.render(<App/>, div);
    //unmounting the app once it successfully rendered (since it's a test case)
    ReactDOM.unmountComponentAtNode(div);
});