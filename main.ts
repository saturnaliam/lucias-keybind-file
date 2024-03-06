const initial = "qtile || command |sdf || does smthn\nhiii || gfdag || d"

const qtile_mappings = new Map<string, string>([
  [ "ret", "Return" ],
  [ "S", "shift" ],
  [ "SPC", "space" ],
  [ "C", "control" ],
]); // the keys in qtile that have a different name than in the format

function split_on_delimeters(input: string): string[] {
  const regex = /(?:\|\||\n)/ // the pattern i use to split the arguments up
  const output = input.split(regex);

  output.forEach((element, index) => { output[index] = element.trim(); }); // trimming out all the spaces

  return output;
}

function parse_qtile(filename: string): string {
  const special_keys = [ "S", "C", "mod" ];

  const file_contents = Deno.readTextFileSync(filename);
  const sections = split_on_delimeters(file_contents);

  let output = "keys = [\n";
  let current_line = "";
  let section_num = 0;
  let special_key = false;

  for (let section of sections) {
    section = section.trim();
    if (section_num === 0) { // the section that actually the defines the keybind
      current_line = "\tKey(";
      const keys = section.split(' '); // splits into the individual keys

      for (const key of keys) {
        if (special_keys.includes(key)) { // checking if its a key that needs to be between [] at the start.
          if (!special_key) { // placing the [ at the start if it wasn't there before
            current_line += "[";
            special_key = true;
          }

          key === "mod" ? current_line += "mod, " : current_line += `"${qtile_mappings.get(key)}", `;
        } else {
          if (special_key) { // closing off the special keys section
            current_line = current_line.slice(0, -2);
            current_line += "], ";
            special_key = false;
          }

          current_line += `"${qtile_mappings.has(key) ? qtile_mappings.get(key) : key}", `; // i love ternaries!!
        }
      }
    } else if (section_num === 1) { // the section containing the action
      current_line += `${section}, `;
    } else if (section_num === 2) {
      current_line += `desc="${section}"),\n`;
      output += current_line;
    }

    section_num++;
    section_num %= 3;
  }

  output += "]"
  return output;
}

console.log(parse_qtile("qtile.lkf"));
