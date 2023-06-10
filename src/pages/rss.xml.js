import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get(context) {
	const posts = await getCollection('blog');
	return rss({
		stylesheet: 'pretty-feed-v3.xsl',
		title: 'PixelDud\'s Blog',
		description: 'PixelDud\'s blog posts in a handy RSS feed!',
		site: context.site,
		items: posts.map((post) => ({
			link: `/blog/${post.slug}/`,
			content: sanitizeHtml(parser.render(post.body)),
			...post.data,
		})),
	});
}
