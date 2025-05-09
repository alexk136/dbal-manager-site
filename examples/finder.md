### DBAL Finder Examples

This section demonstrates how to use the `DbalFinderInterface` to query records with various conditions and methods. Below are examples for common use cases:

#### Find All with Condition and Limit

```php
$qb = $connection->createQueryBuilder()
    ->select('*')
    ->from('test_data_types')
    ->where('price > :min')
    ->setParameter('min', 10)
    ->setMaxResults(2);

$rows = iterator_to_array($finder->findAll($qb));
```

---

#### Find One by Value

```php
$qb = $connection->createQueryBuilder()
    ->select('*')
    ->from('test_data_types')
    ->where('price = :price')
    ->setParameter('price', 123.45);

$row = $finder->findOne($qb);
```

---

#### Find by ID

```php
$row = $finder->findById(42, 'test_data_types');
```

---

#### Find by ID List

```php
$ids = [1, 2, 3];
$rows = iterator_to_array($finder->findByIdList($ids, 'test_data_types'));
```

---

#### Fetch All by Raw SQL

```php
$sql = <<<SQL
SELECT * FROM test_data_types
WHERE price >= :min
ORDER BY price ASC
LIMIT 2
SQL;

$rows = iterator_to_array($finder->fetchAllBySql($sql, ['min' => 100]));
```

---

#### Fetch One by Raw SQL

```php
$sql = 'SELECT * FROM test_data_types WHERE price = :price';

$row = $finder->fetchOneBySql($sql, ['price' => 123.45]);
```

---

> ☝️ `DbalFinderInterface` is ideal for fast and flexible read operations using Doctrine DBAL with optional hydration or transformation.
