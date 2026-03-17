# model_driven_ui / YAML-Driven Dynamic UI

A model-driven architecture built with Next.js that dynamically generates a user interface based on a YAML configuration file.

## Features
- **Dynamic Fields**: Select which user fields to display via `displayConfig.yaml`.
- **Hot Reloading**: UI updates instantly when the YAML configuration is saved.
- **Model-Driven**: Logic and presentation are separated from configuration.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

## Configuration
Modify `src/config/displayConfig.yaml` to change the displayed fields:
```yaml
display:
  firstname: First Name
  email: Email Address
  # Add or remove fields here
```
