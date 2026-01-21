// Import styles
import '../styl/main.styl';

// Import Handlebars templates
import './templates';

// Import and initialize the app
import { App } from './App';

// Initialize app and reveal UI
App.initialize();
document.body.classList.add('loaded');
