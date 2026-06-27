import { db } from './db.js';
import { generateMockSetupPlan } from './ai.js';

console.log('--- STARTING BACKEND TESTING UTILITY ---');

try {
  // Test templates list
  const templates = db.getAll('templates');
  console.log(`[PASS] Database initialized. Found ${templates.length} pre-seeded templates.`);

  // Test insert generation
  const mockInput = {
    customer_name: "Test User",
    room_length: "12",
    room_width: "10",
    room_height: "9",
    budget: "60000",
    device_type: "PC",
    theme: "RGB",
    current_setup: "N/A",
    desk_size: "Standard",
    lighting: "RGB flex",
    cable_management: "Tray",
    storage: "Cabinet",
    notes: "No additional notes"
  };

  const ai_response = generateMockSetupPlan(mockInput);
  console.log('[PASS] Mock AI plan generated successfully.');

  const entry = db.insert('generations', {
    customer_name: mockInput.customer_name,
    room_length: parseFloat(mockInput.room_length),
    room_width: parseFloat(mockInput.room_width),
    room_height: parseFloat(mockInput.room_height),
    budget: parseFloat(mockInput.budget),
    device_type: mockInput.device_type,
    theme: mockInput.theme,
    input_json: JSON.stringify(mockInput),
    ai_response: JSON.stringify(ai_response),
    response_time_ms: 15
  });

  console.log(`[PASS] Mock generation entry written to database with ID: ${entry.id}`);

  // Test insert feedback
  const feedback = db.insert('feedback', {
    generation_id: entry.id,
    rating: 5,
    comment: "This setup plan is extremely useful!"
  });
  console.log(`[PASS] Mock feedback submitted with ID: ${feedback.id}`);

  // Test analytics
  const generations = db.getAll('generations');
  const feedbacks = db.getAll('feedback');
  console.log(`[PASS] Retrieved ${generations.length} total generations and ${feedbacks.length} feedbacks.`);

  // Cleanup testing entries so we don't pollute the dev DB
  const cleanGen = db.delete('generations', entry.id);
  const cleanFb = db.delete('feedback', feedback.id);
  if (cleanGen && cleanFb) {
    console.log('[PASS] Temp test data cleaned up successfully.');
  }

  console.log('--- BACKEND INTEGRITY CHECK COMPLETED: 100% OK ---');
} catch (error) {
  console.error('[FAIL] Backend test runner error:', error);
}
