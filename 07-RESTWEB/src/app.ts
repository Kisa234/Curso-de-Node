import http2 from 'http2';
import fs from 'fs';

const server =  http2.createSecureServer({
    
    key: fs.readFileSync('../server.key'),
    cert: fs.readFileSync('../server.crt'),

    }, (req, res) => {
    console.log(req.url);
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('<h1>Hello World</h1>');
    // res.end();
    // const data = {
    //     name: 'John Doe',
    //     age: 25,
    //     city: 'New York'
    // };
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end(JSON.stringify(data));

    if (req.url === '/') {
        const htmlfile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(htmlfile);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Page Not Found</h1>');
    }
    
    if (req.url?.endsWith('.css')) {
        res.writeHead(200, {'Content-Type': 'text/css'});
    } else if (req.url?.endsWith('.js')) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});