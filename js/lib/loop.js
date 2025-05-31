const fonts2 = [
  'DOSANK24', 'DOSANK16', 'TimesNewCustom', 'Screenstar',
  'Tiny5', 'SixtyfourConvergence', 'PressStart2P',
  'PixelifySans', 'VariableFont_ROND', 'CoralPixels', 'DOSANK24'
];

async function loadFonts() {
  await Promise.all(fonts2.map(f => document.fonts.load(`16px "${f}"`)));
}

async function playLoop2() {
  await loadFonts();
  const text = document.getElementById("changing-text");
  let i = 0;
  const interval = setInterval(() => {
    text.style.fontFamily = fonts2[i % fonts2.length];
    i++;
    if (i >= fonts2.length) clearInterval(interval); // احذف هذا لو تريده لا نهائي
  }, 150);
}

