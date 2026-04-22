import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to prerender
const routes = [
  { path: '/', title: 'Epic Economics: What would you protest about today?', description: "Confused by the economy? Blending great economists' ideas with wicked humour, an LSE/World Bank veteran exposes the system. Discover why you're broke, how we got here and what we should fight for." },
  { path: '/preview', title: 'Preview - Epic Economics', description: 'Get a preview of Epic Economics - experience excerpts from our theatrical production exploring economic themes and social change.' },
  { path: '/press', title: 'Press & Media - Epic Economics', description: 'Press coverage, media kit, and news about Epic Economics theatrical production. Download high-resolution images and press materials.' },
  { path: '/contact', title: 'Contact Us - Epic Economics', description: 'Get in touch with the Epic Economics team. Contact us for bookings, press inquiries, or general questions about our theatrical production.' }
];

// Read the built index.html
const distPath = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distPath, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

console.log('🚀 Starting prerender process...\n');

// Function to generate static HTML for a route
function generateStaticHTML(route) {
  // Create a basic HTML shell with content for SEO
  const content = `
    <div id="root">
      <div class="prerendered-content">
        <header>
          <h1>Epic Economics: What would you protest about today?</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/preview">Preview</a>
            <a href="/press">Press & Media</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
        <main>
          ${route.path === '/' ? `
            <section>
              <h1>Epic Economics: What would you protest about today?</h1>
              <p>A play by Dimis Michaelides</p>
              <h2>About the Production</h2>
              <p>Epic Economics is a theatrical work based on the words of distinguished economists from the 18th century to today, highlighting their contributions and contradictions. The theories are interwoven with stories from the performer's own personal and professional journey, and peppered with wicked humor and some songs. The show is accompanied by an original soundscape.</p>
              <p>How does your breakfast make its way to your table? Why might you own an imported car? Who creates value? Why do we have recessions? What's more important, growth or equality?</p>
              <p>Markets. Value. Capital. Labour. Competition. Co-operation. Wealth. Trade. Innovation. Growth. Inequality. Crises.</p>
              <p><strong>What would you protest about today?</strong></p>
              <p>Economics is sometimes revered as a nebulous subject best left to "experts" and sometimes simplified to populist pseudo-science. This play promises to explore the nebulae and expose the pretenders.</p>
            </section>
          ` : ''}
          ${route.path === '/preview' ? `
            <section>
              <h1>Preview</h1>
              <p>Get a preview of Epic Economics - experience excerpts from our theatrical production exploring economic themes and social change.</p>
            </section>
          ` : ''}
          ${route.path === '/press' ? `
            <section>
              <h1>Press & Media</h1>
              <p>Press coverage, media kit, and news about Epic Economics theatrical production. Download high-resolution images and press materials.</p>
            </section>
          ` : ''}
          ${route.path === '/contact' ? `
            <section>
              <h1>Contact Us</h1>
              <p>Get in touch with the Epic Economics team. Contact us for bookings, press inquiries, or general questions about our theatrical production.</p>
            </section>
          ` : ''}
        </main>
      </div>
    </div>
  `;

  // Update meta tags
  let html = indexHtml
    .replace('<title>Epic Economics</title>', `<title>${route.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${route.description}">`
    )
    .replace(
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="https://epic-economics.dimis.org${route.path}">`
    )
    .replace('<div id="root"></div>', content);

  return html;
}

// Generate HTML for each route
routes.forEach((route) => {
  const html = generateStaticHTML(route);

  if (route.path === '/') {
    // Overwrite index.html
    fs.writeFileSync(indexHtmlPath, html);
    console.log(`✅ Prerendered: / → dist/index.html`);
  } else {
    // Create directory and index.html for the route
    const routeDir = path.join(distPath, route.path);
    const routeHtmlPath = path.join(routeDir, 'index.html');

    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    fs.writeFileSync(routeHtmlPath, html);
    console.log(`✅ Prerendered: ${route.path} → dist${route.path}/index.html`);
  }
});

console.log('\n🎉 Prerendering complete! All routes now have static HTML content.');
console.log('📦 Build output is ready for deployment.\n');
