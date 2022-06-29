// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp();

const colors: []  = []


app.get("/",async (req) => {

    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html; charset=UTF-8",
      }),
      body: ReactDOMServer.renderToString(
        <html>
          <head>
            <meta charSet="utf-8" />
            <title>Desafio-21</title>
          </head>
          <body style={{backgroundColor:'#000000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <form action="/" method="post" style={{marginTop:'50px'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>   
                    <input type="color" style={{width:'100px'}} name="color" required placeholder="ingresar color en inglés"/>
                    <button style={{height:'27px'}}>agregar</button>
                </div>
            </form>
            <ul>
              {colors.length > 0 && colors.map((color, index) => (
                <li key={index} style={{color, textShadow:'0 0 1px white', fontSize:'2rem'}}>{color}</li>
              ))}
            </ul>
          </body>
        </html>,
      ),
    })});


    app.post('/',  async (req) => {
        const formBody = await req.formData();
        const color = formBody.value("color")
        colors.push(color)
        req.redirect('/')
    });




app.listen({ port: 8080 });