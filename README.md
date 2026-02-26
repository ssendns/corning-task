# corning task

hey, this is my test task project built with react + typescript + vite + tailwind css 3.

## main features

- table with columns: `id`, `name`, `type`, `radius`, `parent id`
- search by selected columns
- multi-select for rows and columns (with `shift`)
- sortable columns via header menu
- resizable columns (excel-like drag on header edge)
- inline row editing on double click
- add new row modal with validation
- delete selected rows with confirm modal
- undo / redo for table changes
- state persistence in `localStorage` (rows, selected rows, selected columns, column widths)
- unit tests for validation logic in `tests/rowValidation.test.ts`

## assumptions + tradeoffs

- i assumed this is a client-only task, so i used `localStorage` for persistence instead of backend api
- i did not overload the ui with too many components on screen, and focused on usability, readability, and required functionality for better ux
- undo/redo is implemented for row data changes (add/delete/edit), but not for every tiny ui state change
- i assumed the app would be used mostly on desktops (which is usually true for internal tooling apps), so i did not prioritize mobile responsiveness and many actions are optimized for keyboard + mouse

## what i would improve with more time

- add more tests (hooks + integration tests for table flows)
- improve keyboard accessibility and aria coverage in menus/modals/table editing
- polish mobile behavior for column resize and dense editing scenarios
- add pagination/lazy loading for big datasets

## approximate time spent

- around 3-4 hours

## local run

1. `npm install`
2. `npm run dev`
