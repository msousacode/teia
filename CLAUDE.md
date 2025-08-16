# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SysABA is a Vue 3 + Quasar Framework application for managing Applied Behavior Analysis (ABA) therapy data. The system handles learners (aprendizes), professionals, evaluations, and training sessions with comprehensive data collection and reporting capabilities.

## Technology Stack

- **Frontend**: Vue 3 (Options API), Quasar Framework, TypeScript
- **State Management**: Pinia
- **Backend Integration**: Axios with custom HTTP wrapper
- **Build Tool**: Vite
- **Authentication**: JWT tokens with refresh mechanism
- **Charts**: ApexCharts, Chart.js
- **PDF Generation**: jsPDF with autotable
- **Deployment**: Netlify (Frontend), Custom backend at configurable URL

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# or for PWA mode
quasar dev -m pwa

# Build for production
npm run build
# or for PWA mode
quasar build -m pwa

# Linting and formatting
npm run lint
npm run format
```

## Architecture

### Directory Structure
- `src/pages/` - Feature-based page components organized by domain (aprendizes, atendimentos, avaliacoes, etc.)
- `src/services/` - API service layer with domain-specific services extending baseHttp
- `src/stores/` - Pinia stores for state management
- `src/composables/` - Reusable Vue composition functions
- `src/layouts/` - Layout components (MainLayout, LoginLayout, AtendimentoLayout, ObjetivoImportLayout)
- `src/components/` - Shared UI components

### Key Patterns

**HTTP Service Pattern**: All API services extend `baseHttp.ts` which provides:
- Automatic JWT token injection
- Standardized error handling
- Response normalization
- 401/500 status code handling

**Routing Strategy**: Uses hash mode routing with multiple layouts:
- Authentication routes under LoginLayout
- Main application under MainLayout  
- Specialized layouts for specific workflows

**State Management**: Pinia stores organized by domain (user, aprendiz, atendimento, avaliacao, etc.)

### Environment Configuration

The app uses environment-specific URLs configured in `quasar.config.js`:
- `API_URL`: Frontend hosting URL
- `BACKEND_URL`: Backend API base URL  
- Stripe configuration for payment processing

### Authentication Flow

JWT-based authentication with token management through `managerTokens` composable. Tokens are automatically injected into requests via HTTP interceptors.

### Evaluation System

Complex evaluation system supporting multiple assessment types:
- VB-MAPP (Verbal Behavior Milestones Assessment)
- ABLLS (Assessment of Basic Language and Learning Skills)
- Portage assessment across different age ranges
- Custom barrier evaluations

Each evaluation type has specialized data collection components and graphical reporting.

## Important Notes

- Uses Vue 3 Options API (not Composition API)
- TypeScript with strict typing for models and services
- Portuguese language interface and comments
- PWA-ready with service worker configuration
- Multi-platform support (web, mobile via Capacitor)


## Estilização

- Quando for solicitada alguma alteração de design no projeto considere sempre o seguinte: Use os recursos disponíveis pelo próprio framework quasar, considere o estilo atual do projeto, priorize sempre a responsividade, pois esse aplicativo é um PWA e deve funcionar em dispositivos móveis e web.
- As alterações de design devem ser ponderadas e não muito extrapoladas, priorize sempre a simplicidade de sofisticação.
- Sempre que possível ofereça opções de melhoria na usabilidade do aplicativo.


