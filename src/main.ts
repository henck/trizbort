// Import styles
import '../css/main.css';

// Import Handlebars templates
import './templates';

// Import and initialize the app
import { App } from './App';

// Initialize app and reveal UI
App.initialize();
document.body.classList.add('loaded');
