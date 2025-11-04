import express from 'express';
import HealthTip from '../models/HealthTip.js';

const router = express.Router();

/**
 * @openapi
 * /api/health-tips:
 *   get:
 *     summary: Get all health tips
 *     description: Retrieve all health tips with optional filtering by category and language
 *     tags:
 *       - Health Tips
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (e.g., পুষ্টি, ব্যায়াম)
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *           enum: [bn, en]
 *         description: Filter by language
 *     responses:
 *       200:
 *         description: List of health tips
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HealthTip'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// Get all health tips
router.get('/', async (req, res) => {
  try {
    const { category, language } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (language) filter.language = language;
    
    const tips = await HealthTip.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: tips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @openapi
 * /api/health-tips/{id}:
 *   get:
 *     summary: Get single health tip
 *     description: Retrieve a specific health tip by ID
 *     tags:
 *       - Health Tips
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Health tip ID
 *     responses:
 *       200:
 *         description: Health tip details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HealthTip'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// Get single health tip
router.get('/:id', async (req, res) => {
  try {
    const tip = await HealthTip.findById(req.params.id);
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Health tip not found' });
    }
    res.json({ success: true, data: tip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @openapi
 * /api/health-tips:
 *   post:
 *     summary: Create new health tip
 *     description: Add a new health tip to the database
 *     tags:
 *       - Health Tips
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: গ্রীষ্মকালে হাইড্রেটেড থাকুন
 *               description:
 *                 type: string
 *                 example: প্রতিদিন কমপক্ষে ৮-১০ গ্লাস পানি পান করুন।
 *               category:
 *                 type: string
 *                 example: পুষ্টি
 *               season:
 *                 type: string
 *                 example: গ্রীষ্মকাল
 *               icon:
 *                 type: string
 *                 example: 💧
 *               language:
 *                 type: string
 *                 enum: [bn, en]
 *                 example: bn
 *     responses:
 *       201:
 *         description: Health tip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HealthTip'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
// Create new health tip
router.post('/', async (req, res) => {
  try {
    const tip = new HealthTip(req.body);
    await tip.save();
    res.status(201).json({ success: true, data: tip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @openapi
 * /api/health-tips/{id}:
 *   put:
 *     summary: Update health tip
 *     description: Update an existing health tip
 *     tags:
 *       - Health Tips
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Health tip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthTip'
 *     responses:
 *       200:
 *         description: Health tip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/HealthTip'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
// Update health tip
router.put('/:id', async (req, res) => {
  try {
    const tip = await HealthTip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Health tip not found' });
    }
    res.json({ success: true, data: tip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @openapi
 * /api/health-tips/{id}:
 *   delete:
 *     summary: Delete health tip
 *     description: Remove a health tip from the database
 *     tags:
 *       - Health Tips
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Health tip ID
 *     responses:
 *       200:
 *         description: Health tip deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// Delete health tip
router.delete('/:id', async (req, res) => {
  try {
    const tip = await HealthTip.findByIdAndDelete(req.params.id);
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Health tip not found' });
    }
    res.json({ success: true, message: 'Health tip deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
