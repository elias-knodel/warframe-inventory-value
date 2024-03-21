# script

To install dependencies:

```bash
bun install
```

## How To Run

1. Place your AlecaFrame exported `inventoryRelics.json` insode `.data/`
2. Execute `bun run index.ts` -> creates `relic_names.json`
3. Execute `bun run api_request.ts` -> creates `results.json`
4. Execute `bun run lowest_price.ts` -> creates `relic_prices.json`
5. Execute `bun run json_to_csv.ts` -> creates `relic_prices.csv`

```bash
bun run index.ts && bun run api_request.ts && bun run lowest_price.ts && bun run json_to_csv.ts
```
