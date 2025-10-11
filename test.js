import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.join(__dirname, 'index.css');

test('CSS file exists and is valid', () => {
	assert.ok(fs.existsSync(cssPath), 'index.css should exist');

	const cssContent = fs.readFileSync(cssPath, 'utf8');

	// Check that file is not empty
	assert.ok(cssContent.length > 0, 'CSS file should not be empty');

	// Check for required @function declarations
	const functions = [
		// Math & Number
		'--negate',
		'--abs',
		'--lerp',
		'--map-range',
		'--ratio',
		'--sign',
		'--round-to',
		'--floor-to',
		'--ceil-to',
		'--hypot',
		// Color
		'--opacity',
		'--tint',
		'--shade',
		'--saturate',
		'--lighten',
		'--darken',
		'--rotate-hue',
		'--complement',
		'--invert',
		'--grayscale',
		'--text-on',
		'--opaque',
		'--mix',
		'--triadic',
		'--tetradic',
		'--black',
		'--white',
		// Typography
		'--fluid-type',
		'--modular-scale',
		'--line-height-length',
		'--line-height-ratio',
		'--line-height-unitless',
		// Layout
		'--sidebar-layout',
		'--conditional-radius',
		'--responsive-value',
		'--aspect-height',
		'--aspect-width',
		// Spacing
		'--spacing',
		'--container-padding',
		// Animation
		'--ease-out',
		'--elastic-ease',
		// Utility
		'--px-to-rem',
		'--rem-to-px',
		// Grid
		'--auto-grid',
		'--grid-span',
		// Filter
		'--smooth-shadow',
		'--glow',
		// Theme
		'--light-dark',
		'--theme-color',
	];

	for (const functionName of functions) {
		assert.ok(
			cssContent.includes(`@function ${functionName}`),
			`CSS should contain @function ${functionName}`,
		);
	}

	// Check for result descriptors
	assert.ok(
		cssContent.match(/result:/g).length > 0,
		'CSS should contain result descriptors',
	);

	// Check for proper CSS comments
	assert.ok(
		cssContent.includes('/**'),
		'CSS should contain documentation comments',
	);

	// Check for parameter definitions
	assert.ok(
		cssContent.includes('--value'),
		'CSS should contain parameter definitions',
	);

	console.log('✓ All CSS function declarations found');
	console.log(`✓ Total functions: ${functions.length}`);
});

test('Documentation exists', () => {
	const readmePath = path.join(__dirname, 'readme.md');
	assert.ok(fs.existsSync(readmePath), 'readme.md should exist');

	const readmeContent = fs.readFileSync(readmePath, 'utf8');

	// Check for important sections
	const sections = [
		'## Install',
		'## Usage',
		'## Functions',
		'## Examples',
		'## Browser support',
	];

	for (const section of sections) {
		assert.ok(
			readmeContent.includes(section),
			`README should contain section: ${section}`,
		);
	}

	console.log('✓ Documentation is complete');
});

test('Example file exists and references index.css', () => {
	const examplePath = path.join(__dirname, 'example.html');
	assert.ok(fs.existsSync(examplePath), 'example.html should exist');

	const exampleContent = fs.readFileSync(examplePath, 'utf8');

	// Check that example references the CSS file
	assert.ok(
		exampleContent.includes('index.css'),
		'Example should reference index.css',
	);

	// Check for function usage examples
	const exampleFunctions = [
		'--fluid-type',
		'--spacing',
		'--smooth-shadow',
		'--conditional-radius',
	];

	for (const functionName of exampleFunctions) {
		assert.ok(
			exampleContent.includes(functionName),
			`Example should demonstrate ${functionName}`,
		);
	}

	console.log('✓ Example file is properly configured');
});

test('Package.json is properly configured', () => {
	const packagePath = path.join(__dirname, 'package.json');
	const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

	assert.strictEqual(packageJson.name, 'css-extras', 'Package name should be css-extras');
	assert.strictEqual(packageJson.exports, './index.css', 'Should export index.css');
	assert.ok(packageJson.keywords.includes('css'), 'Keywords should include css');
	assert.ok(packageJson.keywords.includes('functions'), 'Keywords should include functions');

	console.log('✓ Package.json is valid');
});
