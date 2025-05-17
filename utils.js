function createButton(label, className, onClick) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = className;
    btn.onclick = onClick;
    return btn;
  }
  