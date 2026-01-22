const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets/*.png");
  eleventyConfig.addPassthroughCopy("assets/*.jpg");
  eleventyConfig.addPassthroughCopy("assets/*.svg");
  eleventyConfig.addPassthroughCopy("assets/*.ico");
  eleventyConfig.addPassthroughCopy("assets/custom.css");
  eleventyConfig.addPassthroughCopy("app");

  // Markdown configuration with attributes support (for {:class="btn"} syntax)
  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true
  }).use(markdownItAttrs);
  eleventyConfig.setLibrary("md", md);

  // Filters

  // Date formatting (replaces Jekyll's date filter)
  eleventyConfig.addFilter("date", (dateObj, format) => {
    if (!dateObj) return "";
    if (format === "%b %-d, %Y") {
      format = "LLL d, yyyy"; // Luxon equivalent
    }
    if (typeof dateObj === "string") {
      dateObj = new Date(dateObj);
    }
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format || "LLL d, yyyy");
  });

  // XML date format for feeds
  eleventyConfig.addFilter("date_to_xmlschema", (dateObj) => {
    if (!dateObj) return "";
    if (typeof dateObj === "string") {
      dateObj = new Date(dateObj);
    }
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  // Escape filter
  eleventyConfig.addFilter("escape", (str) => {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  });

  // CGI escape filter
  eleventyConfig.addFilter("cgi_escape", (str) => {
    if (!str) return "";
    return encodeURIComponent(str);
  });

  // Markdownify filter
  eleventyConfig.addFilter("markdownify", (str) => {
    if (!str) return "";
    return md.render(str);
  });

  // Relative URL filter (for compatibility)
  eleventyConfig.addFilter("relative_url", (url) => {
    return url || "";
  });

  // Absolute URL filter (for compatibility with Jekyll)
  eleventyConfig.addFilter("absolute_url", (url) => {
    return url || "";
  });

  // Truncate filter for excerpts
  eleventyConfig.addFilter("truncate", (str, length) => {
    if (!str) return "";
    str = String(str).replace(/<[^>]*>/g, ''); // Strip HTML tags
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  });

  // Excerpt filter - extracts content before <!--more--> tag
  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const separator = /<!--\s*more\s*-->/i;
    const match = content.split(separator);
    return match[0] || content;
  });

  // Size filter for arrays
  eleventyConfig.addFilter("size", (arr) => {
    if (!arr) return 0;
    return arr.length;
  });

  // Create posts collection (sorted by date descending)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.markdown").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Add .markdown as an alias for .md
  eleventyConfig.addExtension("markdown", {
    key: "md"
  });

  // Ignore the old Jekyll _posts folder (use posts/ instead)
  eleventyConfig.ignores.add("_posts/**");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["md", "markdown", "njk", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid"
  };
};
