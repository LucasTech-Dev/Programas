import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)) + "/..")

import argparse
import json
from src.key_manager import KeyManager

def main():
    parser = argparse.ArgumentParser(description="Twin Engine Gemini API Key Manager")
    parser.add_argument("--prompt", help="Prompt para enviar à API do Gemini", required=True)
    args = parser.parse_args()
    
    key_manager = KeyManager()
    result = key_manager.generate_content(args.prompt)
    
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
# src/main.py
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import argparse
import json
from key_manager import KeyManager

def main():
    parser = argparse.ArgumentParser(description="Twin Engine Gemini API Key Manager")
    parser.add_argument("--prompt", help="Prompt para enviar à API do Gemini", required=True)
    args = parser.parse_args()
    
    key_manager = KeyManager()
    result = key_manager.generate_content(args.prompt)
    
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()