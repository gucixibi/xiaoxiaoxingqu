"""Local-only launcher; Python standard library, no installation step."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial
import webbrowser,threading
root=Path(__file__).resolve().parent
server=None
for port in range(8877,8898):
    try:
        server=ThreadingHTTPServer(('127.0.0.1',port),partial(SimpleHTTPRequestHandler,directory=str(root)))
        break
    except OSError:continue
if server is None:raise SystemExit('Ports 8877-8897 are unavailable. Close a previous launcher and retry.')
url=f'http://127.0.0.1:{server.server_port}/'
print('Little Orbit: '+url+'\nKeep this window open. Press Ctrl+C to stop.')
threading.Timer(.5,lambda:webbrowser.open(url)).start()
try:server.serve_forever()
except KeyboardInterrupt:pass
finally:server.server_close()
