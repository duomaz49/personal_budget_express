import app from './app';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err: Error) => {
    console.error('Database connection failed:', err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});