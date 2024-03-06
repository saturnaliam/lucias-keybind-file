## whats this about?
i really like having a lot of keybinds, but my big issue is how many different formats there are. my text editors, code editors, window managers, terminals, etc. all have different ways of configuring their keybinds, each with their own annoying syntax to do so, and honestly im so done with it. lucias keybind files (lkf) were created as a way to make a more standard way to create keybinds, then have them put into the program's syntax by a program.

## example
just as an example for qtile (the original reason i made this), an input of ``mod h || lazy.layout.left() || Move focus to left`` would be turned into
```python
keys = [
  Key([mod], "h", lazy.layout.left(), "Move focus to left"),
]
```
