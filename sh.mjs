import fs from "fs";

const componentsIndex = () => {
    fs.readdir("./src/components", (err, files) => {
        if (err) return console.error(err);

        const items = files
            .filter((v) => v.includes(".tsx"))
            .map((item) => {
                const _item = item.replace(".tsx", "");

                return `export {default as ${_item}} from "~/components/${_item}"`;
            })
            .sort((a, b) => a.length - b.length)
            .join("\n");

        console.log(items);

        fs.writeFile("./src/components/index.ts", items, function (e) {
            if (e) console.error(e);
        });
    });
};

if (process.argv[2] === "components") componentsIndex();
