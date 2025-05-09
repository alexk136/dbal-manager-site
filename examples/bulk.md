### Bulk Upsert

Example: `BulkUpsertManyCommand`

```php
<?php

use Elrise\Bundle\DbalBundle\Enum\BulkUpserterInterface;

class ExampleService
{
    public function __construct(
        private readonly BulkUpserterInterface $bulkUpserter
    ) {}

    public function updateOrInsertData(): void
    {
        $rows = [
            ['id' => 1, 'name' => 'Alice'],
            ['id' => 2, 'name' => 'Bob'],
            ['id' => 3, 'name' => 'Charlie'],
        ];

        // Performs an upsert — updates by 'id' if exists, inserts otherwise
        $this->bulkUpserter->upsertMany(
            'my_table',   // Table name
            $rows,        // Records to insert/update
            ['id']        // Conflict keys to match existing rows
        );
    }
}
```

### Bulk Update

Example: `BulkUpdateManyCommand`

```php
<?php

use Elrise\Bundle\DbalBundle\Enum\BulkUpdaterInterface;

class ExampleService
{
    public function __construct(
        private readonly BulkUpdaterInterface $bulkUpdater
    ) {}

    public function updateData(): void
    {
        $rowsToUpdate = [
            ['id' => 1, 'name' => 'updated_Alice'],
            ['id' => 2, 'name' => 'updated_Bob'],
            ['id' => 3, 'name' => 'updated_Charlie'],
        ];

        // Perform bulk update using the primary key 'id' as the conflict key
        $this->bulkUpdater->updateMany(
            'my_table',    // Table name
            $rowsToUpdate, // Rows to update
            ['id']         // Conflict key(s), usually the primary key
        );
    }
}
```

Вот пример секции для `bulk-soft-delete.md` на английском языке:

---

### Bulk Soft Delete

Example: `BulkSoftDeleteManyCommand`

```php
<?php

use Elrise\Bundle\DbalBundle\Enum\BulkDeleterInterface;

class ExampleService
{
    public function __construct(
        private readonly BulkDeleterInterface $bulkDeleter
    ) {}

    public function softDeleteRows(array $ids): void
    {
        $this->bulkDeleter
            ->setChunkSize(100) // Optional: define chunk size for batch deletion
            ->deleteSoftMany('my_table', $ids);
    }
}
```

> 💡 Make sure the table has a `deleted_at` column and is configured to support soft deletion logic.

---

### Bulk Insert

Example: `BulkInsertManyCommand`

```php
<?php

use Elrise\Bundle\DbalBundle\Enum\BulkInserterInterface;

class ExampleService
{
    public function __construct(
        private readonly BulkInserterInterface $bulkInserter
    ) {}

    public function insertRows(array $rows): void
    {
        $this->bulkInserter
            ->setChunkSize(100) // Optional: batch size
            ->insertMany('my_table', $rows);
    }
}
```

### Bulk Delete

Example: `BulkDeleteManyCommand`

```php
<?php

use Elrise\Bundle\DbalBundle\Enum\BulkDeleterInterface;

class ExampleService
{
    public function __construct(
        private readonly BulkDeleterInterface $bulkDeleter
    ) {}

    public function deleteRows(array $ids): void
    {
        $this->bulkDeleter
            ->setChunkSize(100) // Optional: chunk size
            ->deleteMany('my_table', $ids);
    }
}
```

> 🗑️ Recommended for bulk physical deletion scenarios. Use with caution, as data is permanently removed.
