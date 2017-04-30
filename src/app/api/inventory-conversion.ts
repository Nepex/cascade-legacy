export class InventoryConversion {
    createInventoryObj(obj) {
        let inventory = [];

        delete obj.id;
        delete obj.username;

        // convert property names to strings
        let propNameArray = Object.keys(obj);

        // convert obj to string
        let objAsString = JSON.stringify(obj);

        // split values into an array
        let splitObj = objAsString.split(/[:,]+/);

        let amounts = [];
        let amountIdxs = [];

        // odd numbered indexs for the item amounts
        for (let i = 0; i < 1000; i++) {
            if (i % 2 != 0) {
                amountIdxs.push(i);
            }
        }

        for (let i = 0; i < propNameArray.length; i++) {
            // remove unnecessary characters
            let removeCurly = splitObj[amountIdxs[i]].replace('}', '');
            let removeQuotes = removeCurly.substring(1, removeCurly.length-1);
            let finalAmount = parseInt(removeQuotes);

            if (!finalAmount) {
                continue;
            }

            inventory.push({
                item: propNameArray[i],
                amount: finalAmount
            });
        }

        return inventory;
    }
}