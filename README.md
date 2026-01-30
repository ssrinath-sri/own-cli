# create-no-framework

A CLI tool to scaffold a backend project with no framework, using Node.js or Bun, npm or pnpm, and JavaScript or TypeScript.

## Installation

To use this tool, you need to install it globally or use `npm create` or `pnpm create`.

First, publish this package to npm (or use npx if not published).

## Usage

Run the following command to create a new project:

```bash
npm create no-framework
# or
pnpm create no-framework
```

The CLI will prompt you for:
- Project name
- Runtime: Node.js or Bun
- Package manager: npm or pnpm
- Language: JavaScript or TypeScript

It will create a folder with the project name containing:
- `src/` directory with subfolders: `handler`, `service`, `input-validation`, `dao-layer`, `business-validation`
- `package.json` configured for your choices
- `tsconfig.json` if TypeScript is selected
- A basic `index.js` or `index.ts` file

## Development

To develop this CLI:

1. Clone the repo
2. Run `npm install`
3. Run `node index.js` to test

To publish:
1. Update version in package.json
2. Run `npm publish`

## License

ISC