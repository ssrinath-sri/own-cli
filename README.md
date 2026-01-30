# create-no-framework

A CLI tool to scaffold a backend project with no framework, using Node.js or Bun, npm or pnpm, and JavaScript or TypeScript.

## Installation

No installation needed! Simply use the `npm create` or `pnpm create` command to scaffold a new project.

## Usage

Run the following command to create a new project:

```bash
npm i no-framework
```

Or if you prefer pnpm:

```bash
pnpm i no-framework
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