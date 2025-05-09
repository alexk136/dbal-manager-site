### DBAL Iterators

This section demonstrates two iteration strategies supported by the DBAL Bundle: **cursor-based** and **offset-based**. Both are useful for batch processing and exporting data in chunks.

#### Cursor Iterator

Use `CursorIteratorInterface` to fetch rows from the database with low memory usage, using a forward-only cursor.

```php
$iterator = $cursorIterator
    ->setChunkSize(1000)
    ->setOrderDirection('ASC');

foreach ($iterator->iterate('test_data_types') as $row) {
    // process row
}
```

This strategy is efficient for large tables because it avoids offset-based pagination and keeps the memory footprint low.

---

#### Offset Iterator

Use `OffsetIteratorInterface` when you need offset-based pagination, for example when exporting data with known positions or paging through UI.

```php
$sql = 'SELECT * FROM test_data_types';

$iterator = $offsetIterator
    ->setChunkSize(500)
    ->setOrderDirection('ASC');

foreach ($iterator->iterate($sql) as $row) {
    // process row
}
```

This strategy is more flexible for dynamic SQL but has worse performance for deep pages due to `OFFSET`.

---

> ☑️ Both iterators support chunking, ordering, and can be used in CLI commands or services for scalable processing.
