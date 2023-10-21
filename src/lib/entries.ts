import clientPromise from "@/utils/mongodb";

let client;
let db: any;
let entries: any;

async function init() {
    if (db) return;
    try {
        client = await clientPromise;
        db = client.db();
        entries = await db.collection("entry");
    } catch (error) {
        throw new Error("Failed to establish connection to database");
    }
};

(async () => {
    await init();
})();


// Entries

export async function getEntries() {
    try {
        if (!entries) await init();
        const result = await entries
            .find({})
            .map((user: any) => ({ ...user, _id: user._id.toString() }))
            .toArray();

        return { entries: result };
    } catch (error) {
        return { error: "Failed to fetch entries!" };
    }
}
