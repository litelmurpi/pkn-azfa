import sys
import re
from bs4 import BeautifulSoup

html_path = "/home/azfa/.gemini/antigravity-ide/brain/2e4b3b91-473c-447e-b940-bf12145f25e7/.system_generated/steps/186/content.md"
out_path = "/var/www/html/pkn/parsed_bbc.txt"

try:
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    soup = BeautifulSoup(content, "html.parser")
    # Find all paragraph tags or main article body
    paragraphs = soup.find_all('p')
    if not paragraphs:
        # Fallback to general text extraction
        for s in soup(["script", "style"]):
            s.decompose()
        text = soup.get_text()
    else:
        text = "\n\n".join([p.get_text() for p in paragraphs])

    # Clean up multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)

    print("Parsed successfully to parsed_bbc.txt!")
except Exception as e:
    print(f"Error: {e}")
