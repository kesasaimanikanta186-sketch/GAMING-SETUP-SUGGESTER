import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || '';
const hasApiKey = API_KEY && API_KEY !== 'YOUR_GEMINI_API_KEY';

// Initialize the Gemini SDK if key is provided
let genAI = null;
if (hasApiKey) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Builds the prompt for Gemini model
 */
const buildPrompt = (input) => {
  return `You are a professional gaming room interior design consultant working for NETHI MALLIKARJUN GUPTA, a premium retail gaming accessories and gym equipment business based in Hyderabad.
Based on the following customer details, design a customized, ergonomic, and aesthetically pleasing gaming room setup layout.

Customer Details:
- Customer Name: ${input.customer_name}
- Room Dimensions: Length = ${input.room_length} ft, Width = ${input.room_width} ft, Height = ${input.room_height} ft
- Budget: ₹${input.budget}
- Gaming Device Type: ${input.device_type} (e.g., PC, Console, Laptop, Multi-device)
- Current Setup Status: ${input.current_setup || "None"}
- Preferred Theme/Vibe: ${input.theme} (e.g., RGB, Minimal, Dark, Premium, Futuristic)
- Desk Size Preference: ${input.desk_size || "Standard"}
- Lighting Preference: ${input.lighting || "None"}
- Cable Management Needs: ${input.cable_management || "None"}
- Storage/Accessory Needs: ${input.storage || "None"}
- Additional Notes: ${input.notes || "None"}

Ensure your recommendation contains practical interior design instructions. Recommend specific accessories like gaming chairs, monitor mounts, keyboards, mice, and headsets that NETHI MALLIKARJUN GUPTA would sell to fit the user's budget and theme.

Return ONLY a valid JSON object matching the following structure exactly. Do not wrap the JSON in markdown formatting or any other text. Do not include markdown code block characters like \`\`\`json. Return a raw JSON string.

JSON Schema:
{
  "deskArrangement": {
    "title": "Desk Arrangement",
    "description": "Suggest where to place the desk in the room based on dimensions (length, width, height) and theme.",
    "details": ["Bullet point 1 detailing position", "Bullet point 2 detailing orientation and spacing"]
  },
  "devicePlacement": {
    "title": "Monitor & Device Placement",
    "description": "Suggest screen height, viewing angle, and device positioning.",
    "details": ["Bullet point 1 on monitor arm adjustment", "Bullet point 2 on secondary screens or console mounting"]
  },
  "chairPlacement": {
    "title": "Ergonomic Chair Position",
    "description": "Where to place the gaming chair relative to doors, windows, and screens.",
    "details": ["Bullet point 1 on ergonomic alignment", "Bullet point 2 on seat height and posture"]
  },
  "lightingSuggestion": {
    "title": "Lighting & Ambience",
    "description": "Ambient, accent, and task lighting setup adhering to the chosen theme.",
    "details": ["Bullet point 1 on LED strips/bars positioning", "Bullet point 2 on screen bar or smart panels"]
  },
  "cableManagement": {
    "title": "Cable Management Plan",
    "description": "Clean, hidden cabling setup recommendations.",
    "details": ["Bullet point 1 on under-desk routing", "Bullet point 2 on bundling/sleeves"]
  },
  "accessories": {
    "title": "Nethi Mallikarjun Gupta Accessory Recommendations",
    "description": "A curated list of accessories fitting the customer's budget and style, emphasizing products offered by the business.",
    "list": [
      {
        "name": "Accessory Name (e.g., Premium Gaming Chair)",
        "brand": "NETHI Signature Series",
        "price": "₹ Price (estimate)",
        "reason": "Why this specific accessory fits their profile"
      }
    ]
  },
  "budgetRecommendations": {
    "title": "Budget Utilization Breakdown",
    "description": "Cost breakdown for recommended upgrades and where to save vs spend.",
    "details": ["Cost allocation breakdown item 1", "Cost allocation breakdown item 2"]
  },
  "safetyComfortTips": {
    "title": "Safety & Comfort Tips",
    "description": "Safety tips, ergonomics, posture, and electrical safety suggestions.",
    "details": ["Ergonomic posture tips", "Electrical load safety tips"]
  },
  "summary": {
    "title": "Final Setup Summary",
    "description": "A neat concluding paragraph summarizing the complete look and feel of the design setup."
  }
}`;
};

/**
 * Generates a mock setup plan if the API key is invalid or missing.
 * This ensures the app is 100% testable and looks identical to an actual AI response.
 */
export const generateMockSetupPlan = (input) => {
  const budgetVal = parseFloat(input.budget) || 50000;
  const theme = input.theme || 'RGB';
  const name = input.customer_name || 'Valued Customer';
  const device = input.device_type || 'PC';

  // Customize recommendations based on theme
  let lightingDetails = [];
  let colorPalette = "";
  if (theme === 'RGB') {
    colorPalette = "Vibrant Neon Pink, Cyan, and Deep Blue";
    lightingDetails = [
      "Install NETHI Smart RGBIC LED Strips along the back edge of the desk for ambient back-wall glowing.",
      "Add two vertical RGB light bars behind the monitor, synchronized to screen colors.",
      "Place an RGB gaming mousepad under the keyboard and mouse."
    ];
  } else if (theme === 'Minimal') {
    colorPalette = "Warm Oak, Matte White, and Charcoal Grey";
    lightingDetails = [
      "Mount a NETHI Warm LED monitor light bar (screenbar) to reduce eye strain without glare.",
      "Place a minimal warm white desk lamp on the left side of the table for task lighting.",
      "Use subtle warm-white under-cabinet puck lights if using floating shelves."
    ];
  } else if (theme === 'Dark') {
    colorPalette = "Deep Matte Black, Obsidian, and Crimson Red Accents";
    lightingDetails = [
      "Use dark ambient red or purple background LED backlighting.",
      "Ensure task lighting is focused only on the keyboard using a directional spotlight.",
      "Use blackout curtains to restrict daylight and maintain consistent dark mode aesthetics."
    ];
  } else if (theme === 'Premium') {
    colorPalette = "Walnut Wood, Brushed Brass, and Midnight Navy";
    lightingDetails = [
      "Use smart diffused light panels (like Hexagon smart panels) on the main accent wall.",
      "Install dimmable warm-to-cool recessed lighting in the ceiling.",
      "Add an under-desk solid light strip running a soft golden hue."
    ];
  } else {
    // Futuristic
    colorPalette = "Monochrome Silver, Holographic Accents, and Electrifying Violet";
    lightingDetails = [
      "Install RGB neon flex pipes forming futuristic patterns on the primary wall.",
      "Add blue under-glow under the desk and chair base.",
      "Place dynamic smart-pillars in the corners of the room."
    ];
  }

  // Accessories matching budget
  const accessoryList = [];
  if (budgetVal >= 100000) {
    accessoryList.push(
      { "name": "Premium Ergonomic Gaming Chair", "brand": "NETHI Crown Series Titan", "price": "₹18,500", "reason": "Offers advanced lumbar support, 4D armrests, and 180-degree recline for long gaming sessions." },
      { "name": "Heavy-Duty Dual Monitor Gas-Spring Mount", "brand": "NETHI Ergo-Flex Dual", "price": "₹4,999", "reason": "Clears desk space by lifting screens, allowing perfect height and tilt adjustments." },
      { "name": "Wireless Mechanical Gaming Keyboard", "brand": "NETHI Stealth mechanical Pro", "price": "₹6,499", "reason": "Tactile yellow switches with 0.1ms latency and custom hot-swappable keys." },
      { "name": "Precision Lightweight Wireless Mouse", "brand": "NETHI Hyper-Light", "price": "₹3,999", "reason": "59g weight with a high-end 26K DPI optical sensor for competitive shooter accuracy." }
    );
  } else if (budgetVal >= 50000) {
    accessoryList.push(
      { "name": "Aero-Mesh Gaming Chair", "brand": "NETHI Airflow-V2", "price": "₹11,999", "reason": "Breathable mesh back optimized for Hyderabad's hot weather, maintaining ergonomic spine alignment." },
      { "name": "Single Gas-Spring Monitor Arm", "brand": "NETHI Ergo-Flex Solo", "price": "₹2,899", "reason": "Sturdy metallic desk clamp supporting up to 32\" displays with cable routing channels." },
      { "name": "RGB Wired Mechanical Keyboard", "brand": "NETHI Combat Blue-Switch", "price": "₹3,299", "reason": "Clicks satisfy tactile response requirements, built with solid metal top plate." },
      { "name": "RGB Wired Gaming Mouse", "brand": "NETHI Pulse RGB", "price": "₹1,499", "reason": "Sleek honeycomb shell with side macro buttons for customizable shortcuts." }
    );
  } else {
    accessoryList.push(
      { "name": "Ergonomic Comfort Gaming Chair", "brand": "NETHI Lite Gaming", "price": "₹8,500", "reason": "Affordable entry-level high-back chair with neck and lumbar pillows." },
      { "name": "Multi-Angle Metal Laptop Stand", "brand": "NETHI Elevate Slim", "price": "₹1,299", "reason": "Elevates laptop screen to eye level to prevent neck slouching, fits budget perfectly." },
      { "name": "Tenkeyless Membrane Gaming Keyboard", "brand": "NETHI Neo-Wired", "price": "₹1,199", "reason": "Budget-friendly TKL layout to save desk space, includes RGB lighting." },
      { "name": "Ergonomic Office Mouse", "brand": "NETHI Glide Wireless", "price": "₹899", "reason": "Simple 1600 DPI wireless mouse with silent clicks, perfect for compact hybrid setups." }
    );
  }

  return {
    "isMock": true,
    "deskArrangement": {
      "title": "Desk Arrangement",
      "description": `For a room measuring ${input.room_length}x${input.room_width} ft, we recommend placing your ${input.desk_size || 'Standard'} desk against the primary wall, facing away from direct window glare.`,
      "details": [
        `Place the desk centering on the ${input.room_length} ft wall to allow at least 3 ft of walking space behind the chair.`,
        "Avoid placing the desk directly in front of the door to enhance focus and minimize distractions.",
        `Position the setup at least 1 foot away from the wall to allow for adequate cable drop and ventilation.`
      ]
    },
    "devicePlacement": {
      "title": "Monitor & Device Placement",
      "description": `Optimizing display alignment for a ${device}-based setup to prevent neck strain and improve gaming performance.`,
      "details": [
        `Position the primary screen at a distance of 20-30 inches from your eyes (roughly one arm's length).`,
        "Align the top third of the monitor screen with your eye level when sitting upright.",
        device === 'Laptop' 
          ? "Use a laptop riser or external monitor mount so you do not hunch over the built-in keyboard."
          : "Mount the display on a mechanical monitor arm to free up valuable real estate on your desk."
      ]
    },
    "chairPlacement": {
      "title": "Ergonomic Chair Position",
      "description": "Adjusting chair positioning relative to the desk heights and room doorways.",
      "details": [
        "Seat height should be adjusted so your feet rest flat on the floor, with knees at a 90-degree angle.",
        "Position the chair close enough to the desk so your elbows are bent at 90-100 degrees while typing.",
        "Maintain a clearance of 3 feet behind the chair to swing or roll back without hitting closets or walls."
      ]
    },
    "lightingSuggestion": {
      "title": "Lighting & Ambience Plan",
      "description": `Theme-specific lighting matching the ${theme} vibe using a ${colorPalette} palette.`,
      "details": lightingDetails
    },
    "cableManagement": {
      "title": "Cable Management Plan",
      "description": `Recommendations to handle the requested cable management: "${input.cable_management || 'Standard under-desk management'}".`,
      "details": [
        "Mount a heavy-duty NETHI cable management tray/basket underneath the desk surface.",
        "Use Velcro straps (avoid zip-ties for cables you change often) to bundle power and display cords into a single channel.",
        "Place a 5-outlet surge protector box inside the tray, feeding only a single thick extension cable down to the wall outlet."
      ]
    },
    "accessories": {
      "title": "Nethi Mallikarjun Gupta Accessory Recommendations",
      "description": `Curated additions matching your ₹${budgetVal.toLocaleString('en-IN')} budget to complete the ultimate setup:`,
      "list": accessoryList
    },
    "budgetRecommendations": {
      "title": "Budget Utilization Breakdown",
      "description": `Detailed recommendation on allocating your ₹${budgetVal.toLocaleString('en-IN')} budget:`,
      "details": [
        `Allocate roughly 30% (₹${(budgetVal * 0.3).toLocaleString('en-IN')}) towards a high-quality desk and ergonomic NETHI chair, as this prevents physical strain.`,
        `Dedicate 50% (₹${(budgetVal * 0.5).toLocaleString('en-IN')}) towards functional hardware upgrades (like double arms or gaming accessories).`,
        `Reserve 20% (₹${(budgetVal * 0.2).toLocaleString('en-IN')}) for styling improvements (cables, RGB lighting, acoustic panels).`
      ]
    },
    "safetyComfortTips": {
      "title": "Safety & Comfort Tips",
      "description": "Important tips regarding healthy ergonomics, eye care, and electrical safety.",
      "details": [
        "Follow the 20-20-20 rule: Every 20 minutes, look at an object 20 feet away for at least 20 seconds.",
        "Never overload a single wall extension box. Split high-wattage hardware (like a PC tower and heaters) into separate wall sockets.",
        "Ensure proper ventilation around your system. A PC tower should have at least 6 inches of clearance on all sides for optimal air intake/exhaust."
      ]
    },
    "summary": {
      "title": "Final Setup Summary",
      "description": `The proposed ${theme} themed setup creates an amazing, productive, and immersive environment for ${name}. Combining ergonomic NETHI seating with organized cable routing and custom ${colorPalette} lighting will completely transform this room into a professional-grade gaming room.`
    }
  };
};

/**
 * Generates the interior design suggestions using Gemini API.
 * Automatically falls back to high-quality mock if the API key is not present or calls fail.
 */
export const generateSetupPlan = async (input) => {
  const startTime = Date.now();
  
  if (!hasApiKey || !genAI) {
    console.log('Gemini API key not configured or using placeholder. Running mock generator...');
    const result = generateMockSetupPlan(input);
    result.response_time_ms = Date.now() - startTime;
    return result;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const promptText = buildPrompt(input);
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const responseText = response.text();

    // Parse output JSON
    const parsedData = JSON.parse(responseText.trim());
    parsedData.isMock = false;
    parsedData.response_time_ms = Date.now() - startTime;
    return parsedData;

  } catch (error) {
    console.error('Gemini API Generation Error, falling back to mock database:', error);
    
    // Attempt cleaning if JSON was wrapped in markdown
    try {
      const errorMsg = error.message || '';
      // We can scan for brackets if the model returned malformed json, but since it's a catch block, we fell back.
      // Let's generate a clean mock plan so the service stays alive and working.
      const mockResult = generateMockSetupPlan(input);
      mockResult.isMock = true;
      mockResult.api_error = error.message || 'API Exception';
      mockResult.response_time_ms = Date.now() - startTime;
      return mockResult;
    } catch (fallbackError) {
      // absolute worst case
      throw new Error(`AI suggestion service failed: ${error.message}`);
    }
  }
};
