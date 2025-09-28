import http.server
import socketserver
import webbrowser
import threading
import time

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    
    # Open the browser in a separate thread after a short delay
    def open_browser():
        time.sleep(2)
        webbrowser.open(f"http://localhost:{PORT}/dashain-wish.html")
    
    threading.Thread(target=open_browser).start()
    
    print(f"Server running at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")