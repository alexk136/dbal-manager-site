# Dbal Bundle for Symfony

**Dbal Bundle** is a module for Symfony applications designed for high-load systems, where the standard capabilities of Doctrine ORM become a bottleneck. The bundle provides abstractions and interfaces for direct, efficient, and scalable database operations at the Doctrine DBAL level.

## Key Features

- High-performance database operations at the DBAL level.
- Direct work with DTOs and data arrays, without the ORM layer.
- Advanced bulk operations: insert, update, upsert, delete.
- Interfaces for cursor-based and offset-based iterators.
- Basic Finder/Mutator interfaces for reading and modifying data.
- Support for multiple database connections.
- Full control over SQL queries.
- Support for the following ORMs:
    - MySQL 8


## Architecture

The Dbal Bundle is built on interfaces and abstractions that are easy to extend and adapt to any needs.

At the core of select operations are **generators (`yield`)**, which allows:

- Processing large volumes of data with minimal memory consumption
- Starting data processing before the entire query completes (lazy loading)
- Implementing streaming and data transfer — useful when integrating with queues, APIs, synchronization logic, and exports

## Compatibility

- PHP 8.2+
- Symfony 7.0+
- Doctrine DBAL 3.6+
- MySQL 5.7 / 8 / PostgreSQL 16
