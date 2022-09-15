let user = "wil";
let database = [];

document.getElementById("full").value = localStorage.getItem("fullform");

let biggestId = 0;

function formatXml(xml, tab) {
  // tab = optional indent value, default is tab (\t)
  var formatted = "",
    indent = "";
  tab = tab || "\t";
  xml.split(/>\s*</).forEach(function (node) {
    if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent by one 'tab'
    formatted += indent + "<" + node + ">\r\n";
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab; // increase indent
  });
  return formatted.substring(1, formatted.length - 3);
}

//Main function
const parse = () => {
  const text = document.getElementById("full").value;
  localStorage.setItem("fullform", text);

  const contentBlockTags = getContentBlockTagsByText(text);
  calculateBiggestId(contentBlockTags);

  const newText = parseText(text);
  parseCompactText(newText);
  createDatabase(newText);
};

const getContentBlockTagsByText = (text) => {
  const parser = new DOMParser();
  const fullBlock = parser.parseFromString(text, "text/html");
  return fullBlock.getElementsByTagName("contentBlock");
};

const getDataFromContentBlocks = () => {};

const splitContentBlocks = (text) =>
  text.split(/(<contentBlock id=\"[^]\">[\s\S]*?<\/contentBlock>)/g);

const calculateBiggestId = (tags) => {
  const contentBlockIds = [...tags].map((cb) =>
    cb.getAttribute("id") ? parseInt(cb.getAttribute("id")) : 0
  );

  biggestId = Math.max(...contentBlockIds);
  biggestId = biggestId < 0 ? 0 : biggestId;
};

const parseText = (text) => {
  const allBlocks = splitContentBlocks(text);
  let newText = "";

  for (const b of allBlocks) {
    if (b.replaceAll("\n", "").trim() === "") continue;
    const splittedEtaParts = b.split(/(<etaPart.*\/>)/g);
    newText += generateContentBlocks(splittedEtaParts);
  }

  document.getElementById("full").value = formatXml(newText);
  return newText;
};

const parseCompactText = (text) => {
  const newAllBlocks = splitContentBlocks(text);
  let compact = text;
  for (const b of newAllBlocks) {
    const content = b
      .replace(/<contentBlock id=\"[^]\">/g, "")
      .replace(/<\/contentBlock>/g, "")
      .replace(/(<etaPart.*\/>)/g, "");

    if (content.trim() !== "")
      compact = compact
        .replace(content, "")
        .replaceAll("></contentBlock>", " />");
  }

  document.getElementById("compact").value = formatXml(compact);
};

const createDatabase = (text) => {
  const newContentBlockTags = getContentBlockTagsByText(text);
  console.log(text,newContentBlockTags);
  [...newContentBlockTags].forEach((cb) => {
    const id = cb.getAttribute("id");
    let exists = database.find((db) => db.id == id);

    if (!exists && id)
      database.push({
        id,
        content: cb.innerHTML,
        owner: user,
      });

    if (exists)
        exists.content = cb.innerHTML;
  });
  updateTable();
};

const createContentBlock = (chunk) => {
  const checkIfIsClosed = (chk) => {
    const hasOpening = chk.match(/<contentBlock id=\"[^]\">/g);
    const hasEnding = chk.match(/<\/contentBlock>/g);
    return {
      beginning: hasOpening ? true : false,
      ending: hasEnding ? true : false,
    };
  };

  let newChunk = chunk;
  const isClosed = checkIfIsClosed(chunk);

  if (newChunk.includes("etaPart")) {
    return newChunk;
  }

  if (!isClosed.beginning) {
    biggestId++;
    newChunk = `<contentBlock id="${biggestId}">${newChunk}`;
  }

  if (!isClosed.ending) newChunk = `${newChunk}</contentBlock>`;

  return newChunk;
};

const generateContentBlocks = (text) => {
  let res = "";
  text.forEach((chunk, i) => {
    if (chunk.trim() !== "") res += createContentBlock(chunk);
  });
  return res;
};

const updateTable = () => {
  const table = document.getElementById("db");
  let newtr = "";
  database.forEach((d) => {
    newtr += `
  	<tr>
    	<td>${d.id}</td>
      <td>${d.content}</td>
      <td>${d.owner}</td>
    </tr>
  `;
  });
  table.innerHTML = newtr;
};

const updateName = (name) => (user = name);
