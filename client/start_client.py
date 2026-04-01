import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000

# Change to the client directory (where all HTML files are)
client_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(client_dir)

Handler = http.server.SimpleHTTPRequestHandler

print("\n🍛 GreenBite Client")
print("=" * 40)
print(f"🌐 Website running on: http://localhost:{PORT}")
print(f"📁 Serving files from: {client_dir}")
print("=" * 40)
print("\n🚀 Opening browser automatically...\n")

# Open the browser automatically
webbrowser.open(f'http://localhost:{PORT}')

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Client server stopped.")
        sys.exit(0)
