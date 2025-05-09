### DBAL Mutator Examples

This section demonstrates how to use the `DbalMutatorInterface` for simple and expressive write operations on the database.

#### Insert a Record

```php
$row = [
    'name' => 'Inserted Name',
    'price' => 199.99,
    // other columns...
];

$mutator->insert('test_data_types', $row);
```

---

#### Update a Record

```php
$mutator->update(
    'test_data_types',
    ['name' => 'Updated Name'],
    ['id' => 1]
);
```

---

#### Delete a Record

```php
$mutator->delete(
    'test_data_types',
    ['id' => 1]
);
```

---

#### Execute Raw SQL

```php
$sql = 'UPDATE test_data_types SET name = :name WHERE id > :id';

$affected = $mutator->execute($sql, [
    'name' => 'Executed Update',
    'id' => 1,
]);
```

---

> ✅ `DbalMutatorInterface` allows performing basic insert, update, delete, and custom execution operations without the overhead of ORM.
