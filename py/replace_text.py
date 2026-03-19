import sys

file_path = r'c:\Users\danis\Desktop\Cuesa Sport\pages\sectores.html'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

target = '<span class="sectores-alt-cta">Ver sector <i class="fas fa-arrow-right"></i></span>'
replacement = '<span class="btn btn--primary" style="margin-top: 24px;">Saber más <i class="fas fa-arrow-right"></i></span>'

text = text.replace(target, replacement)
print(f"Replaced {text.count(replacement)} instances.")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)
