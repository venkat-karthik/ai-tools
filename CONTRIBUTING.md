# Contributing to AI Tools Hub

Thank you for your interest in contributing to AI Tools Hub! This document provides guidelines for contributing to the project.

## How to Contribute

### Adding New Tools

1. Fork the repository
2. Create a new branch (`git checkout -b add-new-tool`)
3. Add your tool to `tools-data.js` following this format:

```javascript
{
    name: "Tool Name",
    category: "category", // ide, video, productivity, etc.
    url: "https://tool-url.com",
    description: "Clear description of what the tool does and its key features."
}
```

4. Commit your changes (`git commit -m 'Add [Tool Name] to [Category]'`)
5. Push to your branch (`git push origin add-new-tool`)
6. Open a Pull Request

### Categories

Available categories:
- `ide` - IDE & Coding tools
- `presentation` - Presentation tools
- `video` - Video & Image tools
- `productivity` - Productivity tools
- `automation` - Automation tools
- `content` - Content Creation tools
- `marketing` - Marketing tools
- `design` - Design tools
- `learning` - Learning & Education
- `deployment` - Deployment & Infrastructure
- `api` - APIs & Developer Tools

### Tool Description Guidelines

- Keep descriptions concise (1-2 sentences)
- Highlight the main use case
- Mention key features or unique selling points
- Use clear, professional language

### Code Style

- Use consistent indentation (4 spaces)
- Follow existing code patterns
- Add comments for complex logic
- Test your changes before submitting

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists
2. Create a new issue with a clear title
3. Provide detailed description
4. Include steps to reproduce (for bugs)
5. Add screenshots if applicable

### Feature Requests

We welcome feature requests! Please:

1. Check existing issues first
2. Describe the feature clearly
3. Explain the use case
4. Discuss potential implementation

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/venkat-karthik/ai-tools.git
cd ai-tools
```

2. Open `index.html` in your browser
3. Make your changes
4. Test thoroughly

## Pull Request Process

1. Update documentation if needed
2. Test on multiple browsers
3. Ensure responsive design works
4. Write clear commit messages
5. Reference any related issues

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the community

## Questions?

Feel free to reach out:
- Email: karthikkodeboyina@gmail.com
- Open an issue for discussion

Thank you for contributing! 🚀
