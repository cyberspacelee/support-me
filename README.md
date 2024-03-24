## Basic Commands

1. Install eslint and related plugins:
```shell
pnpm add -D eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react
```

2. Install prettier：
```shell
pnpm add -D prettier
```

3. Add a prettier script in the `package.json` file:
```json
"scripts": {
  "prettier": "prettier --check ."
}
```

4. Install husky：
```shell
pnpm add -D husky
```

5. Set up the pre-commit hook for husky to run eslint and prettier:
```shell
npx husky add .husky/pre-commit "pnpm run lint && pnpm run prettier"
```

## Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.