import json
import re
from bs4 import BeautifulSoup

html_path = "/home/azfa/.gemini/antigravity-ide/brain/2e4b3b91-473c-447e-b940-bf12145f25e7/.system_generated/steps/186/content.md"
out_path = "/var/www/html/pkn/parsed_bbc.txt"

try:
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    soup = BeautifulSoup(content, "html.parser")
    
    # Let's search for nextjs state or reverb script
    # Look for script tag with json content
    json_script = soup.find('script', type='application/ld+json')
    
    # Try finding any script containing the main text
    # BBC news articles on Simorgh have __NEXT_DATA__ or similar script.
    # Let's look for script tags that contain "cukup aku"
    scripts = soup.find_all('script')
    found_json = None
    for s in scripts:
        if s.string and "cukup aku" in s.string:
            # Found it!
            # Let's see if we can extract JSON
            try:
                # Try to load as JSON
                match = re.search(r'\{.*\}', s.string)
                if match:
                    js_data = json.loads(match.group(0))
                    found_json = js_data
                    break
            except Exception as e:
                pass
                
    text_list = []
    if found_json:
        # Recursive function to find all text in the JSON
        def extract_text_from_json(obj):
            if isinstance(obj, dict):
                for k, v in obj.items():
                    if k == 'text' and isinstance(v, str):
                        text_list.append(v)
                    else:
                        extract_text_from_json(v)
            elif isinstance(obj, list):
                for item in obj:
                    extract_text_from_json(item)
                    
        extract_text_from_json(found_json)
        
    if text_list:
        clean_text = "\n\n".join(text_list)
        # remove duplicate lines/phrases
        lines = clean_text.split("\n\n")
        seen = set()
        unique_lines = []
        for line in lines:
            line_clean = line.strip()
            if line_clean and line_clean not in seen and len(line_clean) > 5:
                seen.add(line_clean)
                unique_lines.append(line_clean)
        clean_text = "\n\n".join(unique_lines)
    else:
        # Fallback: simple text extraction, stripping out HTML but keeping words
        # Let's find all text blocks between > and <
        all_text = re.findall(r'>([^<]+)<', content)
        clean_text = "\n\n".join([t.strip() for t in all_text if len(t.strip()) > 30])
        
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("Source: https://www.bbc.com/indonesia/articles/c620l5yzndno\n\n")
        f.write(clean_text)

    print("Parsed successfully to parsed_bbc.txt!")
except Exception as e:
    print(f"Error: {e}")
