#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
Test runner for CSS functions using Puppeteer.

Validates computed styles match expected values.
*/

const tests = [
	// Math & Number tests
	{
		name: '--negate(10px)',
		selector: '.test-math',
		property: '--test-negate-positive',
		expected: 'calc(-1 * 10px)',
	},
	{
		name: '--negate(-10px)',
		selector: '.test-math',
		property: '--test-negate-negative',
		expected: 'calc(-1 * -10px)',
	},
	{
		name: '--abs(10px)',
		selector: '.test-math',
		property: '--test-abs-positive',
		expected: 'max(10px, calc(-1 * 10px))',
	},
	{
		name: '--abs(-10px)',
		selector: '.test-math',
		property: '--test-abs-negative',
		expected: 'max(-10px, calc(-1 * -10px))',
	},
	{
		name: '--lerp(0px, 100px, 0.5)',
		selector: '.test-math',
		property: '--test-lerp-half',
		expected: 'calc(0px + (100px - 0px) * 0.5)',
	},
	{
		name: '--map-range(50, 0, 100, 0px, 200px)',
		selector: '.test-math',
		property: '--test-map-range',
		expected: 'calc(0px + (200px - 0px) * clamp(0, calc((50 - 0) / (100 - 0)), 1))',
	},
	{
		name: '--ratio(8px * 2, 0.55em + 0.45em)',
		selector: '.test-math',
		property: '--test-ratio-dimension',
		expected: 'tan(atan2(8px * 2, 0.55em + 0.45em))',
	},
	{
		name: '--ratio(8 * 2, 5.5 + 4.5)',
		selector: '.test-math',
		property: '--test-ratio-number',
		expected: 'tan(atan2(8 * 2, 5.5 + 4.5))',
	},
	{
		name: '--ratio(80% * 2, 55% + 45%)',
		selector: '.test-math',
		property: '--test-ratio-percentage',
		expected: 'tan(atan2(80% * 2, 55% + 45%))',
	},

	// Color tests
	{
		name: '--opacity(red, 50%)',
		selector: '.test-color',
		property: '--test-opacity-half',
		expected: 'rgb(from red r g b / 50%)',
	},
	{
		name: '--black(50%)',
		selector: '.test-color',
		property: '--test-black-50',
		expected: 'rgb(0 0 0 / 50%)',
	},
	{
		name: '--white(50%)',
		selector: '.test-color',
		property: '--test-white-50',
		expected: 'rgb(255 255 255 / 50%)',
	},

	// Typography tests
	{
		name: '--modular-scale(1rem, 1.25, 0)',
		selector: '.test-typography',
		property: '--test-scale-0',
		expected: 'calc(1rem * pow(1.25, 0))',
	},
	{
		name: '--line-height-length(16px, 1.5)',
		selector: '.test-typography',
		property: '--test-line-height',
		expected: 'calc(16px * 1.5)',
	},

	// Spacing tests
	{
		name: '--spacing(0)',
		selector: '.test-spacing',
		property: '--test-spacing-0',
		expected: 'calc(0.25rem * pow(2, 0))',
	},
	{
		name: '--spacing(1)',
		selector: '.test-spacing',
		property: '--test-spacing-1',
		expected: 'calc(0.25rem * pow(2, 1))',
	},
	{
		name: '--spacing(2)',
		selector: '.test-spacing',
		property: '--test-spacing-2',
		expected: 'calc(0.25rem * pow(2, 2))',
	},
	{
		name: '--spacing(3)',
		selector: '.test-spacing',
		property: '--test-spacing-3',
		expected: 'calc(0.25rem * pow(2, 3))',
	},

	// Utility tests
	{
		name: '--px-to-rem(16px)',
		selector: '.test-utility',
		property: '--test-px-to-rem-16',
		expected: 'calc(16px / 16px * 1rem)',
	},
	{
		name: '--px-to-rem(24px)',
		selector: '.test-utility',
		property: '--test-px-to-rem-24',
		expected: 'calc(24px / 16px * 1rem)',
	},
	{
		name: '--rem-to-px(1rem)',
		selector: '.test-utility',
		property: '--test-rem-to-px-1',
		expected: 'calc(1rem / 1rem * 16px)',
	},
	// Grid tests
	{
		name: '--grid-span(3)',
		selector: '.test-grid',
		property: '--test-span-3',
		expected: 'span round(clamp(1, 3, 12))',
	},
	{
		name: '--auto-grid(200px, 3) should cap columns',
		selector: '.test-grid',
		property: '--test-auto-grid-capped',
		expected: 'repeat(auto-fit, minmax(max(200px, calc(100% / 3)), 1fr))',
	},

	// Color function fixes - clamping tests
	{
		name: '--saturate(red, 10) should clamp chroma',
		selector: '.test-color',
		property: '--test-saturate-clamped',
		expected: 'oklch(from red l clamp(0, calc(c * 10), 0.4) h)',
	},
	{
		name: '--lighten(red, 200%) should clamp to 1',
		selector: '.test-color',
		property: '--test-lighten-clamped',
		expected: 'oklch(from red clamp(0, calc(l + 200% / 100%), 1) c h)',
	},

	// New line-height-unitless function
	{
		name: '--line-height-unitless(16px)',
		selector: '.test-typography',
		property: '--test-line-height-unitless',
		expected: 'calc(16px * 1.5 / 1px)',
	},

	// Edge case tests
	{
		name: '--negate(0) should return 0',
		selector: '.test-edge-cases',
		property: '--test-negate-zero',
		expected: 'calc(-1 * 0)',
	},
	{
		name: '--abs(0) should return 0',
		selector: '.test-edge-cases',
		property: '--test-abs-zero',
		expected: 'max(0, calc(-1 * 0))',
	},
	{
		name: '--spacing(0) should return base value',
		selector: '.test-edge-cases',
		property: '--test-spacing-zero',
		expected: 'calc(0.25rem * pow(2, 0))',
	},
	{
		name: '--spacing(10) should handle large values',
		selector: '.test-edge-cases',
		property: '--test-spacing-large',
		expected: 'calc(0.25rem * pow(2, 10))',
	},
	{
		name: '--lerp at progress 0 returns start value',
		selector: '.test-edge-cases',
		property: '--test-lerp-start',
		expected: 'calc(10px + (50px - 10px) * 0)',
	},
	{
		name: '--lerp at progress 1 returns end value',
		selector: '.test-edge-cases',
		property: '--test-lerp-end',
		expected: 'calc(10px + (50px - 10px) * 1)',
	},
	{
		name: '--opacity with 0% should be fully transparent',
		selector: '.test-edge-cases',
		property: '--test-opacity-zero',
		expected: 'rgb(from red r g b / 0%)',
	},
	{
		name: '--opacity with 100% should be fully opaque',
		selector: '.test-edge-cases',
		property: '--test-opacity-full',
		expected: 'rgb(from red r g b / 100%)',
	},
];

/**
 * Create test HTML page.
 */
function createTestHTML() {
	const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>CSS Extras - Test Suite</title>
	<link rel="stylesheet" href="index.css">
	<link rel="stylesheet" href="test.css">
	<style>
		body {
			font-family: system-ui, -apple-system, sans-serif;
			padding: 2rem;
		}

		.test-container {
			display: none; /* Hidden elements for testing */
		}
	</style>
</head>
<body>
	<h1>CSS Extras Test Suite</h1>
	<p>Running automated tests...</p>

	<!-- Test elements -->
	<div class="test-container">
		<div class="test-math"></div>
		<div class="test-color"></div>
		<div class="test-typography"></div>
		<div class="test-layout"></div>
		<div class="test-spacing"></div>
		<div class="test-animation"></div>
		<div class="test-utility"></div>
		<div class="test-grid"></div>
		<div class="test-filter"></div>
		<div class="test-theme"></div>
		<div class="test-theme-dark"></div>
		<div class="test-edge-cases"></div>
	</div>
</body>
</html>`;

	const testHtmlPath = path.join(__dirname, 'test.html');
	fs.writeFileSync(testHtmlPath, html);
	return testHtmlPath;
}

/**
Run tests using Puppeteer.
*/
async function runTests() {
	const testHtmlPath = createTestHTML();
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	const page = await browser.newPage();

	// Navigate to test page
	await page.goto(`file://${testHtmlPath}`, {
		waitUntil: 'networkidle0',
	});

	console.log('🧪 Running CSS function tests...\n');

	let passed = 0;
	let failed = 0;
	const failures = [];

	// Run each test
	for (const test of tests) {
		try {
			// eslint-disable-next-line no-await-in-loop
			const result = await page.evaluate((selector, property) => {
				// eslint-disable-next-line no-undef
				const element = document.querySelector(selector);
				if (!element) {
					return null;
				}

				// eslint-disable-next-line no-undef
				const computed = getComputedStyle(element);
				return computed.getPropertyValue(property);
			}, test.selector, test.property);

			let isPass = false;

			if (test.isRegex && test.expected instanceof RegExp) {
				isPass = test.expected.test(result);
			} else if (typeof test.expected === 'string') {
				// Normalize values for comparison
				const normalizedResult = normalizeValue(result);
				const normalizedExpected = normalizeValue(test.expected);
				isPass = normalizedResult === normalizedExpected;
			}

			if (isPass) {
				console.log(`✅ ${test.name}`);
				passed++;
			} else {
				console.log(`❌ ${test.name}`);
				console.log(`   Expected: ${test.expected}`);
				console.log(`   Got: ${result}`);
				failed++;
				failures.push({
					test: test.name,
					expected: test.expected.toString(),
					actual: result,
				});
			}
		} catch (error) {
			console.log(`❌ ${test.name} - Error: ${error.message}`);
			failed++;
			failures.push({
				test: test.name,
				error: error.message,
			});
		}
	}

	await browser.close();

	// Summary
	console.log('\n' + '='.repeat(50));
	console.log('\n📊 Test Results:');
	console.log(`   Passed: ${passed}/${tests.length}`);
	console.log(`   Failed: ${failed}/${tests.length}`);

	if (failures.length > 0) {
		console.log('\n❌ Failed tests:');
		for (const failure of failures) {
			console.log(`   - ${failure.test}`);
			if (failure.expected) {
				console.log(`     Expected: ${failure.expected}`);
				console.log(`     Actual: ${failure.actual}`);
			}

			if (failure.error) {
				console.log(`     Error: ${failure.error}`);
			}
		}
	}

	// Clean up test HTML
	fs.unlinkSync(testHtmlPath);

	return failed === 0;
}

/**
Normalize CSS values for comparison.
*/
function normalizeValue(value) {
	if (!value) {
		return '';
	}

	// Trim whitespace
	value = value.trim();

	// Normalize spacing in rgb/rgba
	value = value.replaceAll(/rgba?\s*\(\s*/g, 'rgb(');
	value = value.replaceAll(/,\s*/g, ', ');
	value = value.replaceAll(/\s*\)/g, ')');

	// Normalize grid template columns - remove all whitespace/newlines
	if (value.includes('repeat') && value.includes('minmax')) {
		value = value.replaceAll('  ', ' ').replaceAll('\n', '').replaceAll('\t', '');
		value = value.replaceAll(', ', ', ');
		value = value.replaceAll('( ', '(');
		value = value.replaceAll(' )', ')');
	}

	// Normalize 0 values
	if (value === '0px') {
		value = '0';
	}

	return value;
}

/**
Install Puppeteer if not already installed.
*/
async function ensurePuppeteer() {
	try {
		await import('puppeteer');
	} catch {
		console.log('📦 Installing Puppeteer for testing...');
		const {execSync} = await import('node:child_process');
		execSync('npm install --save-dev puppeteer', {stdio: 'inherit'});
		console.log('✅ Puppeteer installed\n');
	}
}

// Main execution
async function main() {
	await ensurePuppeteer();

	const success = await runTests();

	if (success) {
		console.log('\n✅ All tests passed!');
		process.exit(0);
	} else {
		console.log('\n❌ Some tests failed');
		process.exit(1);
	}
}

await main().catch(error => {
	console.error('Test runner error:', error);
	process.exit(1);
});
