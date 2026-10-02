import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to prerender
const routes = [
  { path: '/', title: 'Epic Economics: What would you protest about today? — Athens, 4 December 2026', description: "Confused by the economy? An LSE/World Bank veteran puts the system on stage. Discover why you're broke, how we got here. Athens, 4 December 2026." },
  { path: '/preview', title: 'Preview - Epic Economics', description: 'Get a preview of Epic Economics - experience excerpts from our theatrical production exploring economic themes and social change.' },
  { path: '/reviews', title: 'Reviews - Epic Economics', description: 'Fringe 2026 reviews of Epic Economics from British Theatre Guide, The Scotsman and Edinburgh Guide, plus audience reactions and high-resolution press photography.' },
  { path: '/contact', title: 'Contact Us - Epic Economics', description: 'Get in touch with the Epic Economics team. Contact us for bookings, press inquiries, or general questions about our theatrical production.' },
  { path: '/technical', title: 'Technical Information - Epic Economics', description: 'Stage plan, equipment requirements, and technical specifications for Epic Economics theatrical production.', noindex: true }
];

// The next performance. Crawlers read this static HTML, not the React app, so
// the date and venue have to live here as text — not only in Home.jsx.
const nextPerformance = `
  <section>
    <h2>Next performance: Athens</h2>
    <p><strong>Friday, 4 December 2026, 20:30</strong></p>
    <p>Michael Cacoyannis Foundation — Cinema Hall, 206 Piraeus Street, Tavros, Athens 177 78, Greece.</p>
    <p>One night only. 60 minutes, no interval. English with a touch of Greek.</p>
    <p>Tickets €15, or €12 for students, senior citizens and persons with disabilities, via TicketPlus. Tickets go on sale shortly — until then, email the box office at <a href="https://www.mcf.gr/">mcf.gr</a> or <a href="/contact">write to us</a>.</p>
  </section>
`;

// Fringe 2026 press reviews. The publication names are the searchable part, so
// they have to survive into the prerendered markup.
const pressReviews = [
  {
    quote: 'This is a powerful, humorous and charismatic production. Do go!',
    source: 'British Theatre Guide',
  },
  {
    quote: 'Making economics and political engagement not only interesting, but also funny, is no mean feat. Michaelides manages it with charm.',
    source: 'Edinburgh Guide',
  },
  {
    quote: 'A highly entertaining and important whistlestop tour through centuries of economic thought.',
    source: 'Everything Theatre',
  },
  {
    quote: 'Michaelides certainly proves economics doesn’t have to be dull.',
    source: 'The Scotsman',
  },
  {
    quote: 'Perhaps economists do have some use, after all.',
    source: 'Fringe Review',
  },
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
            <a href="/reviews">Reviews</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
        <main>
          ${route.path === '/' ? `
            <section>
              <h1>Epic Economics: What would you protest about today?</h1>
              <p>A play by Dimis Michaelides</p>
              ${nextPerformance}
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
          ${route.path === '/reviews' ? `
            <section>
              <h1>Reviews</h1>
              <p>Fringe 2026 reviews of Epic Economics from British Theatre Guide, The Scotsman and Edinburgh Guide, plus audience reactions and high-resolution press photography.</p>
              <h2>Edinburgh Festival Fringe 2026 press reviews</h2>
              <blockquote>
                <ul>
                  ${pressReviews.map((review) => `
                    <li>
                      <p>"${review.quote}"</p>
                      <p>— ${review.source}</p>
                    </li>
                  `).join('')}
                </ul>
              </blockquote>
            </section>
          ` : ''}
          ${route.path === '/contact' ? `
            <section>
              <h1>Contact Us</h1>
              <p>Get in touch with the Epic Economics team. Contact us for bookings, press inquiries, or general questions about our theatrical production.</p>
            </section>
          ` : ''}
          ${route.path === '/technical' ? `
            <section>
              <h1>Epic Economics - Technical Information</h1>
              <p>Stage plan, equipment requirements, and technical specifications</p>
            </section>
          ` : ''}
        </main>
      </div>
    </div>
  `;

  // Update meta tags (tolerant of optional whitespace + self-closing slash)
  let html = indexHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${route.description}" />`
    )
    .replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      route.noindex
        ? `<meta name="robots" content="noindex, nofollow" />`
        : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="https://epic-economics.dimis.org${route.path}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="https://epic-economics.dimis.org${route.path}" />`
    )
    .replace(
      /<meta\s+property="twitter:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="twitter:url" content="https://epic-economics.dimis.org${route.path}" />`
    )
    .replace('<div id="root"></div>', content);

  return html;
}

// Remove stale route directories that are no longer prerendered (e.g. /press)
const validRouteDirs = new Set(routes.filter(r => r.path !== '/').map(r => r.path));
fs.readdirSync(distPath, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'assets' && d.name !== 'js' && d.name !== 'images' && d.name !== 'videos')
  .forEach(d => {
    const routePath = '/' + d.name;
    if (!validRouteDirs.has(routePath)) {
      fs.rmSync(path.join(distPath, d.name), { recursive: true, force: true });
      console.log(`🧹 Removed stale route directory: ${routePath}`);
    }
  });

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
