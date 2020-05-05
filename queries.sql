
-- Получить список всех категорий (идентификатор, наименование категории);
SELECT id, name FROM categories;

-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории);
SELECT id, name FROM categories WHERE ((SELECT COUNT(*) FROM offers_category WHERE offers_category.category_id = categories.id) > 0);

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);
SELECT id, name, (SELECT COUNT(*) FROM offers_category WHERE offers_category.category_id = categories.id) as total FROM categories;

-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации,
-- имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления;

SELECT
  o.id,
  o.title,
  o.price,
  o.type,
  o.date_create,
  o.description,
  u.name,
  u.email,
  COUNT(cm.id) as comment_count,
  string_agg(DISTINCT ct.name, ',') as categories
  FROM offers o
  JOIN users u ON o.author_id = u.id
  JOIN comments cm ON o.id = cm.offer_id
  JOIN offers_category oct ON o.id = oct.offer_id
  JOIN categories ct ON oct.id = ct.id
  GROUP BY o.id, u.name, u.email
  ORDER BY o.date_create;

-- Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления,
-- текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);

SELECT
  o.id,
  o.title,
  o.price,
  o.type,
  o.date_create,
  o.description,
  u.name,
  u.email,
  COUNT(cm.id) as comment_count,
  string_agg(DISTINCT ct.name, ',') as categories
  FROM offers o
  JOIN users u ON o.author_id = u.id
  JOIN comments cm ON o.id = cm.offer_id
  JOIN offers_category oct ON o.id = oct.offer_id
  JOIN categories ct ON oct.id = ct.id
  WHERE o.id = 1
  GROUP BY o.id, u.name, u.email;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);

SELECT c.*, u.name FROM comments c
  JOIN users u ON c.author_id = u.id
  ORDER BY date_create
  LIMIT 5;

-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;

SELECT c.*, u.name FROM comments c
  JOIN users u ON c.author_id = u.id
  WHERE c.offer_id = 1
  ORDER BY date_create;

-- Выбрать 2 объявления, соответствующих типу «куплю»;

SELECT * FROM offers WHERE type = 'offer' LIMIT 2;

-- Обновить заголовок определённого объявления на «Уникальное предложение!»;

UPDATE offers SET title = 'Уникальное предложение!' WHERE id = 1;
