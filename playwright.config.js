import { defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Where the actual tests are located

  testMatch: '**/*.spec.js', // Pattern to find test files

  timeout: 77 * 1000, // explicit timeout globally

  expect :{
    timeout : 5000, // timeout only for the expect (Assertions)
  },
  
  reporter : 'html',
  use: {
    browserName:'chromium', // Default Browser Configuration to run the project 
    // browserName:'firefox',
    // browserName:'webkit',
    headless:false, // runs in headed mode
  }

});

