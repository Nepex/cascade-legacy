export class InventoryConversion {
    createInventoryObj(obj) {
        let inventory = [];

        // armor
        if (parseInt(obj.leather_cap) > 0) {
            inventory.push({
                item: 'leather_cap',
                amount: parseInt(obj.leather_cap)
            });
        }

        if (parseInt(obj.leather_vest) > 0) {
            inventory.push({
                item: 'leather_vest',
                amount: parseInt(obj.leather_vest)
            });
        }

        // weapons
        if (parseInt(obj.practice_sword) > 0) {
            inventory.push({
                item: 'practice_sword',
                amount: parseInt(obj.practice_sword)
            });
        }

        if (parseInt(obj.practice_wand) > 0) {
            inventory.push({
                item: 'practice_wand',
                amount: parseInt(obj.practice_wand)
            });
        }

        return inventory;
    }
}