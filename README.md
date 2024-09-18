# getthingsdone

Based on Getting Things Done (GTD) method by David Allen.

Modules:
- Inbox
  - Capture
  - Next Action
  - Waiting
  - Someday
  - Reference

Inbox:
  - Class that extends to other modules. Used as parent of other lists.
  - Creates items array on initalization.
  - addItem & removeItem methods.
    - Items have properties item and date (of creation)
  - changeItemList to move item to different module.

Capture:
  - First screen shown to user.
  - Used as the starting point for most items.
  - Most general.

- Need to be able to stringify each list item with valid key name.
- Need to be able to maintain list order for each type of list.
