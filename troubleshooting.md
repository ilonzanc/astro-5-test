# Troubeshooting

## Env variables are undefined on first dev build

```
Expected parameter accessToken
```

### Solution

It seems that the approach with `import.meta.env` did not work. I changed the `.env` file to `.envrc`, exported the variables and use process.env in the code

## Running

```Invalid hook call.

```

### Solution

Due to React 19. See [this PR](https://github.com/withastro/astro/pull/12913)

## Using hooks in inappropriate files

```Cannot read properties of null (reading 'useSyncExternalStore')

```

### Solution

Places you can't use hooks/zustand hooks: astro files, pages
