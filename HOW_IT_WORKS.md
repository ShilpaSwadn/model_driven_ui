# How the YAML-Driven UI Works

This application demonstrates a **Model-Driven UI** pattern where the visual interface is controlled by a configuration file (`.yaml`) rather than hardcoded logic.

## 🏗️ Architecture Overview

The system consists of three main layers:

1.  **Data Layer (`src/data/userData.js`)**: A static JavaScript object containing all possible user information (name, email, age, etc.).
2.  **Configuration Layer (`src/config/displayConfig.yaml`)**: A human-readable YAML file that defines *which* fields to show and what *labels* to use for them.
3.  **Presentation Layer (`src/components/DynamicDisplay.jsx`)**: A React component that maps the configuration to the data and renders the UI.

## ⚙️ The "Secret Sauce": Instant Updates

Usually, reading a YAML file requires server-side logic (`fs.readSync`). However, this app uses `yaml-loader` integrated into **Next.js 16 (Turbopack)**.

### 1. The Loader
In `next.config.mjs`, we registered `yaml-loader`:
```js
turbopack: {
  rules: {
    '*.yaml': {
      loaders: ['yaml-loader'],
      as: '*.js',
    },
  },
}
```
This tells the build system: *"Whenever you see a .yaml import, convert it into a JavaScript object automatically."*

### 2. The Direct Import
In `DynamicDisplay.jsx`, we import the YAML file directly:
```js
import config from '@/config/displayConfig.yaml';
```
Because the file is imported like a normal module, Next.js **watches** it for changes. When you save the YAML file, Next.js triggers **Hot Module Replacement (HMR)**, causing the UI to re-render instantly without a page refresh.

## 🔄 Data Flow Process

1.  **Parsing**: The `yaml-loader` converts the YAML structure into a JSON-like object.
2.  **Mapping**: The `DynamicDisplay` component loops through the keys defined in the YAML.
3.  **Lookup**: For each key (e.g., `email`), the component looks up the corresponding value in `userData.js`.
4.  **Rendering**: The component renders a styled row using the label specified in the YAML (e.g., "Email Address").

## 🚀 Benefits of this Approach

*   **Non-Developer Friendly**: Marketing or Product teams can change the UI text or field order by editing a simple YAML file.
*   **Performance**: Since the YAML is processed at build/compile time, there is zero parsing overhead in the browser.
*   **Maintainability**: You don't need to touch React code to add or remove informational fields.
