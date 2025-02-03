// eslint-disable-next-line no-unused-vars
import { z, ZodError } from 'zod';

export function validateData(schema) {
  return (req, res , next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({ 
            message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(404).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}