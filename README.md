# getthingsdone

Based on Getting Things Done (GTD) method by David Allen.

Class Item:
  - Created on new item entry.
  - Properties:
    - toDo, date/time, id
  - Methods:
    - editToDo

Class List:
  - Parent class for different list types.
  - Properties:
    - list
  - Methods:
    - addItem
    - removeItem
    - getItemIndex
    - moveItemToDifferentList
    - changeItemPosition