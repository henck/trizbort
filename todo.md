# TODO

## General

- [ ] Allow "hand drawn"
- [ ] (Locked) doors
- [x] Object list
- [x] Export to TADS
- [x] When double-clicking a room or other view, focus on first text field for quick typing
- [ ] Add map themes; implies grid color and background and fonts
  - [ ] Let user choose map background color
  - [ ] Fonts

## Map-level settings
- [ ] Fonts
- [x] Arrow size (not imported)
- [ ] Preferred distance between rooms
- [ ] Text offset from line
- [x] Darkness stripe size (not imported)
- [ ] Object list offset
- [ ] Resize/drag handle size
- [ ] Snap to element distance
- [ ] Document-specific margins
- [ ] Map-level background

## App settings (stored in Local Storage)

## Other features
- [ ] Publish maps
- [ ] Export map to PNG etc.
- [x] Undo (Editor actions can be undone, panel actions cannot.)
- [ ] Help popups
- [ ] New room/connector style is based on last selected element
- [x] Canvas thin/thick lines problem
- [ ] Minimap

## Shortcut keys

- [x] Ctrl+A = select all
- [x] A = one-way line
- [ ] ctrl+shift+a = Select region
- [x] ctrl+C = copy
- [ ] ctrl+alt+c = copy color
- [ ] D = down/up line
- [ ] I = in/out line
- [x] K = toggle darkness
- [ ] O = out/in line
- [ ] ctrl+O = open map
- [ ] P = plain styling
- [x] R = add room
- [x] N = add note
- [x] B = add block
- [ ] Ctrl+s = save
- [ ] T = dotted line
- [ ] U = up/down line
- [x] V = reverse line
- [x] ctrl+V = paste
- [ ] W = swap properties of two rooms
- [x] Enter = edit selected room properties; if no room selected select center room
- [x] ESC = select none
- [x] F2 = rename
- [x] shift-arrow = Move to or create new room
- [x] insert = center map

## Code generation

* ADL
* Adrift
* Alan 2
* Alan 3
* Heritage ? (requires only rooms in cardinal directions on a grid)
* Hugo
* Inform7
* Gamefic (Ruby)
* Quest
* TADS
* TextAdventure.js   (https://github.com/TheBroox/TextAdventure.js)

Code generations may allow selection of options; chosen options have default 
values and changes are saved in local storage. For instance, TADS may allow exporting
everything to a single file or every room into its own file, where the result is offered
as a ZIP.

