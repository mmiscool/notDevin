import Datastore from 'nedb-promises';
import fs from 'fs';

const debugMode = false;

export class Database {
    constructor(filename) {
        // create the folder if it doesn't exist
        const folder = "../projectData/";
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);

        this.db = Datastore.create({ filename: "../projectData/" + filename, autoload: true });
        this.db.ensureIndex({ fieldName: '_id', unique: true });
        this.db.persistence.setAutocompactionInterval(2000)
    }

    async writeDocument(doc) {
        try {
            if (doc._id) {
                const existingDoc = await this.db.findOne({ _id: doc._id });
                if (existingDoc) {
                    const updatedDoc = await this.db.update({ _id: doc._id }, { $set: doc }, { returnUpdatedDocs: true });
                    if (debugMode) console.log("Document updated:", updatedDoc);
                    return;
                }
            }
            const newDoc = await this.db.insert(doc);
            if (debugMode) console.log("New document added:", newDoc);
        } catch (err) {
            console.error("Error writing document:", err);
        }
    }

    async findDocuments(query) {
        try {
            const docs = await this.db.find(query);
            if (docs.length > 0) {
                if (debugMode) console.log("Found documents:", docs);
                return docs;
            } else {
                if (debugMode) console.log("No documents found with the given query:", query);
                return [];

            }
        } catch (err) {
            if (debugMode) console.error("Error finding documents:", err);
        }
    }

    async readDocumentById(docId) {
        try {
            const doc = await this.db.findOne({ _id: docId });
            if (doc) {
                if (debugMode) console.log("Document found:", doc);
                return doc;

            } else {
                if (debugMode) console.log("No document found with _id:", docId);
                return {};

            }
        } catch (err) {
            console.error("Error reading document:", err);
        }
    }

    async deleteDocument(query) {
        try {
            const numRemoved = await this.db.remove(query, { multi: true });
            if (debugMode) console.log("Documents removed:", numRemoved);
            return numRemoved;

        } catch (err) {
            if (debugMode) console.error("Error removing document:", err);
            return 0;
        }
    }
}
