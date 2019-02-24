// how to use:
// 1) import to your .js file
// 2) call Db.connect('db-url','db-name','db-name-of-collection') on top of the file
// 3) call Db.addOne(obj) to add obj in collection;
// 4) call Db.close() when close your app (example: process.on('exit', () => { Db.close(); }); )
// standart db-url:
// "mongodb://localhost:27017"

const MongoClient = require('mongodb').MongoClient;

class Db {
    static connect(url, dbName, collectionName) {
        const mongoClient = new MongoClient(url, {useNewUrlParser: true});
        mongoClient.connect((err, client) => {
            if (err) {
                console.log('!!! Error: cant connect to db !!!');
                console.log(err);
                return;
            };

            this.db = client.db(dbName);
            this.collection = this.db.collection(collectionName);
            this.client = client;

            console.log('---- connected to db ----');
        });
    }

    static close() {
        this.client.close();
        console.log('---- disconnected from db ----');
    }

    static addOne(obj) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(obj, (err, result) => {
                if (err) reject(err);
                resolve(result.ops[0]._id);
            });
        });
    }
}

module.exports = Db;