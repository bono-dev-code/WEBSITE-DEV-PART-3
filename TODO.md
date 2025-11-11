# SEO, Sitemap, Page Speed & Security Implementation TODO

## 1. Robots.txt Creation
- [x] Create robots.txt in root directory
- [x] Allow all crawlers to index main pages
- [x] Disallow indexing of Assets directory

## 2. Sitemap.xml Creation
- [x] Create sitemap.xml in root directory
- [x] Include all main pages with proper URLs (https://meatmasters.co.za)
- [x] Set appropriate priorities and change frequencies

## 3. Page Speed Optimization
- [x] Minify CSS (style.css) file
- [x] Minify JS (main.js) file
- [ ] Add lazy loading for product images in products.html
- [ ] Add lazy loading for team images in about.html
- [ ] Add loading="lazy" to slideshow images in index.html
- [ ] Add preload hints for critical resources (fonts, CSS)
- [ ] Suggest image compression tools for Assets folder

## 4. Security Implementation
- [ ] Add Content Security Policy (CSP) meta tag to all HTML files
- [ ] Add security headers meta tags (X-Frame-Options, X-Content-Type-Options)
- [ ] Add integrity checks for external CDN resources (Font Awesome, Google Fonts)
- [ ] Implement basic XSS protection in forms
- [ ] Add HTTPS enforcement meta tag

## 5. Testing & Validation
- [ ] Test robots.txt validity
- [ ] Test sitemap.xml validity
- [ ] Run Google PageSpeed Insights test
- [ ] Verify security headers implementation
- [ ] Check for any broken functionality after changes
- [ ] Remove unused original CSS and JS files (style.css, main.js)
