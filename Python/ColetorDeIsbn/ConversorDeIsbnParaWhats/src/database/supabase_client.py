import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not url:
    raise ValueError("SUPABASE_URL não encontrada.")

if not key:
    raise ValueError("SUPABASE_SERVICE_ROLE_KEY não encontrada.")

supabase: Client = create_client(url, key)