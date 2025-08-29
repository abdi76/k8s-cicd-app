# Contributing Guide

Thank you for your interest in contributing to this project!

## Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/k8s-cicd-app.git
   cd k8s-cicd-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Code Style

- Use ESLint configuration provided
- Follow JavaScript Standard Style
- Write meaningful commit messages
- Add tests for new features

## Testing

- Write unit tests for new functionality
- Ensure all tests pass before submitting
- Include integration tests where appropriate
- Maintain test coverage above 80%

## Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Use the provided PR template
   - Include description of changes
   - Reference any related issues
   - Ensure CI checks pass

## Commit Message Convention

Follow conventional commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Issue Reporting

Use the provided issue templates:
- Bug reports
- Feature requests
- Security issues

## Security

Report security vulnerabilities privately to the maintainers.

## Code Review

All submissions require review. We use GitHub pull requests for this purpose.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
