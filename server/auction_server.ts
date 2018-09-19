import * as express from 'express';
import * as fs from 'fs'; //文件模块
import * as path from 'path';
import {Server} from 'ws';
const app = express();
export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>
    ) {

    }
}

const products: Product[] = [
    new Product(1, '第一个商品', 1.99, 2.5, '这是第学习哈哈', ['电子', '电器']),
    new Product(2, '第二个商品', 2.99, 3.5, '这是第学习哈哈', ['电子', '电器']),
    new Product(3, '第三个商品', 3.99, 4.5, '这是第学习哈哈', ['硬件', '电器', '图书']),
    new Product(4, '第四个商品', 4.99, 2.5, '这是第学习哈哈', ['电子', '毛坯']),
    new Product(5, '第五个商品', 5.99, 1.5, '这是第学习哈哈', ['软件', '电器']),
    new Product(6, '第六个商品', 6.99, 3.5, '这是第学习哈哈', ['电子', '富华']),
    new Product(7, '第七个商品', 7.99, 7.5, '基督教', ['风景', '富华'])
];

//allow custom header and CORS
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});


app.post('/user/login',(req, res) => {
    //读取json文件
    let file = path.join(__dirname, '../data/user.json'); //文件路径，__dirname为当前运行js文件的目录
    console.log(file);
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            console.log(err)
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
});

app.get('/api/products', (req, res) => {
    res.json(products);
});
app.get('/api/product/:id', (req, res) => {
    res.json(products.find((product) => product.id == req.params.id));
});
const server = app.listen(8000, 'localhost', () => {
    console.log("服务器已启动，地址是：http://localhost:8000");
});

/*
const wsServer = new Server({port:8085});
wsServer.on("connection", websocket => {
   websocket.send("这个消息是服务器主动推送的");
   websocket.on("message", message => {console.log(message)})

});
*/

/*
setInterval(() => {
    if(wsServer.clients){
        wsServer.clients.forEach((client) => {client.send("这是定时推送")})
    }
},3000);*/
