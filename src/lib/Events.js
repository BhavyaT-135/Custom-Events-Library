const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();

class Events {

    logTriggerEvent(eventName, eventType='trigger') {
        const url = process.env.MONGO_URL;
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                console.error(err);
                return;
            }
            const db = client.db('<database>');
            const collection = db.collection('<collection>');
            collection.insertOne({ event: eventName, type: eventType, triggerTime: Date.now() }, (err) => {
                if (err) {
                console.error(err);
                }
                client.close();
            });
        }); 
    }
    
    printTriggerEvent(eventName, eventType='trigger') {
        fs.appendFile('app.log', `event --> ${eventName} ${eventType} ${moment().format('DD-MM-YYYY hh:mm:ss')}\n`, (err) => {
        if (err) {
            console.error(err);
        }
        });
    }

    constructor() {
        this.events = {};   
    }

    // Register an event handler
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    // Trigger all callbacks associated
    // with a given eventName
    trigger(eventName) {
        if (this.events[eventName]) {
            for (const callback of this.events[eventName]) {
                callback();
            }
            this.logTriggerEvent(eventName, 'trigger');
            this.printTriggerEvent(eventName, 'trigger');
        }
    }


    // Remove all event handlers associated
    // with the given eventName
    off(eventName) {
        delete this.events[eventName];
        this.logTriggerEvent(eventName, 'off');
        this.printTriggerEvent(eventName, 'off');
    }
}

module.exports = Events;