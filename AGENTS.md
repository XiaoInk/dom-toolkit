# AGENTS.md - DOM Toolkit Development Guide

This guide provides essential information for agentic coding agents working on the DOM Toolkit codebase.

## Quick Commands

### Build Commands
```bash
npm run build          # Build main library bundle
npm run build:inject    # Build console injection version
npm run build:modules   # Build individual ES modules
npm run build:all       # Build all versions
npm run dev            # Build with watch mode for development
```

### Testing
⚠️ **No test framework configured** - Manual testing required:
- Use browser console for testing
- Load examples in `examples/` directory
- Test with CDN demo: `examples/cdn-demo.html`

## Project Structure

```
dom-toolkit/
├── src/                    # Source code (all IIFE modules)
│   ├── index.js           # Main API facade
│   ├── coordinate.js      # Mouse coordinate display
│   ├── detector.js        # Element detection utilities
│   ├── interactor.js      # Click/touch interaction
│   └── scroller.js       # Scroll control
├── dist/                  # Build outputs
├── examples/              # Usage examples and demos
└── vite*.config.js        # Build configurations
```

## Code Style Guidelines

### Module Pattern
All source files must use the IIFE (Immediately Invoked Function Expression) pattern:

```javascript
/**
 * 模块描述 (Chinese comments preferred)
 */
(function() {
  'use strict';
  
  const moduleName = {
    // Module properties and methods
    isReady: false,
    
    methodName(param1, param2 = {}) {
      return new Promise((resolve, reject) => {
        try {
          // Implementation logic
          if (!condition) {
            reject(new Error('Descriptive error message'));
            return;
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
  };
  
  // Export to global or module system
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = moduleName;
  } else {
    window.domToolkitModuleName = moduleName;
  }
})();
```

### Naming Conventions
- **Files**: kebab-case (`coordinate.js`, `element-detector.js`)
- **Functions**: camelCase (`getElementAt`, `startRealtimeDetection`)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE (rare)
- **Global exports**: `window.domToolkitModuleName`

### Import/Export Pattern
- Use conditional exports for browser/Node.js compatibility
- Export to `window.domToolkitModuleName` for browser usage
- Reference other modules via `window.domToolkitModuleName`
- Handle missing modules gracefully with Promise rejection

### Error Handling
```javascript
return new Promise((resolve, reject) => {
  try {
    const element = document.elementFromPoint(x, y);
    if (!element) {
      reject(new Error(`No element found at coordinates (${x}, ${y})`));
      return;
    }
    resolve(element);
  } catch (error) {
    reject(error);
  }
});
```

### DOM Interaction Guidelines
- All coordinates are viewport-relative (clientX/clientY)
- Use `getBoundingClientRect()` for element positioning
- Clean up DOM elements (event listeners, created elements)
- Use z-index 10000+ for UI overlays
- Handle both mouse and touch events when applicable

### CSS-in-JS Style
```javascript
element.style.cssText = `
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px;
  z-index: 10000;
`;
```

## API Design Patterns

### Coordinate-based Operations
- All interactions accept `(x, y)` as first parameters
- Optional `options` parameter as last argument
- Return Promises for async operations

### Method Naming
- Use descriptive action verbs: `getElementAt`, `startRealtimeDetection`
- Provide aliases for compatibility: `clickAt` → `click`
- Use consistent prefixes: `start*`, `stop*`, `get*`, `set*`

### Promise-based APIs
```javascript
// Good
click(x, y, options = {}) {
  return new Promise((resolve, reject) => {
    // Implementation
  });
}

// Avoid - synchronous operations should still return resolved promises
getResult() {
  return Promise.resolve(result);
}
```

## Adding New Features

### 1. Create Module
- Add new file in `src/` following IIFE pattern
- Export as `window.domToolkitNewModule`

### 2. Update Main Index
- Add facade methods in `src/index.js`
- Handle module loading gracefully
- Provide compatibility aliases

### 3. Build Configuration
- Update `vite*.config.js` if new entry points needed
- Test all build targets with `npm run build:all`

### 4. Documentation
- Update `README.md` with new API methods
- Add examples in `examples/` directory
- Include JSDoc comments for public methods

## Browser Compatibility

### Target Environment
- Modern browsers (ES6+)
- No IE support required
- Use standard DOM APIs (no jQuery)

### Feature Detection
```javascript
if (!window.MouseEvent || !document.elementFromPoint) {
  return Promise.reject(new Error('Browser not supported'));
}
```

## Performance Considerations

### Event Handling
- Remove event listeners when no longer needed
- Use passive event listeners where possible
- Throttle/debounce high-frequency events (mouse, scroll)

### DOM Manipulation
- Batch DOM operations
- Use document fragments for multiple insertions
- Clean up created elements after use

### Memory Management
- Clear timeouts/intervals
- Remove event listeners
- Set object references to null when done

## Debugging

### Console Output
- Use `console.log` for debugging (not production)
- Include descriptive messages with context
- Chinese error messages are acceptable (matches existing code)

### Browser Testing
- Test in multiple browsers during development
- Verify coordinate calculations across different screen sizes
- Test both mouse and touch interactions

## Code Quality Notes

### Current State
- ✅ Good separation of concerns
- ✅ Consistent module pattern
- ✅ Promise-based APIs
- ❌ No linting configured
- ❌ No testing framework
- ❌ Mixed Chinese/English comments

### Recommendations
- Consider adding ESLint for code consistency
- Add unit testing framework (Jest/Vitest)
- Standardize comment language (prefer English for new code)
- Add TypeScript definitions for better IDE support

## Build Outputs

### Main Library (`dist/dom-toolkit.js`)
- Full bundle with all modules
- IIFE format for browser usage

### Inject Version (`dist/dom-toolkit.inject.min.js`)
- Console injection capable
- Aggressively minified
- Top-level variable mangling

### Individual Modules (`dist/modules/*.min.js`)
- Separate ES modules
- For selective loading
- Modern bundle optimization

## Development Workflow

1. **Make Changes**: Edit files in `src/`
2. **Watch Mode**: `npm run dev` for automatic builds
3. **Test**: Manual testing in browser console
4. **Build All**: `npm run build:all` before committing
5. **Verify**: Test all three build outputs

## Module Dependencies

- `index.js` - Main facade (depends on all other modules)
- `coordinate.js` - Standalone
- `detector.js` - Standalone  
- `interactor.js` - Standalone
- `scroller.js` - Standalone

Modules are designed to work independently. Load only what you need.