# Deployment instrucitons

To deploy this project, run the following command:

```bash
yarn deploy "commit message here"
```

To publish this project, run this code:

```bash
npx lerna publish
```

If lerna fails in the middle of the publishing process, try to run these commands manually:

```bash
git push origin --tags
npx lerna exec -- "npm publish || exit 0"
```
