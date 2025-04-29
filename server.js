const fs = require('fs') // for reading the html pages to be served
// We'll be creating a simple server that serves a static html file
const http = require('http') // for the server creation
const path = require('path')  // for getting paths

// Important:- This is all just for learning, as, using express we'll be aable to create servers pretty easily and serve the files with ease too. 


const port = 3000 // let it be 3000


const server = http.createServer((req,res)=>{
    // All of the process of binding the request and giving us the output depends on the libuv part of the server, that we'll have in the diagram.
    
    const url_name = req.url
    let filePath

    // This if-else part is just to ensure that whether the use types:- /about or, /about.html, it takes us to the about page itself.
    if(String(url_name).includes('.html'))
        {
            // let us now use the path for getting the path name given by the user to diplay that page accordingly
            filePath = path.join(__dirname,req.url === "/"  ? "index.html" : req.url) // Imp:- __dirname has the name of the current directory.
            // The line above is like, if path is:- <pwd>/, then, index.html is to be served, else the <pwd>/req.url(we've about.html and contact.html), those can be served accordingly.           
        }

        
    else{
            let pathExt = String(req.url).concat(".html")
            filePath = path.join(__dirname, req.url === "/" ? "index.html" : pathExt)
        }

        
    const extensionName = String(path.extname(filePath)).toLowerCase() // This is the name of our extension i.e, if we've abc.html, it'll return .html.
    console.log(extensionName);
    
    
    const mimeTypes = {  // mimeTypes means the type of files that we want to be supported.
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javscript',
        '.png' : 'text/png'
    } // Note:- We have these things pre-defined in the documentation, the set of type of files that can be supported, and, these 4 aren't all of those, these are just the 4 of those all.
 
    const contentType = mimeTypes[extensionName]  || 'application/octet-stream'  // Note:- This 'application/octet-stream' is a generic file type suppoerted everywhere.

    // So, the path and everything is ready, but, we need to read the file to, using fs.readFile
    
    fs.readFile(filePath, (err, content)=>{  
        // Note:- While working with express or Next, this is not the scenario, but here the thing is that as here we're buidling our own server, so, for reading the file, we need to look out for the error first.
        if(err){
            if(err.code === "ENOENT") // This is file not find thing
            {
                res.writeHead(404, {"content-type":"text/html"})
                res.end('<body style="background-color:#1a1a1a; color:#fff"><h1 style = "text-align:center;">404 : File not found bruh</h1></body>')
                // And, this, Mr. Anshu, is how we write a custom 404 error code using node.
                
            }
        }
        else{
            // Note:- Both req and res have two parts and those are Head and Content.
            // Head is like the metaData(status code, content type) and Content(mabye, the email, password, cookies and what not) is where we'll be reading the real stuff.  
            res.writeHead(200, 
                {'content-type': contentType})  // We have defined the contentType above.

            // The res that the createServer gives us.
            res.end(content, 'utf-8')
           // .end() for sharing the content 
        }

    })

}) // req => request and res => response


// Steps to serve:-
// Step - 1 :- Getting the url and adding it(as a suffix) to the current directory.  
// Step - 2 :- Getting the extensionName for having it matched with the mimeType, for the format of the page which is to be served. Eg:- 'text/html'
// Step - 3 :- Using the readfile of fs to serve the file finally, and here we need to handle the error first(we've many errors, but here in this example of ours, we only have to look out for file not found error!) 

server.listen(port, ()=>{
    console.log(`Server is listening on the port:- localhost:127.0.0.1.${port}`);
    
})