# ArchSpec Basic Template

A modern, feature-rich project management application built with React, TypeScript, and Vite, designed to streamline team collaboration and project tracking.

## Features

- 📊 Interactive Dashboard

  - Real-time project metrics and KPIs
  - Team activity tracking
  - Performance analytics
  - Top contributors tracking

- 👥 Team Collaboration

  - Task management and assignment
  - Progress monitoring
  - Real-time updates
  - Team member contributions

- 📈 Analytics & Reporting
  - Comprehensive project insights
  - Performance metrics
  - Productivity analysis
  - Custom reporting

## Tech Stack

- **Frontend Framework**: React 19.0.0
- **Language**: TypeScript 5.7.2
- **Build Tool**: Vite 6.3.1
- **State Management**: React Query 5.74.11
- **Styling**: TailwindCSS 3
- **Data Fetching**: Axios
- **Internationalization**: react-i18next with i18next
- **Testing**: Vitest 3.1.2
- **Development Experience**:
  - ESLint 9.22.0
  - Prettier 3.5.3
  - React Testing Library 16.3.0

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd archspec-template-basic
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier

## Architecture

The project follows a modular, component-based architecture with clear separation of concerns:

- `/src/components` - Reusable UI components
- `/src/pages` - Page components and routes
- `/src/context` - React Context providers
- `/src/hooks` - Custom React hooks
- `/src/lib` - Core functionality and services
- `/src/utils` - Utility functions
- `/src/types` - TypeScript type definitions
- `/src/i18n` - Internationalization configuration and translations

## Internationalization

The application supports multiple languages with an easy-to-use translation system:

- Currently supported languages: English, Spanish
- Language detection based on browser settings
- Easy-to-add new languages
- Comprehensive translation keys for all UI elements
- Language selector in settings

For implementation details and how to add new translations, see [i18n Documentation](./src/i18n/README.md).

## Coding Standards

- Strict TypeScript mode
- Functional components with hooks
- Comprehensive test coverage
- Clean code principles
- Modular architecture
- Consistent error handling

## Contributing

Please read our [Contribution Guidelines](./specs/contribution-guidelines.md) for details on our code of conduct and the process for submitting pull requests.

## Testing

Run the test suite:

```bash
pnpm test
```

For detailed test coverage:

```bash
pnpm test:coverage
```

## Unit Testing

Unit tests are essential for ensuring code quality, reliability, and maintainability. This project uses [Vitest](https://vitest.dev/) for fast, type-safe unit testing with coverage reporting.

### Running Tests

To run all unit tests:

```bash
pnpm test
```

To generate a coverage report:

```bash
pnpm test:coverage
```

### Coverage

- **Current test coverage:** 37.4% (as of last run)
- Coverage is measured across statements, branches, functions, and lines.
- Aim to increase coverage, especially for business logic and critical components.

### Environment Variables for Testing

> **Important:**
> Some unit and integration tests may require a `.env` file to be present in the project root.
>
> - You can copy `.env.example` to `.env`:
>   ```bash
>   cp .env.example .env
>   ```
> - Do **not** use real credentials in your test `.env` file.

### Best Practices

- Write isolated, deterministic tests for all business logic and UI components.
- Use mocks and stubs for external dependencies (e.g., API calls, network requests).
- Keep tests fast and maintainable.
- Review coverage reports to identify untested code paths.
- Ensure all new features include corresponding tests.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the excellent framework
- Vite team for the blazing fast build tool
- TailwindCSS team for the utility-first CSS framework
- React Query team for the powerful data fetching library

---

**Best Practices:**

- Review workflow files for security and compliance.
- Restrict service account permissions to only what is necessary for deployment.
- Monitor deployments and set up alerts for failed builds.

---

## UI Component Scaffolding with shadcn

This project leverages [shadcn/ui](https://ui.shadcn.com/) for rapid, consistent, and accessible UI component scaffolding. shadcn provides a library of customizable, headless UI components that align with modern design and accessibility standards.

### Adding New Components

To add a new UI component to the project, use the following command:

```bash
pnpm dlx shadcn@latest add <component>
```

For example, to add a button component:

```bash
pnpm dlx shadcn@latest add button
```

- Components will be scaffolded into the appropriate directory structure.
- You can customize the generated components to fit your project's design system.
- Refer to the [shadcn/ui documentation](https://ui.shadcn.com/docs) for a list of available components and advanced usage.

**Best Practices:**

- Review and refactor generated code to ensure alignment with project coding standards and type safety.
- Add comprehensive documentation and tests for any customized components.
