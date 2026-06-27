import express from 'express';
import { db } from './db.js';
import { generateSetupPlan } from './ai.js';

const router = express.Router();

/**
 * GET /api/templates
 * Retrieve pre-seeded setup templates to prefill the form.
 */
router.get('/templates', (req, res) => {
  try {
    const templates = db.getAll('templates');
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve templates', message: error.message });
  }
});

/**
 * POST /api/generate
 * Generates setup recommendation using Gemini API or mock fallback,
 * and saves input and AI response to the database.
 */
router.post('/generate', async (req, res) => {
  try {
    const {
      customer_name,
      room_length,
      room_width,
      room_height,
      budget,
      device_type,
      theme,
      current_setup,
      desk_size,
      lighting,
      cable_management,
      storage,
      notes
    } = req.body;

    // Field Validation
    const errors = {};
    if (!customer_name || customer_name.trim() === '') errors.customer_name = 'Customer name is required';
    if (!room_length || isNaN(room_length) || parseFloat(room_length) <= 0) errors.room_length = 'Valid room length is required';
    if (!room_width || isNaN(room_width) || parseFloat(room_width) <= 0) errors.room_width = 'Valid room width is required';
    if (!room_height || isNaN(room_height) || parseFloat(room_height) <= 0) errors.room_height = 'Valid room height is required';
    if (!budget || isNaN(budget) || parseFloat(budget) <= 0) errors.budget = 'Valid budget is required';
    if (!device_type) errors.device_type = 'Gaming device type is required';
    if (!theme) errors.theme = 'Theme preference is required';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: 'Validation Failed', fields: errors });
    }

    // Prepare inputs
    const input_data = {
      customer_name: customer_name.trim(),
      room_length: parseFloat(room_length),
      room_width: parseFloat(room_width),
      room_height: parseFloat(room_height),
      budget: parseFloat(budget),
      device_type,
      theme,
      current_setup: current_setup || '',
      desk_size: desk_size || 'Standard',
      lighting: lighting || '',
      cable_management: cable_management || '',
      storage: storage || '',
      notes: notes || ''
    };

    // Call AI Generative Engine
    const ai_response = await generateSetupPlan(input_data);

    // Save generation entry
    const newGeneration = db.insert('generations', {
      customer_name: input_data.customer_name,
      room_length: input_data.room_length,
      room_width: input_data.room_width,
      room_height: input_data.room_height,
      budget: input_data.budget,
      device_type: input_data.device_type,
      theme: input_data.theme,
      input_json: JSON.stringify(input_data),
      ai_response: JSON.stringify(ai_response),
      response_time_ms: ai_response.response_time_ms || 100
    });

    res.status(201).json({
      id: newGeneration.id,
      input: input_data,
      output: ai_response,
      created_at: newGeneration.created_at
    });

  } catch (error) {
    console.error('Error during setup generation:', error);
    res.status(500).json({ error: 'Failed to generate design suggestions', message: error.message });
  }
});

/**
 * GET /api/history
 * List all generations ordered from newest to oldest.
 */
router.get('/history', (req, res) => {
  try {
    const list = db.getAll('generations');
    
    // Sort descending by created_at
    const sortedList = [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Parse stringified contents for easier frontend reading
    const parsedList = sortedList.map(item => {
      try {
        return {
          ...item,
          input_json: JSON.parse(item.input_json),
          ai_response: JSON.parse(item.ai_response)
        };
      } catch (e) {
        return item; // fail-safe
      }
    });

    res.json(parsedList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve history', message: error.message });
  }
});

/**
 * GET /api/history/:id
 * Retrieve specific generation details by ID.
 */
router.get('/history/:id', (req, res) => {
  try {
    const { id } = req.params;
    const generation = db.findById('generations', id);
    if (!generation) {
      return res.status(404).json({ error: 'Generation not found' });
    }

    // Get feedback associated with this generation
    const feedbacks = db.getAll('feedback');
    const generationFeedback = feedbacks.filter(f => f.generation_id === id);

    let parsed = { ...generation };
    try {
      parsed.input_json = JSON.parse(generation.input_json);
      parsed.ai_response = JSON.parse(generation.ai_response);
    } catch (e) {
      // already parsed or failed
    }

    res.json({
      ...parsed,
      feedback: generationFeedback
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve generation details', message: error.message });
  }
});

/**
 * POST /api/feedback
 * Submit rating and comment for a specific generation.
 */
router.post('/feedback', (req, res) => {
  try {
    const { generation_id, rating, comment } = req.body;

    if (!generation_id) {
      return res.status(400).json({ error: 'generation_id is required' });
    }

    const ratingVal = parseInt(rating);
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
    }

    // Ensure generation exists
    const generation = db.findById('generations', generation_id);
    if (!generation) {
      return res.status(404).json({ error: 'Generation not found' });
    }

    // Check if feedback already exists for this generation_id
    const existingFeedbacks = db.getAll('feedback');
    const duplicate = existingFeedbacks.find(f => f.generation_id === generation_id);
    
    let feedbackEntry;
    if (duplicate) {
      // Update existing feedback
      feedbackEntry = db.update('feedback', duplicate.id, {
        rating: ratingVal,
        comment: comment || '',
        updated_at: new Date().toISOString()
      });
    } else {
      // Create new feedback
      feedbackEntry = db.insert('feedback', {
        generation_id,
        rating: ratingVal,
        comment: comment || ''
      });
    }

    res.status(201).json(feedbackEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback', message: error.message });
  }
});

/**
 * GET /api/analytics
 * Retrieve stats, counts, and aggregated ratings for dashboards.
 */
router.get('/analytics', (req, res) => {
  try {
    const generations = db.getAll('generations');
    const feedbacks = db.getAll('feedback');

    const totalGenerations = generations.length;

    // Calculate Average Rating
    let avgRating = 0;
    if (feedbacks.length > 0) {
      const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
      avgRating = parseFloat((sum / feedbacks.length).toFixed(1));
    }

    // Gaming device type frequency
    const deviceCounts = {};
    // Theme frequency
    const themeCounts = {};

    generations.forEach(g => {
      // Device
      const dev = g.device_type || 'Unknown';
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;
      // Theme
      const th = g.theme || 'Unknown';
      themeCounts[th] = (themeCounts[th] || 0) + 1;
    });

    // Find modes (most selected values)
    let mostSelectedDevice = 'None';
    let maxDevCount = 0;
    Object.entries(deviceCounts).forEach(([dev, count]) => {
      if (count > maxDevCount) {
        maxDevCount = count;
        mostSelectedDevice = dev;
      }
    });

    let mostSelectedTheme = 'None';
    let maxThemeCount = 0;
    Object.entries(themeCounts).forEach(([theme, count]) => {
      if (count > maxThemeCount) {
        maxThemeCount = count;
        mostSelectedTheme = theme;
      }
    });

    // Recent 5 generated outputs
    const sortedGenerations = [...generations].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const recentOutputs = sortedGenerations.slice(0, 5).map(g => {
      let ai_response_parsed = null;
      let input_json_parsed = null;
      try {
        ai_response_parsed = JSON.parse(g.ai_response);
        input_json_parsed = JSON.parse(g.input_json);
      } catch (e) {}

      return {
        id: g.id,
        customer_name: g.customer_name,
        device_type: g.device_type,
        theme: g.theme,
        created_at: g.created_at,
        response_time_ms: g.response_time_ms,
        ai_response: ai_response_parsed,
        input_json: input_json_parsed
      };
    });

    // Quality score trend - rating over time
    // Let's list the 10 most recent feedback entries with their creation times
    const sortedFeedback = [...feedbacks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const qualityScoreTrend = sortedFeedback.slice(0, 10).map(f => {
      const g = generations.find(gen => gen.id === f.generation_id);
      return {
        date: f.created_at.split('T')[0],
        rating: f.rating,
        customer_name: g ? g.customer_name : 'Anonymous'
      };
    }).reverse(); // chronological order

    // Feedback List
    const feedbackList = feedbacks.map(f => {
      const g = generations.find(gen => gen.id === f.generation_id);
      return {
        id: f.id,
        generation_id: f.generation_id,
        customer_name: g ? g.customer_name : 'Unknown',
        rating: f.rating,
        comment: f.comment,
        created_at: f.created_at
      };
    });

    res.json({
      total_generations: totalGenerations,
      average_rating: avgRating,
      most_selected_device: mostSelectedDevice,
      most_selected_theme: mostSelectedTheme,
      device_counts: deviceCounts,
      theme_counts: themeCounts,
      recent_generations: recentOutputs,
      quality_score_trend: qualityScoreTrend,
      feedback_list: feedbackList
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to aggregate analytics', message: error.message });
  }
});

export default router;
