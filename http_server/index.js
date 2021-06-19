const http = require('http')
const fs = require('fs')

const render = (path, res)=>{
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err)
            res.writeHead(404)
            res.write('<h1>PAGE TIDAK DITEMUKAN</h1>')
        }else{
            res.write(data)
        }
        res.end()
    })
}

http.createServer((req,res)=>{
    res.writeHead(200,{
        'Context-Type': 'text/html',
    })
    const url = req.url
    switch(url){
        case '/home':
            render('./index.html', res)
            break
        case '/about':
            render('./about.html', res)
            break
        default:
            render('./notfound.html', res)
            break
    }
}).listen(3000, ()=>{
    console.log(`server listening to 3000`)
})