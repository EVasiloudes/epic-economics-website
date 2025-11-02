# Epic Economics Website

A modern, interactive website for Epic Economics built with React, Vite, and GSAP animations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
epic-economics-website/
├── docs/                    # 📚 Complete documentation
│   ├── setup/              # Configuration guides
│   ├── design/             # Brand & design system
│   ├── guides/             # Implementation guides
│   ├── planning/           # Project planning docs
│   ├── development/        # Dev tools & examples
│   └── assets/             # Documentation assets
├── src/                    # 💻 Source code
├── public/                 # 🌐 Static assets
├── api/                    # 🔌 API endpoints
├── dist/                   # 📦 Production build
├── videos_EE/              # 🎥 Video assets
└── ee-web/                 # 🔧 Additional web components
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Animations**: GSAP (GreenSock)
- **Styling**: CSS3 with modern features
- **Email**: Resend API
- **Security**: Google reCAPTCHA
- **Deployment**: Vercel
- **Development**: ESLint + Hot Module Replacement

## 📖 Documentation

All project documentation is organized in the `/docs` folder:

- **[Setup Guides](docs/setup/)** - Configuration and service setup
- **[Design System](docs/design/)** - Brand guidelines and visual identity
- **[Implementation Guides](docs/guides/)** - Development best practices
- **[Project Planning](docs/planning/)** - Strategy and team information
- **[Development Tools](docs/development/)** - Examples and testing scripts

### Key Documents

- 🎨 [Brand Toolkit](docs/design/BRAND_TOOLKIT.md)
- 🎯 [GSAP Performance Guide](docs/guides/GSAP_PERFORMANCE_GUIDE.md)
- 📧 [Email Setup](docs/setup/EMAIL_CONFIG.md)
- 🔒 [reCAPTCHA Setup](docs/setup/RECAPTCHA_SETUP.md)
- 🚀 [Deployment Guide](docs/guides/WEBSITE_VISIBILITY_OPTIMIZATIONS.md)

## 🔧 Development

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd epic-economics-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your actual API keys (optional - form works without them)
   - Follow setup guides in `docs/setup/`

4. **Start development server**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

### Environment Variables

The application requires these environment variables for full functionality:

- `REACT_APP_RECAPTCHA_SITE_KEY` - reCAPTCHA v3 site key (optional)
- `RESEND_API_KEY` - Resend email service key (for API routes)
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA secret key (for API routes)

**Note:** The contact form works without these variables - reCAPTCHA will be disabled and email sending will be skipped with appropriate logging.

### Development Guidelines

- Follow the [Design System](docs/design/DESIGN_SYSTEM.md)
- Check [GSAP Performance Guide](docs/guides/GSAP_PERFORMANCE_GUIDE.md) for animations
- Review [Video Implementation](docs/guides/VIDEO_IMPLEMENTATION.md) for media integration

## 🚀 Deployment

The project is configured for deployment on Vercel with:
- Automatic deployments from main branch
- Environment variable management
- API route handling
- Static asset optimization

See [deployment configuration](vercel.json) for details.

## 🎬 Features

- **Responsive Design** - Mobile-first approach with modern CSS
- **GSAP Animations** - Smooth, performant animations
- **Video Integration** - Optimized video playback and controls
- **Contact Forms** - Secure forms with reCAPTCHA protection
- **Email Integration** - Resend API for reliable email delivery
- **SEO Optimized** - Meta tags, structured data, and performance optimization

## 🤝 Contributing

1. Read the documentation in `/docs`
2. Follow the established code style
3. Test your changes thoroughly
4. Update documentation as needed

## 📄 License

This project is proprietary. All rights reserved.

## 👥 Team

See [team credits and bios](docs/planning/credits-bios.md) for contributor information.

---

For detailed setup instructions, implementation guides, and project documentation, visit the [`/docs`](docs/) directory.