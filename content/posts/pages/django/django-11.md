---
title: "Django: Day 11"
date: 2025-01-12
description: "Advanced Django ORM concepts including query optimization, N+1 problem, annotate, select_related, prefetch_related, and other advanced ORM techniques."
showToc: true
categories: ["Django"]
tags: ["Django", "Python", "ORM", "Database", "Query Optimization", "Performance", "Backend"]
summary: "Master advanced Django ORM concepts including query optimization techniques, solving the N+1 problem, and using annotate for complex database operations."
images: ["/images/django.jpg"]
---

# Advanced Django ORM Concepts

## 30. The N+1 Problem and Query Optimization

### What is the N+1 Problem?

The **N+1 problem** is a common performance issue that occurs when fetching a list of objects (N items), where each object needs related field data, causing Django to run:

- **1 query** for the base list
- **N queries** for related fields

👉 **Total = N+1 queries**

This happens because Django fetches related fields **lazily** by default.

### Example 1: Forward ForeignKey

```python
class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

# This causes N+1 problem
books = Book.objects.all()
for book in books:
    print(book.title, book.author.name)  # N+1 queries!
```

**SQL Generated:**
```sql
SELECT * FROM book;                     -- 1 query
SELECT * FROM author WHERE id=...;      -- repeated for each book
```

If you have 1000 books → **1001 queries**! 😱

### Example 2: Reverse ForeignKey

```python
authors = Author.objects.all()
for author in authors:
    print(author.name, [b.title for b in author.book_set.all()])
```

**SQL Generated:**
```sql
SELECT * FROM author;                        -- 1 query
SELECT * FROM book WHERE author_id=...;      -- repeated for each author
```

If you have 200 authors → **201 queries**!

### Example 3: ManyToMany

```python
class Category(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    categories = models.ManyToManyField(Category)

books = Book.objects.all()
for book in books:
    print(book.title, [c.name for c in book.categories.all()])
```

**SQL Generated:**
```sql
SELECT * FROM book;                            -- 1 query
SELECT * FROM category JOIN book_categories... -- repeated for each book
```

If you have 500 books → **501 queries**!

### Fast Facts About Django ORM

When using operations like:

```python
Book.objects.filter(author__name='John Doe')
```

Consider the one-to-many relationship between Author and Book. Django will use **JOIN** clause to check the condition.

## 31. Solving N+1 with select_related

### When to Use select_related

- Works with **ForeignKey** and **OneToOneField**
- Uses **SQL JOIN** to fetch related objects in the same query
- Fetches related object in the **same query**

### Basic Usage

```python
# Solution: Use select_related
books = Book.objects.select_related("author")
for book in books:
    print(book.title, book.author.name)  # Only 1 query!
```

**SQL Generated:**
```sql
SELECT book.id, book.title,
       author.id, author.name
FROM book
INNER JOIN author ON book.author_id = author.id;
```

👉 **Still 1 query total** even for 1000 books!

### Joining Multiple Tables with __

You can chain lookups across relationships:

```python
# Multiple level joins
Book.objects.select_related("author__profile")
```

**SQL Generated:**
```sql
SELECT book.id, book.title,
       author.id, author.name,
       profile.id, profile.bio
FROM book
INNER JOIN author ON book.author_id = author.id
INNER JOIN profile ON author.profile_id = profile.id;
```

👉 You can nest as **deep as needed** with `__`.

### Multiple select_related Fields

```python
# Multiple fields - still 1 query with multiple JOINs
Book.objects.select_related("author", "publisher", "editor")
```

👉 **Efficient** when all are FK/O2O relationships.

## 32. Solving N+1 with prefetch_related

### When to Use prefetch_related

- Works with **ManyToMany** and **reverse ForeignKey** relationships
- Django runs **2 queries** (base + related), then links results in Python
- Avoids **row explosion** (cartesian product)

### Basic Usage

```python
# Solution: Use prefetch_related
authors = Author.objects.prefetch_related("book_set")
for author in authors:
    print(author.name, [b.title for b in author.book_set.all()])
```

**SQL Generated:**
```sql
SELECT * FROM author;                      -- 1st query
SELECT * FROM book WHERE author_id IN (...); -- 2nd query
```

👉 **Always 2 queries**, regardless of author count.

### ManyToMany Example

```python
books = Book.objects.prefetch_related("categories")
for book in books:
    print(book.title, [c.name for c in book.categories.all()])
```

**SQL Generated:**
```sql
SELECT * FROM book;                                    -- 1st query
SELECT * FROM category 
JOIN book_categories ON category.id = book_categories.category_id 
WHERE book_categories.book_id IN (...);                -- 2nd query
```

### Multiple prefetch_related Fields

```python
# Each gets its own extra query
Book.objects.prefetch_related("categories", "tags", "languages")
```

👉 **1 base query + 3 prefetch queries = 4 queries total**.

## 33. Complex Example with Multiple Relationships

```python
from django.db import models

class Topping(models.Model):
    name = models.CharField(max_length=30)

class Pizza(models.Model):
    name = models.CharField(max_length=50)
    toppings = models.ManyToManyField(Topping)

    def __str__(self):
        return "%s (%s)" % (
            self.name,
            ", ".join(topping.name for topping in self.toppings.all()),
        )

class Restaurant(models.Model):
    pizzas = models.ManyToManyField(Pizza, related_name="restaurants")
    best_pizza = models.ForeignKey(
        Pizza, related_name="championed_by", on_delete=models.CASCADE
    )

# Combining both techniques
restaurants = Restaurant.objects.select_related("best_pizza").prefetch_related("best_pizza__toppings")
```

This efficiently handles:
- `select_related` for the ForeignKey (`best_pizza`)
- `prefetch_related` for the nested ManyToMany (`best_pizza__toppings`)

## 34. What Happens After Query Execution

### Without Optimization
- Related objects are **not loaded**
- Each `.author`, `.book_set.all()`, `.categories.all()` triggers **new SQL**

### With select_related
- Related objects are **joined at query time**
- Accessing `.author` does **not trigger new SQL**

### With prefetch_related
- Django stores a **cache** of related objects
- First `.book_set.all()` comes from **memory**, not database

## 35. Query Optimization Summary Table

| Relation Type | Default (lazy) | With Optimization |
|---------------|----------------|-------------------|
| FK (forward) | N+1 queries | `select_related` → 1 query |
| O2O | N+1 queries | `select_related` → 1 query |
| FK (reverse) | N+1 queries | `prefetch_related` → 2 queries |
| M2M | N+1 queries | `prefetch_related` → 2 queries |
| Multiple FKs/O2Os | N+1 queries | `select_related` (many JOINs) → 1 query |
| Multiple M2Ms | N+1 queries | `prefetch_related` (extra per field) |

### Important Notes

- The **order** of `filter()` and `select_related()` chaining **isn't important**:

```python
# These are equivalent
Entry.objects.filter(pub_date__gt=timezone.now()).select_related("blog")
Entry.objects.select_related("blog").filter(pub_date__gt=timezone.now())
```

- **Caching behavior**: Once you use `select_related`, the related objects are cached:

```python
# Hits the database with joins to the author and hometown tables.
b = Book.objects.select_related("author__hometown").get(id=4)
p = b.author         # Doesn't hit the database.
c = p.hometown       # Doesn't hit the database.

# Without select_related()...
b = Book.objects.get(id=4)  # Hits the database.
p = b.author                # Hits the database.
c = p.hometown              # Hits the database.
```
