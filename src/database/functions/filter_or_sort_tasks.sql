CREATE OR REPLACE FUNCTION
filter_or_sort_tasks(
  p_currentUserId UUID,

  p_status VARCHAR DEFAULT NULL,

  p_title VARCHAR DEFAULT NULL,

  p_description VARCHAR DEFAULT NULL,

  p_priority TEXT DEFAULT NULL,

  p_due_date TIMESTAMPTZ DEFAULT NULL,

  p_sort_key TEXT DEFAULT 'createdAt',

  p_sort_order TEXT DEFAULT 'DESC'
)
RETURNS TABLE (
  id UUID,

  title VARCHAR,

  description VARCHAR,

  status TEXT,

  priority TEXT,

  "createdById" UUID,

  "dueDate" TIMESTAMPTZ,

  "createdAt" TIMESTAMPTZ,

  "updatedAt" TIMESTAMPTZ
)
AS $$
BEGIN

  RETURN QUERY

  SELECT
    t.id,

    t.title,

    t.description,

    t.status::TEXT,

    t.priority::TEXT,

    t."createdById",

    t."dueDate",

    t."createdAt",

    t."updatedAt"

  FROM task t

  WHERE
    t."createdById" = p_currentUserId

    AND (
      p_status IS NULL
      OR t.status::TEXT = p_status
    )

    AND (
      p_title IS NULL
      OR t.title ILIKE '%' || p_title || '%'
    )

    AND (
      p_description IS NULL
      OR t.description ILIKE '%' || p_description || '%'
    )

    AND (
      p_priority IS NULL
      OR t.priority::TEXT = p_priority
    )

    AND (
      p_due_date IS NULL
      OR t."dueDate" <= p_due_date
    )

  ORDER BY

    CASE
      WHEN p_sort_key = 'title'
      AND p_sort_order = 'ASC'
      THEN t.title
    END ASC,

    CASE
      WHEN p_sort_key = 'title'
      AND p_sort_order = 'DESC'
      THEN t.title
    END DESC,

    CASE
      WHEN p_sort_key = 'description'
      AND p_sort_order = 'ASC'
      THEN t.description
    END ASC,

    CASE
      WHEN p_sort_key = 'description'
      AND p_sort_order = 'DESC'
      THEN t.description
    END DESC,

    CASE
      WHEN p_sort_key = 'status'
      AND p_sort_order = 'ASC'
      THEN t.status::TEXT
    END ASC,

    CASE
      WHEN p_sort_key = 'status'
      AND p_sort_order = 'DESC'
      THEN t.status::TEXT
    END DESC,

    CASE
      WHEN p_sort_key = 'priority'
      AND p_sort_order = 'ASC'
      THEN t.priority::TEXT
    END ASC,

    CASE
      WHEN p_sort_key = 'priority'
      AND p_sort_order = 'DESC'
      THEN t.priority::TEXT
    END DESC,

    CASE
      WHEN p_sort_key = 'dueDate'
      AND p_sort_order = 'ASC'
      THEN t."dueDate"
    END ASC,

    CASE
      WHEN p_sort_key = 'dueDate'
      AND p_sort_order = 'DESC'
      THEN t."dueDate"
    END DESC,

    CASE
      WHEN p_sort_key = 'createdAt'
      AND p_sort_order = 'ASC'
      THEN t."createdAt"
    END ASC,

    CASE
      WHEN p_sort_key = 'createdAt'
      AND p_sort_order = 'DESC'
      THEN t."createdAt"
    END DESC,

    CASE
      WHEN p_sort_key = 'updatedAt'
      AND p_sort_order = 'ASC'
      THEN t."updatedAt"
    END ASC,

    CASE
      WHEN p_sort_key = 'updatedAt'
      AND p_sort_order = 'DESC'
      THEN t."updatedAt"
    END DESC;

END;
$$ LANGUAGE plpgsql;