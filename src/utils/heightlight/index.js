const Prism = require('prismjs'),
	getLoader = require('prismjs/dependencies'),
	components = require('prismjs/components'),
	componentsToLoad = ['markup', 'css', 'php'],
	loadedComponents = ['html', 'http'];

const loader = getLoader(components, componentsToLoad, loadedComponents);
loader.load(id => {
	require(`prismjs/components/prism-${id}.min.js`);
});

export const heightlight = (dom) => {
	const els = dom.querySelectorAll('[class*=language-]');
	els.forEach(el => {
		const match = el.classList[0].match(/language-([a-z]+)/i);
		if (match && match[1]) {
			const key = match[1];
			const text = el.innerText;
			console.log(key);
			el.innerHTML = Prism.highlight(text, Prism.languages[key], key);
		}
	});

	const achors = dom.querySelectorAll('a');
	achors.forEach(link => {
		link.appendChild(document.createElement('span'));
	});

};