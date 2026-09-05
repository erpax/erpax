# items/inventory/movements/hooks — stock moves and the ledger hears about it in the same transaction

`inventoryMovementPostingHook` books the movement's value as it is written. Inventory that moves
without a posting is a stock figure and a ledger figure that drift apart with nothing between them
to notice.

Composes: [[law]].
