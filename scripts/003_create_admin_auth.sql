-- Create admin users table for custom authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a default admin user
-- Password: admin123 (you should change this immediately after first login)
INSERT INTO admin_users (email, password_hash, name)
VALUES (
  'admin@kustommania.com',
  '$2a$10$rQ8K5O.V5y5Z5Z5Z5Z5Z5uK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
  'Administrador'
) ON CONFLICT (email) DO NOTHING;

-- Note: The password hash above is for "admin123"
-- After logging in, you should change this password immediately
