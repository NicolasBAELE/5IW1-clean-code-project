import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Maintenance API is working!');
});

export const maintenanceRoutes = router;
