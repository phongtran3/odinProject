export default function checkStorage(type) {
    try {
        let storage = window[type];
        const testKey = "storageTest";
        storage.setItem(testKey, testKey);
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return ( error instanceof DOMException && error.name === "QuotaExceededError" && storage && storage.length !== 0 );
    }

}